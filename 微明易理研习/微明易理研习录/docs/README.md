# 微明易理研习录 - 文档索引

## 文档结构

```
docs/
├── README.md                    # 本文档索引
├── development/                 # 开发文档
│   └── auth-module.md          # 授权管理模块开发文档
├── features/                    # 功能特性文档
│   └── gua-name-display.md     # 卦名显示优化文档
└── optimization/               # 优化文档
    ├── api-compliance.md       # API合规性检查文档
    ├── ui-optimization.md      # UI优化文档
    ├── permission-optimization.md # 权限控制优化文档
    └── layout-optimization.md  # 布局优化文档
```

## 文档分类

### 开发文档 (`development/`)

#### [授权管理模块开发文档](development/auth-module.md)
- **概述**：独立的用户授权管理模块，提供完整的登录、退出、权限检查功能
- **主要内容**：
  - 抖音小程序API调用规则
  - 模块功能和技术实现
  - 使用方法和示例代码
  - 优化效果和维护指南

### 功能特性文档 (`features/`)

#### [卦名显示优化文档](features/gua-name-display.md)
- **概述**：卦名显示的多轮优化历程，从复杂颜色分析到简化样式设计
- **主要内容**：
  - 优化历程和技术实现
  - 当前方案和样式对比
  - 性能优化和代码质量
  - 历史优化记录和维护指南

### 优化文档 (`optimization/`)

#### [API合规性检查文档](optimization/api-compliance.md)
- **概述**：项目中所有`getUserProfile`调用的合规性检查
- **主要内容**：
  - 检查结果和修复问题
  - 合规性检查清单
  - 开发规范和维护建议
  - 当前实现状态

#### [UI优化文档](optimization/ui-optimization.md)
- **概述**：登录按钮状态优化和用户信息弹窗功能
- **主要内容**：
  - 主要改进和样式设计
  - 用户体验改进
  - 技术实现和兼容性
  - 优化效果和维护指南

#### [权限控制优化文档](optimization/permission-optimization.md)
- **概述**：权限控制逻辑优化，实现渐进式权限设计
- **主要内容**：
  - 权限控制策略
  - 具体实现和用户体验
  - 权限控制流程
  - 界面设计和数据分析

#### [布局优化文档](optimization/layout-optimization.md)
- **概述**：登录按钮区域布局优化，提升界面紧凑性
- **主要内容**：
  - 布局改进和样式设计
  - 用户体验改进
  - 技术实现和优化效果
  - 设计原则和维护指南

## 快速导航

### 按功能分类

#### 用户认证相关
- [授权管理模块开发文档](development/auth-module.md)
- [API合规性检查文档](optimization/api-compliance.md)
- [权限控制优化文档](optimization/permission-optimization.md)

#### 界面设计相关
- [UI优化文档](optimization/ui-optimization.md)
- [布局优化文档](optimization/layout-optimization.md)
- [卦名显示优化文档](features/gua-name-display.md)

### 按开发阶段分类

#### 开发阶段
- [授权管理模块开发文档](development/auth-module.md)

#### 优化阶段
- [API合规性检查文档](optimization/api-compliance.md)
- [UI优化文档](optimization/ui-optimization.md)
- [权限控制优化文档](optimization/permission-optimization.md)
- [布局优化文档](optimization/layout-optimization.md)
- [卦名显示优化文档](features/gua-name-display.md)

## 文档维护

### 更新原则
- 保持文档的时效性和准确性
- 及时记录重要的技术决策和优化过程
- 提供清晰的代码示例和使用说明
- 维护文档的完整性和系统性

### 贡献指南
- 新增功能时同步更新相关文档
- 修改代码时检查文档是否需要更新
- 提供清晰的文档结构和导航
- 保持文档风格的一致性

## 相关链接

- [项目主README](../README.md) - 项目整体概述和快速开始
- [抖音小程序开发文档](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/tutorial/codelabs)
- [抖音小程序设计规范](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/design/design-specification/Design-Principles/Design-Principles)

---

**微明易理研习录文档中心** - 为开发者提供完整的技术文档和优化指南 