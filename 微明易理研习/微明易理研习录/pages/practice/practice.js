// 获取全局 app 实例
const app = getApp();

const { sixtyFourGuaData, getGuaData } = require('../../data/sixtyFourGua.js');
const { getGuaLines, getGuaComponents } = require('../../data/gua-data.js');
const { 
  findGuaName, 
  analyzeInterpretationMethod,
  getGuaHistoryRecords,
  generateCompleteGuaResult
} = require('../../utils/gua-utils.js');

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
    
    const { getGuaHistoryRecords, generateCompleteGuaResult } = require('../../utils/gua-utils.js');
    
    // 使用新的单独文件存储方式
    getGuaHistoryRecords().then(historyRecords => {
      records = historyRecords.map(rec => {
        // 从爻值数组生成完整的卦象信息
        const completeResult = generateCompleteGuaResult(rec.yaoValues);
        
        return {
          key: rec.time, // 使用时间作为key
          originalGuaName: completeResult.originalGuaInfo.name || '',
          bianCount: completeResult.bian.filter(Boolean).length,
          divinationType: rec.divinationType || 'unknown',
          record: rec,
          completeResult: completeResult
        };
      });
      
      this.setData({ historyRecords: records });
    }).catch(err => {
      console.error('读取历史记录失败:', err);
      this.setData({ historyRecords: [] });
    });
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
    
    // 使用简化的参数传递方式
    const yaoValues = item.record.yaoValues;
    const params = {
      yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
    };
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    
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

}); 