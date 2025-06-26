// 获取全局 app 实例
const app = getApp();
// 导入授权管理器
const authManager = require('../../utils/auth.js');

Page({
  data: {
    user: null,
    isAuthorizing: false,
  },

  onLoad(options) {
    this.syncUserInfo();
  },

  onShow() {
    this.syncUserInfo();
  },

  syncUserInfo() {
    // 优先从app的globalData获取用户信息，如果没有则从authManager获取
    let user = app.globalData.user;
    if (!user) {
      user = authManager.getCurrentUser();
    }
    
    const isAuthorizing = authManager.isAuthorizing();
    
    // 如果从authManager获取到了用户信息，同步到app的globalData
    if (user && !app.globalData.user) {
      app.globalData.user = user;
    }
    
    // 强制设置用户信息，确保页面能正确显示
    this.setData({ 
      user: user, 
      isAuthorizing: isAuthorizing 
    });
    
    // 如果用户信息存在但页面仍然显示登录界面，强制刷新
    if (user && this.data.user !== user) {
      setTimeout(() => {
        this.setData({ user: user, isAuthorizing: isAuthorizing });
      }, 100);
    }
  },

  // 用户点击登录按钮
  async onLoginTap() {
    if (this.data.isAuthorizing) {
      tt.showToast({ title: '正在授权中，请稍候', icon: 'none' });
      return;
    }

    try {
      const user = await authManager.login('用于展示用户信息');
      // 登录成功后，同步到app的globalData
      app.globalData.user = user;
      this.syncUserInfo();
      tt.showToast({ title: '登录成功', icon: 'success' });
    } catch (err) {
      authManager.showAuthError(err, () => {
        this.onLoginTap(); // 用户点击重试
      });
    }
  },

  // 用户点击退出登录按钮
  async onLogoutTap() {
    try {
      const confirmed = await authManager.confirmLogout();
      if (confirmed) {
        await authManager.logout();
        // 退出登录后，清除app的globalData中的用户信息
        app.globalData.user = null;
        this.syncUserInfo();
        tt.showToast({ title: '已退出登录', icon: 'success' });
      }
    } catch (err) {
      console.error('退出登录失败:', err);
      tt.showToast({ title: '退出登录失败', icon: 'none' });
    }
  },
}); 