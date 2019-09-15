# 以 VGA 为例子对外部设备进行信号输出

VGA 驱动模块的代码开源在：[zan-pu/vga-driver](https://github.com/zan-pu/vga-driver)

## VGA 显示的实现

VGA 显示器扫描方式从屏幕左上角一点开始，从左向右逐点扫描，每扫描完一行，电子束回到屏幕的左边下一行的起始位置，在这期间，CRT 对电子束进行消隐，每行结束时，用行同步信号进行同步；当扫描完所有的行，形成一帧，用场同步信号进行场同步，并使扫描回到屏幕左上方，同时进行场消隐，开始下一帧。完成一行扫描的时间称为水平扫描时间，其倒数称为行频率；完成一帧（整屏）扫描的时间称为垂直扫描时间，其倒数称为场频率，即屏幕的刷新频率，常见的有 60Hz，75Hz 等等，但标准的 VGA 显示的场频 60Hz。其扫描示意图如下图所示：

![](https://i.loli.net/2019/09/15/2d8E3H9erUQCGoq.png)

VGA 包含行时序与场时序两个部分，行时序包含：

- Horizontal Sync Pulse
- Horizontal Front Porch
- Horizontal Front Active Video
- Horizontal Back Porch

这四个参数，其时序图如下：

![](https://i.loli.net/2019/09/15/X6VdC5FNDY4Jt9s.png)

相应的，场时序的参数类似，场时序图如下：

![](https://i.loli.net/2019/09/15/s6RzbvkgX7w23qt.png)

在具体的实现过程中，我们需要输出一个 1024*768 分辨率，60Hz 的视频信号。其各个参数的计算公式大致为：

```
Pixel Clock = (Screen Refresh Frequency) * (Hor Active Video + Hor Front Porch + Hor Synv Pulse + Hor Back Porch) * (Ver Active Video + Ver Front Porch + Ver Synv Pulse + Ver Back Porch)
```

![](https://i.loli.net/2019/09/15/SgfRNwxL8EzBtle.png)

查表可知，我们所需要的信号参数与具体实现大致如下：

```verilog
`define RST_EN 1'b0

module vga_top #(
           parameter H_DISPLAY      = 11'd1024,
           parameter H_FRONT_PORCH  = 11'd24,
           parameter H_SYNC_PULSE   = 11'd136,
           parameter H_BACK_PORCH   = 11'd160,
           parameter H_TOTAL        = 11'd1344,

           parameter V_DISPLAY      = 10'd768,
           parameter V_FRONT_PORCH  = 10'd3,
           parameter V_SYNC_PULSE   = 10'd6,
           parameter V_BACK_PORCH   = 10'd29,
           parameter V_TOTAL        = 10'd806
       )(
           input  wire      clk,
           input  wire      rstn,

           output wire      hs,
           output wire      vs,
           output wire[3:0] red,
           output wire[3:0] green,
           output wire[3:0] blue
       );

    ...

endmodule
```

值得注意的是，我们的 VGA 模块所需时钟信号为 65MHz 的频率，因此我们需要通过 MMCM 模块将 100MHz 的板载时钟信号转换为 65MHz 的 VGA 时钟信号。我们这里创建一个 IP 核：Clocking Wizard，并将其输出频率设置为 65MHz，再把 locked 端口禁用即可。

![](https://i.loli.net/2019/09/15/NgpSOjqK2sm1nyZ.png)

之后，我们就可以利用这一模块将我们的输入 `clk` 信号转化为 65MHz，并将反转的 `rst` 信号输入（VGA 模块的 reset 信号与我们其他模块的是相反的）：

```verilog
// 65 MHz clock signal

wire clk_vga;

clk_wiz u_clk_wiz (
            // Clock out ports
            .clk_out1(clk_vga),

            // Status and control signals
            .reset(~rstn),

            // Clock in ports
            .clk_in1(clk));
```

接下来，我们创建三个寄存器变量 r、g、b，来与 VGA 输出的 r、g、b 信号匹配，从而能够输出扫描到的 RGB 颜色：

```verilog
/* RGB signals */
reg[3:0] reg_red;
reg[3:0] reg_green;
reg[3:0] reg_blue;

assign red = reg_red;
assign green = reg_green;
assign blue = reg_blue;
```

之后，我们控制行刷新与场刷新：

```verilog
/* Horizonal & Vertical refresh pulses */

reg h_reg;
reg v_reg;

assign hs = h_reg;
assign vs = v_reg;

reg[10:0] h_count;
reg[10:0] v_count;

/* horizontal scan and vertical scan */

always @ (posedge clk_vga) begin
    if (rstn == `RST_EN) begin
        h_count <= 11'b0;
        v_count <= 11'b0;
    end
    else begin
        if (h_count == H_TOTAL - 1) begin
            h_count <= 11'b0;
            if (v_count == V_TOTAL - 1) begin
                v_count <= 11'b0;
            end
            else begin
                v_count <= v_count + 1'b1;
            end
        end
        else begin
            h_count <= h_count + 1'b1;
        end
    end
end

always @ (posedge clk_vga) begin
    if (h_count < H_SYNC_PULSE) begin
        h_reg <= 1'b0;
    end
    else begin
        h_reg <= 1'b1;
    end
end

always @ (posedge clk_vga) begin
    if (v_count < V_SYNC_PULSE) begin
        v_reg <= 1'b0;
    end
    else begin
        v_reg <= 1'b1;
    end
end
```

最后，我们可以利用 `h_count` 以及 `v_count` 控制 VGA 在某个范围的输出颜色：

```verilog
always @ (posedge clk_vga) begin
    
    /* --- Game board --- */
    if (h_count < 1140 && h_count > 500 && v_count < 740 && v_count > 100) begin
      reg_red   <= 4'b0100;
      reg_green <= 4'b0010;
      reg_blue  <= 4'b0001;
    end

    /* --- Out of bounds, paint white --- */
    else begin
        reg_red   <= 4'b1111;
        reg_green <= 4'b1111;
        reg_blue  <= 4'b1111;
    end
end
```

## VGA 接口 Constraints 的设置

根据精工开发板的资料，以及上一节介绍的内容来说，我们总共需要配置如下的管脚：

- VGA 的五个输出信号：

  ```verilog
  output wire      hs,
  output wire      vs,
  output wire[3:0] red,
  output wire[3:0] green,
  output wire[3:0] blue
  ```

- 按钮的输入信号：

  ```verilog
  input wire[3:0] btn_key
  ```

- 输入时钟信号：

  ```verilog
  input wire clk
  ```

- 输入复位信号：

  ```verilog
  input wire rst
  ```

针对我们的开发板，在综合项目之后，我们选择 Open Synthesized Design，并打开 Window > I/O Ports，开始管脚约束的配置。

根据精工开发板的开发文档，EES-338 上的 VGA 接口（J1）通过 14 位信号线与 FPGA 连接，红、绿、蓝三个 颜色信号各占 4 位，另外还包括行同步和场同步信号：

![](https://i.loli.net/2019/09/15/NWFvBSbxqeHL9Dk.png)

系统时钟 100MHz，输出的时钟信号直接与 FPGA 全局时钟输入引脚（T5）相连：

![](https://i.loli.net/2019/09/15/5cWfkG4weoRAbNh.png)

四个专用按键分别用于逻辑复位 RST（S8 和 S6）和擦除 FPGA 配置 PROG（S7 和 S5）， 当设计中不需要外部触发复位时，RST 按键可以用作其他逻辑触发功能。没有按下时输出高电平，按下为低电平：

![](https://i.loli.net/2019/09/15/nk1Uq4pHjclYhmx.png)

最终，我们配置的约束大致如下：

![](https://i.loli.net/2019/09/15/JIYAQywvSqneO56.png)

接下来，经过 Implementation 和 Generate Bitstream，我们的 VGA Driver 就能直接上板运行，输出一个大致如下的图像（不同显示器上面的 VGA 图像的颜色显示可能不同）：

![](https://i.loli.net/2019/09/15/gI6mxqBSrXZobwM.jpg)

这个图像的本意是一个迷宫，其设计草稿以及对应功能如下：

- `00` WALL 墙
- `01` ROAD 路
- `10` DEST 目标
- `11` PLYR 人

![](https://i.loli.net/2019/09/15/labpNemFKSuBsPf.png)

不过最终时间仓促，我们并没有完全实现全部功能。但是，我们的基本思路是完全没有问题的，因此按照这样介绍的设计思路，我们完全可以成功实现利用 CPU 来控制人在迷宫中行走，最终得到完整的游戏体验。
