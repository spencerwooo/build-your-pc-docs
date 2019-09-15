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

- 时钟信号：

  ```verilog
  input wire clk
  ```

- 复位信号：

  ```verilog
  input wire rst
  ```

针对我们的开发板，在综合项目之后，我们点开
