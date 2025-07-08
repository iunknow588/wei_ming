// 获取全局 app 实例
const app = getApp();
// 导入64卦名称数组
const { GUA_NAMES } = require('../../utils/gua-utils.js');
// 导入学习进度管理模块
const { getStudyProgress, getCompletedGuaIndexes } = require('../../utils/study-progress-manager.js');

// 全局缓存，确保TAB分组只计算一次
let cachedTabGuaList = null;

Page({
  data: {
    guaList: [], // 64卦索引列表
    isLoading: true, // 加载状态
    isDataReady: false, // 数据是否准备就绪
    globalGuaData: null, // 全局64卦数据引用
    learningStatus: {}, // 学习状态映射 {index: boolean}
    tabList: ['乾','坎','艮','震','巽','离','坤','兑'], // TAB标签
    currentTab: 0, // 当前选中TAB索引
    tabGuaList: null // 每个TAB下的8个卦索引，初始化时一次性设置
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
    // 已无定时器，无需清理
  },

  // 加载64卦数据
  loadGuaData() {
    try {
      // 检查是否已经缓存了TAB分组
      if (cachedTabGuaList) {
        console.log('[gua-ci-list] 使用缓存TAB分组，跳过重新计算');
        this.setData({ 
          guaList: Array.from({length: app.globalData.sixtyFourGua.length}, (_, index) => index),
          isLoading: false,
          isDataReady: true,
          globalGuaData: app.globalData.sixtyFourGua,
          learningStatus: {},
          tabGuaList: cachedTabGuaList
        });
        this.checkUserLearningStatus();
        return;
      }
      
      // 首次加载数据 - 直接使用全局数据
      console.log('[gua-ci-list] 首次计算TAB分组');
      
      // 如果全局数据还未初始化，则等待初始化完成
      if (!app.globalData.sixtyFourGua || app.globalData.sixtyFourGua.length === 0) {
        console.log('[gua-ci-list] 全局数据未初始化，等待初始化完成...');
        setTimeout(() => {
          this.loadGuaData();
        }, 100);
        return;
      }
      
      // 按用户指定分组设置tabGuaList（索引减1）
      cachedTabGuaList = [
        [0, 43, 32, 11, 19, 22, 34, 13],      // 乾
        [28, 59, 2, 62, 48, 54, 35, 6],       // 坎
        [51, 21, 25, 40, 37, 9, 60, 52],      // 艮
        [50, 15, 39, 31, 45, 47, 27, 16],     // 震
        [56, 8, 36, 41, 24, 20, 26, 17],      // 巽
        [29, 55, 49, 63, 3, 58, 5, 12],       // 离
        [1, 23, 18, 10, 33, 42, 4, 7],        // 坤
        [57, 46, 44, 30, 38, 14, 61, 53]      // 兑
      ];
      
      const allGuaIndexes = Array.from({length: app.globalData.sixtyFourGua.length}, (_, index) => index);
      this.setData({ 
        guaList: allGuaIndexes,
        isLoading: false,
        isDataReady: true,
        globalGuaData: app.globalData.sixtyFourGua,
        learningStatus: {},
        tabGuaList: cachedTabGuaList
      });
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

  // TAB切换事件 - 只更新当前TAB索引，不重新计算分组
  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },

  // 卦点击事件 - 简化处理
  onGuaTap(e) {
    const guaIndex = e.currentTarget.dataset.index + 1; // 1-64
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
