# API合规性检查文档

## 概述

本文档记录了项目中所有`getUserProfile`调用的合规性检查，确保符合抖音小程序的API调用规则。所有检查已完成并通过，项目可以安全地提交审核。

## 检查结果

### ✅ 已修复的问题

1. **ES6语法兼容性问题**
   - 修复了`pages/gua-detail/gua-detail.js`中的ES6 import语法
   - 修复了`utils/auth-test.js`中的ES6 import/export语法
   - 统一使用CommonJS语法

2. **API调用规则合规性**
   - 确保`getUserProfile`只在用户点击时调用
   - 封装`getUserProfile`调用到独立方法中
   - 添加了明确的授权提示界面

3. **隐私权限声明**
   - `app.json`中已正确声明`"requiredPrivateInfos": ["getUserProfile"]`

### 📋 文件修改清单

| 文件 | 修改内容 | 状态 |
|------|----------|------|
| `app.json` | 隐私权限声明 | ✅ 已正确 |
| `pages/gua-ci-list/gua-ci-list.js` | 封装getUserProfile调用 | ✅ 已修复 |
| `pages/gua-ci-list/gua-ci-list.ttml` | 添加授权提示界面 | ✅ 已添加 |
| `pages/gua-ci-list/gua-ci-list.ttss` | 授权提示样式 | ✅ 已添加 |
| `pages/gua-detail/gua-detail.js` | 修复ES6语法 | ✅ 已修复 |
| `utils/auth-test.js` | 修复ES6语法，添加警告 | ✅ 已修复 |
| `README-auth-module.md` | 添加API规则说明 | ✅ 已更新 |

## 合规性检查

### 1. 页面加载时的处理
- ✅ `onLoad`和`onShow`中不调用`getUserProfile`
- ✅ 只检查本地存储的用户信息
- ✅ 通过界面提示引导用户授权

### 2. 用户交互触发
- ✅ `getUserProfile`只在用户点击按钮时调用
- ✅ 封装在`requestUserProfile`方法中
- ✅ 提供清晰的授权提示

### 3. 错误处理
- ✅ 友好的错误提示
- ✅ 支持用户重试
- ✅ 不违反API调用规则

### 4. 测试文件
- ✅ 添加了API规则警告
- ✅ 避免自动测试登录流程
- ✅ 修复了语法兼容性问题

## 当前实现状态

### 合规的调用流程

```javascript
// 1. 页面加载时 - 只检查本地存储
onLoad() {
  this.syncUserInfo(); // 不调用getUserProfile
}

// 2. 用户点击时 - 才调用getUserProfile
async onUserBtnTap() {
  if (!authManager.isLoggedIn()) {
    this.requestUserProfile(); // 封装的方法
  }
}

// 3. 封装的方法 - 确保合规
async requestUserProfile() {
  const user = await authManager.getUserProfile('用于展示用户信息');
  // 处理用户信息
}
```

### 界面提示

- 未登录时显示授权提示
- 清晰的按钮和说明文字
- 符合用户体验设计

## 开发规范

### 1. API调用规范
- 所有`getUserProfile`调用必须由用户点击触发
- 在页面加载时只检查本地存储
- 提供清晰的用户引导

### 2. 权限声明规范
- 在`app.json`中正确声明隐私权限
- 使用准确的权限描述
- 遵循最小权限原则

### 3. 错误处理规范
- 提供友好的错误提示
- 支持用户重试机制
- 不违反API调用规则

### 4. 测试规范
- 测试文件中的`getUserProfile`调用需要手动触发
- 避免自动化测试中的API调用
- 添加明确的警告说明

## 合规性检查清单

### 代码层面
- [x] 检查所有`getUserProfile`调用位置
- [x] 验证调用时机是否符合规范
- [x] 确认权限声明正确
- [x] 检查错误处理机制

### 界面层面
- [x] 验证用户交互触发
- [x] 检查授权提示界面
- [x] 确认用户体验友好
- [x] 测试错误提示效果

### 文档层面
- [x] 更新相关文档说明
- [x] 记录所有修改内容
- [x] 提供使用指导
- [x] 维护合规性记录

## 维护建议

### 1. 定期检查
- 每次代码更新后检查API调用
- 定期验证权限声明
- 监控用户反馈

### 2. 文档维护
- 保持API规则说明的更新
- 记录所有相关的修改
- 定期检查合规性

### 3. 团队培训
- 确保所有开发者了解API规则
- 提供合规性开发指导
- 建立代码审查机制

## 总结

项目现在完全符合抖音小程序的API调用规则：

1. **✅ 合规性** - 所有`getUserProfile`调用都由用户点击触发
2. **✅ 用户体验** - 提供清晰的授权提示和引导
3. **✅ 代码质量** - 修复了语法问题，统一了代码风格
4. **✅ 文档完整** - 更新了相关文档和说明

项目可以安全地提交审核，不会因为API调用规则问题被拒绝。 