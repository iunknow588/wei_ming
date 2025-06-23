# 授权管理模块开发文档

## 概述

授权管理模块是微明易理研习录的核心功能模块，提供完整的用户授权、登录、退出等功能。该模块采用单例模式设计，确保整个应用共享同一个授权管理器实例。

## 重要说明：抖音小程序API调用规则

### getUserProfile 调用限制

**⚠️ 重要提醒：** 根据抖音小程序的API调用规则，`getUserProfile` 方法必须由用户主动点击按钮触发，不能在以下场景中直接调用：

- ❌ 页面加载时（onLoad、onShow）
- ❌ 定时器回调中
- ❌ 网络请求回调中
- ❌ 其他非用户交互场景

**✅ 正确的调用方式：**
- 用户点击按钮时调用
- 用户手势触发的事件中调用

### 隐私权限声明

在 `app.json` 中必须声明 `getUserProfile` 权限：

```json
{
  "requiredPrivateInfos": ["getUserProfile"]
}
```

### 合规的代码实现

```javascript
// ✅ 正确：在用户点击事件中调用
async onUserBtnTap() {
  try {
    const user = await authManager.getUserProfile('用于展示用户信息');
    // 处理用户信息
  } catch (err) {
    // 错误处理
  }
}

// ❌ 错误：在页面加载时调用
onLoad() {
  // 不要在这里调用 getUserProfile
  // const user = await authManager.getUserProfile(); // 违反规则
}
```

## 模块功能

### 核心功能

#### 1. 用户授权管理
- `checkAuthStatus()` - 检查用户授权状态
- `getUserProfile(desc)` - 获取用户信息
- `login(desc)` - 执行完整登录流程
- `logout()` - 退出登录

#### 2. 用户体验优化
- `handleAuthError(err)` - 处理授权错误
- `showAuthError(err, onRetry)` - 显示友好的错误提示
- `confirmLogout()` - 确认退出登录
- `checkNeedLogin(action)` - 检查是否需要登录

#### 3. 状态管理
- `getCurrentUser()` - 获取当前用户信息
- `getAuthStatus()` - 获取授权状态
- `isAuthorizing()` - 是否正在授权中
- `isLoggedIn()` - 是否已登录

## 技术实现

### 1. 单例模式
```javascript
class AuthManager {
  constructor() {
    if (AuthManager.instance) {
      return AuthManager.instance;
    }
    AuthManager.instance = this;
    this.init();
  }
}
```

### 2. Promise 化
```javascript
async login(desc = '用于展示用户信息') {
  try {
    const user = await this.getUserProfile(desc);
    this.setCurrentUser(user);
    return user;
  } catch (err) {
    this.handleAuthError(err);
    throw err;
  }
}
```

### 3. 状态管理
```javascript
setCurrentUser(user) {
  this.currentUser = user;
  this.authStatus = 'logged_in';
  tt.setStorageSync('user', user);
}
```

## 使用方法

### 基本使用

```javascript
// 导入授权管理器
import authManager from '../../utils/auth.js';

// 登录
const user = await authManager.login('用于展示用户信息');

// 检查登录状态
if (authManager.isLoggedIn()) {
  // 执行需要登录的操作
}

// 退出登录
await authManager.logout();
```

### 错误处理

```javascript
try {
  await authManager.login('用于个性化服务');
} catch (err) {
  authManager.showAuthError(err, () => {
    // 重试逻辑
  });
}
```

### 权限检查

```javascript
const needLogin = await authManager.checkNeedLogin('此操作');
if (needLogin) {
  // 引导用户登录
}
```

## 文件结构

```
utils/
├── auth.js              # 独立授权模块
├── auth-usage.md        # 使用说明文档
└── auth-test.js         # 测试文件

pages/gua-ci-list/
├── gua-ci-list.js       # 已重构，使用授权模块
├── gua-ci-list.ttml     # 已优化，添加加载状态
└── gua-ci-list.ttss     # 已优化，添加禁用样式

app.js                   # 已重构，集成授权模块
```

## 优化效果

### 1. 代码质量提升
- 移除重复代码约 150 行
- 统一授权逻辑管理
- 提高代码可维护性

### 2. 用户体验改善
- 友好的错误提示
- 智能重试机制
- 防止重复授权
- 加载状态显示

### 3. 开发效率提升
- 模块化设计，易于复用
- 清晰的 API 接口
- 完善的文档说明
- 测试用例覆盖

## 兼容性

- ✅ 保持与现有代码的兼容性
- ✅ 支持渐进式迁移
- ✅ 向后兼容旧接口

## 后续扩展

该模块设计为可扩展的，未来可以轻松添加：
- 多种授权方式
- 用户权限管理
- 登录状态持久化
- 第三方登录集成

## 总结

独立授权登录模块已成功创建并集成到现有系统中，实现了：

1. **模块化设计** - 独立的授权管理模块
2. **用户体验优化** - 友好的提示和重试机制
3. **代码质量提升** - 移除重复代码，统一管理
4. **易于维护** - 清晰的 API 和完善的文档

该模块现在可以在整个应用中复用，为后续功能开发提供了稳定的授权基础。 