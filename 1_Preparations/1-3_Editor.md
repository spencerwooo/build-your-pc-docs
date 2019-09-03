[👈 Previous](./1-2_Vivado.md) · [👉 Next](../2_SingleCycle/2-1_Basic.md) · [🚩 Home](../README.md)

# 使用 VS Code 作为 Vivado 的默认代码编辑器

- [使用 VS Code 作为 Vivado 的默认代码编辑器](#%e4%bd%bf%e7%94%a8-vs-code-%e4%bd%9c%e4%b8%ba-vivado-%e7%9a%84%e9%bb%98%e8%ae%a4%e4%bb%a3%e7%a0%81%e7%bc%96%e8%be%91%e5%99%a8)
  - [更换默认代码编辑器](#%e6%9b%b4%e6%8d%a2%e9%bb%98%e8%ae%a4%e4%bb%a3%e7%a0%81%e7%bc%96%e8%be%91%e5%99%a8)
  - [配置 VS Code 的 Verilog 编写环境](#%e9%85%8d%e7%bd%ae-vs-code-%e7%9a%84-verilog-%e7%bc%96%e5%86%99%e7%8e%af%e5%a2%83)
    - [Verilog 语言支持插件](#verilog-%e8%af%ad%e8%a8%80%e6%94%af%e6%8c%81%e6%8f%92%e4%bb%b6)
    - [Verilog 代码自动格式化插件](#verilog-%e4%bb%a3%e7%a0%81%e8%87%aa%e5%8a%a8%e6%a0%bc%e5%bc%8f%e5%8c%96%e6%8f%92%e4%bb%b6)

![](https://i.loli.net/2019/08/27/l7Ntgd6sGWb9XVL.png)

由于 Vivado 默认的代码编辑器实在不好用，因此我们可以使用 VS Code 进行 Verilog 的代码编写，并利用 Vivado 进行项目管理、综合、仿真与调试等。

## 更换默认代码编辑器

在 Vivado 的 Tools 中，点击选择设置「Settings」：

![](https://i.loli.net/2019/08/27/4ySQ7Ih6sOuPLeC.png)

之后，寻找「Text Editor」的配置项目，并将当前代码编辑器「Current Editor」更换为自定义编辑器「Custom Editor」：

![](https://i.loli.net/2019/08/27/P9Mq5SkxVJ82eoG.png)

接下来点击右侧「...」编辑，并填入 VS Code 的启动路径以及启动参数：

```
"C:/Users/<用户名>/AppData/Local/Programs/Microsoft VS Code/Code.exe" [file name] -l[line number]
```

![](https://i.loli.net/2019/08/27/aNZ6Iohyf3RWQFv.png)

需要注意，VS Code 的启动路径就是 `code.exe` 的位置。在 Windows 开始菜单中右键选择打开文件位置，找到 VS Code 快捷方式，然后再右键选择打开文件位置即可找到。

## 配置 VS Code 的 Verilog 编写环境

使用 VS Code 编写 Verilog 需要：

- Verilog 语言支持（比如代码高亮）
- 实时代码检查
- 代码自动格式化

这三个功能。

### Verilog 语言支持插件

我们首先安装插件：[Verilog HDL/SystemVerilog](https://marketplace.visualstudio.com/items?itemName=mshr-h.VerilogHDL)，这样 VS Code 就有了基础的 Verilog 语法支持。

![](https://i.loli.net/2019/08/27/NjvlBmrAIn4R8XU.png)

之后，为了加入 Vivado 的实时代码检查功能，我们需要配置 `xvlog` 的环境变量。我们找到 Vivado 的安装路径，将 `bin` 文件夹的路径（一般是 `C:\Xilinx\Vivado\2017.2\bin`）加入环境变量

![](https://i.loli.net/2019/08/27/DsFZ3LbV4N2lSzP.png)

检查一下。我们打开 PowerShell，输入 `xvlog -version`，如果出现了 Vivado Simulator 的版本信息，表明我们的环境变量配置成功。

![](https://i.loli.net/2019/08/27/nfWDC5SG8y1Mrea.png)

之后，我们在 VS Code 的配置项目中找到 `Verilog > Linting: Linter` 的配置项，将其修改为 `xvlog` 即可：

![](https://i.loli.net/2019/08/27/6UXS9iZ7QmFNVaA.png)

为了能够配置 Verilog 的自动补全等功能，我们需要安装 `ctags`。使用 scoop 包管理，我们在 Windows 上面直接输入：

```powershell
scoop install ctags
```

即可安装 `ctags`。之后，我们输入命令 `ctags --version` 检查 `ctags` 的安装情况即可。

![](https://i.loli.net/2019/08/27/HCFygl8Bqx7uPLz.png)

### Verilog 代码自动格式化插件

![](https://i.loli.net/2019/08/27/QWiVmlJBOKZD6Fo.png)

为了让 VS Code 能够自动格式化 Verilog 代码，我们需要安装：[verilog-formatter](https://marketplace.visualstudio.com/items?itemName=IsaacT.verilog-formatter) 这一插件。

同时，我们需要在 [HayasiKei/istyle-verilog-formatter](https://github.com/HayasiKei/istyle-verilog-formatter/releases/) 处下载最新编译的 iStyle Verilog Formatter 的 Windows 版本。解压得到 `iStyle.exe` 之后，我们选择一个妥当的位置放置可执行文件，并复制文件路径。

之后，我们在 VS Code 中找到 `Verilog-formatter > Istyle: Path`，并将刚刚的 `iStyle.exe` 的文件路径填入即可。之后，我们在 `Verilog-formatter > Istyle: Style` 配置项处选择一个格式化的风格（比如 `K&R`），就可以通过快捷键 `Ctrl + Shift + P` 并输入 Format Document 来格式化 Verilog 代码。

![](https://i.loli.net/2019/08/27/N4WLjS6DUpJwG3d.png)

使用 VS Code 来编写 Verilog 的体验极佳，推荐大家都进行如上的配置。

[👈 Previous](./1-2_Vivado.md) · [👉 Next](../2_SingleCycle/2-1_Basic.md) · [🚩 Home](../README.md)