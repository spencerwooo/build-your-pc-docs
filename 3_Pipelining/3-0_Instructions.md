[👈 Previous](../2_SingleCycle/2-4_Testbench.md) · [👉 Next](./3-1_Basic.md) · [🚩 Home](../README.md)

# 流水线 CPU 准备实现的指令

- [流水线 CPU 准备实现的指令](#%e6%b5%81%e6%b0%b4%e7%ba%bf-cpu-%e5%87%86%e5%a4%87%e5%ae%9e%e7%8e%b0%e7%9a%84%e6%8c%87%e4%bb%a4)
  - [ADDI](#addi)
  - [ADDIU](#addiu)
  - [SLTIU](#sltiu)
  - [ANDI](#andi)
  - [ORI](#ori)
  - [XORI](#xori)
  - [LUI](#lui)
  - [ADD](#add)
  - [ADDU](#addu)
  - [SUB](#sub)
  - [SUBU](#subu)
  - [SLT](#slt)
  - [SLTU](#sltu)
  - [AND](#and)
  - [OR](#or)
  - [NOR](#nor)
  - [XOR](#xor)
  - [SLL](#sll)
  - [SRL](#srl)
  - [SRA](#sra)
  - [SLLV](#sllv)
  - [SRLV](#srlv)
  - [SRAV](#srav)
  - [LW](#lw)
  - [SW](#sw)
  - [BEQ](#beq)
  - [BNE](#bne)
  - [J](#j)
  - [JAL](#jal)
  - [JR](#jr)
  - [JALR](#jalr)

共 30 条 MIPS 指令，包含了大多数基本指令操作。

## ADDI

![](https://i.loli.net/2019/09/04/HgdI9fBOnvFTyz4.png)

将寄存器 rs 的值与有符号扩展至 32 位的立即数 imm 相加，结果写入 rt 寄存器中。如果产生溢出，则触发整型溢出例外（IntegerOverflow）。 

## ADDIU

![](https://i.loli.net/2019/09/04/OV8MyPBQlWGIbFR.png)

将寄存器 rs 的值与寄存器 rt 的值相加，结果写入 rd 寄存器中。 

## SLTIU

![](https://i.loli.net/2019/09/04/b3qOumSxyY1Ha46.png)

将寄存器 rs 的值与 **有符号扩展至 32 位的立即数 imm** 进行无符号数比较，如果寄存器 rs 中 的值小，则寄存器 rt 置 1；否则寄存器 rt 置 0。

## ANDI

![](https://i.loli.net/2019/09/04/UKXJ75IOv6qGt34.png)

寄存器 rs 中的值与 0 扩展至 32 位的立即数 imm 按位逻辑与，结果写入寄存器 rt 中。 

## ORI

![](https://i.loli.net/2019/09/04/sWTFh2ryUpXweGc.png)

寄存器 rs 中的值与 0 扩展至 32 位的立即数 imm 按位逻辑或，结果写入寄存器 rt 中。

## XORI

![](https://i.loli.net/2019/09/04/ZfXHP6SowubDIVE.png)

寄存器 rs 中的值与 0 扩展至 32 位的立即数 imm 按位逻辑异或，结果写入寄存器 rt 中。

## LUI

![](https://i.loli.net/2019/09/04/RaVt2qgHKzBm6Fb.png)

将 16 位立即数 imm 写入寄存器 rt 的高 16 位，寄存器 rt 的低 16 位置 0。

## ADD

![](https://i.loli.net/2019/09/04/JPe8jB6p1MHRh4u.png)

将寄存器 rs 的值与寄存器 rt 的值相加，结果写入寄存器 rd 中。如果产生溢出，则触发整型溢出例外（IntegerOverflow）。 

## ADDU

![](https://i.loli.net/2019/09/04/MnNjyIgvkwOTpH9.png)

将寄存器 rs 的值与寄存器 rt 的值相加，结果写入 rd 寄存器中。 

## SUB

![](https://i.loli.net/2019/09/04/53kCDcLPSIxtqls.png)

将寄存器 rs 的值与寄存器 rt 的值相减，结果写入 rd 寄存器中。如果产生溢出，则触发整型溢出例外（IntegerOverflow）。 

## SUBU

![](https://i.loli.net/2019/09/04/F9lgLsoJayH8SwO.png)

将寄存器 rs 的值与寄存器 rt 的值相减，结果写入 rd 寄存器中。 

## SLT

![](https://i.loli.net/2019/09/04/ZnJTe2yg9aUdAEY.png)

将寄存器 rs 的值与寄存器 rt 中的值进行有符号数比较，如果寄存器 rs 中的值小，则寄存器 rd 置 1；否则寄存器 rd 置 0。

## SLTU

![](https://i.loli.net/2019/09/04/ePGZXS8WHwaVyJm.png)

将寄存器 rs 的值与寄存器 rt 中的值进行无符号数比较，如果寄存器 rs 中的值小，则寄存器 rd 置 1；否则寄存器 rd 置 0。 

## AND

![](https://i.loli.net/2019/09/04/FYEpNqKzU7VXyQo.png)

寄存器 rs 中的值与寄存器 rt 中的值按位逻辑与，结果写入寄存器 rd 中。

## OR

![](https://i.loli.net/2019/09/04/jwUKpFHhvYuSaQl.png)

寄存器 rs 中的值与寄存器 rt 中的值按位逻辑或，结果写入寄存器 rd 中。 

## NOR

![](https://i.loli.net/2019/09/04/1MgQvpBA7r6yeOY.png)

寄存器 rs 中的值与寄存器 rt 中的值按位逻辑或非，结果写入寄存器 rd 中。

## XOR

![](https://i.loli.net/2019/09/04/IrKfFVwjWgAQMsZ.png)

寄存器 rs 中的值与寄存器 rt 中的值按位逻辑异或，结果写入寄存器 rd 中。

## SLL

![](https://i.loli.net/2019/09/04/qoTa3hD8LYtE6s5.png)

由立即数 sa 指定移位量，对寄存器 rt 的值进行逻辑左移，结果写入寄存器 rd 中。 

## SRL

![](https://i.loli.net/2019/09/04/92GyI3TSvinDUZt.png)

由立即数 sa 指定移位量，对寄存器 rt 的值进行逻辑右移，结果写入寄存器 rd 中。 

## SRA

![](https://i.loli.net/2019/09/04/ru36Rwl2vJEHygC.png)

由立即数 sa 指定移位量，对寄存器 rt 的值进行算术右移，结果写入寄存器 rd 中。

## SLLV

![](https://i.loli.net/2019/09/04/MKtd2BqLa3uNRWx.png)

由寄存器 rs 中的值指定移位量，对寄存器 rt 的值进行逻辑左移，结果写入寄存器 rd 中。 

## SRLV

![](https://i.loli.net/2019/09/04/ZBz3twhUVR5PxHY.png)

由寄存器 rs 中的值指定移位量，对寄存器 rt 的值进行逻辑右移，结果写入寄存器 rd 中。 

## SRAV

![](https://i.loli.net/2019/09/04/y1aU6Ts8hcNkLnZ.png)

由寄存器 rs 中的值指定移位量，对寄存器 rt 的值进行算术右移，结果写入寄存器 rd 中。 

## LW

![](https://i.loli.net/2019/09/04/8G5KrfQwcIXHmq3.png)

将 base 寄存器的值加上符号扩展后的立即数 offset 得到访存的虚地址，如果地址不是 4 的 整数倍则触发地址错例外，否则据此虚地址从存储器中读取连续 4 个字节的值并进行符号 扩展，写入到 rt 寄存器中。 

## SW

![](https://i.loli.net/2019/09/04/s2blrRkZdaN3iuI.png)

将 base 寄存器的值加上符号扩展后的立即数 offset 得到访存的虚地址，如果地址不是 4 的 整数倍则触发地址错例外，否则据此虚地址将 rt 寄存器存入存储器中。

## BEQ

![](https://i.loli.net/2019/09/04/YVQo8PJmhp3TXEb.png)

如果寄存器 rs 的值等于寄存器 rt 的值则转移，否则顺序执行。转移目标由立即数 offset 左 移 2 位并进行有符号扩展的值加上该分支指令对应的延迟槽指令的 PC 计算得到。

## BNE

![](https://i.loli.net/2019/09/04/X7kWZiUdYoIK169.png)

如果寄存器 rs 的值不等于寄存器 rt 的值则转移，否则顺序执行。转移目标由立即数 offset 左移 2 位并进行有符号扩展的值加上该分支指令对应的延迟槽指令的 PC 计算得到。

## J

![](https://i.loli.net/2019/09/04/1EsaZnvdS9rL4bH.png)

无条件跳转。跳转目标由该分支指令对应的延迟槽指令的 PC 的最高 4 位与立即数 instr_index 左移 2 位后的值拼接得到。 

## JAL

![](https://i.loli.net/2019/09/04/zsogk4BLyxwFKPb.png)

无条件跳转。跳转目标由该分支指令对应的延迟槽指令的 PC 的最高 4 位与立即数 instr_index 左移 2 位后的值拼接得到。同时将该分支对应延迟槽指令之后的指令的 PC 值保存至第 31 号通用寄存器中。

## JR

![](https://i.loli.net/2019/09/04/5pOtUcfQ9nmjFC7.png)

无条件跳转。跳转目标为寄存器 rs 中的值。

## JALR

![](https://i.loli.net/2019/09/04/MkzjLU4Y3GmN6Ob.png)

无条件跳转。跳转目标为寄存器 rs 中的值。同时将该分支对应延迟槽指令之后的指令的 PC 值保存至寄存器 rd 中。 

[👈 Previous](../2_SingleCycle/2-4_Testbench.md) · [👉 Next](./3-1_Basic.md) · [🚩 Home](../README.md)