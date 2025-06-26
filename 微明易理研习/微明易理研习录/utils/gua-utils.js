// 卦象数据工具模块
const { sixtyFourGuaData, getGuaData } = require('../data/sixtyFourGua.js');

/**
 * 获取卦辞和爻辞（带范围保护的版本）
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 卦象数据
 */
function getGuaContent(guaIndex) {
  guaIndex = guaIndex % 64;  // 确保合适范围
  return getGuaData(guaIndex);
}

/**
 * 根据爻象数组查找卦名和索引
 * @param {Array} yaoArray - 爻象数组（6个元素，1为阳爻，0为阴爻）
 * @returns {Object} 包含name和index的对象
 */
function findGuaName(yaoArray) {
  const binaryString = yaoArray.map(yao => yao === 1 ? '1' : '0').join('');
  const guaCodeMap = getApp().globalData.guaCodeMap;
  const guaInfo = guaCodeMap[binaryString];
  if (guaInfo) {
    return guaInfo;
  }
  return { name: '未知卦', index: -1 };
}

/**
 * 根据卦名查找卦信息
 * @param {string} guaName - 卦名（格式：如"乾上-坤下"）
 * @returns {Object|null} 卦信息
 */
function findGuaInfoByName(guaName) {
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
}

/**
 * 八卦名转数字
 * @param {string} baguaName - 八卦名
 * @returns {number} 八卦数字
 */
function baguaNameToNumber(baguaName) {
  const baguaMap = {
    '乾': 1, '兑': 2, '离': 3, '震': 4,
    '巽': 5, '坎': 6, '艮': 7, '坤': 8
  };
  return baguaMap[baguaName] || 1;
}

/**
 * 将八卦数转换为爻数组
 * @param {number} baguaNumber - 八卦数字
 * @returns {Array} 爻数组
 */
function baguaToYao(baguaNumber) {
  const baguaYaoMap = {
    1: [1, 1, 1], // 乾
    2: [1, 1, 0], // 兑
    3: [1, 0, 1], // 离
    4: [1, 0, 0], // 震
    5: [0, 1, 1], // 巽
    6: [0, 1, 0], // 坎
    7: [0, 0, 1], // 艮
    8: [0, 0, 0]  // 坤
  };
  
  return baguaYaoMap[baguaNumber] || [0, 0, 0];
}

/**
 * 根据上下卦数字获取卦名
 * @param {number} upper - 上卦数字
 * @param {number} lower - 下卦数字
 * @returns {string} 卦名
 */
