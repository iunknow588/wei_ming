const app = getApp();
const { sixtyFourGuaData, getStudyProgress, updateStudyProgress } = require('../../data/sixtyFourGua.js');
// 导入授权管理器
const authManager = require('../../utils/auth.js');
// 导入卦象绘制工具
const { drawGuaSymbol, createGuaSVG, getGuaLines, getGuaComponents } = require('../../utils/gua-drawer.js');

Page({
  data: {
    gua: {},
    index: null,
    guaSymbolSVG: '',
    guaLines: [],
    guaComponents: null
  },
  onLoad(options) {
    // options.index 传递过来的卦象索引
    const index = Number(options.index);
    const gua = { ...sixtyFourGuaData[index] };
    // 获取学习进度
    const studyProgress = getStudyProgress(index);
    gua.completed = studyProgress ? studyProgress.completed : false;
    
    // 使用原始路径格式，但确保路径正确
    if (gua && gua.image) {
      // 保持原始路径格式，但确保是相对路径
      const imagePath = `../../assets/images/${index + 1}.jpg`;
      gua.image = imagePath;
    }
    
    this.setData({ gua, index });
    
    // 设置页面背景色为卦象图片
    if (gua && gua.image) {
      this.setPageBackground(gua.image);
    }
    
    // 绘制卦象
    this.drawGuaSymbol(index);
    
    // 标记为已完成（用户进入详情页就表示开始学习）
    if (index !== null) {
      updateStudyProgress(index, true);
      // 保存到本地
      try {
        tt.setStorageSync('sixtyFourGuaDataStudy', require('../../data/sixtyFourGua.js').sixtyFourGuaDataStudy);
      } catch (e) {
        console.error('保存学习进度失败', e);
      }
      console.log(`卦象 ${index + 1} 已标记为完成`);
    }
  },
  
  // 设置页面背景色
  setPageBackground(imagePath) {
    // 使用tt.setNavigationBarColor设置导航栏颜色
    tt.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#667eea',
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      },
      success: (res) => {
        console.log('导航栏颜色设置成功:', res);
      },
      fail: (err) => {
        console.error('导航栏颜色设置失败:', err);
      }
    });
  },
  
  // 图片加载成功处理
  onImageLoad(e) {
    // 检查图片尺寸和质量
    const { width, height } = e.detail;
    
    // 如果图片尺寸太小，可能影响清晰度
    if (width < 750 || height < 1334) {
      console.warn('图片分辨率较低，可能影响显示效果');
    }
  },

  // 图片加载失败处理
  onImageError(e) {
    console.error('背景图片加载失败:', e);
    // 如果图片加载失败，可以设置一个默认背景
    this.setData({
      'gua.image': '../../assets/images/1.jpg' // 使用默认图片
    });
  },

  // 绘制卦象
  drawGuaSymbol(guaIndex) {
    // 获取卦象组件数据
    const components = getGuaComponents(guaIndex);
    this.setData({
      guaComponents: components
    });
  },
  
  // 在Canvas上绘制卦象
  drawGuaSymbolToCanvas(guaIndex) {
    const query = tt.createSelectorQuery();
    query.select('.gua-symbol-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 设置canvas尺寸
          const dpr = tt.getSystemInfoSync().pixelRatio;
          canvas.width = 100 * dpr;
          canvas.height = 160 * dpr;
          ctx.scale(dpr, dpr);
          
          // 绘制卦象
          drawGuaSymbol(canvas, guaIndex, {
            width: 100,
            height: 160,
            lineWidth: 6,
            lineColor: '#333',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: 8
          });
        } else {
          console.error('未找到Canvas元素');
        }
      });
  },
  
  // Canvas触摸事件处理
  onCanvasTouch(e) {
    // 可以在这里添加交互效果，比如放大显示卦象
    this.showGuaSymbolDetail();
  },
  
  // 显示卦象详情
  showGuaSymbolDetail() {
    const { index, gua, guaComponents } = this.data;
    if (index !== null && gua) {
      const guaNumber = index + 1;
      const lines = getGuaLines(index);
      const yangCount = lines ? lines.filter(line => line === 1).length : 0;
      const yinCount = lines ? lines.filter(line => line === 0).length : 0;
      
      let content = `卦象由六爻组成：\n阳爻：${yangCount}个\n阴爻：${yinCount}个`;
      
      if (guaComponents) {
        content += `\n\n上卦：${guaComponents.upper}\n下卦：${guaComponents.lower}`;
      }
      
      tt.showModal({
        title: `第${guaNumber}卦：${gua.guaName}`,
        content: content,
        showCancel: false,
        confirmText: '关闭',
        success: (res) => {
          // 用户点击关闭按钮
        }
      });
    }
  },

  onUnload() {
    if (this.data.index !== null) {
      updateStudyProgress(this.data.index, true);
      try {
        tt.setStorageSync('sixtyFourGuaDataStudy', require('../../data/sixtyFourGua.js').sixtyFourGuaDataStudy);
      } catch (e) {
        console.error('保存学习进度失败', e);
      }
      
      // 通知前一页刷新
      const pages = getCurrentPages();
      if (pages.length > 1) {
        const prevPage = pages[pages.length - 2];
        if (prevPage) {
          // 如果前一页有refreshGuaList方法，调用它
          if (prevPage.refreshGuaList) {
            prevPage.refreshGuaList();
          }
          // 如果前一页有setData方法，强制刷新数据
          else if (prevPage.setData) {
            prevPage.setData({
              forceRefresh: Date.now() // 强制刷新
            });
          }
        }
      }
      
      console.log(`卦象 ${this.data.index + 1} 已标记为完成`);
    }
  },

  // 页面隐藏时也标记为完成（用户可能通过其他方式离开页面）
  onHide() {
    if (this.data.index !== null) {
      updateStudyProgress(this.data.index, true);
      try {
        tt.setStorageSync('sixtyFourGuaDataStudy', require('../../data/sixtyFourGua.js').sixtyFourGuaDataStudy);
      } catch (e) {
        console.error('保存学习进度失败', e);
      }
    }
  }
}); 