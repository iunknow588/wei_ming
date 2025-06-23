// 获取全局 app 实例
const app = getApp();

// 引入64卦数据
const { sixtyFourGuaData } = require('../../data/sixtyFourGua.js');

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
    isDivinationDisabled: false
  },

  onLoad(options) {
    console.log('摇钱起卦页面加载');
    
    // 初始化铜钱
    this.initCoins();
    
    // 快速验证64卦编码
    this.quickValidate64Gua();
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
      isDivinationDisabled: false
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
    const now = new Date();
    const timestamp = now.getTime();
    const milliseconds = now.getMilliseconds();
    const randomSeed = (timestamp % 999999) + milliseconds * 59;
    const randomNumber = Math.abs(randomSeed % 8);
    return randomNumber;
  },

  // 根据随机数确定铜钱正反面
  determineCoinFaces(randomNumber) {
    // 将随机数转换为3位二进制
    const binary = randomNumber.toString(2).padStart(3, '0');
    console.log('二进制表示:', binary);
    
    // 解析二进制，1表示正面，0表示反面
    const coinFaces = binary.split('').map(bit => bit === '1');
    
    console.log('铜钱正反面:', coinFaces.map(face => face ? '正面' : '反面'));
    
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
      const coinFaces = this.determineCoinFaces(randomNumber);
      
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
    const qianResult = this.findGuaName(qianGua);
    console.log('乾卦测试结果:', qianResult);
    
    // 测试坤卦：000000
    const kunGua = [0, 0, 0, 0, 0, 0];
    const kunResult = this.findGuaName(kunGua);
    console.log('坤卦测试结果:', kunResult);
    
    // 测试鼎卦：101110
    const dingGua = [1, 0, 1, 1, 1, 0];
    const dingResult = this.findGuaName(dingGua);
    console.log('鼎卦测试结果:', dingResult);
    
    // 测试小过卦：001100
    const xiaoguoGua = [0, 0, 1, 1, 0, 0];
    const xiaoguoResult = this.findGuaName(xiaoguoGua);
    console.log('小过卦测试结果:', xiaoguoResult);
    
    // 测试咸卦：001110
    const xianGua = [0, 0, 1, 1, 1, 0];
    const xianResult = this.findGuaName(xianGua);
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
  onViewGua() {
    console.log('查看解读方法');
    
    // 跳转到解读方法页面
    tt.navigateTo({
      url: '/pages/interpretation/interpretation',
      success: () => {
        console.log('跳转到解读方法页面成功');
      },
      fail: (err) => {
        console.error('跳转到解读方法页面失败:', err);
        // 如果跳转失败，回退到弹窗显示
        this.showInterpretationModal();
      }
    });
  },

  // 显示解读方法弹窗（备用方案）
  showInterpretationModal() {
    const content = this.formatGuaResult({});
    
    tt.showModal({
      title: '解读方法',
      content: content,
      showCancel: false,
      confirmText: '了解',
      success: () => {
        console.log('用户查看了解读方法');
      }
    });
  },

  // 构建本卦
  buildOriginalGua() {
    return this.data.yaoResults.map(yao => {
      if (yao.result && yao.result.value === 9) return 1; // 老阳变阴
      if (yao.result && yao.result.value === 6) return 0; // 老阴变阳
      if (yao.result && yao.result.value === 7) return 1; // 少阳
      if (yao.result && yao.result.value === 8) return 0; // 少阴
      return 0;
    });
  },

  // 构建变卦
  buildChangedGua() {
    return this.data.yaoResults.map(yao => {
      if (yao.result && yao.result.value === 9) return 0; // 老阳变阴
      if (yao.result && yao.result.value === 6) return 1; // 老阴变阳
      if (yao.result && yao.result.value === 7) return 1; // 少阳不变
      if (yao.result && yao.result.value === 8) return 0; // 少阴不变
      return 0;
    });
  },

  // 格式化卦象结果
  formatGuaResult(guaData) {
    let content = '变卦说明\n';
    content += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    content += '在《易经》中出现变爻（即老阴"⚋"或老阳"⚊"）时，意味着该爻处于动态变化中，需要结合本卦（原始卦）和之卦（变化后的卦）综合解读。\n\n';
    content += '解读方法如下\n';
    content += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    content += '1. 无变爻\n';
    content += '   直接看本卦卦辞\n\n';
    content += '2. 1个变爻\n';
    content += '   以本卦变爻爻辞为主，参考之卦整体含义\n\n';
    content += '3. 2个变爻\n';
    content += '   以本卦两个变爻爻辞为主，以下爻（从下往上数）为重点\n\n';
    content += '4. 3个变爻\n';
    content += '   看本卦与之卦的卦辞\n';
    content += '   根据初爻是否变动有侧重点：\n';
    content += '   • 初爻未变重本卦\n';
    content += '   • 初爻变则重之卦\n\n';
    content += '5. 4个变爻\n';
    content += '   以之卦两个不变爻爻辞为主（以下爻为重）\n\n';
    content += '6. 5个变爻\n';
    content += '   以之卦唯一不变爻的爻辞为主\n\n';
    content += '7. 6个变爻\n';
    content += '   乾卦变坤卦：用乾卦"用九"（见群龙无首）\n';
    content += '   坤卦变乾卦：用坤卦"用六"（利永贞）\n';
    content += '   其余卦看之卦卦辞\n';
    
    return content;
  },

  // 根据爻象数组查找卦名
  findGuaName(yaoArray) {
    // 将爻象数组转换为二进制字符串（从底向上）
    const binaryString = yaoArray.map(yao => yao === 1 ? '1' : '0').join('');
    console.log('爻象数组:', yaoArray);
    console.log('爻象二进制:', binaryString);
    
    // 卦象编码映射表（从底向上：初爻到上爻）
    // 注意：这里的编码需要根据实际的卦象来调整
    const guaCodeMap = {
      '111111': { name: '乾', index: 0 }, // 1. 乾为天 - 六阳爻
      '000000': { name: '坤', index: 1 }, // 2. 坤为地 - 六阴爻
      '100010': { name: '屯', index: 2 }, // 3. 水雷屯
      '010001': { name: '蒙', index: 3 }, // 4. 山水蒙
      '010111': { name: '需', index: 4 }, // 5. 水天需
      '111010': { name: '讼', index: 5 }, // 6. 天水讼
      '010000': { name: '师', index: 6 }, // 7. 地水师
      '000010': { name: '比', index: 7 }, // 8. 水地比
      '110111': { name: '小畜', index: 8 }, // 9. 风天小畜
      '111011': { name: '履', index: 9 }, // 10. 天泽履
      '111000': { name: '泰', index: 10 }, // 11. 地天泰
      '000111': { name: '否', index: 11 }, // 12. 天地否
      '101111': { name: '同人', index: 12 }, // 13. 天火同人
      '111101': { name: '大有', index: 13 }, // 14. 火天大有
      '001000': { name: '谦', index: 14 }, // 15. 地山谦
      '000100': { name: '豫', index: 15 }, // 16. 雷地豫
      '100110': { name: '随', index: 16 }, // 17. 泽雷随
      '011001': { name: '蛊', index: 17 }, // 18. 山风蛊
      '110000': { name: '临', index: 18 }, // 19. 地泽临
      '000011': { name: '观', index: 19 }, // 20. 风地观
      '101001': { name: '噬嗑', index: 20 }, // 21. 火雷噬嗑
      '100101': { name: '贲', index: 21 }, // 22. 山火贲
      '100000': { name: '剥', index: 22 }, // 23. 山地剥
      '000001': { name: '复', index: 23 }, // 24. 地雷复
      '100111': { name: '无妄', index: 24 }, // 25. 天雷无妄
      '111001': { name: '大畜', index: 25 }, // 26. 山天大畜
      '100001': { name: '颐', index: 26 }, // 27. 山雷颐
      '011110': { name: '大过', index: 27 }, // 28. 泽风大过
      '010010': { name: '坎', index: 28 }, // 29. 坎为水
      '101101': { name: '离', index: 29 }, // 30. 离为火
      '001110': { name: '咸', index: 30 }, // 31. 泽山咸
      '011100': { name: '恒', index: 31 }, // 32. 雷风恒
      '111100': { name: '遁', index: 32 }, // 33. 天山遁
      '001111': { name: '大壮', index: 33 }, // 34. 雷天大壮
      '101000': { name: '晋', index: 34 }, // 35. 火地晋
      '000101': { name: '明夷', index: 35 }, // 36. 地火明夷
      '110101': { name: '家人', index: 36 }, // 37. 风火家人
      '101011': { name: '睽', index: 37 }, // 38. 火泽睽
      '001010': { name: '蹇', index: 38 }, // 39. 水山蹇
      '010100': { name: '解', index: 39 }, // 40. 雷水解
      '100011': { name: '损', index: 40 }, // 41. 山泽损
      '110001': { name: '益', index: 41 }, // 42. 风雷益
      '011111': { name: '夬', index: 42 }, // 43. 泽天夬
      '111110': { name: '姤', index: 43 }, // 44. 天风姤
      '011000': { name: '萃', index: 44 }, // 45. 泽地萃
      '000110': { name: '升', index: 45 }, // 46. 地风升
      '011010': { name: '困', index: 46 }, // 47. 泽水困
      '010110': { name: '井', index: 47 }, // 48. 水风井
      '011101': { name: '革', index: 48 }, // 49. 泽火革
      '101110': { name: '鼎', index: 49 }, // 50. 火风鼎
      '001001': { name: '震', index: 50 }, // 51. 震为雷
      '100100': { name: '艮', index: 51 }, // 52. 艮为山
      '110100': { name: '渐', index: 52 }, // 53. 风山渐
      '001011': { name: '归妹', index: 53 }, // 54. 雷泽归妹
      '001101': { name: '丰', index: 54 }, // 55. 雷火丰
      '101100': { name: '旅', index: 55 }, // 56. 火山旅
      '011011': { name: '巽', index: 56 }, // 57. 巽为风
      '110110': { name: '兑', index: 57 }, // 58. 兑为泽
      '110010': { name: '涣', index: 58 }, // 59. 风水涣
      '010011': { name: '节', index: 59 }, // 60. 水泽节
      '110011': { name: '中孚', index: 60 }, // 61. 风泽中孚
      '001100': { name: '小过', index: 61 }, // 62. 雷山小过
      '101010': { name: '既济', index: 62 }, // 63. 水火既济
      '010101': { name: '未济', index: 63 } // 64. 火水未济
    };
    
    // 查找对应的卦信息
    const guaInfo = guaCodeMap[binaryString];
    if (guaInfo) {
      console.log('找到卦象:', guaInfo);
      return guaInfo;
    }
    
    console.log('未找到匹配的卦象:', binaryString);
    console.log('可用的卦象编码:', Object.keys(guaCodeMap));
    return { name: '未知卦', index: -1 };
  },

  // 获取卦辞和爻辞
  getGuaContent(guaIndex) {
    if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
      return sixtyFourGuaData[guaIndex];
    }
    return null;
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
    const guaCodeMap = {
      '111111': { name: '乾', index: 0 },
      '000000': { name: '坤', index: 1 },
      '100010': { name: '屯', index: 2 },
      '010001': { name: '蒙', index: 3 },
      '010111': { name: '需', index: 4 },
      '111010': { name: '讼', index: 5 },
      '010000': { name: '师', index: 6 },
      '000010': { name: '比', index: 7 },
      '110111': { name: '小畜', index: 8 },
      '111011': { name: '履', index: 9 },
      '111000': { name: '泰', index: 10 },
      '000111': { name: '否', index: 11 },
      '101111': { name: '同人', index: 12 },
      '111101': { name: '大有', index: 13 },
      '001000': { name: '谦', index: 14 },
      '000100': { name: '豫', index: 15 },
      '100110': { name: '随', index: 16 },
      '011001': { name: '蛊', index: 17 },
      '110000': { name: '临', index: 18 },
      '000011': { name: '观', index: 19 },
      '101001': { name: '噬嗑', index: 20 },
      '100101': { name: '贲', index: 21 },
      '100000': { name: '剥', index: 22 },
      '000001': { name: '复', index: 23 },
      '100111': { name: '无妄', index: 24 },
      '111001': { name: '大畜', index: 25 },
      '100001': { name: '颐', index: 26 },
      '011110': { name: '大过', index: 27 },
      '010010': { name: '坎', index: 28 },
      '101101': { name: '离', index: 29 },
      '001110': { name: '咸', index: 30 },
      '011100': { name: '恒', index: 31 },
      '111100': { name: '遁', index: 32 },
      '001111': { name: '大壮', index: 33 },
      '101000': { name: '晋', index: 34 },
      '000101': { name: '明夷', index: 35 },
      '110101': { name: '家人', index: 36 },
      '101011': { name: '睽', index: 37 },
      '001010': { name: '蹇', index: 38 },
      '010100': { name: '解', index: 39 },
      '100011': { name: '损', index: 40 },
      '110001': { name: '益', index: 41 },
      '011111': { name: '夬', index: 42 },
      '111110': { name: '姤', index: 43 },
      '011000': { name: '萃', index: 44 },
      '000110': { name: '升', index: 45 },
      '011010': { name: '困', index: 46 },
      '010110': { name: '井', index: 47 },
      '011101': { name: '革', index: 48 },
      '101110': { name: '鼎', index: 49 },
      '001001': { name: '震', index: 50 },
      '100100': { name: '艮', index: 51 },
      '110100': { name: '渐', index: 52 },
      '001011': { name: '归妹', index: 53 },
      '001101': { name: '丰', index: 54 },
      '101100': { name: '旅', index: 55 },
      '011011': { name: '巽', index: 56 },
      '110110': { name: '兑', index: 57 },
      '110010': { name: '涣', index: 58 },
      '010011': { name: '节', index: 59 },
      '110011': { name: '中孚', index: 60 },
      '001100': { name: '小过', index: 61 },
      '101010': { name: '既济', index: 62 },
      '010101': { name: '未济', index: 63 }
    };
    
    const definedCodes = Object.keys(guaCodeMap);
    
    // 检查缺失的编码
    const missingCodes = allPossibleCodes.filter(code => !definedCodes.includes(code));
    
    // 检查重复的编码
    const duplicates = definedCodes.filter((code, index) => definedCodes.indexOf(code) !== index);
    
    console.log(`总编码数: ${allPossibleCodes.length}`);
    console.log(`已定义编码数: ${definedCodes.length}`);
    console.log(`缺失编码数: ${missingCodes.length}`);
    console.log(`重复编码数: ${duplicates.length}`);
    
    if (missingCodes.length > 0) {
      console.log('缺失的编码:', missingCodes);
    }
    
    if (duplicates.length > 0) {
      console.log('重复的编码:', duplicates);
    }
    
    // 检查索引范围
    const indexErrors = [];
    for (const [code, info] of Object.entries(guaCodeMap)) {
      if (info.index < 0 || info.index > 63) {
        indexErrors.push({ code, index: info.index, name: info.name });
      }
    }
    
    if (indexErrors.length > 0) {
      console.log('索引错误:', indexErrors);
    }
    
    console.log('=== 验证完成 ===');
    
    return {
      total: allPossibleCodes.length,
      defined: definedCodes.length,
      missing: missingCodes,
      duplicates: duplicates,
      indexErrors: indexErrors
    };
  },

  // 验证所有64卦编码
  validateAllGuaCodes() {
    console.log('开始验证所有64卦编码...');
    
    // 生成所有可能的6位二进制编码（000000到111111）
    const allPossibleCodes = [];
    for (let i = 0; i < 64; i++) {
      const binary = i.toString(2).padStart(6, '0');
      allPossibleCodes.push(binary);
    }
    
    console.log('所有可能的编码:', allPossibleCodes);
    
    // 获取当前映射表中的编码
    const guaCodeMap = {
      '111111': { name: '乾', index: 0 }, // 1. 乾为天 - 六阳爻
      '000000': { name: '坤', index: 1 }, // 2. 坤为地 - 六阴爻
      '100010': { name: '屯', index: 2 }, // 3. 水雷屯
      '010001': { name: '蒙', index: 3 }, // 4. 山水蒙
      '010111': { name: '需', index: 4 }, // 5. 水天需
      '111010': { name: '讼', index: 5 }, // 6. 天水讼
      '010000': { name: '师', index: 6 }, // 7. 地水师
      '000010': { name: '比', index: 7 }, // 8. 水地比
      '110111': { name: '小畜', index: 8 }, // 9. 风天小畜
      '111011': { name: '履', index: 9 }, // 10. 天泽履
      '111000': { name: '泰', index: 10 }, // 11. 地天泰
      '000111': { name: '否', index: 11 }, // 12. 天地否
      '101111': { name: '同人', index: 12 }, // 13. 天火同人
      '111101': { name: '大有', index: 13 }, // 14. 火天大有
      '001000': { name: '谦', index: 14 }, // 15. 地山谦
      '000100': { name: '豫', index: 15 }, // 16. 雷地豫
      '100110': { name: '随', index: 16 }, // 17. 泽雷随
      '011001': { name: '蛊', index: 17 }, // 18. 山风蛊
      '110000': { name: '临', index: 18 }, // 19. 地泽临
      '000011': { name: '观', index: 19 }, // 20. 风地观
      '101001': { name: '噬嗑', index: 20 }, // 21. 火雷噬嗑
      '100101': { name: '贲', index: 21 }, // 22. 山火贲
      '100000': { name: '剥', index: 22 }, // 23. 山地剥
      '000001': { name: '复', index: 23 }, // 24. 地雷复
      '100111': { name: '无妄', index: 24 }, // 25. 天雷无妄
      '111001': { name: '大畜', index: 25 }, // 26. 山天大畜
      '100001': { name: '颐', index: 26 }, // 27. 山雷颐
      '011110': { name: '大过', index: 27 }, // 28. 泽风大过
      '010010': { name: '坎', index: 28 }, // 29. 坎为水
      '101101': { name: '离', index: 29 }, // 30. 离为火
      '001110': { name: '咸', index: 30 }, // 31. 泽山咸
      '011100': { name: '恒', index: 31 }, // 32. 雷风恒
      '111100': { name: '遁', index: 32 }, // 33. 天山遁
      '001111': { name: '大壮', index: 33 }, // 34. 雷天大壮
      '101000': { name: '晋', index: 34 }, // 35. 火地晋
      '000101': { name: '明夷', index: 35 }, // 36. 地火明夷
      '110101': { name: '家人', index: 36 }, // 37. 风火家人
      '101011': { name: '睽', index: 37 }, // 38. 火泽睽
      '001010': { name: '蹇', index: 38 }, // 39. 水山蹇
      '010100': { name: '解', index: 39 }, // 40. 雷水解
      '100011': { name: '损', index: 40 }, // 41. 山泽损
      '110001': { name: '益', index: 41 }, // 42. 风雷益
      '011111': { name: '夬', index: 42 }, // 43. 泽天夬
      '111110': { name: '姤', index: 43 }, // 44. 天风姤
      '011000': { name: '萃', index: 44 }, // 45. 泽地萃
      '000110': { name: '升', index: 45 }, // 46. 地风升
      '011010': { name: '困', index: 46 }, // 47. 泽水困
      '010110': { name: '井', index: 47 }, // 48. 水风井
      '011101': { name: '革', index: 48 }, // 49. 泽火革
      '101110': { name: '鼎', index: 49 }, // 50. 火风鼎
      '001001': { name: '震', index: 50 }, // 51. 震为雷
      '100100': { name: '艮', index: 51 }, // 52. 艮为山
      '110100': { name: '渐', index: 52 }, // 53. 风山渐
      '001011': { name: '归妹', index: 53 }, // 54. 雷泽归妹
      '001101': { name: '丰', index: 54 }, // 55. 雷火丰
      '101100': { name: '旅', index: 55 }, // 56. 火山旅
      '011011': { name: '巽', index: 56 }, // 57. 巽为风
      '110110': { name: '兑', index: 57 }, // 58. 兑为泽
      '110010': { name: '涣', index: 58 }, // 59. 风水涣
      '010011': { name: '节', index: 59 }, // 60. 水泽节
      '110011': { name: '中孚', index: 60 }, // 61. 风泽中孚
      '001100': { name: '小过', index: 61 }, // 62. 雷山小过
      '101010': { name: '既济', index: 62 }, // 63. 水火既济
      '010101': { name: '未济', index: 63 } // 64. 火水未济
    };
    
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

  onResultAnalysis() {
    if (this.data.currentRound < this.data.totalRounds) {
      tt.showToast({ title: '请先完成全部6次摇卦', icon: 'none' });
      return;
    }
    const yaoResults = this.data.yaoResults;
    const originalGua = this.buildOriginalGua();
    const changedGua = this.buildChangedGua();
    const bian = yaoResults.map(yao => yao.result && (yao.result.value === 6 || yao.result.value === 9));
    // 调试打印
    console.log('【onResultAnalysis】即将传递的参数:');
    console.log('yaoResults:', JSON.stringify(yaoResults));
    console.log('originalGua:', JSON.stringify(originalGua));
    console.log('changedGua:', JSON.stringify(changedGua));
    console.log('bian:', JSON.stringify(bian));
    const url = `/pages/result-analysis/result-analysis?yaoResults=${encodeURIComponent(JSON.stringify(yaoResults))}` +
      `&originalGua=${encodeURIComponent(JSON.stringify(originalGua))}` +
      `&changedGua=${encodeURIComponent(JSON.stringify(changedGua))}` +
      `&bian=${encodeURIComponent(JSON.stringify(bian))}`;
    console.log('跳转url:', url);
    tt.navigateTo({
      url,
      fail: (err) => {
        tt.showToast({ title: '跳转失败', icon: 'none' });
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

}); 