function getGuaName(upper, lower) {
  const bagua = ['', '乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
  return `${bagua[upper]}上-${bagua[lower]}下`;
}

/**
 * 计算高亮信息
 * @param {Array} bian - 变爻数组
 * @returns {Array} 高亮信息数组
 */
function calculateHighlightInfo(bian) {
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
}

/**
 * 分析解读方法
 * @param {Array} yaoResults - 爻结果数组
 * @param {string} originalGuaName - 本卦名
 * @param {string} changedGuaName - 变卦名
 * @returns {Object} 解读方法信息
 */
function analyzeInterpretationMethod(yaoResults, originalGuaName, changedGuaName) {
  const bian = yaoResults.map(yao => yao.result && (yao.result.value === 9 || yao.result.value === 6));
  const highlightInfo = calculateHighlightInfo(bian);
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

/**
 * 校验64卦编码完整性、唯一性和索引正确性
 * @param {Object} guaCodeMap - 64卦编码映射表
 * @returns {Object} 校验结果
 */
function validateAllGuaCodes(guaCodeMap) {
  // 生成所有可能的6位二进制编码
  const allPossibleCodes = [];
  for (let i = 0; i < 64; i++) {
    const binary = i.toString(2).padStart(6, '0');
    allPossibleCodes.push(binary);
  }

  const definedCodes = Object.keys(guaCodeMap);

  // 检查缺失的编码
  const missingCodes = allPossibleCodes.filter(code => !definedCodes.includes(code));

  // 检查重复的编码
  const uniqueCodes = new Set(definedCodes);
  const duplicates = definedCodes.filter((code, index) => definedCodes.indexOf(code) !== index);

  // 检查索引是否正确
  const indexErrors = [];
  for (const [code, info] of Object.entries(guaCodeMap)) {
    if (info.index < 0 || info.index > 63) {
      indexErrors.push({ code, index: info.index, name: info.name });
    }
  }

  return {
    totalPossible: allPossibleCodes.length,
    totalDefined: definedCodes.length,
    missing: missingCodes,
    duplicates: duplicates,
    indexErrors: indexErrors
  };
}

/**
 * 根据爻结果数组构建本卦
 * @param {Array} yaoResults - 爻结果数组
 * @returns {Array} 本卦数组（6个元素，1为阳爻，0为阴爻）
 */
function buildOriginalGua(yaoResults) {
  return yaoResults.map(yao => {
    if (yao.result && yao.result.value === 9) return 1; // 老阳
    if (yao.result && yao.result.value === 6) return 0; // 老阴
    if (yao.result && yao.result.value === 7) return 1; // 少阳
    if (yao.result && yao.result.value === 8) return 0; // 少阴
    return 0; // 默认值
  });
}

/**
 * 根据爻结果数组构建变卦
 * @param {Array} yaoResults - 爻结果数组
 * @returns {Array} 变卦数组（6个元素，1为阳爻，0为阴爻）
 */
function buildChangedGua(yaoResults) {
  return yaoResults.map(yao => {
    if (yao.result && yao.result.value === 9) return 0; // 老阳变阴
    if (yao.result && yao.result.value === 6) return 1; // 老阴变阳
    if (yao.result && yao.result.value === 7) return 1; // 少阳不变
    if (yao.result && yao.result.value === 8) return 0; // 少阴不变
    return 0; // 默认值
  });
}

/**
 * 从爻值数组生成完整的卦象结果数据
 * @param {Array} yaoValues - 爻值数组（6个元素，值为6,7,8,9）
 * @returns {Object} 完整的卦象结果数据
 */
function generateCompleteGuaResult(yaoValues) {
  // 构建标准的yaoResults格式
  const yaoResults = yaoValues.map((value, index) => {
    let type = '';
    let symbol = '';
    let desc = '';
    
    if (value === 9) { type = 'laoyang'; symbol = 'O—'; desc = '老阳（变爻）'; }
    else if (value === 6) { type = 'laoyin'; symbol = 'X--'; desc = '老阴（变爻）'; }
    else if (value === 7) { type = 'shao-yang'; symbol = '—'; desc = '少阳'; }
    else if (value === 8) { type = 'shao-yin'; symbol = '--'; desc = '少阴'; }
    
    return {
      isEmpty: false,
      number: 6 - index,
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

  // 构建本卦和变卦
  const originalGua = buildOriginalGua(yaoResults);
  const changedGua = buildChangedGua(yaoResults);
  
  // 构建变爻数组
  const bian = yaoValues.map(value => value === 6 || value === 9);
  
  // 查找卦名
  const originalGuaInfo = findGuaName(originalGua);
  const changedGuaInfo = findGuaName(changedGua);
  
  // 获取卦辞和爻辞
  const originalGuaContent = getGuaData(originalGuaInfo.index);
  const changedGuaContent = getGuaData(changedGuaInfo.index);
  
  // 分析解读方法
  const interpretationMethod = analyzeInterpretationMethod(yaoResults, originalGuaInfo.name, changedGuaInfo.name);
  
  // 构建详情数据
  const originalGuaDetail = yaoResults.map(yao => {
    if (!yao.result) return { type: '', symbol: '', isBian: false };
    let isBian = yao.result.value === 6 || yao.result.value === 9;
    return {
      type: yao.result.type,
      symbol: yao.result.symbol,
      isBian,
      value: yao.result.value
    };
  });
  
  const changedGuaDetail = yaoResults.map(yao => {
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

  return {
    yaoResults,
    originalGua,
    changedGua,
    bian,
    originalGuaName: originalGuaInfo.name,
    changedGuaName: changedGuaInfo.name,
    originalGuaInfo: originalGuaContent,
    changedGuaInfo: changedGuaContent,
    interpretationMethod,
    originalGuaDetail,
    changedGuaDetail,
    currentRound: 6,
    totalRounds: 6
  };
}

/**
 * 统一的保存历史数据工具函数
 * @param {Array} yaoValues - 爻值数组（6个元素，值为6,7,8,9）
 * @param {string} divinationType - 起卦类型（如'coin', 'character', 'time', 'number'）
 * @returns {Promise} 保存结果
 */
function saveGuaHistoryRecord(yaoValues, divinationType = 'unknown') {
  return new Promise((resolve, reject) => {
    // 生成时间戳作为key
    const now = new Date();
    const pad = n => n < 10 ? '0' + n : n;
    const key = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}时${pad(now.getMinutes())}分${pad(now.getSeconds())}秒`;

    // 简化的记录格式，只保存必要信息
    const record = {
      yaoValues, // 爻值数组
      divinationType, // 起卦类型
      time: key, // 时间戳
      timestamp: now.getTime() // 时间戳（用于排序）
    };

    // 直接保存为单独的文件
    tt.setStorage({
      key: key, // 使用时间戳作为文件名
      data: record,
      success: () => {
        tt.showToast({ title: '已保存到历史记录', icon: 'success' });
        resolve(record);
      },
      fail: (err) => {
        console.error('保存历史记录失败:', err);
        reject(err);
      }
    });
  });
}

/**
 * 获取历史记录
 * @returns {Promise<Array>} 历史记录数组
 */
function getGuaHistoryRecords() {
  return new Promise((resolve, reject) => {
    // 获取所有存储的key
    tt.getStorageInfo({
      success: (res) => {
        const keys = res.keys || [];
        const historyKeys = keys.filter(key => {
          // 过滤出符合时间格式的key（历史记录）
          return /^\d{4}-\d{2}-\d{2}-\d{2}时\d{2}分\d{2}秒$/.test(key);
        });
        
        if (historyKeys.length === 0) {
          resolve([]);
          return;
        }
        
        // 读取所有历史记录
        const promises = historyKeys.map(key => {
          return new Promise((resolveItem) => {
            tt.getStorage({
              key: key,
              success: (res) => resolveItem(res.data),
              fail: () => resolveItem(null) // 忽略读取失败的文件
            });
          });
        });
        
        Promise.all(promises).then(records => {
          // 过滤掉null值，按时间戳倒序排列
          const validRecords = records.filter(record => record !== null)
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          resolve(validRecords);
        });
      },
      fail: (err) => {
        console.error('获取存储信息失败:', err);
        resolve([]); // 返回空数组而不是reject
      }
    });
  });
}

/**
 * 删除历史记录
 * @param {string} key - 记录key
 * @returns {Promise} 删除结果
 */
function deleteGuaHistoryRecord(key) {
  return new Promise((resolve, reject) => {
    tt.removeStorage({
      key: key,
      success: () => {
        tt.showToast({ title: '已删除记录', icon: 'success' });
        resolve();
      },
      fail: (err) => {
        console.error('删除历史记录失败:', err);
        reject(err);
      }
    });
  });
}

module.exports = {
  // 直接导出 sixtFourGua.js 中的方法，避免不必要的封装
  getGuaData,
  sixtyFourGuaData,
  
  // 保留有价值的封装
  getGuaContent,
  findGuaName,
  findGuaInfoByName,
  baguaNameToNumber,
  baguaToYao,
  getGuaName,
  calculateHighlightInfo,
  analyzeInterpretationMethod,
  validateAllGuaCodes,
  buildOriginalGua,
  buildChangedGua,
  generateCompleteGuaResult,
  saveGuaHistoryRecord,
  getGuaHistoryRecords,
  deleteGuaHistoryRecord
}; 