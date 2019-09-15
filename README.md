<img src="https://avatars2.githubusercontent.com/u/54571645?s=200&v=4" align="right" width="120px">

# 🚡 Build Your PC

[🎃 实验要求](#-实验要求2019-版) | [📑 文档目录](#-文档目录) | [🎁 参考资料](#-参考资料与推荐阅读)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e307ad01-d0ba-4c39-bbe7-42ed13bbd3da/deploy-status)](https://app.netlify.com/sites/zanpu/deploys)

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

- [安装与环境部署](https://zanpu.spencerwoo.com/1_preparations/1-1_installation.html)
- [利用 Vivado 创建项目](https://zanpu.spencerwoo.com/1_Preparations/1-2_Vivado.html)
- [使用 VS Code 作为 Vivado 的默认代码编辑器](https://zanpu.spencerwoo.com/1_Preparations/1-3_Editor.html)

### 个人项目 - 单周期 CPU

> 单周期 CPU 是个人项目中的必要起步项目，在单周期 CPU 的构建过程中我们才能理解流水线 CPU 的具体工作原理。

- [单周期 CPU 的基础知识](https://zanpu.spencerwoo.com/2_SingleCycle/2-1_Basic.html)
- [单周期 CPU 的设计思路](https://zanpu.spencerwoo.com/2_SingleCycle/2-2_Design.html)
- [单周期 CPU 的具体代码实现](https://zanpu.spencerwoo.com/2_SingleCycle/2-3_Verilog.html)
- [单周期 CPU 的行为仿真](https://zanpu.spencerwoo.com/2_SingleCycle/2-4_Testbench.html)

### 团队项目 - 多周期 CPU / 流水线 CPU

> 我们团队选择实现流水线 CPU，因此接下来的参考文档只介绍流水线 CPU 的设计流程。

- [流水线 CPU 准备实现的指令](https://zanpu.spencerwoo.com/3_Pipelining/3-0_Instructions.html)
- [流水线 CPU 的基础知识](https://zanpu.spencerwoo.com/3_Pipelining/3-1_Basic.html)
- [数据通路与信号控制](https://zanpu.spencerwoo.com/3_Pipelining/3-2_Datapath&Control.html)
- [Hazards 与其避免措施](https://zanpu.spencerwoo.com/3_Pipelining/3-3_Hazards.html)
- [分支预测 Branch Prediction](https://zanpu.spencerwoo.com/3_Pipelining/3-4_BranchPrediction.html)
- [流水线 CPU 的设计](https://zanpu.spencerwoo.com/3_Pipelining/3-5_Design.html)
- [利用 IP 核对 CPU 进行封装](https://zanpu.spencerwoo.com/3_Pipelining/3-6_IP.html)

### 团队项目 - 外部设备 Peripherals

> 本次小学期实验最后需要与精工开发板进行整合，需要通过 VGA 等接口调用来让 CPU 能够实现与外设接口的整合，实现一个完整的计算机系统。

- [外部设备的基础配置](https://zanpu.spencerwoo.com/4_Peripherals/4-0_Basic.html)
- [以 VGA 为例子对外部设备进行信号输出](https://zanpu.spencerwoo.com/4_Peripherals/4-1_VGA.html)

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
