/**
 * 学习进度管理模块
 * 独立管理用户的学习状态，与卦数据分离
 */

// 导入授权管理器
const authManager = require('./auth.js');

// 学习进度存储键名
const STUDY_PROGRESS_KEY = 'userStudyProgress';

// 默认学习进度数据（64卦，初始状态为未学习）
const DEFAULT_STUDY_PROGRESS = Array.from({ length: 64 }, (_, index) => ({
  guaIndex: index + 1,
  completed: false,
  lastStudyTime: null
}));

/**
 * 获取用户学习进度
 * @returns {Array} 学习进度数组
 */
function getStudyProgress() {
  try {
    const stored = tt.getStorageSync(STUDY_PROGRESS_KEY);
    if (Array.isArray(stored) && stored.length === 64) {
      return stored;
    }
    // 如果存储的数据无效，返回默认值
    return [...DEFAULT_STUDY_PROGRESS];
  } catch (e) {
    console.error('获取学习进度失败:', e);
    return [...DEFAULT_STUDY_PROGRESS];
  }
}

/**
 * 获取指定卦象的学习状态
 * @param {number} guaIndex - 卦象索引（1-64）
 * @returns {Object|null} 学习状态对象
 */
function getGuaStudyStatus(guaIndex) {
  if (guaIndex < 1 || guaIndex > 64) {
    return null;
  }
  
  const progress = getStudyProgress();
  return progress.find(item => item.guaIndex === guaIndex) || null;
}

/**
 * 更新指定卦象的学习状态（需要登录）
 * @param {number} guaIndex - 卦象索引（1-64）
 * @param {boolean} completed - 是否完成学习
 * @returns {Promise<boolean>} 是否更新成功
 */
async function updateGuaStudyStatus(guaIndex, completed) {
  if (guaIndex < 1 || guaIndex > 64) {
    console.error('无效的卦象索引:', guaIndex);
    return false;
  }
  
  // 检查登录状态
  if (!authManager.isLoggedIn()) {
    // 提示用户登录
    const shouldLogin = await authManager.checkNeedLogin('保存学习进度');
    if (!shouldLogin) {
      console.log('用户取消登录，学习进度未保存');
      return false;
    }
    
    // 用户选择登录，但需要用户手动点击登录按钮
    // 因为抖音小程序的限制，getUserProfile只能在用户直接点击按钮时调用
    tt.showModal({
      title: '需要手动登录',
      content: '请点击页面上的登录按钮进行授权，然后再次尝试保存学习进度。',
      confirmText: '知道了',
      showCancel: false,
      success: () => {
        console.log('用户了解了需要手动登录');
      }
    });
    
    return false;
  }
  
  // 用户已登录，保存学习进度
  try {
    const progress = getStudyProgress();
    const index = progress.findIndex(item => item.guaIndex === guaIndex);
    
    if (index !== -1) {
      progress[index].completed = completed;
      progress[index].lastStudyTime = completed ? new Date().toISOString() : null;
    } else {
      // 如果找不到，添加新的记录
      progress.push({
        guaIndex: guaIndex,
        completed: completed,
        lastStudyTime: completed ? new Date().toISOString() : null
      });
    }
    
    // 保存到本地存储
    tt.setStorageSync(STUDY_PROGRESS_KEY, progress);
    
    console.log(`卦象 ${guaIndex} 学习状态已更新: ${completed}`);
    return true;
  } catch (e) {
    console.error('更新学习状态失败:', e);
    return false;
  }
}

/**
 * 获取学习统计信息
 * @returns {Object} 学习统计对象
 */
function getStudyStatistics() {
  const progress = getStudyProgress();
  const total = progress.length;
  const completed = progress.filter(item => item.completed).length;
  const percentage = Math.round((completed / total) * 100);
  
  return {
    total,
    completed,
    remaining: total - completed,
    percentage
  };
}

/**
 * 获取所有已完成学习的卦象索引
 * @returns {Array} 已完成的卦象索引数组
 */
function getCompletedGuaIndexes() {
  const progress = getStudyProgress();
  return progress
    .filter(item => item.completed)
    .map(item => item.guaIndex);
}

/**
 * 重置所有学习进度
 */
function resetAllStudyProgress() {
  try {
    tt.setStorageSync(STUDY_PROGRESS_KEY, [...DEFAULT_STUDY_PROGRESS]);
    console.log('所有学习进度已重置');
  } catch (e) {
    console.error('重置学习进度失败:', e);
  }
}

/**
 * 导出学习进度数据（用于备份）
 * @returns {Object} 学习进度数据
 */
function exportStudyProgress() {
  const progress = getStudyProgress();
  const statistics = getStudyStatistics();
  
  return {
    progress,
    statistics,
    exportTime: new Date().toISOString(),
    version: '1.0'
  };
}

/**
 * 导入学习进度数据（用于恢复）
 * @param {Object} data - 学习进度数据
 * @returns {boolean} 是否导入成功
 */
function importStudyProgress(data) {
  try {
    if (!data || !Array.isArray(data.progress) || data.progress.length !== 64) {
      console.error('无效的学习进度数据');
      return false;
    }
    
    tt.setStorageSync(STUDY_PROGRESS_KEY, data.progress);
    console.log('学习进度导入成功');
    return true;
  } catch (e) {
    console.error('导入学习进度失败:', e);
    return false;
  }
}

// 导出模块
module.exports = {
  getStudyProgress,
  getGuaStudyStatus,
  updateGuaStudyStatus,
  getStudyStatistics,
  getCompletedGuaIndexes,
  resetAllStudyProgress,
  exportStudyProgress,
  importStudyProgress
}; 