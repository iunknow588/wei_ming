/**
 * 版本管理工具
 * 统一管理应用版本号，避免硬编码
 */

// 从app.json读取版本号
let appVersion = '0.1.0'; // 默认版本号

try {
  const appConfig = require('../app.json');
  if (appConfig && appConfig.version) {
    appVersion = appConfig.version;
  }
} catch (error) {
  console.warn('无法读取app.json中的版本号，使用默认版本:', appVersion);
}

/**
 * 获取应用版本号
 * @returns {string} 版本号
 */
function getAppVersion() {
  return appVersion;
}

/**
 * 获取完整版本信息
 * @returns {object} 版本信息对象
 */
function getVersionInfo() {
  return {
    version: appVersion,
    buildTime: new Date().toISOString(),
    platform: 'miniprogram'
  };
}

/**
 * 检查版本号格式是否正确
 * @param {string} version 版本号
 * @returns {boolean} 是否正确
 */
function isValidVersion(version) {
  const versionRegex = /^\d+\.\d+\.\d+$/;
  return versionRegex.test(version);
}

module.exports = {
  getAppVersion,
  getVersionInfo,
  isValidVersion
}; 