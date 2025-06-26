// 获取全局 app 实例
const app = getApp();

// 引入64卦数据
const { sixtyFourGuaData, getGuaData } = require('../../data/sixtyFourGua.js');
const { getGuaLines, getGuaComponents } = require('../../data/gua-data.js');
const { 
  findGuaName, 
  analyzeInterpretationMethod 
} = require('../../utils/gua-utils.js');

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
    numberInput: '', // 用户输入的两位数
    
    // 免责声明文字
    disclaimerText: "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
    // 是否显示免责声明
    showDisclaimer: true
  },

  onLoad(options) {
    console.log('数字起卦页面加载');
    
    // 确保免责声明文字正确获取
    this.setData({
      disclaimerText: app.globalData.disclaimerText || "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
      showDisclaimer: true
    });
  },

  onShow() {
    console.log('数字起卦页面显示');
  },

  // 生成卦象（数字输入后自动生成）
  onDivination() {
    const value = this.data.numberInput;
    if (value.length === 2 && parseInt(value, 10) >= 10 && parseInt(value, 10) <= 99) {
      this.generateNumberDivination(parseInt(value, 10));
    } else {
      tt.showToast({ title: '请输入10~99的两位数', icon: 'none' });
    }
  },

  // 重新起卦，重置输入和结果
  onNewDivination() {
    this.setData({
      numberInput: '',
      isCurrentGuaSaved: false
    });
    this.clearGuaResults();
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

  // 保存当前数字起卦卦象到用户个人数据
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

  // 处理数字输入，自动生成或清空卦象
  onNumberInput(e) {
    const value = e.detail.value.replace(/[^0-9]/g, '');
    this.setData({ numberInput: value });
    if (value.length === 2 && parseInt(value, 10) >= 10 && parseInt(value, 10) <= 99) {
      this.generateNumberDivination(parseInt(value, 10));
    } else {
      // 清空卦象
      this.clearGuaResults();
    }
  },

  // 根据两位数自动生成卦象
  generateNumberDivination(num) {
    const shi = Math.floor(num / 10);
    const ge = num % 10;
    const upper = shi % 8 || 8;
    const lower = ge % 8 || 8;
    const moving = (shi + ge) % 6 || 6;
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

  // 关闭免责声明
  onCloseDisclaimer() {
    this.setData({
      showDisclaimer: false
    });
  }

}); 