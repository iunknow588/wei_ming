/**
 * 授权模块测试文件
 * 用于验证授权模块的各项功能是否正常工作
 * 
 * ⚠️ 注意：此文件中的 getUserProfile 测试只能在用户点击时调用
 */

const authManager = require('./auth.js');

// 测试用例
const authTests = {
  // 测试初始化
  async testInit() {
    console.log('=== 测试初始化 ===');
    try {
      const user = await authManager.init();
      console.log('初始化结果:', user);
      return user;
    } catch (err) {
      console.error('初始化失败:', err);
      return null;
    }
  },

  // 测试检查授权状态
  async testCheckAuthStatus() {
    console.log('=== 测试检查授权状态 ===');
    try {
      const status = await authManager.checkAuthStatus();
      console.log('授权状态:', status);
      return status;
    } catch (err) {
      console.error('检查授权状态失败:', err);
      return false;
    }
  },

  // 测试获取用户信息 - ⚠️ 只能在用户点击时调用
  async testGetUserProfile() {
    console.log('=== 测试获取用户信息 ===');
    console.warn('⚠️ 此测试只能在用户点击按钮时调用，否则会违反抖音小程序API规则');
    try {
      const user = await authManager.getUserProfile('测试获取用户信息');
      console.log('用户信息:', user);
      return user;
    } catch (err) {
      console.error('获取用户信息失败:', err);
      return null;
    }
  },

  // 测试登录流程 - ⚠️ 只能在用户点击时调用
  async testLogin() {
    console.log('=== 测试登录流程 ===');
    console.warn('⚠️ 此测试只能在用户点击按钮时调用，否则会违反抖音小程序API规则');
    try {
      const user = await authManager.login('测试登录');
      console.log('登录成功:', user);
      return user;
    } catch (err) {
      console.error('登录失败:', err);
      return null;
    }
  },

  // 测试状态检查
  testStatusChecks() {
    console.log('=== 测试状态检查 ===');
    console.log('当前用户:', authManager.getCurrentUser());
    console.log('授权状态:', authManager.getAuthStatus());
    console.log('是否正在授权:', authManager.isAuthorizing);
    console.log('是否已登录:', authManager.isLoggedIn());
  },

  // 测试错误处理
  testErrorHandling() {
    console.log('=== 测试错误处理 ===');
    
    // 测试不同类型的错误
    const testErrors = [
      { errNo: 10202, errMsg: '用户拒绝授权' },
      { errNo: 10203, errMsg: '授权已过期' },
      { errNo: 10204, errMsg: '网络错误' },
      { errMsg: 'cancel' },
      { message: '正在授权中，请稍候...' }
    ];

    testErrors.forEach((err, index) => {
      console.log(`错误 ${index + 1}:`, authManager.handleAuthError(err));
    });
  },

  // 测试退出登录
  async testLogout() {
    console.log('=== 测试退出登录 ===');
    try {
      await authManager.logout();
      console.log('退出登录成功');
      return true;
    } catch (err) {
      console.error('退出登录失败:', err);
      return false;
    }
  },

  // 运行所有测试
  async runAllTests() {
    console.log('开始运行授权模块测试...');
    
    // 测试初始化
    await this.testInit();
    
    // 测试状态检查
    this.testStatusChecks();
    
    // 测试错误处理
    this.testErrorHandling();
    
    // 测试检查授权状态
    await this.testCheckAuthStatus();
    
    // 注意：不自动测试登录流程，避免违反API规则
    console.log('⚠️ 跳过自动登录测试，请在用户点击时手动测试');
    
    // 再次检查状态
    this.testStatusChecks();
    
    // 测试退出登录
    await this.testLogout();
    
    console.log('授权模块测试完成');
  }
};

// 使用CommonJS导出
module.exports = authTests; 