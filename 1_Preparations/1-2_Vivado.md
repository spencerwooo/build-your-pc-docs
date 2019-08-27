# 利用 Vivado 创建项目

## 创建工程项目

首先确认，我们使用的开发板型号为：

```
xc7a35tcsg324-1
```

接下来，点击打开 Vivado，选择创建项目（Create Project）：

![](https://i.loli.net/2019/08/27/JUIuQGpcLMg4aAi.png)

之后，选择项目名称 Project Name 以及项目创建位置：

![](https://i.loli.net/2019/08/27/vgeTp9wc6lHiGLy.png)

然后选择项目种类为 RTL Project，并将下方「Do not specify sources at this time」勾选。Source 文件我们在创建项目之后再进行创建：

![](https://i.loli.net/2019/08/27/dTZmjKGJcsNDViR.png)

接下来，选择 Parts 标签，并搜索我们实验使用开发板型号 `xc7a35tcsg324-1`，并选择这一开发板：

![](https://i.loli.net/2019/08/27/nEWkuFKgcAIDNx8.png)

最后，检查项目汇总，确认无误之后，选择 Finish：

![](https://i.loli.net/2019/08/27/HdPn3gvibyMJ1QA.png)

这样，项目就创建成功了。

## 新建 Verilog 工程文件

![](https://i.loli.net/2019/08/27/wORYmygshMWFTdj.png)

Verilog 是一门硬件描述语言，我们在接下来的实验中会利用 Verilog 编写组合逻辑电路和时许逻辑电路，最后创造自己的 CPU。在 Vivado 的项目管理中，我们可以看到：

- Design Sources
- Constraints
- Simulation Sources

这三个文件夹。其中，Design Sources 就是我们的「Verilog 硬件设计工程文件」集中地。我们选择上方的加号，然后选择创建「Add or create design sources」：

![](https://i.loli.net/2019/08/27/jl7azF6ECwUHDkM.png)

之后，选择「Create File」，并填写文件名称：

![](https://i.loli.net/2019/08/27/bu6QH1R3ZmiJxFP.png)

然后就可以看到新文件出现在预览列表之中。我们接下来选择 Finish：

![](https://i.loli.net/2019/08/27/2GPuFwxOCqKMUka.png)

然后，在 Define Module 处选择「OK」，即可：

![](https://i.loli.net/2019/08/27/CXoWtlLOdFanBsx.png)

我们接下来就可以看到刚刚创建的 Verilog 文件出现在我们的文件树中了。

## 配置 Constraint