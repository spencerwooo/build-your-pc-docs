# 单周期 CPU 的具体代码实现

- [单周期 CPU 的具体代码实现](#%e5%8d%95%e5%91%a8%e6%9c%9f-cpu-%e7%9a%84%e5%85%b7%e4%bd%93%e4%bb%a3%e7%a0%81%e5%ae%9e%e7%8e%b0)
  - [项目结构](#%e9%a1%b9%e7%9b%ae%e7%bb%93%e6%9e%84)
  - [模块调用](#%e6%a8%a1%e5%9d%97%e8%b0%83%e7%94%a8)
  - [需要注意的要点](#%e9%9c%80%e8%a6%81%e6%b3%a8%e6%84%8f%e7%9a%84%e8%a6%81%e7%82%b9)

![](https://i.loli.net/2019/09/02/8jenxBwHP2vOk3C.png)

代码将在课程结束之后开源，仓库地址（目前不能访问）：[spencerwooo/single-cycle-processor](https://github.com/spencerwooo/single-cycle-processor)

## 项目结构

项目具体结构如下所示：

```
.
├── LICENSE
├── README.md
├── single-cycle-cpu.cache
├── single-cycle-cpu.hw
├── single-cycle-cpu.ip_user_files
├── single-cycle-cpu.runs
├── single-cycle-cpu.sim
├── single-cycle-cpu.srcs
│   ├── constrs_1
│   │   └── new
│   ├── sim_1
│   │   └── new
│   │       └── testbench.v
│   └── sources_1
│       └── new
│           ├── alu.v
│           ├── control_unit.v
│           ├── data_memory.v
│           ├── extend.v
│           ├── instruction_head.v
│           ├── instruction_memory.v
│           ├── mux.v
│           ├── npc.v
│           ├── pc.v
│           ├── register_file.v
│           └── top.v
├── single-cycle-cpu.tbcode
│   ├── data_memory.txt
│   ├── instructions.txt
│   └── register.txt
└── single-cycle-cpu.xpr

29 directories, 80 files
```

## 模块调用

## 需要注意的要点

---

[👈 Previous](./2-2_Design.md) | [👉 Next](./2-4_Testbench) | [🚩 Home](../README.md)