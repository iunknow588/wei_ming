// 获取全局 app 实例
const app = getApp();
// 延迟导入64卦数据，避免启动时阻塞
let sixtyFourGua = null;

Page({
  data: {
    guaList: [], // 64卦数据列表
    isLoading: true, // 加载状态
    isDataReady: false, // 数据是否准备就绪
    pageSize: 20, // 每页显示数量
    currentPage: 0, // 当前页码
    hasMore: true // 是否还有更多数据
  },

  onLoad() {
    // 页面加载时立即显示骨架屏
    this.setData({ isLoading: true });
    
    // 异步加载数据
    this.asyncLoadData();
  },

  onShow() {
    // 如果数据已加载，直接显示
    if (this.data.isDataReady) {
      this.refreshProgress();
    }
  },

  // 异步加载数据
  async asyncLoadData() {
    try {
      // 延迟加载64卦数据
      if (!sixtyFourGua) {
        sixtyFourGua = require('../../data/sixtyFourGua.js');
      }

      // 先同步本地进度到内存
      if (typeof sixtyFourGua.syncStudyProgressFromStorage === 'function') {
        sixtyFourGua.syncStudyProgressFromStorage();
      }

      // 分页加载64卦数据
      const allGuaData = sixtyFourGua.sixtyFourGuaData;
      if (!allGuaData || allGuaData.length === 0) {
        throw new Error('64卦数据加载失败');
      }

      // 加载第一页数据
      const firstPageData = this.loadPageData(allGuaData, 0);
      
      this.setData({ 
        guaList: firstPageData,
        isLoading: false,
        isDataReady: true,
        currentPage: 0,
        hasMore: allGuaData.length > this.data.pageSize
      });

      // 预加载后续页面
      setTimeout(() => {
        this.preloadNextPages(allGuaData);
      }, 100);

    } catch (error) {
      console.error('数据加载失败:', error);
      tt.showToast({ title: '数据加载失败', icon: 'none' });
      this.setData({ isLoading: false });
    }
  },

  // 加载指定页面的数据
  loadPageData(allData, pageIndex) {
    const startIndex = pageIndex * this.data.pageSize;
    const endIndex = startIndex + this.data.pageSize;
    const pageData = allData.slice(startIndex, endIndex);
    
    return pageData.map((item, idx) => {
      const actualIndex = startIndex + idx;
      const progress = sixtyFourGua.getStudyProgress(actualIndex);
      return { 
        ...item, 
        completed: progress ? progress.completed : false,
        imageLoaded: false,
        actualIndex: actualIndex
      };
    });
  },

  // 预加载后续页面
  preloadNextPages(allData) {
    const totalPages = Math.ceil(allData.length / this.data.pageSize);
    for (let i = 1; i < Math.min(totalPages, 3); i++) { // 预加载前3页
      setTimeout(() => {
        this.loadPageData(allData, i);
      }, i * 50);
    }
  },

  // 加载更多数据
  loadMoreData() {
    if (!this.data.hasMore || !sixtyFourGua) return;
    
    const allData = sixtyFourGua.sixtyFourGuaData;
    const nextPage = this.data.currentPage + 1;
    const nextPageData = this.loadPageData(allData, nextPage);
    
    if (nextPageData.length > 0) {
      this.setData({
        guaList: [...this.data.guaList, ...nextPageData],
        currentPage: nextPage,
        hasMore: (nextPage + 1) * this.data.pageSize < allData.length
      });
    } else {
      this.setData({ hasMore: false });
    }
  },

  // 刷新进度数据
  refreshProgress() {
    if (!sixtyFourGua || !this.data.isDataReady) return;
    
    const guaList = this.data.guaList.map((item) => {
      const progress = sixtyFourGua.getStudyProgress(item.actualIndex);
      return { ...item, completed: progress ? progress.completed : false };
    });
    
    this.setData({ guaList });
  },

  // 点击卦象跳转到详情页
  onGuaTap(e) {
    const index = e.currentTarget.dataset.index;
    const guaItem = this.data.guaList[index];
    
    tt.navigateTo({
      url: `/pages/gua-detail/gua-detail?index=${guaItem.actualIndex}`,
      fail: (err) => {
        console.error('卦象详情页跳转失败:', err);
        tt.showToast({ title: '跳转失败', icon: 'none' });
      }
    });
  },

  // 图片加载成功处理
  onImageLoad(e) {
    const index = e.currentTarget.dataset.index;
    const guaList = [...this.data.guaList];
    if (guaList[index]) {
      guaList[index].imageLoaded = true;
      this.setData({ guaList });
    }
  },

  // 图片加载失败处理
  onImageError(e) {
    // 图片加载失败时使用默认背景
    const index = e.currentTarget.dataset.index;
    const guaList = [...this.data.guaList];
    if (guaList[index]) {
      guaList[index].imageLoaded = true;
      guaList[index].imageError = true;
      this.setData({ guaList });
    }
  },

  // 刷新卦象列表
  refreshGuaList() {
    this.setData({ isLoading: true });
    this.asyncLoadData();
  },

  // 触底加载更多
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadMoreData();
    }
  }
});
