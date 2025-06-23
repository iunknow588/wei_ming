# 微明易理研习录 - 抖音小程序

## 项目概述

微明易理研习录是一个基于抖音小程序平台开发的易经学习应用，提供64卦的浏览、学习、占卜等功能。项目采用模块化设计，注重用户体验和代码质量。

## 功能特性

### 核心功能
- 📚 **64卦学习** - 完整的易经64卦内容展示
- 🔮 **铜钱占卜** - 传统铜钱占卜功能
- 💬 **讨论交流** - 用户讨论和学习交流
- 👤 **用户管理** - 登录、进度保存、个性化体验
- 📖 **卦象解读** - 详细的卦象解释和含义

### 技术特性
- 🎨 **自适应UI** - 响应式设计，适配不同设备
- 🔐 **权限管理** - 完善的用户权限控制
- 📱 **小程序规范** - 严格遵循抖音小程序开发规范
- ⚡ **性能优化** - 高效的代码实现和资源管理

## 项目结构

```
微明易理研习录/
├── app.js                 # 应用入口文件
├── app.json              # 应用配置文件
├── app.ttss              # 全局样式文件
├── assets/               # 静态资源
│   ├── images/           # 图片资源
│   ├── logo.svg          # 应用logo
│   └── tab_*.png         # 底部导航图标
├── data/                 # 数据文件
│   ├── sixtyFourGua.js   # 64卦数据
│   └── discussion-data.js # 讨论数据
├── pages/                # 页面文件
│   ├── gua-ci-list/      # 64卦列表页
│   ├── gua-detail/       # 卦象详情页
│   ├── coin-divination/  # 铜钱占卜页
│   ├── discussion/       # 讨论页面
│   ├── interpretation/   # 解读页面
│   ├── practice/         # 练习页面
│   └── user-profile/     # 用户资料页
├── utils/                # 工具模块
│   ├── auth.js           # 授权管理模块
│   └── gua-drawer.js     # 卦象绘制工具
└── docs/                 # 项目文档
    ├── development/      # 开发文档
    ├── features/         # 功能文档
    └── optimization/     # 优化文档
```

## 快速开始

### 环境要求
- 抖音开发者工具
- Node.js 14.0+
- 抖音小程序账号

### 安装和运行
1. 克隆项目到本地
2. 使用抖音开发者工具打开项目
3. 配置小程序AppID
4. 编译和预览

### 开发规范
- 遵循抖音小程序开发规范
- 使用ES6+语法特性
- 保持代码注释完整
- 遵循模块化开发原则

## 核心模块

### 授权管理模块 (`utils/auth.js`)
独立的用户授权管理模块，提供完整的登录、退出、权限检查功能。

**主要功能：**
- 用户登录和授权
- 登录状态管理
- 权限检查和控制
- 错误处理和重试机制

**使用示例：**
```javascript
import authManager from '../../utils/auth.js';

// 登录
const user = await authManager.login('用于展示用户信息');

// 检查登录状态
if (authManager.isLoggedIn()) {
  // 执行需要登录的操作
}
```

### 64卦数据模块 (`data/sixtyFourGua.js`)
包含完整的64卦数据，包括卦名、卦象、卦辞、爻辞等。

### 卦象绘制工具 (`utils/gua-drawer.js`)
提供卦象的绘制和渲染功能。

## 页面说明

### 64卦列表页 (`pages/gua-ci-list/`)
- 展示完整的64卦列表
- 支持搜索和筛选
- 显示学习进度
- 用户登录状态管理

### 卦象详情页 (`pages/gua-detail/`)
- 显示卦象详细信息
- 卦辞和爻辞解读
- 学习进度标记
- 相关卦象推荐

### 铜钱占卜页 (`pages/coin-divination/`)
- 传统铜钱占卜功能
- 随机卦象生成
- 占卜结果解读

## 开发文档

### 功能开发文档
- [授权模块开发文档](docs/development/auth-module.md)
- [UI优化文档](docs/optimization/ui-optimization.md)
- [权限控制文档](docs/optimization/permission-optimization.md)

### 技术优化文档
- [API合规性检查](docs/optimization/api-compliance.md)
- [布局优化文档](docs/optimization/layout-optimization.md)
- [性能优化文档](docs/optimization/performance-optimization.md)

### 功能特性文档
- [卦名显示优化](docs/features/gua-name-display.md)
- [用户界面设计](docs/features/user-interface.md)
- [交互体验优化](docs/features/interaction-optimization.md)

## 开发规范

### 代码规范
- 使用ES6+语法
- 遵循抖音小程序开发规范
- 保持代码注释完整
- 使用模块化开发

### API使用规范
- 严格遵循抖音小程序API调用规则
- `getUserProfile`必须在用户点击时调用
- 正确声明隐私权限
- 提供友好的错误处理

### 设计规范
- 遵循抖音小程序设计规范
- 保持界面简洁美观
- 提供良好的用户体验
- 支持响应式设计

## 部署和发布

### 测试
1. 在开发者工具中进行功能测试
2. 检查API调用合规性
3. 验证用户体验
4. 性能测试和优化

### 发布
1. 提交代码审核
2. 等待审核通过
3. 发布到抖音小程序平台
4. 监控运行状态

## 维护和更新

### 版本管理
- 使用语义化版本号
- 记录详细的更新日志
- 保持向后兼容性

### 问题反馈
- 及时响应用户反馈
- 定期检查和修复问题
- 持续优化用户体验

## 贡献指南

欢迎提交Issue和Pull Request来改进项目。

### 提交规范
- 清晰的提交信息
- 完整的代码注释
- 通过所有测试
- 遵循代码规范

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues
- 开发者邮箱

---

**微明易理研习录** - 让易经学习更简单、更高效 