# 单周期 CPU 的设计思路

- [单周期 CPU 的设计思路](#%e5%8d%95%e5%91%a8%e6%9c%9f-cpu-%e7%9a%84%e8%ae%be%e8%ae%a1%e6%80%9d%e8%b7%af)
  - [基本的数据通路图](#%e5%9f%ba%e6%9c%ac%e7%9a%84%e6%95%b0%e6%8d%ae%e9%80%9a%e8%b7%af%e5%9b%be)

## 基本的数据通路图

在数据通路图中，主要的数据通路包括：

- 指令存储器（Instruction Memory）
- 数据存储器（Data Memory）
- 寄存器堆（Register File）
- 指令寄存器（Instruction Register）
- 程序计数器（Program Counter）
- 控制单元（Control Unit）

具体数据通路图大致如下：

![](https://i.loli.net/2019/08/29/s24EZKockQdx3tJ.png)

其中，主要的逻辑控制信号 Control Signals（蓝色）有：

- `RegWrite`：写寄存器使能信号
- `MemWrite`：读数据存储器使能信号
- `MemRead`：写数据存储器使能信号
- `ALUOp`：ALU 控制信号（区分算术指令，比如 `ADD`、`SUB` 等）
- `MemToReg`：选择将 ALU 计算结果（0）或数据存储器输出（1）存入寄存器
- `RegDst`：目标寄存器 rt、rd 二选一（由于 `LW` 指令目标寄存器是 rt 而不是 rd）
- `ALUSrc`：ALU 源操作数二选一 - 来自寄存器（0）或**符号扩展**的立即数（1）（区分算术指令结果与 `LW`、`SW` 指令结果）
- `PCSrc`：根据 `BEQ` 结果进行跳转，相等（0）则不跳转继续执行，不等（1）则跳转

由于需要实现 `BEQ` 和 `J`，立即数的位数不一样，因此 15 - 0 位的 `imm16` 代表 `BEQ` 指令的偏移量，25 - 0 位的 `imm26` 代表 `J` 指令的偏移量。

---

[👈 Previous](./2-1_Basic.md) | [👉 Next](./2-2_Design) | [🚩 Home](../README.md)