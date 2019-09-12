# 流水线 CPU 的设计

流水线 CPU 的代码已经开源于：[zan-pu/pipelined-zanpu](https://github.com/zan-pu/pipelined-zanpu)

## 五级流水线 CPU 的数据通路

![pipeline new-pipeline.png](https://i.loli.net/2019/09/11/12y9m6sYFhKB74A.png)

其中：

- 流水寄存器包括：
  - IF/ID 寄存器
  - ID/EX 寄存器
  - EX/MEM 寄存器
  - MEM/WB 寄存器
- Forwarding Unit 前递单元位于 EX 执行阶段，根据写信号 `MEM.RegWrite`、`WB.RegWrite` 以及写寄存器地址、rs 寄存器地址和 rt 寄存器地址判断是否需要进行数据前递，进行 Data Hazard 的解决
- Stall Unit 优化暂停单元控制各个流水寄存器的流通，保证 LW、SW 等读写寄存器指令能够完整执行结束再执行后续指令，以保证访存冲突的解决

## 部分控制信号对应的真值表

|       | RegDst | RegWrite | ALUSrc | ALUOp | MemWrite | RegSrc  | ExtOp    | NPCOp | Zero |
|-------|--------|----------|--------|-------|----------|---------|----------|-------|------|
| LUI   | RT     | 1        | ×      | ×     | ×        | IMM     | SFT16    | NEXT  | ×    |
| ADDI  | RT     | 1        | 1      | ADD   | ×        | ALU     | SIGNED   | NEXT  | ×    |
| ADDIU | RT     | 1        | 1      | ADD   | ×        | ALU     | SIGNED   | NEXT  | ×    |
| SLTIU | RT     | 1        | 1      | SLT   | ×        | ALU     | SIGNED   | NEXT  | ×    |
| ANDI  | RT     | 1        | 1      | AND   | ×        | ALU     | UNSIGNED | NEXT  | ×    |
| ORI   | RT     | 1        | 1      | OR    | ×        | ALU     | UNSIGNED | NEXT  | ×    |
| XORI  | RT     | 1        | 1      | XOR   | ×        | ALU     | UNSIGNED | NEXT  | ×    |
| ADD   | RD     | 1        | 0      | ADD   | ×        | ALU     | ×        | NEXT  | ×    |
| ADDU  | RD     | 1        | 0      | ADD   | ×        | ALU     | ×        | NEXT  | ×    |
| SUB   | RD     | 1        | 0      | SUB   | ×        | ALU     | ×        | NEXT  | ×    |
| SUBU  | RD     | 1        | 0      | SUB   | ×        | ALU     | ×        | NEXT  | ×    |
| SLT   | RD     | 1        | 0      | SLT   | ×        | ALU     | ×        | NEXT  | ×    |
| SLTU  | RD     | 1        | 0      | SLT   | ×        | ALU     | ×        | NEXT  | ×    |
| AND   | RD     | 1        | 0      | AND   | ×        | ALU     | ×        | NEXT  | ×    |
| OR    | RD     | 1        | 0      | OR    | ×        | ALU     | ×        | NEXT  | ×    |
| NOR   | RD     | 1        | 0      | NOR   | ×        | ALU     | ×        | NEXT  | ×    |
| XOR   | RD     | 1        | 0      | XOR   | ×        | ALU     | ×        | NEXT  | ×    |
| SLL   | RD     | 1        | 0      | SLL   | ×        | ALU     | ×        | NEXT  | ×    |
| SRL   | RD     | 1        | 0      | SRL   | ×        | ALU     | ×        | NEXT  | ×    |
| SRA   | RD     | 1        | 0      | SRA   | ×        | ALU     | ×        | NEXT  | ×    |
| SLLV  | RD     | 1        | 0      | SLLV  | ×        | ALU     | ×        | NEXT  | ×    |
| SRLV  | RD     | 1        | 0      | SRLV  | ×        | ALU     | ×        | NEXT  | ×    |
| SRAV  | RD     | 1        | 0      | SRAV  | ×        | ALU     | ×        | NEXT  | ×    |
| LW    | RT     | 1        | 1      | ADD   | ×        | MEM     | UNSIGNED | NEXT  | ×    |
| SW    | ×      | 0        | 1      | ADD   | 1        | ×       | UNSIGNED | NEXT  | ×    |
| BEQ   | ×      | ×        | 0      | ×     | ×        | ×       | ×        | NEXT  | 0    |
| BEQ   | ×      | 0        | ×      | ×     | ×        | ×       | OFFSET   | 1     |      |
| BNE   | ×      | ×        | 0      | ×     | ×        | ×       | ×        | NEXT  | 1    |
| BNE   | ×      | 0        | ×      | ×     | ×        | ×       | OFFSET   | 0     |      |
| J     | ×      | ×        | ×      | ×     | ×        | ×       | ×        | JUMP  | ×    |
| JAL   | REG_31 | 1        | ×      | ×     | ×        | JMP_DST | ×        | JUMP  | ×    |
| JR    | ×      | ×        | ×      | ×     | ×        | ×       | ×        | RS    | ×    |
| JALR  | RD     | 1        | ×      | ×     | ×        | JMP_DST | ×        | RS    | ×    |

由于 Forwarding Unit 以及 Stall Unit 涉及到的控制信号较多，因此不在这里列出。

## 控制信号

所有控制信号的定义全部在 [definitions.vh](https://github.com/zan-pu/pipelined-zanpu/blob/master/pipelined-zanpu.srcs/sources_1/new/definitions.vh) 中声明。

```verilog
/* --- Control Signals --- */

// Register Write EN
`define REG_WRITE_EN    1'b1       // Enable register write
`define REG_WRITE_DIS   1'b0       // Disable register write

// ExtOp Control Signals
`define EXT_OP_LENGTH   2          // Length of Signal ExtOp
`define EXT_OP_DEFAULT  2'b00      // ExtOp default value
`define EXT_OP_SFT16    2'b01      // LUI: Shift Left 16
`define EXT_OP_SIGNED   2'b10      // ADDIU: `imm16` signed extended to 32 bit
`define EXT_OP_UNSIGNED 2'b11      // LW, SW: `imm16` unsigned extended to 32 bit

// ALUSrc Control Signals
`define ALU_SRC_REG     1'b0       // ALU source: register file
`define ALU_SRC_IMM     1'b1       // ALU Source: immediate

// ALU Control Signals
`define ALU_OP_LENGTH   4          // Length of signal ALUOp
`define ALU_OP_DEFAULT  4'b0000    // ALUOp default value
`define ALU_OP_ADD      4'b0001    // ALU add
`define ALU_OP_SUB      4'b0010    // ALU sub
`define ALU_OP_SLT      4'b0011    // ALU slt
`define ALU_OP_AND      4'b0100    // ALU and
`define ALU_OP_OR       4'b0101    // ALU or
`define ALU_OP_XOR      4'b0110    // ALU xor
`define ALU_OP_NOR      4'b0111    // ALU nor
`define ALU_OP_SLL      4'b1000    // ALU sll, with respect to sa
`define ALU_OP_SRL      4'b1001    // ALU srl, with respect to sa
`define ALU_OP_SRA      4'b1010    // ALU sra, with respect to sa
`define ALU_OP_SLLV     4'b1011    // ALU sllv, with respect to rs
`define ALU_OP_SRLV     4'b1100    // ALU srlv, with respect to rs
`define ALU_OP_SRAV     4'b1101    // ALU srav, with respect to rs

`define OVERFLOW_TRUE   1'b1
`define OVERFLOW_FALSE  1'b0

// Memory Write EN
`define MEM_WRITE_EN    1'b1       // Enable memory write
`define MEM_WRITE_DIS   1'b0       // Disable memory write

// RegSrc Control Signals
`define REG_SRC_LENGTH  3          // Length of signal RegSrc
`define REG_SRC_DEFAULT 3'b000     // Register default value
`define REG_SRC_ALU     3'b001     // Register write source: ALU
`define REG_SRC_MEM     3'b010     // Register write source: Data Memory
`define REG_SRC_IMM     3'b011     // Register write source: Extended immediate
`define REG_SRC_JMP_DST 3'b100     // Register write source: Jump destination

// RegDst Control Signals
`define REG_DST_LENGTH  2
`define REG_DST_DEFAULT 2'b00      // Register write destination: default
`define REG_DST_RT      2'b01      // Register write destination: rt
`define REG_DST_RD      2'b10      // Register write destination: rd
`define REG_DST_REG_31  2'b11      // Register write destination: 31 bit gpr

// NPCOp Control Signals
`define NPC_OP_LENGTH   3          // Length of NPCOp
`define NPC_OP_DEFAULT  3'b000     // NPCOp default value
`define NPC_OP_NEXT     3'b001     // Next instruction: {PC + 4}
`define NPC_OP_JUMP     3'b010     // Next instruction: {PC[31:28], instr_index, 2'b00}
`define NPC_OP_OFFSET   3'b011     // Next instruction: {PC + 4 + offset}
`define NPC_OP_RS       3'b100     // Next instruction: {rs}

// Branching signals
`define BRANCH_TRUE     1'b1       // Branch to true
`define BRANCH_FALSE    1'b0       // Branch to false
```

## 前递单元 Forwarding Unit 和其他数据冲突的控制信号定义

```verilog
/* --- Hazard Control --- */

// Forward Control Signals
`define FORWARD_ONE_CYCLE 2'b10
`define FORWARD_TWO_CYCLE 2'b01

// Stall IN Signals
`define EXE_REGW          2'b01
`define MEM_REGW          2'b10
`define NON_REGW          2'b00

// Stall Control Signals
`define EXE_STALL         4'b0111
`define MEM_STALL         4'b1111
`define NON_STALL         4'b0000

// LW init
`define EN_LW_DEFAULT     1'b0
```
