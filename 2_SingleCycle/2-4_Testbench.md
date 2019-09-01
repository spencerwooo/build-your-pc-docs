# 单周期 CPU 的行为仿真

- [单周期 CPU 的行为仿真](#%e5%8d%95%e5%91%a8%e6%9c%9f-cpu-%e7%9a%84%e8%a1%8c%e4%b8%ba%e4%bb%bf%e7%9c%9f)
  - [添加仿真激励文件](#%e6%b7%bb%e5%8a%a0%e4%bb%bf%e7%9c%9f%e6%bf%80%e5%8a%b1%e6%96%87%e4%bb%b6)
  - [进行仿真测试](#%e8%bf%9b%e8%a1%8c%e4%bb%bf%e7%9c%9f%e6%b5%8b%e8%af%95)

Testbench 是一种验证的手段，可以看做模拟实际环境的输入激励和输出校验的一种“虚拟平台”。在这个平台上可以对设计从软件层面上进行分析和校验，类似于一个激励的产生器。

## 添加仿真激励文件

在 Vivado 文件树窗口上，点击 Add Sources，并选择 Add or create simulation sources.

点击 Create File 并设置文件名为 testbench，接下来一直选择下一步直到创建完成。

在文件树上，我们在 Simulation Sources 下可以找到我们刚刚创建的仿真激励文件 `testbench.v`.

接下来，我们进行仿真激励文件的代码撰写。这里我们仍然使用 Verilog 语言。

## 进行仿真测试

我们选择左侧菜单的 Run Simulation，并选择 Run Behavioral Simulation 进行行为仿真。

之后，单击上方工具栏 Run All 选项进行仿真。

在运行一段时间之后，我们就可以点击 Cancel 停止仿真，或者我们也可以直接点击 Background 然后在波形窗口观察波形。

在调整时间单位后可以观察到如下波形（点击放大镜增大或缩小时间单位，拖动黄色游标可以观察任意时刻信号的值）。

---

[👈 Previous](./2-3_Verilog.md) | [👉 Next](.) | [🚩 Home](../README.md)