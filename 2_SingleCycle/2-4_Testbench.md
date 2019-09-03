[👈 Previous](./2-3_Verilog.md) · [👉 Next](../3_Pipelining/3-1_Basic.md) · [🚩 Home](../README.md)

# 单周期 CPU 的行为仿真

- [单周期 CPU 的行为仿真](#%e5%8d%95%e5%91%a8%e6%9c%9f-cpu-%e7%9a%84%e8%a1%8c%e4%b8%ba%e4%bb%bf%e7%9c%9f)
  - [添加仿真激励文件](#%e6%b7%bb%e5%8a%a0%e4%bb%bf%e7%9c%9f%e6%bf%80%e5%8a%b1%e6%96%87%e4%bb%b6)
  - [进行仿真测试](#%e8%bf%9b%e8%a1%8c%e4%bb%bf%e7%9c%9f%e6%b5%8b%e8%af%95)

Testbench 是一种验证的手段，可以看做模拟实际环境的输入激励和输出校验的一种“虚拟平台”。在这个平台上可以对设计从软件层面上进行分析和校验，类似于一个激励的产生器。

## 添加仿真激励文件

在 Vivado 文件树窗口上，点击 Add Sources，并选择 Add or create simulation sources：

![](https://i.loli.net/2019/09/02/gRXoulDAbhJpsfU.png)

点击 Create File 并设置文件名为 testbench，接下来一直选择下一步直到创建完成。

![](https://i.loli.net/2019/09/02/rxG2Kq3lCiR9Zpn.png)

在文件树上，我们在 Simulation Sources 下可以找到我们刚刚创建的仿真激励文件 `testbench.v`：

![](https://i.loli.net/2019/09/02/ThW6dMqiC5sH9Aw.png)

接下来，我们进行仿真激励文件的代码撰写。这里我们仍然使用 Verilog 语言，下面是一个示范。

```verilog
`timescale 1ns / 1ps

/*
 * Testbench
 */

module testbench();
reg clk;
reg rst;
top ZAN_TOP(clk, rst);

initial begin
    // Load instructions
    $readmemh("../../../single-cycle-cpu.tbcode/instructions.txt", ZAN_TOP.ZAN_INSTR_MEM.im);
    // Load register initial values
    $readmemh("../../../single-cycle-cpu.tbcode/register.txt", ZAN_TOP.ZAN_REG_FILE.gpr);
    // Load memory data initial values
    $readmemh("../../../single-cycle-cpu.tbcode/data_memory.txt", ZAN_TOP.ZAN_DATA_MEM.dm);

    rst = 1;
    clk = 0;

    #30 rst = 0; // 30ns 时刻 CPU 开始运行
    #500 $stop;  // 500ns 时刻 CPU 停止
end

always
    #20 clk = ~clk; // 每隔 20ns 时钟信号 clk 翻转一次
endmodule
```

与此同时，我们需要将指令存储器、GPR 寄存器以及数据存储器通过读入文件的方式进行初始化，也就是上方代码中三处 `$readmemh` 的工作。我们可以在另外一个文件夹下定义这三个文件，并在其中撰写指令、数据等。比如：

- 在 `instructions.txt` 中初始化指令存储器：

  ```
  0x24010005
  0x24020005
  ```

  其中，上面操作是初始化为以下两条指令：

  ```mips
  addiu $1, $0, 5
  addiu $2, $0, 5
  ```

- 在 `register.txt` 中初始化 GPR 寄存器：

  ```
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  0x00000000
  ```

- 在 `data_memory.txt` 中初始化数据寄存器：

  ```
  0x00000001
  0x0000000f
  ```

## 进行仿真测试

我们选择左侧菜单的 Run Simulation，并选择 Run Behavioral Simulation 进行行为仿真。

![](https://i.loli.net/2019/09/02/V2sNr8Gk9hqdFjZ.png)

在调整时间单位后可以观察到如下波形（点击放大镜增大或缩小时间单位，拖动黄色游标可以观察任意时刻信号的值）。

![](https://i.loli.net/2019/09/02/PXg2tShNECkIoO4.png)

**同时在左侧，我们可以看到任意时间点的各个模块输入输出信号值，以及 CPU 中的寄存器值、数据存储器值等等，从而进行我们 CPU 的调试工作。**

由于个人项目的单周期 CPU 并不需要进行综合、实现以及烧入开发板，因此我们只需要在仿真之后确认我们的单周期 CPU 已经实现了全部指令与功能之后即可。

具体的测试项目集请参考：[spencerwooo/single-cycle-processor - README.md](https://github.com/spencerwooo/single-cycle-processor)

[👈 Previous](./2-3_Verilog.md) · [👉 Next](../3_Pipelining/3-1_Basic.md) · [🚩 Home](../README.md)
