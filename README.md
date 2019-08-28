<img src="https://avatars2.githubusercontent.com/u/54571645?s=200&v=4" align="right" width="120px">

# 🗃 Build Your PC

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

## 🍽 文档目录

### 准备工作

- [安装与环境部署](./1_Preparations/1-1_Installation.md)
- [利用 Vivado 创建项目](./1_Preparations/1-2_Vivado.md)
- [使用 VS Code 作为 Vivado 的默认代码编辑器](./1_Preparations/1-3_Editor.md)

### 个人项目 - 单周期 CPU

- [单周期 CPU 的基础知识](./2_SingleCycle/2-1_Basic.md)
- [单周期 CPU 的设计思路](./2_SingleCycle/2-2_Design.md)

... [WIP]

### 团队项目 - 多周期 CPU / 流水线 CPU

... [WIP]

## 🎞 参考资料与推荐阅读

- [University of Washington - Course CSE378](https://courses.cs.washington.edu/courses/cse378/09wi/lectures.html)
  - [A single-cycle MIPS processor](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec07.pdf)
  - [Pipelined datapath and control](https://courses.cs.washington.edu/courses/cse378/09wi/lectures/lec10.pdf)

---

**🗃 Build Your PC** ©2019 Spencer Woo. Released under the [CC BY-SA 4.0 International License](./LICENSE).

Authored and maintained by Spencer Woo.

[@Portfolio](https://spencerwoo.com) · [@GitHub](https://github.com/spencerwooo) · [@BIT](http://www.bit.edu.cn/)
