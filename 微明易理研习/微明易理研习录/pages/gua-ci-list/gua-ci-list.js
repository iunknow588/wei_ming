// 获取全局 app 实例
const app = getApp();
// 导入64卦名称数组
const { GUA_NAMES } = require('../../utils/gua-utils.js');
// 导入学习进度管理模块
const { getStudyProgress, getCompletedGuaIndexes } = require('../../utils/study-progress-manager.js');

Page({
  data: {
    guaList: [], // 64卦索引列表
    isLoading: true, // 加载状态
    isDataReady: false, // 数据是否准备就绪
    // 移除分页相关字段
    globalGuaData: null, // 全局64卦数据引用
    learningStatus: {} // 学习状态映射 {index: boolean}
  },

  onLoad(options) {
    // 页面加载时立即显示骨架屏
    this.setData({ 
      isLoading: true
    });
    
    // 直接加载完整数据
    this.loadGuaData();
  },

  onShow() {
    // 页面显示时重新检查学习状态，确保从详情页返回时状态是最新的
    if (this.data.globalGuaData) {
      console.log('页面显示，重新检查学习状态...');
      this.checkUserLearningStatus();
    }
  },

  onReady() {
    // 页面准备完成
  },

  onError(error) {
    console.error('[gua-ci-list] 页面错误:', error);
  },

  onUnload() {
    // 页面卸载时清理资源
    this.clearTimers();
  },

  // 清理定时器
  clearTimers() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
  },

  // 加载64卦数据
  loadGuaData() {
    try {
      // 直接使用全局的64卦数据
      const { sixtyFourGuaData } = require('../../data/sixtyFourGua.js');
      
      if (!sixtyFourGuaData || !Array.isArray(sixtyFourGuaData)) {
        throw new Error('64卦数据加载失败，程序无法正常运行');
      }
      
      // 直接使用全局数据，不克隆
      const globalGuaData = sixtyFourGuaData;
      
      // 直接加载所有64卦索引
      const allGuaIndexes = Array.from({length: globalGuaData.length}, (_, index) => index);
      
      // 批量更新数据
      this.setData({ 
        guaList: allGuaIndexes,
        isLoading: false,
        isDataReady: true,
        globalGuaData: globalGuaData,
        learningStatus: {}
      });

      // 数据加载完成后立即检查学习状态
      this.checkUserLearningStatus();

    } catch (error) {
      console.error('[gua-ci-list] 数据加载失败:', error);
      
      // 显示错误信息并停止加载
      tt.showModal({
        title: '数据加载失败',
        content: error.message || '64卦数据加载失败，请重启应用',
        showCancel: false,
        confirmText: '确定',
        success: () => {
          console.error('应用无法正常运行，建议重启');
        }
      });
      
      this.setData({ 
        isLoading: false
      });
    }
  },

  // 卦点击事件 - 简化处理
  onGuaTap(e) {
    const { index } = e.currentTarget.dataset;
    const guaIndex = this.data.guaList[index] + 1; // 转换为1-64的索引
    
    // 直接导航到详情页，详情页会按需加载数据
    this.navigateToGuaDetail(guaIndex);
  },

  // 导航到卦详情页
  navigateToGuaDetail(guaIndex) {
    tt.navigateTo({
      url: `/pages/gua-detail/gua-detail?guaIndex=${guaIndex}`,
      success: () => {
        // 导航成功
      },
      fail: (error) => {
        console.error('[gua-ci-list] 导航失败:', error);
        
        tt.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
  },

  // 刷新卦列表
  refreshGuaList() {
    this.loadGuaData();
  },

  // 检查用户学习状态
  checkUserLearningStatus() {
    try {
      console.log('开始检查用户学习状态...');
      
      // 确保全局数据已加载
      if (!this.data.globalGuaData) {
        console.log('全局数据未加载，跳过学习状态检查');
        return;
      }
      
      // 使用新的学习进度管理模块获取已完成学习的卦象索引
      const completedIndexes = getCompletedGuaIndexes();
      console.log('已完成学习的卦象索引:', completedIndexes);
      
      // 构建学习状态映射
      const learningStatus = {};
      
      // 将已完成的卦象索引转换为0-63的索引并标记为已学习
      completedIndexes.forEach(guaIndex => {
        const index = guaIndex - 1; // 转换为0-63索引
        if (index >= 0 && index < this.data.globalGuaData.length) {
          learningStatus[index] = true;
        }
      });
      
      console.log('构建的学习状态映射:', learningStatus);
      
      // 更新学习状态
      this.setData({
        learningStatus
      });
      
      const completedCount = Object.keys(learningStatus).length;
      console.log('学习状态更新完成，已学习卦象数量:', completedCount);
      
      // 显示学习进度提示
      if (completedCount > 0) {
        const progress = Math.round((completedCount / this.data.globalGuaData.length) * 100);
        console.log(`学习进度: ${completedCount}/${this.data.globalGuaData.length} (${progress}%)`);
      }
      
    } catch (error) {
      console.error('检查学习状态失败:', error);
    }
  }
});
