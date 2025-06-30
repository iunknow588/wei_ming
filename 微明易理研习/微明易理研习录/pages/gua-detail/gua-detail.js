const app = getApp();
const { sixtyFourGuaData } = require('../../data/sixtyFourGua.js');
// 导入学习进度管理模块
const { getGuaStudyStatus, updateGuaStudyStatus } = require('../../utils/study-progress-manager.js');
// 导入授权管理器
const authManager = require('../../utils/auth.js');
// 导入卦象绘制工具
const { getGuaComponents } = require('../../utils/gua-drawer.js');
// 导入爻辞数据
const { getGuaDetail } = require('../../data/yaoIndex.js');
// 导入延时加载管理器
const { lazyLoadManager } = require('../../utils/lazy-load-manager.js');
// 导入64卦名称数组
const { GUA_NAMES } = require('../../utils/gua-utils.js');

Page({
  data: {
    gua: null,
    isLoading: true,
    error: null,
    guaInfo: null,
    guaComponents: null,
    loadSource: '', // 数据加载来源：'cache', 'lazy_load', 'direct_load'
    studyStatus: {
      isCompleted: false,
      statusText: '未阅',
      statusIcon: '❓',
      buttonText: '完成'
    },
    isLoggedIn: false // 登录状态
  },

  onLoad(options) {
    const { guaIndex } = options;
    if (!guaIndex) {
      this.setData({
        error: '缺少卦索引参数',
        isLoading: false
      });
      return;
    }

    this.guaIndex = parseInt(guaIndex);
    
    // 设置导航栏标题
    this.setNavigationBarTitle();
    
    // 尝试从延时加载缓存获取数据
    this.loadGuaData();
  },

  onShow() {
    // 页面显示时重新加载学习状态和检查登录状态
    this.loadStudyStatus();
    this.checkLoginStatus();
  },

  onReady() {
    // 页面准备完成
  },

  onError(error) {
    console.error('[gua-detail] 页面错误:', error);
  },

  // 设置导航栏标题
  setNavigationBarTitle() {
    const guaName = GUA_NAMES[this.guaIndex - 1] || '未知';
    const title = `第${this.guaIndex}卦：${guaName}卦`;
    
    tt.setNavigationBarTitle({
      title: title
    });
  },

  // 加载卦数据
  async loadGuaData() {
    try {
      this.setData({ isLoading: true, error: null });
      
      let guaData = null;
      let loadSource = '';
      
      // 1. 首先尝试从延时加载缓存获取
      guaData = lazyLoadManager.getGuaData(this.guaIndex);
      if (guaData) {
        loadSource = 'cache';
      } else {
        // 2. 如果缓存中没有，检查是否正在加载
        if (lazyLoadManager.isDataLoading(this.guaIndex)) {
          loadSource = 'lazy_load';
          guaData = await lazyLoadManager.loadGuaData(this.guaIndex);
        } else {
          // 3. 直接加载数据
          loadSource = 'direct_load';
          guaData = await lazyLoadManager.loadGuaData(this.guaIndex);
        }
      }
      
      // 处理卦数据
      const processedGua = this.processGuaData(guaData);
      
      this.setData({
        gua: processedGua,
        isLoading: false,
        loadSource: loadSource
      });
      
      // 加载学习状态
      this.loadStudyStatus();
      
      // 检查登录状态
      this.checkLoginStatus();
      
      console.log('[gua-detail] 数据加载成功:', processedGua);
      
    } catch (error) {
      console.error('[gua-detail] 数据加载失败:', error);
      
      this.setData({
        error: error.message || '数据加载失败',
        isLoading: false
      });
    }
  },

  // 处理卦数据
  processGuaData(guaData) {
    if (!guaData) {
      throw new Error('卦数据为空');
    }

    // 设置卦象组件
    this.setGuaComponents(guaData);
    
    // 获取简化的卦名
    const simpleGuaName = GUA_NAMES[this.guaIndex - 1] || `第${this.guaIndex}卦`;
    
    return {
      guaName: guaData.gua_name || `第${this.guaIndex}卦`,
      simpleGuaName: simpleGuaName, // 添加简化的卦名
      guaCi: guaData.gua_ci || '',
      guaJie: guaData.gua_jie || '',
      yao: guaData.yao || [],
      yaoCi: guaData.yao_ci || [],
      image: guaData.image || '',
      ...guaData
    };
  },

  // 设置卦象组件
  setGuaComponents(guaData) {
    try {
      // 根据卦索引生成正确的卦象组件
      const guaIndex = this.guaIndex - 1; // 转换为0-63的索引
      
      // 使用app.js中的GUA_CODE_MAP来获取卦象信息
      const guaCodeMap = app.globalData.guaCodeMap;
      
      // 找到对应的卦象编码
      let guaCode = null;
      for (const [code, info] of Object.entries(guaCodeMap)) {
        if (info.index === guaIndex) {
          guaCode = code;
          break;
        }
      }
      
      if (guaCode) {
        // 将6位二进制码转换为上下卦
        const upperCode = guaCode.substring(0, 3);
        const lowerCode = guaCode.substring(3, 6);
        
        // 将二进制码转换为爻数组
        const upperLines = upperCode.split('').map(bit => parseInt(bit));
        const lowerLines = lowerCode.split('').map(bit => parseInt(bit));
        
        // 根据爻数组确定八卦名称
        const baguaNames = ['坤', '艮', '坎', '巽', '震', '离', '兑', '乾'];
        const upperBagua = this.getBaguaName(upperLines);
        const lowerBagua = this.getBaguaName(lowerLines);
        
        const guaComponents = {
          upper: upperBagua,
          lower: lowerBagua,
          upperLines: upperLines,
          lowerLines: lowerLines
        };
        
        this.setData({ guaComponents });
      } else {
        // 如果找不到对应的卦象，使用默认值
        const guaComponents = {
          upper: '乾',
          lower: '坤',
          upperLines: [1, 1, 1],
          lowerLines: [0, 0, 0]
        };
        
        this.setData({ guaComponents });
      }
    } catch (error) {
      console.error('设置卦象组件失败:', error);
      
      // 出错时使用默认值
      const guaComponents = {
        upper: '乾',
        lower: '坤',
        upperLines: [1, 1, 1],
        lowerLines: [0, 0, 0]
      };
      
      this.setData({ guaComponents });
    }
  },

  // 根据爻数组获取八卦名称
  getBaguaName(lines) {
    const baguaMap = {
      '000': '坤',
      '001': '艮', 
      '010': '坎',
      '011': '巽',
      '100': '震',
      '101': '离',
      '110': '兑',
      '111': '乾'
    };
    
    const code = lines.join('');
    return baguaMap[code] || '乾';
  },

  // 图片加载完成
  onImageLoad(e) {
    console.log('[gua-detail] 图片加载完成');
  },

  // 图片加载失败
  onImageError(e) {
    console.error('[gua-detail] 图片加载失败:', e);
  },

  // 卦象点击事件
  onCanvasTouch(e) {
    console.log('[gua-detail] 卦象被点击');
    // 可以添加卦象交互逻辑
  },

  onShareAppMessage() {
    const guaName = GUA_NAMES[this.guaIndex - 1] || '未知';
    
    return {
      title: `第${this.guaIndex}卦：${guaName}卦详解`,
      path: `/pages/gua-detail/gua-detail?guaIndex=${this.guaIndex}`
    };
  },

  onUnload() {
    // 页面卸载时的清理工作
    console.log('[gua-detail] 页面卸载');
  },

  onHide() {
    // 页面隐藏时的清理工作
    console.log('[gua-detail] 页面隐藏');
  },

  // 加载学习状态
  loadStudyStatus() {
    try {
      const studyProgress = getGuaStudyStatus(this.guaIndex);
      const isCompleted = studyProgress ? studyProgress.completed : false;
      
      const studyStatus = {
        isCompleted: isCompleted,
        statusText: isCompleted ? '已阅' : '未阅',
        statusIcon: isCompleted ? '✅' : '❓',
        buttonText: isCompleted ? '重置为未学习状态' : '完成'
      };
      
      this.setData({ studyStatus });
      
      console.log('[gua-detail] 学习状态加载成功:', studyStatus);
    } catch (error) {
      console.error('[gua-detail] 学习状态加载失败:', error);
    }
  },

  // 检查登录状态
  checkLoginStatus() {
    try {
      const isLoggedIn = authManager.isLoggedIn();
      this.setData({ isLoggedIn });
      console.log('[gua-detail] 登录状态检查:', isLoggedIn);
    } catch (error) {
      console.error('[gua-detail] 登录状态检查失败:', error);
      this.setData({ isLoggedIn: false });
    }
  },

  // 登录按钮点击事件
  async onLoginTap() {
    try {
      console.log('[gua-detail] 用户点击登录按钮');
      
      // 执行登录流程
      const user = await authManager.login('用于保存您的学习进度');
      
      if (user) {
        console.log('[gua-detail] 登录成功:', user);
        
        // 更新登录状态
        this.checkLoginStatus();
        
        // 显示成功提示
        tt.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        
        // 登录成功后，可以尝试重新保存学习状态
        // 这里可以添加一个提示，让用户再次点击学习状态按钮
        setTimeout(() => {
          tt.showToast({
            title: '现在可以保存学习进度了',
            icon: 'none',
            duration: 2000
          });
        }, 2000);
      }
    } catch (error) {
      console.error('[gua-detail] 登录失败:', error);
      
      // 显示登录失败提示
      tt.showToast({
        title: '登录失败，请重试',
        icon: 'error',
        duration: 2000
      });
    }
  },

  // 切换学习状态
  async toggleStudyStatus() {
    try {
      const currentStatus = this.data.studyStatus.isCompleted;
      const newStatus = !currentStatus;
      
      // 更新学习进度（异步，需要登录检测）
      const updateSuccess = await updateGuaStudyStatus(this.guaIndex, newStatus);
      
      if (!updateSuccess) {
        // 更新失败（可能是用户取消登录或登录失败）
        console.log('[gua-detail] 学习状态更新失败或用户取消');
        return;
      }
      
      // 更新页面状态
      this.loadStudyStatus();
      
      // 显示提示
      const message = newStatus ? '已标记为完成学习' : '已重置为未学习状态';
      tt.showToast({
        title: message,
        icon: 'success',
        duration: 2000
      });
      
      console.log(`[gua-detail] 学习状态已切换: ${currentStatus} -> ${newStatus}`);
      
      // 通知前一页刷新
      const pages = getCurrentPages();
      if (pages.length > 1) {
        const prevPage = pages[pages.length - 2];
        if (prevPage && prevPage.refreshGuaList) {
          prevPage.refreshGuaList();
        }
      }
      
    } catch (error) {
      console.error('[gua-detail] 切换学习状态失败:', error);
      tt.showToast({
        title: '操作失败',
        icon: 'error',
        duration: 2000
      });
    }
  }
}); 