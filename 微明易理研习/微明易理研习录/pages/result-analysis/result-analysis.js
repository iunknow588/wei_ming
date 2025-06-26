// 引入工具函数
const { 
  generateCompleteGuaResult
} = require('../../utils/gua-utils.js');

Page({
  data: {
    originalGua: [],
    changedGua: [],
    bian: [],
    originalGuaName: '',
    changedGuaName: '',
    originalGuaInfo: null,
    changedGuaInfo: null,
    interpretationMethod: null,
    yaoResults: [],
    originalGuaDetail: [],
    changedGuaDetail: [],
    // 免责声明相关数据
    showDisclaimer: true,
    disclaimerText: ''
  },

  // 统一处理结果数据的方法
  processResultData(resultData) {
    this.setData({
      ...resultData,
      currentRound: 6,
      totalRounds: 6
    });
  },

  // 关闭免责声明
  onCloseDisclaimer() {
    this.setData({
      showDisclaimer: false
    });
  },

  onLoad(options) {
    try {
      // 获取全局免责声明文本
      const app = getApp();
      this.setData({
        disclaimerText: app.globalData.disclaimerText || '本应用仅供娱乐参考，不构成任何决策依据。请理性对待，谨慎使用。'
      });

      // 从爻值数组生成完整结果数据
      if (options.yaoValues) {
        const yaoValues = JSON.parse(decodeURIComponent(options.yaoValues));
        console.log('从爻值数组生成结果:', yaoValues);
        
        if (Array.isArray(yaoValues) && yaoValues.length === 6) {
          const resultData = generateCompleteGuaResult(yaoValues);
          this.processResultData(resultData);
          return;
        }
      }
      
      console.error('无效的爻值数组参数');
    } catch (e) {
      console.error('结果解析页面参数解析失败', e, options);
    }
  }
}); 