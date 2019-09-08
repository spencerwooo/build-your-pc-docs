---
home: true
heroImage: /hero.png
actionText: 进入文档
actionLink: /1_Preparations/1-1_Installation.md
features:
- title: 🎫
  details: 基础的 Vivado 使用与编码技巧
- title: 👑
  details: 简单的 MIPS 单周期 CPU 实现
- title: 🧧
  details: 完备的经典五级 RISC 流水 CPU
footer: 2019 ©Spencer Woo. Released under the CC BY-SA 4.0 International License.
---

[🎃 实验要求](#-实验要求2019-版) | [📑 文档目录](#-文档目录) | [🎁 参考资料](#-参考资料与推荐阅读)

# 🚡 Build Your PC

**辛苦三星期，造台计算机！**

> 本项目为 BIT 大四小学期：
>
> - 计算机组成原理课程设计
> - 汇编与接口技术课程设计
>
> 两门课程的基本设计流程与参考资料的非官方整理。

## 🎃 实验要求（2019 版）

- **计算机组成原理课程设计**
  - 每一位同学自行完成一个支持 MIPS 指令子集：Lui、Addiu、Add、Lw、Sw、Beq、j，以及一随机抽取的指令的单周期 CPU，并给出仿真结果
  - 每组同学共同完成一个多周期的或者流水线的 CPU，仿真并在精工板上验证
- **汇编与接口课程设计**
  - 每一位同学为自己设计的 CPU 写一个测试程序（MIPS 汇编程序或者 C 语言 + MIPS 编译器）
  - 根据精工板资源，按组完成计算机外设接口设计，如 VGA 控制器、LCD、UART、蓝牙等，测试并形成 IP 核
  - 应用 ② 中产生的 IP 核到自行设计的计算机系统中，在精工板上实现。

## 📑 文档目录

如果没有意外，那么你的设计流程应该和以下过程一致。

### 准备工作

- [安装与环境部署](./1_Preparations/1-1_Installation.md)
- [利用 Vivado 创建项目](./1_Preparations/1-2_Vivado.md)
- [使用 VS Code 作为 Vivado 的默认代码编辑器](./1_Preparations/1-3_Editor.md)

### 个人项目 - 单周期 CPU

- [单周期 CPU 的基础知识](./2_SingleCycle/2-1_Basic.md)
- [单周期 CPU 的设计思路](./2_SingleCycle/2-2_Design.md)
- [单周期 CPU 的具体代码实现](./2_SingleCycle/2-3_Verilog.md)
- [单周期 CPU 的行为仿真](./2_SingleCycle/2-4_Testbench.md)

### 团队项目 - 多周期 CPU / 流水线 CPU [WIP]

> 我们团队选择实现流水线 CPU，因此接下来的参考文档只介绍流水线 CPU 的设计流程。

- [流水线 CPU 准备实现的指令](./3_Pipelining/3-0_Instructions.md)
- [流水线 CPU 的基础知识](./3_Pipelining/3-1_Basic.md)
- [数据通路与信号控制](./3_Pipelining/3-2_Datapath&Control.md)
- [Hazards 与其避免措施](./3_Pipelining/3-3_Hazards.md)
- [分支预测 Branch Prediction](./3_Pipelining/3-4_BranchPrediction.md)
- [流水线 CPU 的设计](./3_Pipelining/3-5_Design.md)

## 🎁 参考资料与推荐阅读

- [How does a CPU work - Hackernoon](https://hackernoon.com/how-does-a-cpu-work-af3488d182a2)
- [University of Washington - Course CSE378](https://courses.cs.washington.edu/courses/cse378/09wi/lectures.html)
  - [A single-cycle MIPS processor](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec07.pdf)
  - [Intro to Pipelining](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec09.pdf)
  - [Pipelined datapath and control](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec10.pdf)
  - [Pipelining and Data Hazards](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec11.pdf)
  - [Hazards](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec12.pdf)
  - [Branching, Performance](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec13.pdf)
- [针对参加龙芯杯的若干建议 - Silverster98/bit_nscscc_suggestion](https://github.com/Silverster98/bit_nscscc_suggestion)

---

**🚡 Build Your PC** ©2019 Spencer Woo. Released under the [CC BY-SA 4.0 International License](./LICENSE).

Authored and maintained by Spencer Woo.

[@Portfolio](https://spencerwoo.com) | [@GitHub](https://github.com/spencerwooo) | [@BIT](http://www.bit.edu.cn/)
