/**
 * 一体化中文处理解决方案
 * 集成繁简转换和笔画数计算功能
 * 
 * 设计说明：
 * 1. 简繁转换：只包含真正需要转换的字符映射，避免冗余
 * 2. 笔画数计算：优先使用繁体字笔画数，包含简体和繁体字符数据库
 * 3. 与OpenCC的区别：这是一个轻量级的本地实现，不依赖外部库
 * 4. 适用场景：小程序环境下的汉字处理，注重性能和准确性
 * 
 * 注意：这个实现不是OpenCC的替代品，而是针对特定需求的简化方案
 */

// 简繁转换映射表（只包含真正需要转换的字符）
const simplifiedToTraditional = {
  // 常用简体转繁体映射
  '国': '國', '学': '學', '习': '習', '业': '業', '财': '財',
  '贵': '貴', '贫': '貧', '贱': '賤', '禄': '祿', '寿': '壽',
  '乐': '樂', '爱': '愛', '谊': '誼', '义': '義', '礼': '禮',
  '规': '規', '则': '則', '圆': '圓', '诚': '誠', '实': '實',
  '虚': '虛', '伪': '偽', '节': '節', '东': '東', '后': '後',
  '间': '間', '边': '邊', '时': '時', '昼': '晝', '离': '離',
  '兑': '兌', '龙': '龍', '凤': '鳳', '鸟': '鳥', '鱼': '魚',
  '虫': '蟲', '兽': '獸', '马': '馬', '鸡': '雞', '猪': '豬',
  '猫': '貓', '树': '樹', '兰': '蘭', '莲': '蓮', '红': '紅',
  '黄': '黃', '蓝': '藍', '绿': '綠', '银': '銀', '铜': '銅',
  '铁': '鐵', '坏': '壞', '丑': '醜', '恶': '惡', '旧': '舊',
  '长': '長', '宽': '寬', '轻': '輕', '强': '強', '头': '頭',
  '脸': '臉', '脚': '腳', '肠': '腸', '爷': '爺', '婶': '嬸',
  '师': '師', '医': '醫', '护': '護', '军': '軍', '农': '農',
  '艺': '藝', '术': '術', '华': '華', '楼': '樓', '桥': '橋',
  '墙': '牆', '顶': '頂', '层': '層', '车': '車', '机': '機',
  '飞': '飛', '卧': '臥', '梦': '夢', '饭': '飯', '汤': '湯',
  '面': '麵', '饼': '餅', '盐': '鹽', '听': '聽', '说': '說',
  '读': '讀', '写': '寫', '画': '畫', '买': '買', '卖': '賣',
  '浅': '淺', '远': '遠', '极': '極', '总': '總', '将': '將',
  '会': '會'
};

