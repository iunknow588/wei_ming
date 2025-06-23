// 获取全局 app 实例
const app = getApp();
// 导入64卦数据
const sixtyFourGua = require('../../data/sixtyFourGua.js');

Page({
  data: {
    guaList: [], // 64卦数据列表
  },

  onShow() {
    // 先同步本地进度到内存
    if (typeof sixtyFourGua.syncStudyProgressFromStorage === 'function') {
      sixtyFourGua.syncStudyProgressFromStorage();
    }
    this.loadGuaList(); // 确保每次显示页面时重新加载数据
  },

  // 加载64卦数据
  loadGuaList() {
    const guaList = sixtyFourGua.sixtyFourGuaData.map((item, idx) => {
      const progress = sixtyFourGua.getStudyProgress(idx);
      return { ...item, completed: progress ? progress.completed : false };
    });
    if (!guaList || guaList.length === 0) {
      console.error('64卦数据加载失败，请检查数据源！');
      tt.showToast({ title: '数据加载失败', icon: 'none' });
    } else {
      this.setData({ guaList });
    }
  },

  // 点击卦象跳转到详情页
  onGuaTap(e) {
    const index = e.currentTarget.dataset.index;
    const guaItem = this.data.guaList[index];
    
    tt.navigateTo({
      url: `/pages/gua-detail/gua-detail?index=${index}`,
      fail: (err) => {
        console.error('卦象详情页跳转失败:', err);
        tt.showToast({ title: '跳转失败: ' + err.errMsg, icon: 'none' });
      }
    });
  },

  // 图片加载成功处理
  onImageLoad(e) {
    // 图片加载成功，无需特殊处理
  },

  // 图片加载失败处理
  onImageError(e) {
    // 图片加载失败，无需特殊处理
  },

  // 刷新卦象列表
  refreshGuaList() {
    console.log('刷新卦象列表');
    this.loadGuaList();
  },
});
