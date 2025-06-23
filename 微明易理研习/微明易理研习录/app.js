// 导入64卦数据
const { sixtyFourGuaData } = require('./data/sixtyFourGua.js');
// 导入授权管理器
const authManager = require('./utils/auth.js');

App({
  globalData: {
    sixtyFourGua: [], // 初始化 sixtyFourGua 数组
    user: null, // 全局用户信息
  },
  
  onLaunch() {
    // 清除旧的 gua-ci-list 缓存
    tt.removeStorage({ key: "gua-ci-list" });
    
    // 初始化64卦数据
    this.initSixtyFourGua();
    
    // 初始化授权管理器
    this.initAuth();
  },
  
  onShow() {
    // 处理APP logo点击事件 - 但不自动跳转
    console.log('APP显示');
  },
  
  // 处理APP logo点击事件
  handleAppLogoClick() {
    console.log('APP logo被点击了');
    // 跳转到用户信息页面
    tt.navigateTo({
      url: '/pages/user-profile/user-profile',
    });
  },
  
  // 初始化64卦数据
  initSixtyFourGua() {
    console.log('app.js: 开始初始化64卦数据');
    // 尝试从缓存读取数据
    tt.getStorage({
      key: 'sixtyFourGua',
      success: (res) => {
        console.log('app.js: 从缓存获取数据成功，数量:', res.data.length);
        this.globalData.sixtyFourGua = res.data;
      },
      fail: (err) => {
        console.log('app.js: 缓存获取失败，使用默认数据:', err);
        // 如果缓存中没有数据，使用默认数据
        this.globalData.sixtyFourGua = sixtyFourGuaData;
        console.log('app.js: 设置默认数据，数量:', sixtyFourGuaData.length);
        // 保存到缓存
        tt.setStorage({
          key: 'sixtyFourGua',
          data: this.globalData.sixtyFourGua,
          success: () => {
            console.log('app.js: 数据保存到缓存成功');
          },
          fail: (saveErr) => {
            console.error('app.js: 保存数据到缓存失败:', saveErr);
          }
        });
      }
    });
  },

  // 初始化授权管理器
  async initAuth() {
    try {
      console.log('app.js: 开始初始化授权管理器');
      const user = await authManager.init();
      console.log('app.js: 授权管理器初始化完成，用户信息:', user);
      if (user) {
        this.globalData.user = user;
      }
    } catch (err) {
      console.error('app.js: 初始化授权失败', err);
    }
  },
  
  // 获取用户信息（兼容旧接口）- 注意：此方法只能在用户点击按钮时调用
  getUserInfo() {
    console.warn('getUserInfo方法只能在用户点击按钮时调用，否则会违反抖音小程序API规则');
    return authManager.getUserProfile('获取用户信息用于登录');
  },

  // 清除用户信息（兼容旧接口）
  clearUserInfo() {
    this.globalData.user = null;
    return authManager.logout();
  },

  // 获取授权管理器实例
  getAuthManager() {
    return authManager;
  }
});
