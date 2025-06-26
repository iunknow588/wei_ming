// 获取全局 app 实例
const app = getApp();

// 引入64卦数据
const { sixtyFourGuaData, getGuaData } = require('../../data/sixtyFourGua.js');
const { getGuaLines, getGuaComponents } = require('../../data/gua-data.js');
const { 
  findGuaName, 
  analyzeInterpretationMethod 
} = require('../../utils/gua-utils.js');

// 引入solarlunar库
let solarlunar;
try {
  solarlunar = require('solarlunar');
  console.log('solarlunar库加载成功:', solarlunar);
} catch (error) {
  console.error('solarlunar库加载失败:', error);
  solarlunar = null;
}

Page({
  data: {
    // 爻结果数组（固定6个位置，从下到上）
    yaoResults: [
      { isEmpty: true, number: 6 },
      { isEmpty: true, number: 5 },
      { isEmpty: true, number: 4 },
      { isEmpty: true, number: 3 },
      { isEmpty: true, number: 2 },
      { isEmpty: true, number: 1 }
    ],
    
    // 是否正在生成卦象
    isDivinating: false,
    
    // 生成卦象按钮是否禁用
    isDivinationDisabled: false,
    
    // 当前卦象是否已保存
    isCurrentGuaSaved: false,
    
    // 当前卦象的爻值数组（用于判断是否重复保存）
    currentGuaYaoValues: null,
    result: {},
    systemTime: '', // 公历时间
    lunarTime: '', // 农历时间
    
    // 免责声明文字
    disclaimerText: "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
    // 是否显示免责声明
    showDisclaimer: true
  },

  onLoad(options) {
    console.log('时间起卦页面加载开始');
    
    // 页面加载时自动获取当前时间
    this.updateSystemTime();
    this.systemTimeTimer = setInterval(() => {
      this.updateSystemTime();
    }, 1000);
    
    // 确保免责声明文字正确获取
    this.setData({
      disclaimerText: app.globalData.disclaimerText || "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
      showDisclaimer: true
    });
  },

  onShow() {
    // 页面显示时可刷新时间
    // this.updateTimeInfo();
  },

  // 生成卦象（以当前时间为基准，时间起卦法）
  onDivination() {
    // 暂时使用简单的公历时间计算
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 简化的时间起卦算法（使用公历）
    const yearNum = (year % 12) + 1; // 年份转换为1-12
    const monthNum = month;
    const dayNum = day;
    const hourNum = Math.floor(hour / 2) + 1; // 小时转换为1-12时辰
    const minuteNum = minute;
    
    // 下卦数 = (年数+月数+日数) %8
    let lower = (yearNum + monthNum + dayNum) % 8;
    lower = lower === 0 ? 8 : lower;
    // 上卦数 = (年数+月数+日数+时数) %8
    let upper = (yearNum + monthNum + dayNum + hourNum) % 8;
    upper = upper === 0 ? 8 : upper;
    // 动爻数 = (年数+月数+日数+时数+分数) %6
    let moving = (yearNum + monthNum + dayNum + hourNum + minuteNum) % 6;
    moving = moving === 0 ? 6 : moving;
    // 查找卦名
    const guaName = findGuaName([...this.baguaToYao(lower), ...this.baguaToYao(upper)]);
    // 生成爻结果
    const yaoResults = this.buildYaoResults(upper, lower, moving);
    this.setData({
      yaoResults,
      result: { upper, lower, moving, guaName },
      isDivinationDisabled: false
    });
  },

  // 重新起卦，重置结果
  onNewDivination() {
    this.clearGuaResults();
    this.setData({ isCurrentGuaSaved: false });
  },

  // 跳转到卦象解读方法页面
  onViewBianGua() {
    console.log('查看解读方法');
    
    // 跳转到解读方法页面
    tt.navigateTo({
      url: '/pages/interpretation/interpretation',
      success: () => {
        console.log('跳转到解读方法页面成功');
      },
      fail: (err) => {
        console.error('跳转到解读方法页面失败:', err); 
      }
    });
  },

  // 根据上卦、下卦、动爻计算爻值数组（从下到上，6位，动爻为老阴/老阳）
  getYaoValuesFromResult() {
    const { result } = this.data;
    if (!result || !result.upper || !result.lower || !result.moving) return [7,7,7,7,7,7];
    // 下卦三爻（1-3），上卦三爻（4-6）
    const lowerYao = this.baguaToYao(result.lower); // [0,1,1]等
    const upperYao = this.baguaToYao(result.upper);
    const fullYao = [...lowerYao, ...upperYao]; // [第1爻, ..., 第6爻]
    // 动爻处理：第result.moving爻（从下到上）
    return fullYao.map((v, i) => {
      const yaoNumber = 6 - i;
      if (yaoNumber === result.moving) {
        // 动爻，阳爻变为老阳(9)，阴爻变为老阴(6)
        return v === 1 ? 9 : 6;
      }
      return v === 1 ? 7 : 8; // 7为少阳，8为少阴
    });
  },

  // 跳转到结果解析页面
  onResultAnalysis() {
    // 用新的函数计算爻值数组
    const yaoValues = this.getYaoValuesFromResult();
    // 跳转到结果解析页面
    const params = {
      yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
    };
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    app.globalData.divinationResult = null;
    tt.navigateTo({
      url: `/pages/result-analysis/result-analysis?${query}`
    });
  },

  // 保存当前时间起卦卦象到用户个人数据
  saveCoinDivinationToUserData() {
    // 提取当前爻值数组
    const yaoValues = this.data.yaoResults.map(yao => yao.result ? yao.result.value : 7);
    if (this.data.isCurrentGuaSaved && this.data.currentGuaYaoValues) {
      const isSameGua = JSON.stringify(yaoValues) === JSON.stringify(this.data.currentGuaYaoValues);
      if (isSameGua) {
        tt.showToast({ 
          title: '当前卦象已保存，无需重复保存', 
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    const { saveGuaHistoryRecord } = require('../../utils/gua-utils.js');
    saveGuaHistoryRecord(yaoValues, 'coin')
      .then(() => {
        this.setData({
          isCurrentGuaSaved: true,
          currentGuaYaoValues: yaoValues
        });
        tt.showToast({ 
          title: '卦象已保存', 
          icon: 'success',
          duration: 1500
        });
      })
      .catch((err) => {
        tt.showToast({ 
          title: '保存失败，请重试', 
          icon: 'none',
          duration: 2000
        });
      });
  },

  // 供按钮调用，保存卦象
  onSaveCoinDivinationToUserData() {
    this.saveCoinDivinationToUserData();
  },

  // 清空卦象结果
  clearGuaResults() {
    this.setData({
      yaoResults: [
        { isEmpty: true, number: 6 },
        { isEmpty: true, number: 5 },
        { isEmpty: true, number: 4 },
        { isEmpty: true, number: 3 },
        { isEmpty: true, number: 2 },
        { isEmpty: true, number: 1 }
      ],
      result: { upper: null, lower: null, moving: null, guaName: '' },
      isDivinationDisabled: true
    });
  },

  // 由八卦数转换为爻数组
  baguaToYao(num) {
    // 1-8 -> 3位二进制，阳为1，阴为0，从下到上
    const bin = (num - 1).toString(2).padStart(3, '0');
    return bin.split('').map(x => x === '1' ? 1 : 0);
  },

  // 生成爻结果
  buildYaoResults(upper, lower, moving) {
    const upperYao = this.baguaToYao(upper);
    const lowerYao = this.baguaToYao(lower);
    const fullYao = [...lowerYao, ...upperYao];
    return fullYao.map((yao, index) => {
      const yaoNumber = 6 - index;
      const isMoving = yaoNumber === moving;
      return {
        isEmpty: false,
        number: yaoNumber,
        result: {
          type: yao === 1 ? 'yang' : 'yin',
          symbol: yao === 1 ? '━━━' : '━ ━',
          desc: yao === 1 ? '阳爻' : '阴爻',
          isMoving: isMoving,
          coinStatusText: isMoving ? '动爻' : ''
        }
      };
    });
  },

  updateSystemTime() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    
    // 使用solarlunar转换农历
    try {
      // 检查solarlunar是否正确加载
      if (!solarlunar) {
        console.error('solarlunar库未加载');
        this.setData({ 
          systemTime: formatted,
          lunarTime: '农历库未加载'
        });
        return;
      }

      if (typeof solarlunar.solar2lunar !== 'function') {
        console.error('solarlunar.solar2lunar不是函数:', typeof solarlunar.solar2lunar);
        this.setData({ 
          systemTime: formatted,
          lunarTime: '农历函数不可用'
        });
        return;
      }

      console.log('开始农历转换，参数:', yyyy, parseInt(mm), parseInt(dd));
      const lunar = solarlunar.solar2lunar(yyyy, parseInt(mm), parseInt(dd));
      console.log('农历转换结果:', lunar);
      
      if (lunar && lunar.monthCn && lunar.dayCn) {
        // 格式化农历时间显示
        const lunarFormatted = `${lunar.gzYear}年 ${lunar.monthCn}${lunar.dayCn}`;
        console.log('格式化后的农历时间:', lunarFormatted);
        
        this.setData({ 
          systemTime: formatted,
          lunarTime: lunarFormatted
        });
      } else {
        console.error('农历数据不完整:', lunar);
        this.setData({ 
          systemTime: formatted,
          lunarTime: '农历数据不完整'
        });
      }
    } catch (error) {
      console.error('农历转换失败:', error);
      // 如果农历转换失败，只显示公历
      this.setData({ 
        systemTime: formatted,
        lunarTime: '农历转换异常'
      });
    }
  },

  onUnload() {
    if (this.systemTimeTimer) {
      clearInterval(this.systemTimeTimer);
      this.systemTimeTimer = null;
    }
  },

  // 处理时间框长按事件，防止页面退出
  onTimeBoxLongPress(e) {
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 显示提示信息
    tt.showToast({
      title: '时间显示区域',
      icon: 'none',
      duration: 1000
    });
  },

  // 处理时间框触摸开始事件
  onTimeBoxTouchStart(e) {
    // 阻止事件冒泡
    e.stopPropagation();
  },

  // 容器触摸事件，防止滑动冒泡到父页面
  onContainerTouchStart(e) {
    e.stopPropagation();
  },
  onContainerTouchMove(e) {
    e.stopPropagation();
  },
  onContainerTouchEnd(e) {
    e.stopPropagation();
  },

  // 关闭免责声明
  onCloseDisclaimer() {
    this.setData({
      showDisclaimer: false
    });
  }

}); 