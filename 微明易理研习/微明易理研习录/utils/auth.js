/**
 * 独立授权登录模块
 * 提供用户授权、登录、退出等功能的统一管理
 */

class AuthManager {
  constructor() {
    this.user = null;
    this.authStatus = null;
    this._isAuthorizing = false; // 使用下划线前缀避免与方法名冲突
    this.storageKey = 'user';
  }

  /**
   * 初始化授权管理器
   * @returns {Promise<void>}
   */
  async init() {
    try {
      // 从本地存储恢复用户信息
      const user = await this.getStoredUser();
      if (user) {
        this.user = user;
        this.authStatus = true;
      }
      return user;
    } catch (err) {
      return null;
    }
  }

  /**
   * 检查用户授权状态
   * @returns {Promise<boolean>}
   */
  checkAuthStatus() {
    return new Promise((resolve, reject) => {
      tt.getSetting({
        success: (res) => {
          const authStatus = res.authSetting['scope.userInfo'];
          this.authStatus = authStatus;
          resolve(authStatus);
        },
        fail: (err) => {
          console.error('检查授权状态失败', err);
          reject(err);
        }
      });
    });
  }

  /**
   * 获取用户信息 - 只能在用户点击时调用
   * @param {string} desc - 授权描述
   * @returns {Promise<Object>}
   */
  async getUserProfile(desc = '用于展示用户信息，提供个性化体验') {
    this._isAuthorizing = true;
    
    try {
      const res = await new Promise((resolve, reject) => {
        tt.getUserProfile({
          desc: desc,
          success: resolve,
          fail: reject
        });
      });

      const user = res.userInfo;
      this.user = user;
      this.authStatus = true;
      await this.saveUser(user);
      return user;
    } catch (err) {
      if (err && err.errMsg && err.errMsg.includes('must be invoked by user tap gesture')) {
        tt.showToast({ title: '请通过点击按钮进行授权', icon: 'none' });
      } else if (err && err.errMsg && err.errMsg.includes('api scope is not declared')) {
        // 新增：引导用户去设置
        tt.showModal({
          title: '权限未声明',
          content: '需要您同意用户信息权限才能继续使用',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              tt.openSetting();
            }
          }
        });
      }
      throw err;
    } finally {
      this._isAuthorizing = false;
    }
  }

  /**
   * 处理授权错误
   * @param {Error} err - 错误对象
   * @returns {Object} 错误处理结果
   */
  handleAuthError(err) {
    let message = '授权失败，请重试';
    let showRetry = true;
    let errorType = 'unknown';

    if (err.errNo === 10202) {
      message = '您拒绝了授权，无法获取用户信息';
      errorType = 'denied';
      showRetry = true;
    } else if (err.errNo === 10203) {
      message = '授权已过期，请重新授权';
      errorType = 'expired';
      showRetry = true;
    } else if (err.errNo === 10204) {
      message = '网络错误，请检查网络连接后重试';
      errorType = 'network';
      showRetry = true;
    } else if (err.errMsg && err.errMsg.includes('cancel')) {
      message = '您取消了授权';
      errorType = 'cancelled';
      showRetry = true;
    } else if (err.message && err.message.includes('正在授权中')) {
      message = err.message;
      errorType = 'authorizing';
      showRetry = false;
    }

    return {
      message,
      showRetry,
      errorType
    };
  }

  /**
   * 显示授权错误提示
   * @param {Error} err - 错误对象
   * @param {Function} onRetry - 重试回调函数
   */
  showAuthError(err, onRetry) {
    const errorInfo = this.handleAuthError(err);
    
    if (errorInfo.showRetry) {
      tt.showModal({
        title: '授权提示',
        content: errorInfo.message + '\n\n是否重新尝试授权？',
        confirmText: '重新授权',
        cancelText: '稍后再说',
        success: (res) => {
          if (res.confirm && onRetry) {
            // 延迟重试，避免频繁弹窗
            setTimeout(() => {
              onRetry();
            }, 1000);
          }
        }
      });
    } else {
      tt.showToast({ title: errorInfo.message, icon: 'none' });
    }
  }

  /**
   * 执行登录流程 - 注意：此方法只能在用户点击按钮时调用
   * @param {string} desc - 授权描述
   * @returns {Promise<Object>}
   */
  async login(desc) {
    try {
      // 直接调用getUserProfile，让抖音小程序自己处理授权状态
      return await this.getUserProfile(desc);
    } catch (err) {
      // 新增：特殊处理"must be invoked by user tap gesture"错误
      if (err && err.errMsg && err.errMsg.includes('must be invoked by user tap gesture')) {
        tt.showToast({ title: '请通过点击按钮进行授权', icon: 'none' });
      }
      console.error('登录失败', err);
      throw err;
    }
  }

  /**
   * 退出登录
   * @returns {Promise<void>}
   */
  async logout() {
    this.user = null;
    this.authStatus = null;
    await this.removeStoredUser();
  }

  /**
   * 确认退出登录
   * @returns {Promise<boolean>}
   */
  confirmLogout() {
    return new Promise((resolve) => {
      tt.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        confirmText: '退出',
        cancelText: '取消',
        success: (res) => {
          resolve(res.confirm);
        }
      });
    });
  }

  /**
   * 检查是否需要登录
   * @param {string} action - 操作描述
   * @returns {Promise<boolean>}
   */
  checkNeedLogin(action = '此操作') {
    if (this.user) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      tt.showModal({
        title: '需要登录',
        content: `${action}需要先登录，是否现在登录？`,
        confirmText: '立即登录',
        cancelText: '稍后再说',
        success: (res) => {
          resolve(res.confirm);
        }
      });
    });
  }

  /**
   * 获取当前用户信息
   * @returns {Object|null}
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * 获取授权状态
   * @returns {boolean|null}
   */
  getAuthStatus() {
    return this.authStatus;
  }

  /**
   * 是否正在授权中
   * @returns {boolean}
   */
  isAuthorizing() {
    return this._isAuthorizing || false;
  }

  /**
   * 是否已登录
   * @returns {boolean}
   */
  isLoggedIn() {
    return !!this.user;
  }

  // 私有方法：本地存储相关

  /**
   * 保存用户信息到本地存储
   * @param {Object} user - 用户信息
   * @returns {Promise<void>}
   */
  async saveUser(user) {
    return new Promise((resolve, reject) => {
      tt.setStorage({
        key: this.storageKey,
        data: user,
        success: resolve,
        fail: reject
      });
    });
  }

  /**
   * 从本地存储获取用户信息
   * @returns {Promise<Object|null>}
   */
  async getStoredUser() {
    return new Promise((resolve) => {
      console.log('auth.js: 尝试从本地存储获取用户信息，key:', this.storageKey);
      tt.getStorage({
        key: this.storageKey,
        success: (res) => {
          console.log('auth.js: 本地存储获取成功:', res.data);
          resolve(res.data);
        },
        fail: (err) => {
          console.log('auth.js: 本地存储获取失败:', err);
          resolve(null);
        }
      });
    });
  }

  /**
   * 从本地存储删除用户信息
   * @returns {Promise<void>}
   */
  async removeStoredUser() {
    return new Promise((resolve, reject) => {
      tt.removeStorage({
        key: this.storageKey,
        success: resolve,
        fail: reject
      });
    });
  }
}

// 创建单例实例
const authManager = new AuthManager();

// 使用CommonJS导出
module.exports = authManager; 