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
    // 铜钱图片路径
    wuZhu1: '../../assets/wu_zhu_1.jpg',
    wuZhu2: '../../assets/wu_zhu_2.jpg',
    
    // 铜钱状态
    coins: [
      { isSpinning: false, showFront: true, result: null },
      { isSpinning: false, showFront: true, result: null },
      { isSpinning: false, showFront: true, result: null }
    ],
    
    // 当前摇卦次数
    currentRound: 0,
    
    // 总摇卦次数
    totalRounds: 6,
    
    // 爻结果数组（固定6个位置）
    yaoResults: [
      { isEmpty: true, number: 6 },
      { isEmpty: true, number: 5 },
      { isEmpty: true, number: 4 },
      { isEmpty: true, number: 3 },
      { isEmpty: true, number: 2 },
      { isEmpty: true, number: 1 }
    ],
    
    // 是否正在摇卦
    isDivinating: false,
    
    // 摇卦按钮是否禁用
    isDivinationDisabled: false,
    
    // 当前卦象是否已保存
    isCurrentGuaSaved: false,
    
    // 当前卦象的爻值数组（用于判断是否重复）
    currentGuaYaoValues: null,
    
    // 免责声明文字
    disclaimerText: "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
    // 是否显示免责声明
    showDisclaimer: true
  },

  onLoad(options) {
    console.log('摇钱起卦页面加载');
    
    // 初始化铜钱
    this.initCoins();
    
    // 快速验证64卦编码
    this.quickValidate64Gua();
    
    // 确保免责声明文字正确获取
    this.setData({
      disclaimerText: app.globalData.disclaimerText || "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
      showDisclaimer: true
    });
  },

  onShow() {
    console.log('摇钱起卦页面显示');
  },

  // 初始化铜钱
  initCoins() {
    const coins = this.data.coins.map(coin => ({
      ...coin,
      isSpinning: false,
      showFront: true,
      result: null
    }));
    
    this.setData({
      coins,
      currentRound: 0,
      yaoResults: [
        { isEmpty: true, number: 6 },
        { isEmpty: true, number: 5 },
        { isEmpty: true, number: 4 },
        { isEmpty: true, number: 3 },
        { isEmpty: true, number: 2 },
        { isEmpty: true, number: 1 }
      ],
      isDivinating: false,
      isDivinationDisabled: false,
      isCurrentGuaSaved: false,
      currentGuaYaoValues: null
    });
  },

  // 点击铜钱
  onCoinTap(e) {
    const index = e.currentTarget.dataset.index;
    console.log('点击铜钱:', index);
    
    if (!this.data.isDivinating) {
      this.toggleCoinFace(index);
    }
  },

  // 切换铜钱正反面
  toggleCoinFace(index) {
    const coins = [...this.data.coins];
    coins[index].showFront = !coins[index].showFront;
    this.setData({ coins });
  },

  // 生成基于时间的随机数
  generateTimeBasedRandom() {
    return Math.floor(Math.random() * 8);
  },

  // 根据随机数确定铜钱正反面
  determineCoinFaces(randomNumber, isAnimation = false) {
    // 将随机数转换为3位二进制
    const binary = randomNumber.toString(2).padStart(3, '0');
    
    // 只在非动画状态或调试模式下输出日志
    if (!isAnimation) {
      console.log('二进制表示:', binary);
    }
    
    // 解析二进制，1表示正面，0表示反面
    const coinFaces = binary.split('').map(bit => bit === '1');
    
    if (!isAnimation) {
      console.log('铜钱正反面:', coinFaces.map(face => face ? '正面' : '反面'));
    }
    
    return coinFaces;
  },

  // 摇卦功能（合并摇动和投掷）
  onDivination() {
    if (this.data.isDivinating || this.data.isDivinationDisabled) {
      tt.showToast({
        title: this.data.isDivinationDisabled ? '摇卦已完成，请点击重新起卦' : '正在摇卦中，请稍候',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 如果已完成六次摇卦，重新开始
    if (this.data.currentRound >= this.data.totalRounds) {
      this.initCoins();
      return;
    }

    console.log('开始摇卦，第', this.data.currentRound + 1, '次');
    this.setData({ isDivinating: true });

    // 开始旋转动画
    const coins = this.data.coins.map(coin => ({
      ...coin,
      isSpinning: true
    }));
    
    this.setData({ coins });

    // 使用时间随机数切换铜钱正反面
    const spinInterval = setInterval(() => {
      const randomNumber = this.generateTimeBasedRandom();
      const coinFaces = this.determineCoinFaces(randomNumber, true); // 动画状态，不输出日志
      
      const coins = this.data.coins.map((coin, index) => ({
        ...coin,
        showFront: coinFaces[index]
      }));
      
      this.setData({ coins });
    }, 300);

    // 3秒后停止旋转并确定结果
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // 最后一次使用时间随机数确定最终结果
      const finalRandomNumber = this.generateTimeBasedRandom();
      const finalCoinFaces = this.determineCoinFaces(finalRandomNumber);
      
      // 计算本次结果
      const result = this.calculateCoinResult(finalCoinFaces);
      
      // 更新铜钱状态，确保与结果对应
      const updatedCoins = this.data.coins.map((coin, index) => ({
        ...coin,
        isSpinning: false,
        showFront: finalCoinFaces[index],
        result: result
      }));
      
      // 添加到爻结果（从底向上添加）
      const yaoResults = [...this.data.yaoResults];
      // 由于数组是6,5,4,3,2,1的顺序，第1次摇卦填充索引5（第1爻），第2次填充索引4（第2爻），以此类推
      const targetIndex = 5 - this.data.currentRound;
      yaoResults[targetIndex] = {
        ...yaoResults[targetIndex],
        isEmpty: false,
        result: result
      };
      
      // 更新状态
      this.setData({
        coins: updatedCoins,
        yaoResults,
        currentRound: this.data.currentRound + 1,
        isDivinating: false
      });
      
      console.log('摇卦完成，最终铜钱状态:', finalCoinFaces.map(face => face ? '正面' : '反面'));
      console.log('对应爻象结果:', result);
      console.log('当前爻象数组（从底向上）:', this.data.yaoResults.map((yao, index) => `${index + 1}: ${yao.result ? yao.result.symbol : '空'}`));
      
      // 添加最终结果的清晰提示
      console.log('=== 第' + (this.data.currentRound) + '次摇卦最终结果 ===');
      console.log('铜钱状态:', finalCoinFaces.map(face => face ? '正面' : '反面').join(' '));
      console.log('爻象:', result.symbol, '(', result.desc, ')');
      console.log('========================');
      
      // 检查是否完成所有摇卦
      if (this.data.currentRound >= this.data.totalRounds) {
        // 禁用摇卦按钮
        this.setData({
          isDivinationDisabled: true
        });
      }
    }, 3000);
  },

  // 计算铜钱结果
  calculateCoinResult(coinFaces) {
    // 统计正面数量
    const frontCount = coinFaces.filter(face => face).length;
    
    // 根据正面数量确定结果
    let result;
    if (frontCount === 3) {
      // 三正：老阳
      result = {
        value: 9,
        type: 'lao-yang',
        symbol: 'O—',
        desc: '老阳（变爻）',
        coinFaces: coinFaces,
        coinStatusText: coinFaces.map(face => face ? '正' : '反').join('')
      };
    } else if (frontCount === 2) {
      // 二正：少阴
      result = {
        value: 8,
        type: 'shao-yin',
        symbol: '--',
        desc: '少阴',
        coinFaces: coinFaces,
        coinStatusText: coinFaces.map(face => face ? '正' : '反').join('')
      };
    } else if (frontCount === 1) {
      // 一正：少阳
      result = {
        value: 7,
        type: 'shao-yang',
        symbol: '—',
        desc: '少阳',
        coinFaces: coinFaces,
        coinStatusText: coinFaces.map(face => face ? '正' : '反').join('')
      };
    } else {
      // 零正：老阴
      result = {
        value: 6,
        type: 'lao-yin',
        symbol: 'X--',
        desc: '老阴（变爻）',
        coinFaces: coinFaces,
        coinStatusText: coinFaces.map(face => face ? '正' : '反').join('')
      };
    }
    
    console.log('铜钱结果:', result);
    return result;
  },

  // 测试卦象编码
  testGuaCode() {
    console.log('测试卦象编码...');
    
    // 运行完整验证
    const validationResult = this.validateAllGuaCodes();
    
    // 测试特定卦象
    // 测试乾卦：111111
    const qianGua = [1, 1, 1, 1, 1, 1];
    const qianResult = findGuaName(qianGua);
    console.log('乾卦测试结果:', qianResult);
    
    // 测试坤卦：000000
    const kunGua = [0, 0, 0, 0, 0, 0];
    const kunResult = findGuaName(kunGua);
    console.log('坤卦测试结果:', kunResult);
    
    // 测试鼎卦：101110
    const dingGua = [1, 0, 1, 1, 1, 0];
    const dingResult = findGuaName(dingGua);
    console.log('鼎卦测试结果:', dingResult);
    
    // 测试小过卦：001100
    const xiaoguoGua = [0, 0, 1, 1, 0, 0];
    const xiaoguoResult = findGuaName(xiaoguoGua);
    console.log('小过卦测试结果:', xiaoguoResult);
    
    // 测试咸卦：001110
    const xianGua = [0, 0, 1, 1, 1, 0];
    const xianResult = findGuaName(xianGua);
    console.log('咸卦测试结果:', xianResult);
    
    console.log('验证结果总结:', validationResult);
  },

  // 重新起卦
  onNewDivination() {
    this.initCoins();
    // 重新启用摇卦按钮
    this.setData({
      isDivinationDisabled: false
    });
    console.log('用户重新开始摇卦');
  },

  // 查看卦象
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

  // 快速验证64卦编码
  quickValidate64Gua() {
    console.log('=== 64卦编码快速验证 ===');
    
    // 生成所有可能的6位二进制编码（000000到111111）
    const allPossibleCodes = [];
    for (let i = 0; i < 64; i++) {
      const binary = i.toString(2).padStart(6, '0');
      allPossibleCodes.push(binary);
    }
    
    // 当前映射表中的编码
    const guaCodeMap = getApp().globalData.guaCodeMap;
    
    const definedCodes = Object.keys(guaCodeMap);
    console.log('已定义的编码数量:', definedCodes.length);
    console.log('已定义的编码:', definedCodes);
    
    // 检查缺失的编码
    const missingCodes = allPossibleCodes.filter(code => !definedCodes.includes(code));
    console.log('缺失的编码数量:', missingCodes.length);
    if (missingCodes.length > 0) {
      console.log('缺失的编码:', missingCodes);
    }
    
    // 检查重复的编码
    const uniqueCodes = new Set(definedCodes);
    if (uniqueCodes.size !== definedCodes.length) {
      console.error('发现重复的编码！');
      const duplicates = definedCodes.filter((code, index) => definedCodes.indexOf(code) !== index);
      console.log('重复的编码:', duplicates);
    } else {
      console.log('没有重复的编码');
    }
    
    // 检查索引是否正确
    const indexErrors = [];
    for (const [code, info] of Object.entries(guaCodeMap)) {
      if (info.index < 0 || info.index > 63) {
        indexErrors.push({ code, index: info.index, name: info.name });
      }
    }
    if (indexErrors.length > 0) {
      console.error('发现索引错误:', indexErrors);
    } else {
      console.log('所有索引都在正确范围内');
    }
    
    return {
      totalPossible: allPossibleCodes.length,
      totalDefined: definedCodes.length,
      missing: missingCodes,
      duplicates: definedCodes.filter((code, index) => definedCodes.indexOf(code) !== index),
      indexErrors: indexErrors
    };
  },

  // 验证所有卦象编码
  validateAllGuaCodes() {
    const { validateAllGuaCodes } = require('../../utils/gua-utils.js');
    const guaCodeMap = getApp().globalData.guaCodeMap;
    return validateAllGuaCodes(guaCodeMap);
  },

  onResultAnalysis() {
    // 检查是否完成全部六次摇卦
    if (this.data.currentRound < this.data.totalRounds) {
      tt.showToast({ 
        title: '请先完成全部6次摇卦', 
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 提取爻值数组（简化方式）
    const yaoValues = this.data.yaoResults.map(yao => yao.result ? yao.result.value : 7);
    
    // 跳转到结果解析页面（使用新的简化方式）
    const params = {
      yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
    };
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    
    // 调试打印
    console.log('【onResultAnalysis】使用简化方式传递爻值数组:', yaoValues);
    console.log('跳转url:', `/pages/result-analysis/result-analysis?${query}`);
    
    app.globalData.divinationResult = null;
    tt.navigateTo({
      url: `/pages/result-analysis/result-analysis?${query}`,
      success: () => {
        console.log('跳转到结果解析页面成功');
      },
      fail: (err) => {
        console.error('跳转到结果解析页面失败:', err);
        tt.showToast({ 
          title: '跳转失败，请重试', 
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  onTimeDivination() {
    tt.navigateTo({
      url: '/pages/time-divination/time-divination',
      fail: (err) => {
        tt.showToast({ title: '跳转失败', icon: 'none' });
      }
    });
  },

  onNumberDivination() {
    tt.navigateTo({
      url: '/pages/number-divination/number-divination',
      fail: (err) => {
        tt.showToast({ title: '跳转失败', icon: 'none' });
      }
    });
  },

  onCharacterDivination() {
    tt.navigateTo({
      url: '/pages/character-divination/character-divination',
      fail: (err) => {
        tt.showToast({ title: '跳转失败', icon: 'none' });
      }
    });
  },

  // 保存当前摇卦卦象到用户个人数据
  saveCoinDivinationToUserData() {
    // 检查是否完成全部六次摇卦
    if (this.data.currentRound < this.data.totalRounds) {
      tt.showToast({ 
        title: '请先完成全部6次摇卦', 
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 提取当前爻值数组
    const yaoValues = this.data.yaoResults.map(yao => yao.result ? yao.result.value : 7);
    
    // 检查是否已经保存过相同的卦象
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
    
    // 使用统一的保存函数
    saveGuaHistoryRecord(yaoValues, 'coin')
      .then(() => {
        console.log('铜钱起卦历史记录保存成功');
        // 标记当前卦象已保存
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
        console.error('保存历史记录失败:', err);
        tt.showToast({ 
          title: '保存失败，请重试', 
          icon: 'none',
          duration: 2000
        });
      });
  },

  // 供按钮调用
  onSaveCoinDivinationToUserData() {
    this.saveCoinDivinationToUserData();
  },

  // 关闭免责声明
  onCloseDisclaimer() {
    this.setData({
      showDisclaimer: false
    });
  }

}); 