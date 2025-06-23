// 引入64卦静态数据和工具函数
const { sixtyFourGuaData } = require('../../data/sixtyFourGua.js');
const { getGuaLines, getGuaComponents } = require('../../data/gua-data.js');

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
    changedGuaDetail: []
  },

  // 统一处理结果数据的方法
  processResultData({ yaoResults = [], originalGua = [], changedGua = [], bian = [], originalGuaName = '', changedGuaName = '', originalGuaInfo = null, changedGuaInfo = null, interpretationMethod = null }) {
    let originalGuaDetail = [];
    let changedGuaDetail = [];
    // 优先用 originalGua、changedGua、bian 生成所有数据
    if (originalGua.length === 6 && changedGua.length === 6 && bian.length === 6) {
      originalGuaDetail = originalGua.map((v, i) => {
        let isBian = !!bian[i];
        let type = '';
        let symbol = '';
        let value = 0;
        if (v === 1 && isBian) { type = 'laoyang'; symbol = 'O—'; value = 9; }
        else if (v === 0 && isBian) { type = 'laoyin'; symbol = 'X--'; value = 6; }
        else if (v === 1) { type = 'shao-yang'; symbol = '—'; value = 7; }
        else if (v === 0) { type = 'shao-yin'; symbol = '--'; value = 8; }
        return { type, symbol, isBian, value };
      });
      changedGuaDetail = changedGua.map((v, i) => {
        let isBian = !!bian[i];
        let type = '';
        let symbol = '';
        // 变卦变爻只高亮，不用特殊符号
        if (v === 1) { type = 'shao-yang'; symbol = '—'; }
        else if (v === 0) { type = 'shao-yin'; symbol = '--'; }
        return { type, symbol, isBian, value: v };
      });
      // 自动补全yaoResults用于爻象区块
      yaoResults = Array(6).fill(0).map((_, i) => {
        let value = 7;
        let type = '';
        let symbol = '';
        let desc = '';
        if (originalGua[i] === 1 && bian[i]) { value = 9; type = 'laoyang'; symbol = 'O—'; desc = '老阳（变爻）'; }
        else if (originalGua[i] === 0 && bian[i]) { value = 6; type = 'laoyin'; symbol = 'X--'; desc = '老阴（变爻）'; }
        else if (originalGua[i] === 1) { value = 7; type = 'shao-yang'; symbol = '—'; desc = '少阳'; }
        else if (originalGua[i] === 0) { value = 8; type = 'shao-yin'; symbol = '--'; desc = '少阴'; }
        return {
          isEmpty: false,
          number: 6 - i,
          result: {
            value,
            type,
            symbol,
            desc,
            coinFaces: [],
            coinStatusText: ''
          }
        };
      });
    } else if (yaoResults.length === 6) {
      // 仅在 originalGua 等无效时才用 yaoResults
      originalGuaDetail = yaoResults.map(yao => {
        if (!yao.result) return { type: '', symbol: '', isBian: false };
        let isBian = yao.result.value === 6 || yao.result.value === 9;
        return {
          type: yao.result.type,
          symbol: yao.result.symbol,
          isBian,
          value: yao.result.value
        };
      });
      changedGuaDetail = yaoResults.map(yao => {
        if (!yao.result) return { type: '', symbol: '', isBian: false };
        let isBian = yao.result.value === 6 || yao.result.value === 9;
        let value = yao.result.value;
        let type = '';
        let symbol = '';
        // 变卦变爻只高亮，不用特殊符号
        if (value === 9 || value === 8) { type = 'shao-yin'; symbol = '--'; }
        else if (value === 6 || value === 7) { type = 'shao-yang'; symbol = '—'; }
        return { type, symbol, isBian, value };
      });
    }
    // 自动补全 originalGuaInfo/changedGuaInfo
    let originalGuaIdx = -1, changedGuaIdx = -1;
    if ((!originalGuaInfo || !originalGuaInfo.guaCi) && originalGua.length === 6) {
      const og = this.findGuaName(originalGua);
      originalGuaName = og.name;
      originalGuaIdx = og.index;
      originalGuaInfo = sixtyFourGuaData[originalGuaIdx] || null;
    }
    if ((!changedGuaInfo || !changedGuaInfo.guaCi) && changedGua.length === 6) {
      const cg = this.findGuaName(changedGua);
      changedGuaName = cg.name;
      changedGuaIdx = cg.index;
      changedGuaInfo = sixtyFourGuaData[changedGuaIdx] || null;
    }
    this.setData({
      originalGua,
      changedGua,
      bian,
      originalGuaName,
      changedGuaName,
      originalGuaInfo,
      changedGuaInfo,
      interpretationMethod,
      yaoResults,
      originalGuaDetail,
      changedGuaDetail,
      currentRound: 6,
      totalRounds: 6
    });
  },

  onLoad(options) {
    // 支持事件通道接收数据（已废弃）
    // 只用 URL 参数解析
    try {
      let yaoResults = options.yaoResults ? JSON.parse(decodeURIComponent(options.yaoResults)) : [];
      let originalGua = options.originalGua ? JSON.parse(decodeURIComponent(options.originalGua)) : [];
      let changedGua = options.changedGua ? JSON.parse(decodeURIComponent(options.changedGua)) : [];
      let bian = options.bian ? JSON.parse(decodeURIComponent(options.bian)) : [];
      let originalGuaName = options.originalGuaName || '';
      let changedGuaName = options.changedGuaName || '';
      let originalGuaInfo = options.originalGuaInfo ? JSON.parse(decodeURIComponent(options.originalGuaInfo)) : null;
      let changedGuaInfo = options.changedGuaInfo ? JSON.parse(decodeURIComponent(options.changedGuaInfo)) : null;
      let interpretationMethod = options.interpretationMethod ? JSON.parse(decodeURIComponent(options.interpretationMethod)) : null;
      this.processResultData({ yaoResults, originalGua, changedGua, bian, originalGuaName, changedGuaName, originalGuaInfo, changedGuaInfo, interpretationMethod });
    } catch (e) {
      console.error('结果解析页面参数解析失败', e, options);
    }
  },

  // 根据爻象数组查找卦名
  findGuaName(yaoArray) {
    const binaryString = yaoArray.map(yao => yao === 1 ? '1' : '0').join('');
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
    const guaInfo = guaCodeMap[binaryString];
    if (guaInfo) {
      return guaInfo;
    }
    return { name: '未知卦', index: -1 };
  },

  // 获取卦辞和爻辞
  getGuaContent(guaIndex) {
    if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
      return sixtyFourGuaData[guaIndex];
    }
    return null;
  },

  // 计算高亮信息
  calculateHighlightInfo(bian) {
    const height = new Array(14).fill(false);
    const bianCount = bian.filter(isBian => isBian).length;
    if (bianCount === 0) {
      height[0] = true;
    } else if (bianCount === 1) {
      const bianIndex = bian.findIndex(isBian => isBian);
      height[bianIndex + 1] = true;
      height[7] = true;
    } else if (bianCount === 2) {
      const bianIndices = [];
      for (let i = 0; i < 6; i++) {
        if (bian[i]) bianIndices.push(i);
      }
      height[bianIndices[0] + 1] = true;
      height[bianIndices[1] + 1] = true;
    } else if (bianCount === 3) {
      height[0] = true;
      height[7] = true;
    } else if (bianCount === 4) {
      const unchangedIndices = [];
      for (let i = 0; i < 6; i++) {
        if (!bian[i]) unchangedIndices.push(i);
      }
      height[unchangedIndices[0] + 8] = true;
      height[unchangedIndices[1] + 8] = true;
    } else if (bianCount === 5) {
      for (let i = 0; i < 6; i++) {
        if (!bian[i]) {
          height[i + 8] = true;
          break;
        }
      }
    } else if (bianCount === 6) {
      height[7] = true;
    }
    return height;
  },

  // 分析解读方法
  analyzeInterpretationMethod(yaoResults, originalGuaName, changedGuaName) {
    const bian = yaoResults.map(yao => yao.result && (yao.result.value === 9 || yao.result.value === 6));
    const highlightInfo = this.calculateHighlightInfo(bian);
    const changingCount = bian.filter(isBian => isBian).length;
    let method = {
      type: '',
      description: '',
      highlightInfo: highlightInfo
    };
    if (changingCount === 0) {
      method.type = '无变爻';
      method.description = '直接看本卦卦辞';
    } else if (changingCount === 1) {
      method.type = '1个变爻';
      method.description = '以本卦变爻爻辞为主，参考之卦整体含义';
    } else if (changingCount === 2) {
      method.type = '2个变爻';
      method.description = '以本卦两个变爻爻辞为主，以下爻（从下往上数）为重点';
    } else if (changingCount === 3) {
      method.type = '3个变爻';
      method.description = '看本卦与之卦的卦辞';
      const hasFirstYaoChanged = bian[0];
      if (hasFirstYaoChanged) {
        method.description += '（初爻变则重之卦）';
      } else {
        method.description += '（初爻未变重本卦）';
      }
    } else if (changingCount === 4) {
      method.type = '4个变爻';
      method.description = '以之卦两个不变爻爻辞为主（以下爻为重）';
    } else if (changingCount === 5) {
      method.type = '5个变爻';
      method.description = '以之卦唯一不变爻的爻辞为主';
    } else if (changingCount === 6) {
      method.type = '6个变爻';
      method.description = '乾卦变坤卦：用乾卦"用九"；坤卦变乾卦：用坤卦"用六"；其余卦看之卦卦辞';
      if (originalGuaName === '乾' && changedGuaName === '坤') {
        method.description = '乾卦变坤卦：用乾卦"用九"（见群龙无首）';
        method.highlightInfo = new Array(14).fill(false);
        method.highlightInfo[6] = true;
      } else if (originalGuaName === '坤' && changedGuaName === '乾') {
        method.description = '坤卦变乾卦：用坤卦"用六"（利永贞）';
        method.highlightInfo = new Array(14).fill(false);
        method.highlightInfo[6] = true;
      }
    }
    return method;
  }
}); 