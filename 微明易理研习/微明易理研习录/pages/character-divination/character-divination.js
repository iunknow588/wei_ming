const app = getApp();

// 引入64卦数据
const { sixtyFourGuaData, getGuaData } = require('../../data/sixtyFourGua.js');
const { getGuaLines, getGuaComponents } = require('../../data/gua-data.js');
const { 
  findGuaName, 
  analyzeInterpretationMethod 
} = require('../../utils/gua-utils.js');
// 修改为直接使用模块名
// const lunarjs = require('lunar-javascript');

// 引入一体化中文处理工具
const { getChineseInfo } = require('../../utils/chinese-processor.js');

// 引入卦象工具模块
const { findGuaName, saveGuaHistoryRecord, baguaNameToNumber, baguaToYao, getGuaName } = require('../../utils/gua-utils.js');

Page({
  data: {
    charA: '',
    charB: '',
    strokesA: '',
    strokesB: '',
    charInfoA: null,
    charInfoB: null,
    timeT: 0,
    result: { upper: null, lower: null, moving: null, guaName: '' },
    yaoResults: [],
    isDivinationDisabled: true,
    // 跑马灯相关数据
    availableChars: [],
    marqueeSpeedA: 45,
    marqueeSpeedB: 40,
    totalChars: 0,
    marqueeRateA: 1, // 上方跑马灯速度倍率，1为正常
    marqueeRateB: 1, // 下方跑马灯速度倍率，1为正常
    // 当前卦象是否已保存
    isCurrentGuaSaved: false,
    // 当前卦象的爻值数组（用于判断是否重复）
    currentGuaYaoValues: null,
    marqueeStartA: 0, // 第一个跑马灯起始索引
    marqueeStartB: 0, // 第二个跑马灯起始索引
    marqueeOffsetA: 0,
    marqueeOffsetB: 0,
    marqueeIndexes: [],
    marqueeTimerA: null,
    marqueeTimerB: null,
    systemTime: '', // 新增字段用于显示系统时间
    systemTimeTimer: null,
    // 免责声明文字
    disclaimerText: "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
    // 是否显示免责声明
    showDisclaimer: true
  },
  onLoad(options) {
    console.log('汉字起卦页面加载');
    
    this.updateTimeT();
    
    // 初始化可用汉字列表
    this.initAvailableChars();
    this.startMarqueeTimers();
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
    console.log('汉字起卦页面显示');
    
    // 每次显示页面时重新随机化汉字列表
    if (this.data.availableChars && this.data.availableChars.length > 0) {
      const reShuffledChars = this.shuffleArray([...this.data.availableChars]);
      this.setData({ 
        availableChars: reShuffledChars
      });
      console.log('页面显示时重新随机化汉字列表:', reShuffledChars.slice(0, 10), '...');
    }
    this.startMarqueeTimers();
  },
  onHide() {
    this.clearMarqueeTimers();
  },
  updateTimeT() {
    const t = new Date().getMilliseconds() % 9;
    this.setData({ timeT: t });
    this.calculateGua();
  },
  calculateGua() {
    const A = parseInt(this.data.strokesA, 10);
    const B = parseInt(this.data.strokesB, 10);
    const T = this.data.timeT;
    
    if (isNaN(A) || isNaN(B)) {
      this.setData({ 
        result: { upper: null, lower: null, moving: null, guaName: '' },
        isDivinationDisabled: true
      });
      return;
    }
    
    // 上卦数 (A % 8，如果为0则为8)
    const upper = A % 8 || 8;
    // 下卦数 (B % 8，如果为0则为8)
    const lower = B % 8 || 8;
    // 动爻数 ((A + B + T) % 6，如果为0则为6)
    const moving = (A + B + T) % 6 || 6;
    
    // 查找卦名
    const guaName = getGuaName(upper, lower);
    
    // 查找对应的64卦信息
    const guaInfo = this.findGuaInfoByName(guaName);
    
    this.setData({
      result: { 
        upper, 
        lower, 
        moving, 
        guaName,
        guaInfo: guaInfo || null
      },
      isDivinationDisabled: false
    });
    
    // 生成爻结果数组（用于传递给结果分析页面）
    this.generateYaoResults(upper, lower, moving);
  },  
  onRefreshTimeT() {
    this.updateTimeT();
  },
  // 生成爻结果数组
  generateYaoResults(upper, lower, moving) {
    // 将上下卦转换为爻数组
    const upperYao = baguaToYao(upper);
    const lowerYao = baguaToYao(lower);
    
    // 组合成完整的六爻（从底向上）
    const fullYao = [...lowerYao, ...upperYao];
    
    // 生成爻结果数组
    const yaoResults = fullYao.map((yao, index) => {
      const yaoNumber = 6 - index; // 从底向上编号
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
    
    this.setData({ yaoResults });
  },
  // 生成卦象按钮点击
  onGenerateGua() {
    if (!this.data.charA || !this.data.charB) {
      tt.showToast({
        title: '请输入两个汉字',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    this.calculateGua();
    
    tt.showToast({
      title: '卦象生成完成',
      icon: 'success',
      duration: 1500
    });
  },
  // 查看卦象（复用摇钱起卦页面实现）
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
  // 重新起卦
  onNewDivination() {
    this.setData({
      charA: '',
      charB: '',
      strokesA: '',
      strokesB: '',
      charInfoA: null,
      charInfoB: null,
      result: { upper: null, lower: null, moving: null, guaName: '' },
      yaoResults: [],
      isDivinationDisabled: true,
      isCurrentGuaSaved: false,
      currentGuaYaoValues: null,
      marqueeOffsetA: 0,
      marqueeOffsetB: 0
    });
    
    // 重新随机化汉字列表
    if (this.data.availableChars && this.data.availableChars.length > 0) {
      const reShuffledChars = this.shuffleArray([...this.data.availableChars]);
      const len = reShuffledChars.length;
      const marqueeStartA = Math.floor(Math.random() * len);
      const marqueeStartB = Math.floor(Math.random() * len);
      const marqueeIndexes = Array.from({length: len}, (_, i) => i);
      this.setData({ 
        availableChars: reShuffledChars,
        marqueeStartA,
        marqueeStartB,
        marqueeIndexes
      });
      console.log('重新起卦时重新随机化汉字列表:', reShuffledChars.slice(0, 10), '...');
    }
    
    // 更新时间T
    this.updateTimeT();
    this.startMarqueeTimers();
    
    console.log('用户重新开始起卦');
  },
  // 结果解析
  onResultAnalysis() {
    if (!this.data.result.upper) {
      tt.showToast({
        title: '请先生成卦象',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 提取六个爻值数组（简化参数传递）
    const yaoValues = this.data.yaoResults.map(yao => {
      if (yao.result && yao.result.isMoving) {
        // 动爻：老阳为9，老阴为6
        return yao.result.type === 'yang' ? 9 : 6;
      } else {
        // 静爻：少阳为7，少阴为8
        return yao.result.type === 'yang' ? 7 : 8;
      }
    });

    // 使用简化的参数传递
    const params = {
      yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
    };
    const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
    tt.navigateTo({
      url: `/pages/result-analysis/result-analysis?${query}`
    });
  },
  // 显示帮助说明
  onShowHelp() {
    tt.showModal({
      title: '汉字起卦法使用说明',
      content: `汉字起卦法是一种古老的占卜方法，通过汉字的笔画数来生成卦象。

使用步骤：
1. 集中精神，默想所求测之事
2. 从跑马灯中选择两个汉字
3. 点击汉字即可选择，系统自动显示繁体字和笔画数
4. 选择完两个汉字后，系统自动生成卦象
5. 点击"结果解析"查看详细解释

特点：
• 所有汉字都经过验证，繁体字和笔画数准确
• 跑马灯随机展示，增加选择的随机性
• 完全离线运行，无需网络连接
• 支持重新选择汉字

当前可用汉字数量：${this.data.totalChars}个`,
      showCancel: false,
      confirmText: '明白了'
    });
  },
  // 根据卦名查找卦信息
  findGuaInfoByName(guaName) {
    // 从卦名中提取上下卦
    const match = guaName.match(/(.+)上-(.+)下/);
    if (!match) return null;
    
    const upperGua = match[1];
    const lowerGua = match[2];
    
    // 将上下卦转换为爻数组
    const upperYao = baguaToYao(baguaNameToNumber(upperGua));
    const lowerYao = baguaToYao(baguaNameToNumber(lowerGua));
    
    // 组合成完整的六爻（从底向上）
    const fullYao = [...lowerYao, ...upperYao];
    
    // 查找对应的卦信息
    const guaInfo = findGuaName(fullYao);
    return sixtyFourGuaData[guaInfo.index] || null;
  },
  // 初始化可用汉字列表
  initAvailableChars() {
    console.log('开始初始化可用汉字列表...');
    
    // 直接定义可用汉字列表（从中文处理工具中提取）
    const availableChars = [
      '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
      '人', '大', '天', '中', '国', '家', '学', '习', '工', '作',
      '生', '活', '事', '业', '成', '功', '名', '利', '财', '富',
      '贵', '贫', '贱', '福', '禄', '寿', '喜', '乐', '爱', '情',
      '友', '谊', '信', '义', '礼', '智', '慧', '德', '道', '理',
      '法', '律', '规', '则', '正', '直', '方', '圆', '诚', '实',
      '虚', '伪', '忠', '孝', '节', '操', '东', '西', '南', '北',
      '上', '下', '左', '右', '前', '后', '央', '间', '边', '角',
      '位', '置', '春', '夏', '秋', '冬', '年', '月', '日', '时',
      '分', '秒', '早', '晚', '晨', '夜', '昼', '午', '子', '丑',
      '寅', '卯', '辰', '巳', '未', '申', '酉', '戌', '亥', '乾',
      '坤', '震', '巽', '坎', '离', '艮', '兑', '龙', '虎', '凤',
      '凰', '鸟', '鱼', '虫', '兽', '马', '牛', '羊', '鸡', '狗',
      '猪', '猫', '兔', '山', '水', '火', '土', '金', '木', '石',
      '玉', '风', '云', '雨', '雪', '冰', '雷', '电', '光', '花',
      '草', '树', '林', '森', '竹', '松', '柏', '梅', '兰', '菊',
      '荷', '莲', '桃', '李', '杏', '红', '黄', '蓝', '绿', '紫',
      '白', '黑', '灰', '青', '橙', '粉', '棕', '银', '铜', '铁',
      '好', '坏', '美', '丑', '善', '恶', '真', '假', '新', '旧',
      '高', '低', '长', '短', '宽', '窄', '快', '慢', '轻', '重',
      '强', '弱', '小', '头', '脸', '眼', '耳', '鼻', '口', '手',
      '脚', '心', '肝', '肺', '胃', '肠', '血', '肉', '骨', '父',
      '母', '女', '兄', '弟', '姐', '妹', '爷', '奶', '叔', '婶',
      '伯', '姑', '舅', '姨', '师', '医', '护', '警', '军', '商',
      '农', '匠', '艺', '术', '技', '能', '才', '华', '房', '屋',
      '楼', '塔', '桥', '路', '街', '巷', '门', '窗', '墙', '顶',
      '底', '层', '室', '车', '船', '机', '飞', '行', '走', '跑',
      '跳', '坐', '站', '立', '卧', '躺', '睡', '醒', '梦', '饭',
      '菜', '肉', '蛋', '茶', '酒', '汤', '粥', '面', '包', '饼',
      '糖', '盐', '看', '听', '说', '读', '写', '画', '唱', '吃',
      '喝', '穿', '戴', '买', '卖', '送', '收', '厚', '薄', '深',
      '浅', '远', '近', '多', '少', '很', '太', '更', '最', '极',
      '非', '常', '总', '已', '正', '在', '将', '要', '会', '可'
    ];
    
    console.log('原始汉字列表:', availableChars.slice(0, 10), '...');
    
    // 使用标准Fisher-Yates洗牌算法，确保真正均匀随机
    const shuffledChars = this.shuffleArray(availableChars);
    
    // 根据字符数量动态计算动画时间
    const baseSpeed = 0.4; // 每个字符0.4秒（标准速度）
    const standardTime = Math.max(15, Math.min(30, availableChars.length * baseSpeed)); // 标准时间范围
    
    // 随机生成两个起始索引
    const len = shuffledChars.length;
    const marqueeStartA = Math.floor(Math.random() * len);
    const marqueeStartB = Math.floor(Math.random() * len);
    const marqueeIndexes = Array.from({length: len}, (_, i) => i);
    
    this.setData({ 
      availableChars: shuffledChars,
      totalChars: availableChars.length,
      marqueeRateA: 1,
      marqueeRateB: 1,
      marqueeSpeedA: standardTime,
      marqueeSpeedB: standardTime,
      marqueeStartA,
      marqueeStartB,
      marqueeIndexes
    });
    this.updateMarqueeSpeeds();
    
    console.log(`初始化完成，共${availableChars.length}个汉字，已设置到data中`);
    console.log(`动画时间设置: 第一个${standardTime}秒，第二个${standardTime}秒`);
    console.log('当前data.availableChars长度:', this.data.availableChars ? this.data.availableChars.length : 'undefined');
  },
  
  // 数组随机打乱（标准Fisher-Yates算法）
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  
  // 字符选择处理
  onCharSelect(e) {
    const { field, char } = e.currentTarget.dataset;
    
    console.log(`选择汉字: ${field} = "${char}"`);
    
    // 检查字符是否有效
    if (!char || char === 'undefined') {
      console.error('无效的字符:', char);
      tt.showToast({
        title: '请选择有效汉字',
        icon: 'none'
      });
      return;
    }
    
    // 使用一体化中文处理工具
    const charInfo = getChineseInfo(char, true);
    console.log(`汉字信息:`, charInfo);
    
    // 检查返回的信息是否有效
    if (!charInfo || typeof charInfo.strokes !== 'number') {
      console.error('无法获取汉字信息:', char, charInfo);
      tt.showToast({
        title: `无法处理汉字: ${char}`,
        icon: 'none'
      });
      return;
    }
    
    const strokesField = field === 'charA' ? 'strokesA' : 'strokesB';
    const charInfoField = field === 'charA' ? 'charInfoA' : 'charInfoB';
    
    this.setData({ 
      [field]: char,
      [strokesField]: charInfo.strokes,
      [charInfoField]: charInfo
    });
    
    console.log(`设置数据: ${field} = ${char}, ${strokesField} = ${charInfo.strokes}`);
    
    // 如果两个汉字都选择了，自动生成卦象
    if (this.data.charA && this.data.charB && this.data.strokesA && this.data.strokesB) {
      this.calculateGua();
    }
  },
  
  // 增加第一个跑马灯速度
  onIncreaseSpeedA() {
    const newRate = Math.min(50, this.data.marqueeRateA + 1);
    this.setData({ marqueeRateA: newRate });
    this.updateMarqueeSpeeds();
  },
  
  // 减少第一个跑马灯速度
  onDecreaseSpeedA() {
    const newRate = Math.max(0, this.data.marqueeRateA - 1);
    this.setData({ marqueeRateA: newRate });
    this.updateMarqueeSpeeds();
  },
  
  // 增加第二个跑马灯速度
  onIncreaseSpeedB() {
    const newRate = Math.min(50, this.data.marqueeRateB + 1);
    this.setData({ marqueeRateB: newRate });
    this.updateMarqueeSpeeds();
  },
  
  // 减少第二个跑马灯速度
  onDecreaseSpeedB() {
    const newRate = Math.max(0, this.data.marqueeRateB - 1);
    this.setData({ marqueeRateB: newRate });
    this.updateMarqueeSpeeds();
  },
  
  // 动态更新跑马灯动画时长
  updateMarqueeSpeeds() {
    // 标准时间（正常速度=1时）
    const availableChars = this.data.availableChars || [];
    const baseSpeed = 0.4;
    const standardTime = Math.max(15, Math.min(30, availableChars.length * baseSpeed));
    // 速度倍率，0为停止，1为正常，10为10倍速
    let speedA = this.data.marqueeRateA > 0 ? standardTime / this.data.marqueeRateA : 9999;
    let speedB = this.data.marqueeRateB > 0 ? standardTime / this.data.marqueeRateB : 9999;
    // 0为停止，设置极大值
    this.setData({
      marqueeSpeedA: speedA,
      marqueeSpeedB: speedB
    });
  },
  // 保存当前汉字起卦卦象到用户个人数据
  saveCharacterDivinationToUserData() {
    // 检查是否已生成卦象
    if (!this.data.result.upper) {
      tt.showToast({ 
        title: '请先生成卦象', 
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 提取爻值数组
    const yaoValues = this.data.yaoResults.map(yao => {
      if (yao.result && yao.result.value) return yao.result.value;
      // 如果没有value，根据type和isMoving计算
      if (yao.result && yao.result.type === 'yang') {
        return yao.result.isMoving ? 9 : 7; // 老阳或少阳
      } else {
        return yao.result.isMoving ? 6 : 8; // 老阴或少阴
      }
    });
    
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
    saveGuaHistoryRecord(yaoValues, 'character')
      .then(() => {
        console.log('汉字起卦历史记录保存成功');
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
  // 保存按钮点击事件处理
  onSaveCharacterDivinationToUserData() {
    this.saveCharacterDivinationToUserData();
  },
  // 启动跑马灯定时器
  startMarqueeTimers() {
    this.clearMarqueeTimers();
    // 跑马灯A
    this.data.marqueeTimerA = setInterval(() => {
      const len = this.data.availableChars.length;
      if (len > 0 && this.data.marqueeRateA > 0) {
        this.setData({
          marqueeOffsetA: (this.data.marqueeOffsetA + 1) % len
        });
      }
    }, 80 / this.data.marqueeRateA); // 速度倍率影响间隔
    // 跑马灯B
    this.data.marqueeTimerB = setInterval(() => {
      const len = this.data.availableChars.length;
      if (len > 0 && this.data.marqueeRateB > 0) {
        this.setData({
          marqueeOffsetB: (this.data.marqueeOffsetB + 1) % len
        });
      }
    }, 80 / this.data.marqueeRateB);
  },
  // 清除跑马灯定时器
  clearMarqueeTimers() {
    if (this.data.marqueeTimerA) {
      clearInterval(this.data.marqueeTimerA);
      this.data.marqueeTimerA = null;
    }
    if (this.data.marqueeTimerB) {
      clearInterval(this.data.marqueeTimerB);
      this.data.marqueeTimerB = null;
    }
  },
  onUnload() {
    this.clearMarqueeTimers();
    if (this.systemTimeTimer) {
      clearInterval(this.systemTimeTimer);
      this.systemTimeTimer = null;
    }
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
    this.setData({ systemTime: formatted });
  },
  // 关闭免责声明
  onCloseDisclaimer() {
    this.setData({
      showDisclaimer: false
    });
  },
}); 

// 公历转农历
// const solar = Solar.fromYmd(2024, 6, 1)
// const lunar = solar.getLunar()

// console.log('农历年:', lunar.getYear())
// console.log('农历月:', lunar.getMonth())
// console.log('农历日:', lunar.getDay())
// console.log('农历字符串:', lunar.toString()) // 例如：二〇二四年四月廿五 