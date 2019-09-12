# 外部设备的基础配置

为了让我们的 CPU 能够真正发挥功能，我们需要为开发板进行外设的适配。

## 更改 CPU 的组织结构

![](https://i.loli.net/2019/09/12/ekzlpwiGSrtDXdE.png)

CPU 对外部设备的控制是通过写入（`SW`）和读取（`LW`）外设中的数据存储器来实现的。我们需要将外部设备和 CPU 独立开来，将时钟信号 clk 和复位信号 rst 通过一个公共的顶层模块同时引线连接在 CPU 和外部设备上面。

对于 VGA 显示来说，就是一个专有的时钟信号 `clk_65m`（下一节进行配置）以及 VGA 的输出引脚：

- 横向刷新率 `hs`
- 纵向刷新率 `vs`
- 红色 `r`
- 绿色 `g`
- 蓝色 `b`

以及必要的存储访问引脚（类似于数据存储器 Data Memory）：

- 写使能信号：`wen`
- 写入数据：`wire[31:0] wdata`
- 目标地址：`wire[3:0] addr`
- 读取数据：`wire rdata`

这样，我们再引入一个统一的顶层模块 soc，用来连接 CPU 和外设。那么，我们连接 VGA 的代码大致如下：

```verilog
vga u_vga(
        .clk   (clk       ),
        .rstn  (~rst      ),
        .wen   (vga_wen   ),
        .wdata (vga_wdata ),
        .addr  (vga_addr  ),
        .rdata (vga_rdata ),
        .hs    (hs        ),
        .vs    (vs        ),
        .red   (red       ),
        .green (green     ),
        .blue  (blue      )
    );
```

连接 CPU 的代码大致如下：

```verilog
zanpu_top u_zanpu_top(
	.clk      (clk      ),
    .rst      (rst      ),
    .io_wen   (io_wen   ),
    .io_addr  (io_addr  ),
    .io_wdata (io_wdata ),
    .io_rdata (io_rdata )
);
```

同时，如果想要在开发板上面有相应的输入，我们需要在 soc 上面加上一个输入信号：

```verilog
input wire[3:0] btn_key
```

可以看到，对于顶层模块 soc 来说，输入信号有：

- 时钟信号：`clk`
- 复位信号：`rst`
- 按键：`wire[3:0] btn_key`

输出信号包括 VGA 的必要输出：

```verilog
output wire      hs,
output wire      vs,
output wire[3:0] red,
output wire[3:0] green,
output wire[3:0] blue
```

通过规定目标写入地址范围（利用掩码进行划分），我们可以控制 CPU 的 `SW` 指令向正确的目标数据存储器（写入自己 CPU 的数据存储器还是外设的数据存储器）写入对应的数据。同样，我们也可也通过掩码来规定读入目标地址范围，来判断读取按键对应存储器还是外设存储器的数据。具体代码实现如下：

- 读取按键数据存储器地址或外设（VGA）数据存储器地址（[`soc.v`](https://github.com/zan-pu/pipelined-zanpu/blob/soc/pipelined-zanpu.srcs/sources_1/new/soc.v)）：

  ```verilog
  assign io_rdata = (io_addr[31:6] == 26'b1111_1111_1111_1111_0000_0000_00) ? vga_rdata : {27'b0, btn_key_t};
  ```

- 写入 CPU 数据存储器地址或外设（VGA）数据存储器地址（[`zanpu_top.v`](https://github.com/zan-pu/pipelined-zanpu/blob/soc/pipelined-zanpu.srcs/sources_1/new/zanpu_top.v)）

```verilog
wire access_io = (alu_result_out[31:16] == 16'hffff) ? 1'b1 : 1'b0;
wire[31:0] dm_rdata;
wire dm_wen;
assign io_wen = (access_io && en_mem_write_mem);
assign dm_wen = (access_io == 1'b0 && en_mem_write_mem);

assign read_mem_data = (access_io == 1'b1) ? io_rdata : dm_rdata;
```

## 更新 Constraints
