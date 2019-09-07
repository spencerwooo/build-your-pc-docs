module.exports = {
  title: 'Build Your PC',
  description: '辛苦三星期，造台计算机！',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#00ABE9'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/favicon.ico'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#06BDFF'
    }]
  ],
  themeConfig: {
    nav: [{
      text: '准备工作',
      items: [{
        text: '安装与环境部署',
        link: '/1_Preparations/1-1_Installation'
      },
      {
        text: '利用 Vivado 创建项目',
        link: '/1_Preparations/1-2_Vivado'
      },
      {
        text: '使用 VS Code 作为 Vivado 的默认代码编辑器',
        link: '/1_Preparations/1-3_Editor'
      }]
    },
    {
      text: '单周期 CPU',
      items: [{
        text: '单周期 CPU 的基础知识',
        link: '/2_SingleCycle/2-1_Basic'
      },
      {
        text: '单周期 CPU 的设计思路',
        link: '/2_SingleCycle/2-2_Design'
      },
      {
        text: '单周期 CPU 的具体代码实现',
        link: '/2_SingleCycle/2-3_Verilog'
      },
      {
        text: '单周期 CPU 的行为仿真',
        link: '/2_SingleCycle/2-4_Testbench'
      }]
    },
    {
      text: '流水线 CPU',
      items: [{
        text: '流水线 CPU 准备实现的指令',
        link: '/3_Pipelining/3-0_Instructions'
      },{
        text: '流水线 CPU 的基础知识',
        link: '/3_Pipelining/3-1_Basic'
      },{
        text: '数据通路与信号控制',
        link: '/3_Pipelining/3-2_Datapath&Control'
      },{
        text: 'Hazards 与其避免措施',
        link: '/3_Pipelining/3-3_Hazards'
      },{
        text: '分支预测 Branch Prediction',
        link: '/3_Pipelining/3-4_BranchPrediction'
      },{
        text: '流水线 CPU 的设计',
        link: '/3_Pipelining/3-5_Design'
      }]
    },
    {
      text: 'GitHub',
      link: 'https://github.com/spencerwooo/build-your-pc-docs'
    },
    ],
    sidebar: {
      '/1_Preparations/': [
        '1-1_Installation',
        '1-2_Vivado',
        '1-3_Editor'
      ],
      '/2_SingleCycle/': [
        '2-1_Basic',
        '2-2_Design',
        '2-3_Verilog',
        '2-4_Testbench'
      ],
      '/3_Pipelining/': [
        '3-0_Instructions',
        '3-1_Basic',
        '3-2_Datapath&Control',
        '3-3_Hazards',
        '3-4_BranchPrediction',
        '3-5_Design',
      ],
    },
    lastUpdated: 'Last Updated'
  }
}
