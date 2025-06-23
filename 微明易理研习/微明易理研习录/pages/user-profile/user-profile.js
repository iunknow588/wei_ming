// 获取全局 app 实例
const app = getApp();
// 导入授权管理器
const authManager = require('../../utils/auth.js');

Page({
  data: {
    user: null,
    isAuthorizing: false,
  },

  onShow() {
    this.syncUserInfo();
  },

  syncUserInfo() {
    const user = authManager.getCurrentUser();
    const isAuthorizing = authManager.isAuthorizing();
    console.log('用户信息页面 - 用户:', user, '授权中:', isAuthorizing);
    this.setData({ user, isAuthorizing });
  },

  // 用户点击登录按钮
  async onLoginTap() {
    if (this.data.isAuthorizing) {
      tt.showToast({ title: '正在授权中，请稍候', icon: 'none' });
      return;
    }

    try {
      const user = await authManager.login('用于展示用户信息');
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
        this.syncUserInfo();
        tt.showToast({ title: '已退出登录', icon: 'success' });
      }
    } catch (err) {
      console.error('退出登录失败:', err);
      tt.showToast({ title: '退出登录失败', icon: 'none' });
    }
  },
}); 