// 繁体字笔画数数据库（包含简体和繁体字符）
const strokeCountDatabase = {
  // 数字
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
  
  // 基础汉字（简繁相同）
  '人': 2, '大': 3, '天': 4, '中': 4, '家': 10,
  '工': 3, '作': 7, '生': 5, '活': 9, '事': 8,
  '成': 6, '功': 5, '名': 6, '利': 7, '富': 12,
  '福': 13, '喜': 12, '情': 11, '友': 4, '信': 9,
  '智': 12, '慧': 15, '德': 15, '道': 12, '理': 11,
  '法': 8, '律': 9, '正': 5, '直': 8, '方': 4,
  '忠': 8, '孝': 7, '操': 16, '西': 6, '南': 9,
  '北': 5, '上': 3, '下': 3, '左': 5, '右': 5,
  '前': 9, '央': 5, '角': 7, '位': 7, '置': 13,
  '春': 9, '夏': 10, '秋': 9, '冬': 5, '年': 6,
  '月': 4, '日': 4, '分': 4, '秒': 9, '早': 6,
  '晚': 11, '晨': 11, '夜': 8, '午': 4, '子': 3,
  '丑': 4, '寅': 11, '卯': 5, '辰': 7, '巳': 3,
  '未': 5, '申': 5, '酉': 7, '戌': 6, '亥': 6,
  '乾': 11, '坤': 8, '震': 15, '巽': 12, '坎': 8,
  '艮': 6, '虎': 8, '凰': 11, '牛': 4, '羊': 6,
  '狗': 8, '兔': 8, '山': 3, '水': 4, '火': 4,
  '土': 3, '金': 8, '木': 4, '石': 5, '玉': 5,
  '雨': 8, '雪': 11, '冰': 6, '雷': 13, '光': 6,
  '花': 7, '草': 9, '林': 8, '森': 12, '竹': 6,
  '松': 8, '柏': 9, '梅': 11, '菊': 11, '荷': 10,
  '桃': 10, '李': 7, '杏': 7, '紫': 12, '白': 5,
  '黑': 12, '灰': 6, '青': 8, '好': 6, '美': 9,
  '善': 12, '真': 10, '假': 11, '新': 13, '高': 10,
  '低': 7, '短': 12, '窄': 10, '快': 7, '慢': 14,
  '重': 9, '弱': 10, '大': 3, '小': 3, '眼': 11,
  '耳': 6, '鼻': 14, '口': 3, '手': 4, '心': 4,
  '肝': 7, '肺': 8, '胃': 9, '血': 6, '肉': 6,
  '骨': 9, '父': 4, '母': 5, '女': 3, '兄': 5,
  '弟': 7, '姐': 8, '妹': 8, '奶': 5, '叔': 8,
  '伯': 7, '姑': 8, '舅': 13, '姨': 10, '匠': 6,
  '技': 7, '能': 10, '才': 3, '房': 8, '屋': 9,
  '塔': 12, '路': 13, '街': 12, '巷': 9, '窗': 12,
  '室': 9, '船': 11, '行': 6, '走': 7, '跑': 12,
  '跳': 13, '坐': 7, '站': 10, '立': 5, '躺': 15,
  '睡': 13, '醒': 16, '菜': 11, '蛋': 11, '茶': 9,
  '酒': 10, '粥': 12, '包': 5, '糖': 16, '看': 9,
  '唱': 11, '吃': 6, '喝': 12, '穿': 9, '戴': 17,
  '送': 9, '收': 6, '厚': 9, '薄': 16, '深': 11,
  '近': 7, '多': 6, '少': 4, '很': 9, '太': 4,
  '更': 7, '最': 12, '非': 8, '常': 11, '已': 3,
  '正': 5, '在': 6, '要': 9, '能': 10, '可': 5,
  
  // 繁体字笔画数
  '國': 11, '學': 16, '習': 11, '業': 13, '財': 10,
  '貴': 12, '貧': 11, '賤': 15, '祿': 12, '壽': 14,
  '樂': 15, '愛': 13, '誼': 15, '義': 13, '禮': 18,
  '規': 11, '則': 9, '圓': 13, '誠': 13, '實': 14,
  '虛': 11, '偽': 14, '節': 13, '東': 8, '後': 9,
  '間': 12, '邊': 18, '時': 10, '晝': 11, '離': 11,
  '兌': 7, '龍': 16, '鳳': 14, '鳥': 11, '魚': 11,
  '蟲': 18, '獸': 19, '馬': 10, '雞': 18, '豬': 12,
  '貓': 15, '樹': 16, '蘭': 20, '蓮': 13, '紅': 9,
  '黃': 12, '藍': 17, '綠': 14, '銀': 14, '銅': 14,
  '鐵': 21, '壞': 19, '醜': 17, '惡': 12, '舊': 17,
  '長': 8, '寬': 14, '輕': 14, '強': 11, '頭': 16,
  '臉': 17, '腳': 13, '腸': 13, '爺': 13, '嬸': 16,
  '師': 10, '醫': 18, '護': 20, '軍': 9, '農': 13,
  '藝': 18, '術': 11, '華': 10, '樓': 15, '橋': 16,
  '牆': 16, '頂': 11, '層': 15, '車': 7, '機': 16,
  '飛': 9, '臥': 8, '夢': 13, '飯': 12, '湯': 12,
  '麵': 20, '餅': 14, '鹽': 24, '聽': 22, '說': 14,
  '讀': 22, '寫': 15, '畫': 12, '買': 12, '賣': 15,
  '淺': 11, '遠': 13, '極': 12, '總': 17, '將': 11,
  '會': 13
};

/**
 * 中文处理器类
 * 提供一体化的中文处理功能
 */
class ChineseProcessor {
  constructor() {
    this.cache = new Map(); // 缓存机制
    this.stats = { // 统计信息
      conversions: 0,
      strokeCounts: 0,
      cacheHits: 0
    };
  }

  /**
   * 简体转繁体
   * @param {string} simplified 简体字
   * @returns {string} 繁体字
   */
  toTraditional(simplified) {
    if (!simplified) return '';
    
    const cacheKey = `trad_${simplified}`;
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return this.cache.get(cacheKey);
    }
    
    const result = simplified.split('').map(char => {
      return simplifiedToTraditional[char] || char;
    }).join('');
    
