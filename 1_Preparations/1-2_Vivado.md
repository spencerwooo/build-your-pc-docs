[👈 Previous](./1-1_Installation.md) · [👉 Next](./1-3_Editor.md) · [🚩 Home](../README.md)

# 利用 Vivado 创建项目

- [利用 Vivado 创建项目](#%e5%88%a9%e7%94%a8-vivado-%e5%88%9b%e5%bb%ba%e9%a1%b9%e7%9b%ae)
  - [创建工程项目](#%e5%88%9b%e5%bb%ba%e5%b7%a5%e7%a8%8b%e9%a1%b9%e7%9b%ae)
  - [新建 Verilog 工程文件](#%e6%96%b0%e5%bb%ba-verilog-%e5%b7%a5%e7%a8%8b%e6%96%87%e4%bb%b6)
  - [综合项目、配置 Constraint](#%e7%bb%bc%e5%90%88%e9%a1%b9%e7%9b%ae%e9%85%8d%e7%bd%ae-constraint)
  - [将程序烧入开发板](#%e5%b0%86%e7%a8%8b%e5%ba%8f%e7%83%a7%e5%85%a5%e5%bc%80%e5%8f%91%e6%9d%bf)

## 创建工程项目

首先确认，我们使用的开发板型号为：

```
xc7a35tcsg324-1
```

接下来，点击打开 Vivado，选择创建项目（Create Project）：

![](https://i.loli.net/2019/08/27/JUIuQGpcLMg4aAi.png)

之后，选择项目名称 Project Name 以及项目创建位置：

![](https://i.loli.net/2019/08/27/vgeTp9wc6lHiGLy.png)

然后选择项目种类为 RTL Project，并将下方「Do not specify sources at this time」勾选。Source 文件我们在创建项目之后再进行创建：

![](https://i.loli.net/2019/08/27/dTZmjKGJcsNDViR.png)

接下来，选择 Parts 标签，并搜索我们实验使用开发板型号 `xc7a35tcsg324-1`，并选择这一开发板：

![](https://i.loli.net/2019/08/27/nEWkuFKgcAIDNx8.png)

最后，检查项目汇总，确认无误之后，选择 Finish：

![](https://i.loli.net/2019/08/27/HdPn3gvibyMJ1QA.png)

这样，项目就创建成功了。

## 新建 Verilog 工程文件

![](https://i.loli.net/2019/08/27/wORYmygshMWFTdj.png)

Verilog 是一门硬件描述语言，我们在接下来的实验中会利用 Verilog 编写组合逻辑电路和时许逻辑电路，最后创造自己的 CPU。在 Vivado 的项目管理中，我们可以看到：

- Design Sources
- Constraints
- Simulation Sources

这三个文件夹。其中，Design Sources 就是我们的「Verilog 硬件设计工程文件」集中地。我们选择上方的加号，然后选择创建「Add or create design sources」：

![](https://i.loli.net/2019/08/27/jl7azF6ECwUHDkM.png)

之后，选择「Create File」，并填写文件名称：

![](https://i.loli.net/2019/08/27/bu6QH1R3ZmiJxFP.png)

然后就可以看到新文件出现在预览列表之中。我们接下来选择 Finish：

![](https://i.loli.net/2019/08/27/2GPuFwxOCqKMUka.png)

然后，在 Define Module 处选择「OK」，即可：

![](https://i.loli.net/2019/08/27/CXoWtlLOdFanBsx.png)

我们接下来就可以看到刚刚创建的 Verilog 文件出现在我们的文件树中了。

## 综合项目、配置 Constraint

我们在刚刚创建的文件中编写一个简单的频闪灯 Verilog 代码：

```verilog
`timescale 1ns / 1ps

// Flicker light

module pc(
           input wire clk,
           input wire rst,
           output wire led_out
       );

reg [31:0] cnt;
reg led_light;

assign led_out = led_light;

always @ (posedge clk) begin
    if (rst == 1'b0) begin
        cnt <= 32'b0;
        led_light <= 1'b0;
    end
    else begin
        if (cnt == 24'hffffff) begin
            cnt <= 32'b0;
            if (led_light == 1'b0) begin
                led_light <= 1'b1;
            end
            else begin
                led_light <= 1'b0;
            end
        end
        else begin
            cnt <= cnt + 1;
        end
    end
end
endmodule
```

接下来，我们点击「Run Synthesis」综合项目源代码：

![](https://i.loli.net/2019/08/28/5VUxmqFgrckT94d.png)

项目综合完成之后，选择「Open Synthesized Design」，配置管脚：

![](https://i.loli.net/2019/08/28/koLNK48FTb9n2dX.png)

之后，我们找到菜单中「Window - I/O Ports」，进行输入输出端口的配置：

![](https://i.loli.net/2019/08/28/h4iC1IS5JFgtvMb.png)

打开「I/O Ports」的配置选项卡之后，我们需要进行如下的调整：

- 上面代码中声明的输入有两个，分别是时钟信号 `clk`、以及复位信号 `rst`，并由一个 LED 灯输出 `led_out`，我们需要分别进行这样的设置：
  - 将三个输入输出端口的标准 `I/O Std` 分别设置为 `LVCMOS33`
  - 根据开发板的配置，将：
    - 时钟信号 `clk` 的 Package Pin 设置为 T5
    - 复位信号 `rst` 的 Package Pin 设置为 P15
    - LED 灯输出信号 `led_out` Package Pin 设置为 K2

![](https://i.loli.net/2019/08/28/mqiy6ForcQVeYzx.png)

然后，我们保存 Constraint 文件，即可开始下一步的操作。

## 将程序烧入开发板

![](https://i.loli.net/2019/08/28/3f6mLZspWq1GUQB.png)

接下来，我们依次选择「Run Implementation」、「Generate Bitstream」，等等全部完成之后，选择「Open Hardware Manager」并将开发板连接至电脑。在「Hardware Manager」中，我们找到开发板的选项，右键选择「Program Device」即可将开发板烧制完成。

[👈 Previous](./1-1_Installation.md) · [👉 Next](./1-3_Editor.md) · [🚩 Home](../README.md)