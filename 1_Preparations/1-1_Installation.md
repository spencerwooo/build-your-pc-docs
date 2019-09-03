[👉 Next](./1-2_Vivado.md) | [🚩 Home](../README.md)

# 安装与环境部署

- [安装与环境部署](#%e5%ae%89%e8%a3%85%e4%b8%8e%e7%8e%af%e5%a2%83%e9%83%a8%e7%bd%b2)
  - [安装 Vivado](#%e5%ae%89%e8%a3%85-vivado)
  - [附](#%e9%99%84)

> Vivado 设计套件，是 FPGA 厂商赛灵思公司 2012 年发布的集成设计环境。包括高度集成的设计环境和新一代从系统到 IC 级的工具。这也是一个基 于AMBA AXI4 互联规范、IP-XACT IP 封装元数据、工具命令语言（TCL）、Synopsys 系统约束（SDC）以及其它有助于根据客户需求量身定制设计流程并符合业界标准的开放式环境。

## 安装 Vivado

Vivado Design Suite 是 Xilinx 为 HDL 设计的综合和分析而生产的软件套件，我们会利用 Vivado 编写设计我们的 MIPS 指令集等项目。本实验由于开发板限制，建议使用 2017.2 版本。

Vivado 受到出口管制的限制，「官网安装途径」需要首先在官网注册账户进行身份认证，才能下载使用。注册账户之后，我们进入 [Xilinx - Vivado archive](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/vivado-design-tools/archive.html)，点击 2017.2，选择 Vivado HLx 2017.2: WebPACK and Editions - Windows Self Extracting Web Installer 下载。

![](https://i.loli.net/2019/08/27/6GNc5nwXMod7IPA.png)

接下来，我们直接双击运行 `exe` 可执行文件，安装 Vivado。

在下面的步骤中，我们依次：

- 登录 Xilinx 账户
- 同意全部协议
- 选择安装「WebPACK」版本 Vivado

![](https://i.loli.net/2019/08/27/IoqjHT6eFJUW9MR.png)

- 勾选安装以下选项：

![](https://i.loli.net/2019/08/27/NYS378cW2T9Cd4K.png)

接下来就可以顺序安装了，等待全部组件下载安装大概需要 1 小时左右（网速 1~2 MB/s 情况下）。在安装过程会要求选择安装两个驱动以及 WinPCAP，选择确认安装即可。这样 Vivado 的安装就完成了。

## 附

精工开发板（数字逻辑课程使用过）：

![](https://i.loli.net/2019/08/27/VgFOB3XDAS6uoet.jpg)

[👉 Next](./1-2_Vivado.md) | [🚩 Home](../README.md)