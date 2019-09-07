# 单周期 CPU 的具体代码实现

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

可以看到，在 `single-cycle-cpu.srcs` 文件夹下就是全部的源代码，其中 `sources_1` 中是 CPU 的实现代码、`sim_1` 中是 Testbench 仿真激励文件。

在 `single-cycle-cpu.tbcode` 中，是我们的指令、GPR 通用寄存器以及 Data Memory 数据存储器初始化文件。具体功能见：[单周期 CPU 的行为仿真 - 添加仿真激励文件](./2-4_Testbench.md#添加仿真激励文件).

其余文件就是项目的编译中间文件，或说明文档等。

## 模块调用

在撰写完成我们的全体模块之后，需要通过一个顶层模块来将我们的全部模块进行连接起来，即模块的整体调用。我们在项目中定义一个顶层模块 `top.v`，并设置输入信号：

```verilog
module top(
           input wire clk,
           input wire rst
       );
// ...
endmodule
```

同时，我们再声明顶端模块的 **两个内部端口**：

```verilog
// Instruction fetch module i/o
wire[31:0] pc;
wire[31:0] npc;
```

之后，比如我们需要调用 PC 模块，那么就可直接：

```verilog
// Instruction fetch modules: PC, NPC and Instruction_Memory
pc ZAN_PC(.clk(clk),
          .rst(rst),
          .npc(npc),
          .pc(pc));
```

其中前面的 `pc` 跟定义 PC 模块的 `pc.v` 保持一致，后面的 `ZAN_PC` 为我们当前文件调用模块名。在内部声明模块 I/O 端口时，我们通过 `.调用模块端口(顶端模块端口)` 的语法格式进行调用。

顶端模块的功能就是将其余模块利用 `wire` 导线进行连接，因此在顶端模块内部，我们会定义用于连接各个模块输入输出的内部端口。这样我们就能让全部模块连接起来，成为完整的 CPU 电路。

## 需要注意的要点

### 指令存储器的 I/O 声明

取指令时我们需要在指令存储器中将输入 PC 变量初始化为 `wire[11:2]`：

```verilog
/* Module: Instruction Memory
 */

module instruction_memory(
           // PC address (address for instruction)
           input wire[11:2]  pc_addr,

           output wire[31:0] instruction
       );

//...
endmodule
```

同时，在顶端模块中调用指令存储器时也需要这样声明：

```verilog
instruction_memory ZAN_INSTR_MEM(.pc_addr(pc[11:2]),
                                 .instruction(instruction));
```

### 数据存储器的 I/O 声明

与指令存储器同理，对于数据存储器，在声明模块时：

```verilog
/* Module: Data Memory
 */

module data_memory(
           input wire        clk,
           input wire[11:2]  mem_addr,       // Data memory target address

           // ...
       );
// ...
endmodule
```
同时，顶端模块中调用数据存储器时：

```verilog
// Module: Data Memory
data_memory ZAN_DATA_MEM(.clk(clk),
                         .mem_write(mem_write),
                         .mem_addr(alu_result[11:2]),
                         .write_mem_data(reg2_data),
                         .read_mem_data(read_mem_data));
```
