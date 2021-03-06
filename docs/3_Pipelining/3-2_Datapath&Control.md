# 数据通路与信号控制

## 对「单周期 CPU」数据通路的修改

流水线 CPU 的提高吞吐量的主要方法就是「让多条指令同时执行」。因此，我们需要在同一个时钟周期内进行多项操作，比如：

- 同时让 PC 自增、与计算两个寄存器之和
- 在取指令的同时执行另外一条指令的读写操作

因此，对于「流水线 CPU」来说，我们也需要复制硬件元件，来让同一个时钟周期中需要多次使用到的硬件能够同时运转。

### 寄存器堆

<img src="https://i.loli.net/2019/09/04/VdAXaNBw1LpT5Fm.png" width="160px" align="right">

对于寄存器堆来说，我们只需要一个寄存器堆就能支持 ID 和 WB 阶段，因为「写入」和「读取」分别是通过寄存器堆的不同端口进行的；同时，「写入」操作只发生在一个时钟周期的前半段，而「读取」操作只发生在后半段。

### 流水线寄存器

流水线寄存器：Pipeline registers，用来控制整个数据通路中不同流水阶段里信号、数据的传递。五级流水分为 IF、ID、EX、MEM 和 WB 五个阶段，我们分别设置 IF/ID、ID/EX、EX/MEM、MEM/WB 这四个流水线寄存器，用来连接流水的五个阶段。

为了方便描述，我们将数据通路精简为如下图所示：

![](https://i.loli.net/2019/09/04/sZuUGLXpPh67qYM.png)

## 将数据经由流水线寄存器前递

在后面阶段所需要的数据必须经由流水线寄存器进行前递。比如 LW 指令需要将数据存储器中的数据写入目标寄存器中，目标寄存器最终写入的数据是由指令在第四阶段 MEM 才获取到的，而在第五阶段 WB 才写回。因此，rd（目标寄存器）必须经由全部四个流水线寄存器前递，如下图标红部分所示：

![](https://i.loli.net/2019/09/04/fuKn2cYEwiNJvGD.png)

## 将控制信号经由流水线寄存器前递

控制信号也需要进行前递。值得注意的是，控制信号的生成与单周期 CPU 中的生成过程一致：在取指令之后，ID 模块对指令译码并生成相应的控制信号。但是和之前情况一样的是，这些控制信号很多时候一直到指令执行的第五流水阶段才会用到，因此控制信号可以随着其他数据一同在流水线寄存器中进行前递。

我们根据流水线的阶段将控制信号进行分类：

![](https://i.loli.net/2019/09/04/t1v5WXGblO3QwaE.png)

这样我们就也可以将控制信号一同进行前递：

![](https://i.loli.net/2019/09/04/fe5nGVjH6cWOsXu.png)

事实上，到这里，如果我们不考虑各个流水周期之间输入输出的依赖，以及控制信号的传递问题，我们的流水线 CPU 以及基本完成了。但是，由于我们在流水线 CPU 运行的过程中会出现「同时执行多条指令」的过程，因此我们无法避免数据相关、控制信号冲突等问题，这些问题我们统称为 Hazards。接下来，我们就需要利用增加控制硬件的方法来对 Hazard 进行消除。
