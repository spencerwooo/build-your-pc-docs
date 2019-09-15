# 以 VGA 为例子对外部设备进行信号输出

VGA 驱动模块的代码开源在：[zan-pu/vga-driver](https://github.com/zan-pu/vga-driver)

## VGA 显示的实现

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
