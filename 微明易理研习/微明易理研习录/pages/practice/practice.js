// 获取全局 app 实例
const app = getApp();

const { sixtyFourGuaData } = require('../../data/sixtyFourGua.js');

Page({
  data: {
    // 起卦方法数据
    methodsData: {
      copper: {
        name: "铜钱摇卦法",
        steps: [
          "准备工具：三枚相同的硬币（古铜钱或现代硬币均可）",
          "集中意念：将三枚硬币合于掌心，集中精神默想所求测之事",
          "摇动记录：摇动硬币后抛掷，根据正反面情况记录爻象",
          "完成卦象：重复以上步骤六次，从下往上记录，形成一个六爻卦象"
        ],
        notes: [
          "摇卦时需保持专注，避免杂念干扰",
          "硬币的材质和大小应尽量一致，以减少误差"
        ]
      },
      yarrow: {
        name: "蓍草起卦法",
        steps: [
          "准备工具：五十根蓍草（可用木棍或牙签代替）",
          "分合蓍草：取出一根蓍草作为\"太极\"，剩下四十九根",
          "确定卦象：根据余数决定上卦、下卦及动爻，形成卦象"
        ],
        notes: [
          "仪式感强，被认为能更好地与宇宙能量连接",
          "操作繁琐，需要耐心和专注，适合有一定易学基础的人使用"
        ]
      },
      plum: {
        name: "梅花心易法",
        steps: [
          "随机取象：根据所遇事物的象数（如形状、颜色、声音等）或情境",
          "推演卦象：通过象数推演，确定上下卦及动爻"
        ],
        notes: [
          "灵活多变，适用于多种场景，尤其适合对易学有一定悟性的占卜者",
          "需要深厚的易学功底和敏锐的洞察力，初学者可能难以掌握"
        ]
      },
      time: {
        name: "时间起卦法",
        steps: [
          "确定时间：记录起卦的具体时间（公历或农历）",
          "计算卦象：将年、月、日的数字相加作为上卦，年、月、日、时的数字相加作为下卦",
          "确定动爻：将年、月、日、时的数字相加，除以6取余数确定动爻"
        ],
        notes: [
          "快速便捷，适合时间紧迫的情况",
          "需要熟悉先天八卦数及计算规则，否则可能出错"
        ]
      },
      number: {
        name: "数字起卦法",
        steps: [
          "选择数字：选取一个或多个数字（如电话号码、生日等）",
          "转换卦象：根据数字的数值，通过特定算法将其转换为卦象"
        ],
        notes: [
          "简单易行，适合数字敏感或喜欢逻辑推演的人",
          "算法因流派而异，初学者需参考相关书籍或指导"
        ]
      },
      character: {
        name: "汉字起卦法",
        steps: [
          "选择汉字：选取一个字或词语",
          "计算数值：根据笔画数或字典顺序计算数值",
          "确定卦象：将数值转换为上下卦及动爻"
        ],
        notes: [
          "适合文字敏感或喜欢语言符号的人",
          "需熟悉汉字的笔画数及八卦对应关系"
        ]
      }
    },
    historyRecords: []
  },

  onShow() {
    console.log('易理研习页面显示');
    // 读取历史摇卦数据
    let records = [];
    try {
      const allRecords = tt.getStorageSync('coinDivinationRecords') || {};
      records = Object.keys(allRecords).sort().reverse().map(key => {
        const rec = allRecords[key];
        return {
          key,
          originalGuaName: rec.originalGuaName,
          bianCount: Array.isArray(rec.bian) ? rec.bian.filter(Boolean).length : 0,
          record: rec
        };
      });
    } catch (e) {
      records = [];
    }
    this.setData({ historyRecords: records });
  },

  // 点击起卦方法
  onMethodTap(e) {
    const method = e.currentTarget.dataset.method;
    const methodData = this.data.methodsData[method];
    
    if (methodData) {
      this.showMethodDetail(methodData);
    }
  },

  // 显示起卦方法详情
  showMethodDetail(methodData) {
    let content = `【${methodData.name}】\n\n`;
    content += "操作步骤：\n";
    methodData.steps.forEach((step, index) => {
      content += `${index + 1}. ${step}\n`;
    });
    
    content += "\n注意事项：\n";
    methodData.notes.forEach((note, index) => {
      content += `${index + 1}. ${note}\n`;
    });
    
    tt.showModal({
      title: methodData.name,
      content: content,
      showCancel: false,
      confirmText: '了解',
      success: (res) => {
        console.log('用户了解了起卦方法:', methodData.name);
      }
    });
  },

  // 摇钱起卦
  onCoinDivination() {
    console.log('开始摇钱起卦');
    
    // 直接跳转到摇钱起卦页面
    this.startCoinDivination();
  },

  // 开始摇钱起卦
  startCoinDivination() {
    console.log('跳转到摇钱起卦页面');
    
    // 跳转到摇钱起卦页面
    tt.navigateTo({
      url: '/pages/coin-divination/coin-divination',
      success: () => {
        console.log('跳转到摇钱起卦页面成功');
      },
      fail: (err) => {
        console.error('跳转到摇钱起卦页面失败:', err);
        tt.showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 随时起卦
  onInstantDivination() {
    console.log('开始随时起卦');
    
    tt.showActionSheet({
      itemList: ['时间起卦', '数字起卦', '汉字起卦'],
      success: (res) => {
        const methods = ['time', 'number', 'character'];
        const selectedMethod = methods[res.tapIndex];
        console.log('选择起卦方法:', selectedMethod);
        
        this.showInstantDivinationGuide(selectedMethod);
      },
      fail: (err) => {
        console.error('选择起卦方法失败:', err);
      }
    });
  },

  // 显示随时起卦指导
  showInstantDivinationGuide(method) {
    const methodData = this.data.methodsData[method];
    
    if (methodData) {
      let content = `【${methodData.name}】\n\n`;
      content += "快速起卦指导：\n";
      methodData.steps.forEach((step, index) => {
        content += `${index + 1}. ${step}\n`;
      });
      
      tt.showModal({
        title: '随时起卦',
        content: content,
        showCancel: true,
        cancelText: '取消',
        confirmText: '开始起卦',
        success: (res) => {
          if (res.confirm) {
            this.startInstantDivination(method);
          }
        }
      });
    }
  },

  // 开始随时起卦
  startInstantDivination(method) {
    console.log('执行随时起卦:', method);
    
    // 这里可以添加实际的起卦逻辑
    tt.showToast({
      title: '起卦功能开发中',
      icon: 'none',
      duration: 2000
    });
  },

  // 历史记录项点击跳转到结果解析页面
  onHistoryItemTap(e) {
    const key = e.currentTarget.dataset.key;
    const item = this.data.historyRecords.find(r => r.key === key);
    if (!item) return;
    const rec = item.record;
    // 1. 还原本卦、变卦
    const originalGua = rec.originalGua;
    const changedGua = originalGua.map((v, i) => rec.bian[i] ? 1 - v : v);
    // 2. 查找卦名和索引
    const originalGuaInfo = this.findGuaName(originalGua);
    const changedGuaInfo = this.findGuaName(changedGua);
    // 3. 获取卦辞和爻辞
    const originalGuaContent = this.getGuaContent(originalGuaInfo.index);
    const changedGuaContent = this.getGuaContent(changedGuaInfo.index);
    // 4. 分析解读方法
    const interpretationMethod = this.analyzeInterpretationMethod(rec.bian, originalGuaInfo, changedGuaInfo);
    // 5. 跳转到结果解析页面
    const params = {
      originalGua: JSON.stringify(originalGua),
      changedGua: JSON.stringify(changedGua),
      bian: JSON.stringify(rec.bian),
      originalGuaName: originalGuaInfo.name,
      changedGuaName: changedGuaInfo.name,
      originalGuaInfo: encodeURIComponent(JSON.stringify(originalGuaContent)),
      changedGuaInfo: encodeURIComponent(JSON.stringify(changedGuaContent)),
      interpretationMethod: encodeURIComponent(JSON.stringify(interpretationMethod))
    };
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    tt.navigateTo({
      url: `/pages/result-analysis/result-analysis?${query}`
    });
  },

  // 根据爻象数组查找卦名
  findGuaName(yaoArray) {
    const binaryString = yaoArray.map(yao => yao === 1 ? '1' : '0').join('');
    const guaCodeMap = {
      '111111': { name: '乾', index: 0 }, '000000': { name: '坤', index: 1 }, '100010': { name: '屯', index: 2 }, '010001': { name: '蒙', index: 3 }, '010111': { name: '需', index: 4 }, '111010': { name: '讼', index: 5 }, '010000': { name: '师', index: 6 }, '000010': { name: '比', index: 7 }, '110111': { name: '小畜', index: 8 }, '111011': { name: '履', index: 9 }, '111000': { name: '泰', index: 10 }, '000111': { name: '否', index: 11 }, '101111': { name: '同人', index: 12 }, '111101': { name: '大有', index: 13 }, '001000': { name: '谦', index: 14 }, '000100': { name: '豫', index: 15 }, '100110': { name: '随', index: 16 }, '011001': { name: '蛊', index: 17 }, '110000': { name: '临', index: 18 }, '000011': { name: '观', index: 19 }, '101001': { name: '噬嗑', index: 20 }, '100101': { name: '贲', index: 21 }, '100000': { name: '剥', index: 22 }, '000001': { name: '复', index: 23 }, '100111': { name: '无妄', index: 24 }, '111001': { name: '大畜', index: 25 }, '100001': { name: '颐', index: 26 }, '011110': { name: '大过', index: 27 }, '010010': { name: '坎', index: 28 }, '101101': { name: '离', index: 29 }, '001110': { name: '咸', index: 30 }, '011100': { name: '恒', index: 31 }, '111100': { name: '遁', index: 32 }, '001111': { name: '大壮', index: 33 }, '101000': { name: '晋', index: 34 }, '000101': { name: '明夷', index: 35 }, '110101': { name: '家人', index: 36 }, '101011': { name: '睽', index: 37 }, '001010': { name: '蹇', index: 38 }, '010100': { name: '解', index: 39 }, '100011': { name: '损', index: 40 }, '110001': { name: '益', index: 41 }, '011111': { name: '夬', index: 42 }, '111110': { name: '姤', index: 43 }, '011000': { name: '萃', index: 44 }, '000110': { name: '升', index: 45 }, '011010': { name: '困', index: 46 }, '010110': { name: '井', index: 47 }, '011101': { name: '革', index: 48 }, '101110': { name: '鼎', index: 49 }, '001001': { name: '震', index: 50 }, '100100': { name: '艮', index: 51 }, '110100': { name: '渐', index: 52 }, '001011': { name: '归妹', index: 53 }, '001101': { name: '丰', index: 54 }, '101100': { name: '旅', index: 55 }, '011011': { name: '巽', index: 56 }, '110110': { name: '兑', index: 57 }, '110010': { name: '涣', index: 58 }, '010011': { name: '节', index: 59 }, '110011': { name: '中孚', index: 60 }, '001100': { name: '小过', index: 61 }, '101010': { name: '既济', index: 62 }, '010101': { name: '未济', index: 63 }
    };
    const guaInfo = guaCodeMap[binaryString];
    if (guaInfo) return guaInfo;
    return { name: '未知卦', index: -1 };
  },
  // 获取卦辞和爻辞
  getGuaContent(guaIndex) {
    if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
      return sixtyFourGuaData[guaIndex];
    }
    return null;
  },
  // 历史数据解读方法分析
  analyzeInterpretationMethod(bian, originalGuaInfo, changedGuaInfo) {
    // 复制自coin-divination，简化版
    const highlightInfo = new Array(14).fill(false);
    const bianCount = bian.filter(Boolean).length;
    let type = '', description = '';
    if (bianCount === 0) {
      type = '无变爻';
      description = '直接看本卦卦辞';
      highlightInfo[0] = true;
    } else if (bianCount === 1) {
      type = '1个变爻';
      description = '以本卦变爻爻辞为主，参考之卦整体含义';
      const bianIndex = bian.findIndex(Boolean);
      highlightInfo[bianIndex + 1] = true;
      highlightInfo[7] = true;
    } else if (bianCount === 2) {
      type = '2个变爻';
      description = '以本卦两个变爻爻辞为主，以下爻为重点';
      const bianIndices = [];
      for (let i = 0; i < 6; i++) if (bian[i]) bianIndices.push(i);
      highlightInfo[bianIndices[0] + 1] = true;
      highlightInfo[bianIndices[1] + 1] = true;
    } else if (bianCount === 3) {
      type = '3个变爻';
      description = '看本卦与之卦的卦辞';
      highlightInfo[0] = true;
      highlightInfo[7] = true;
    } else if (bianCount === 4) {
      type = '4个变爻';
      description = '以之卦两个不变爻爻辞为主（以下爻为重）';
      const unchangedIndices = [];
      for (let i = 0; i < 6; i++) if (!bian[i]) unchangedIndices.push(i);
      highlightInfo[unchangedIndices[0] + 8] = true;
      highlightInfo[unchangedIndices[1] + 8] = true;
    } else if (bianCount === 5) {
      type = '5个变爻';
      description = '以之卦唯一不变爻的爻辞为主';
      for (let i = 0; i < 6; i++) if (!bian[i]) highlightInfo[i + 8] = true;
    } else if (bianCount === 6) {
      type = '6个变爻';
      description = '乾卦变坤卦：用乾卦"用九"；坤卦变乾卦：用坤卦"用六"；其余卦看之卦卦辞';
      if (originalGuaInfo.name === '乾' && changedGuaInfo.name === '坤') {
        description = '乾卦变坤卦：用乾卦"用九"（见群龙无首）';
        highlightInfo[6] = true;
      } else if (originalGuaInfo.name === '坤' && changedGuaInfo.name === '乾') {
        description = '坤卦变乾卦：用坤卦"用六"（利永贞）';
        highlightInfo[6] = true;
      } else {
        highlightInfo[7] = true;
      }
    }
    return { type, description, highlightInfo };
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