# 独立授权登录模块使用说明

## 概述

`utils/auth.js` 是一个独立的授权登录模块，提供了完整的用户授权、登录、退出等功能。该模块采用单例模式，确保整个应用中的授权状态保持一致。

## 主要功能

### 1. 基础授权功能
- `checkAuthStatus()` - 检查用户授权状态
- `getUserProfile(desc)` - 获取用户信息
- `login(desc)` - 执行完整登录流程
- `logout()` - 退出登录

### 2. 用户体验优化
- `handleAuthError(err)` - 处理授权错误
- `showAuthError(err, onRetry)` - 显示友好的错误提示
- `confirmLogout()` - 确认退出登录
- `checkNeedLogin(action)` - 检查是否需要登录

### 3. 状态管理
- `getCurrentUser()` - 获取当前用户信息
- `getAuthStatus()` - 获取授权状态
- `isAuthorizing()` - 是否正在授权中
- `isLoggedIn()` - 是否已登录

## 使用方法

### 1. 在页面中使用

```javascript
// 导入授权管理器
import authManager from '../../utils/auth.js';

Page({
  data: {
    user: null,
    isAuthorizing: false
  },

  onShow() {
    // 同步用户状态
    this.syncUserInfo();
  },

  // 同步用户信息
  syncUserInfo() {
    const user = authManager.getCurrentUser();
    const isAuthorizing = authManager.isAuthorizing();
    
    this.setData({ 
      user, 
      isAuthorizing 
    });
  },

  // 用户点击登录按钮
  async onLoginTap() {
    try {
      const user = await authManager.login('用于展示用户信息');
      this.syncUserInfo();
      tt.showToast({ title: '登录成功', icon: 'success' });
    } catch (err) {
      authManager.showAuthError(err, () => {
        this.onLoginTap(); // 重试
      });
    }
  },

  // 用户点击退出按钮
  async onLogoutTap() {
    const confirmed = await authManager.confirmLogout();
    if (confirmed) {
      await authManager.logout();
      this.syncUserInfo();
      tt.showToast({ title: '已退出登录', icon: 'success' });
    }
  },

  // 需要登录的操作
  async onProtectedAction() {
    if (!authManager.isLoggedIn()) {
      const needLogin = await authManager.checkNeedLogin('此操作');
      if (needLogin) {
        this.onLoginTap();
      }
      return;
    }
    
    // 执行受保护的操作
    this.doProtectedAction();
  }
});
```

### 2. 在全局 App 中使用

```javascript
// app.js
import authManager from './utils/auth.js';

App({
  onLaunch() {
    // 初始化授权管理器
    this.initAuth();
  },

  async initAuth() {
    try {
      const user = await authManager.init();
      if (user) {
        this.globalData.user = user;
      }
    } catch (err) {
      console.error('初始化授权失败', err);
    }
  },

  // 获取授权管理器实例
  getAuthManager() {
    return authManager;
  }
});
```

### 3. 错误处理

```javascript
// 自定义错误处理
try {
  await authManager.login('用于个性化服务');
} catch (err) {
  const errorInfo = authManager.handleAuthError(err);
  
  if (errorInfo.errorType === 'denied') {
    // 用户拒绝授权
    tt.showModal({
      title: '授权提示',
      content: '为了提供更好的服务，建议您允许获取用户信息',
      confirmText: '去设置',
      success: (res) => {
        if (res.confirm) {
          tt.openSetting();
        }
      }
    });
  } else if (errorInfo.errorType === 'network') {
    // 网络错误
    tt.showToast({ title: '网络连接失败，请检查网络后重试', icon: 'none' });
  }
}
```

## 模块特性

### 1. 单例模式
- 整个应用共享同一个授权管理器实例
- 确保授权状态的一致性
- 避免重复的授权检查

### 2. Promise 化
- 所有异步操作都返回 Promise
- 支持 async/await 语法
- 更好的错误处理

### 3. 状态管理
- 自动管理授权状态
- 本地存储同步
- 防止重复授权

### 4. 用户体验
- 友好的错误提示
- 智能重试机制
- 确认对话框

## 注意事项

1. **初始化**：在 `app.js` 的 `onLaunch` 中调用 `authManager.init()`
2. **状态同步**：在页面的 `onShow` 中调用状态同步方法
3. **错误处理**：使用 `showAuthError` 方法处理授权错误
4. **权限检查**：使用 `checkNeedLogin` 检查需要登录的操作
5. **`getUserProfile` 方法**：只能在用户点击按钮时调用，否则会触发错误 `getUserProfile:fail must be invoked by user tap gesture`。
6. **`login` 方法**：同样只能在用户点击按钮时调用，因为它内部调用了 `getUserProfile`。

## 扩展功能

如果需要扩展授权功能，可以继承 `AuthManager` 类：

```javascript
import { AuthManager } from './utils/auth.js';

class CustomAuthManager extends AuthManager {
  constructor() {
    super();
    // 添加自定义功能
  }

  // 自定义方法
  async customAuthMethod() {
    // 实现自定义授权逻辑
  }
}
``` 