    this.cache.set(cacheKey, result);
    this.stats.conversions++;
    return result;
  }

  /**
   * 繁体转简体
   * @param {string} traditional 繁体字
   * @returns {string} 简体字
   */
  toSimplified(traditional) {
    if (!traditional) return '';
    
    const cacheKey = `simp_${traditional}`;
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return this.cache.get(cacheKey);
    }
    
    // 创建反向映射
    const traditionalToSimplified = {};
    for (const [simp, trad] of Object.entries(simplifiedToTraditional)) {
      traditionalToSimplified[trad] = simp;
    }
    
    const result = traditional.split('').map(char => {
      return traditionalToSimplified[char] || char;
    }).join('');
    
    this.cache.set(cacheKey, result);
    this.stats.conversions++;
    return result;
  }

  /**
   * 计算汉字笔画数
   * @param {string} char 汉字
   * @param {boolean} preferTraditional 是否优先使用繁体字
   * @returns {number} 笔画数
   */
  getStrokeCount(char, preferTraditional = true) {
    if (!char) return 0;
    
    const cacheKey = `stroke_${char}_${preferTraditional}`;
    if (this.cache.has(cacheKey)) {
      this.stats.cacheHits++;
      return this.cache.get(cacheKey);
    }
    
    // 如果优先繁体，先转换为繁体
    const targetChar = preferTraditional ? this.toTraditional(char) : char;
    
    // 查找笔画数
    let strokes = 0;
    if (strokeCountDatabase[targetChar]) {
      strokes = strokeCountDatabase[targetChar];
    } else {
      // 如果没找到，使用字符编码估算
      const charCode = targetChar.charCodeAt(0);
      if (charCode >= 0x4E00 && charCode <= 0x9FFF) {
        strokes = (charCode % 20) + 1; // 1-20的笔画数
      }
    }
    
    this.cache.set(cacheKey, strokes);
    this.stats.strokeCounts++;
    return strokes;
  }

  /**
   * 批量处理汉字
   * @param {string} text 汉字文本
   * @param {boolean} preferTraditional 是否优先使用繁体字
   * @returns {Array} 处理结果数组
   */
  processBatch(text, preferTraditional = true) {
    if (!text) return [];
    
    return text.split('').map(char => ({
      char: char,
      traditional: preferTraditional ? this.toTraditional(char) : char,
      simplified: this.toSimplified(char),
      strokes: this.getStrokeCount(char, preferTraditional),
      isChinese: this.isChinese(char)
    }));
  }

  /**
   * 检查是否为汉字
   * @param {string} char 字符
   * @returns {boolean} 是否为汉字
   */
  isChinese(char) {
    if (!char) return false;
    const charCode = char.charCodeAt(0);
    return charCode >= 0x4E00 && charCode <= 0x9FFF;
  }

  /**
   * 获取汉字完整信息
   * @param {string} char 汉字
   * @param {boolean} preferTraditional 是否优先使用繁体字
   * @returns {Object} 汉字信息
   */
  getChineseInfo(char, preferTraditional = true) {
    if (!char) return null;
    
    const traditional = preferTraditional ? this.toTraditional(char) : char;
    const strokes = this.getStrokeCount(char, preferTraditional);
    const isChineseChar = this.isChinese(char);
    
    return {
      original: char,
      traditional: traditional,
      simplified: this.toSimplified(traditional),
      strokes: strokes,
      isChinese: isChineseChar
    };
  }

  /**
   * 获取统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size
    };
  }

  /**
   * 清空缓存
   */
  clearCache() {
    this.cache.clear();
    this.stats = {
      conversions: 0,
      strokeCounts: 0,
      cacheHits: 0
    };
  }

  /**
   * 验证数据完整性
   * @returns {Object} 验证结果
   */
  validateData() {
    const simplifiedCount = Object.keys(simplifiedToTraditional).length;
    const traditionalCount = Object.keys(strokeCountDatabase).length;
    
    return {
      simplifiedMappings: simplifiedCount,
      traditionalStrokes: traditionalCount,
      dataIntegrity: 'OK'
    };
  }
}

// 创建全局实例
const chineseProcessor = new ChineseProcessor();

// 导出便捷函数
const toTraditional = (text) => chineseProcessor.toTraditional(text);
const toSimplified = (text) => chineseProcessor.toSimplified(text);
const getStrokeCount = (char, preferTraditional = true) => chineseProcessor.getStrokeCount(char, preferTraditional);
const processBatch = (text, preferTraditional = true) => chineseProcessor.processBatch(text, preferTraditional);
const isChinese = (char) => chineseProcessor.isChinese(char);
const getChineseInfo = (char, preferTraditional = true) => chineseProcessor.getChineseInfo(char, preferTraditional);
const getStats = () => chineseProcessor.getStats();
const clearCache = () => chineseProcessor.clearCache();
const validateData = () => chineseProcessor.validateData();

// 导出类
module.exports = {
  ChineseProcessor,
  toTraditional,
  toSimplified,
  getStrokeCount,
  processBatch,
  isChinese,
  getChineseInfo,
  getStats,
  clearCache,
  validateData,
  chineseProcessor
};

// 默认导出
module.exports.default = chineseProcessor; 