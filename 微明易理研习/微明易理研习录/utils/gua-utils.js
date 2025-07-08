// 卦象数据工具模块
const { baguaNames, guaLines, guaComponents } = require('../data/gua-data.js');

/**
 * 八卦名转索引
 * @param {string} name - 八卦名
 * @returns {number} 索引（0~7），未找到返回-1
 */
function getBaguaIndexByName(name) {
  return baguaNames.indexOf(name);
}

/**
 * 八卦索引转三爻
 * @param {number} index - 八卦索引
 * @returns {Array} 三爻数组
 */
function getBaguaLinesByIndex(index) {
  return guaLines[index] || null;
}

/**
 * 64卦索引转{upper, lower}
 * @param {number} index - 64卦索引
 * @returns {Object} { upper, lower }
 */
function getGuaComponent(index) {
  return guaComponents[index] || null;
}

/**
 * 64卦索引转六爻数组（自下而上）
 * @param {number} index - 64卦索引
 * @returns {Array} 六爻数组
 */
function getGuaYaoArrayByIndex(index) {
  const comp = getGuaComponent(index);
  if (!comp) return null;
  return [...guaLines[comp.lower], ...guaLines[comp.upper]];
}

/**
 * 64卦索引转卦名（如"乾上-坤下"）
 * @param {number} index - 64卦索引
 * @returns {string} 卦名
 */
function getGuaNameByIndex(index) {
  const comp = getGuaComponent(index);
  if (!comp) return '';
  return `${baguaNames[comp.upper]}上-${baguaNames[comp.lower]}下`;
}

/**
 * 六爻数组转64卦索引
 * @param {Array} yaoArray - 六爻数组（自下而上）
 * @returns {number} 64卦索引，未找到返回-1
 */
function findGuaIndexByYaoArray(yaoArray) {
  if (!Array.isArray(yaoArray) || yaoArray.length !== 6) return -1;
  for (let i = 0; i < guaComponents.length; i++) {
    const comp = guaComponents[i];
    const lower = guaLines[comp.lower];
    const upper = guaLines[comp.upper];
    if (
      yaoArray.slice(0, 3).join() === lower.join() &&
      yaoArray.slice(3, 6).join() === upper.join()
    ) {
      return i;
    }
  }
  return -1;
}

/**
 * 生成完整的卦象结果（用于结果分析页面）
 * @param {Array} yaoValues - 6个爻值（6/7/8/9），自下而上
 * @returns {Object}
 */
function generateCompleteGuaResult(yaoValues) {
  if (!Array.isArray(yaoValues) || yaoValues.length !== 6) return {};
  // 生成本卦、变卦的六爻数组（1阳0阴）
  const yaoArray = yaoValues.map(v => (v === 9 || v === 7 ? 1 : 0));
  const bianArray = yaoValues.map(v => v === 6 || v === 9);
  // 变卦
  const changedYaoArray = yaoValues.map(v => {
    if (v === 9) return 0; // 老阳变阴
    if (v === 6) return 1; // 老阴变阳
    return v === 7 ? 1 : 0;
  });
  // 查找卦索引
  const originalIndex = findGuaIndexByYaoArray(yaoArray);
  const changedIndex = findGuaIndexByYaoArray(changedYaoArray);
  // 卦名
  const originalGuaName = getGuaNameByIndex(originalIndex);
  const changedGuaName = getGuaNameByIndex(changedIndex);
  // 卦象详细（符号/类型/变爻）
  function buildDetail(arr, bianArr) {
    return arr.map((v, i) => {
      let type = v === 1 ? (yaoValues[i] === 9 ? 'laoyang' : 'yang') : (yaoValues[i] === 6 ? 'laoyin' : 'yin');
      let symbol = v === 1 ? '—' : '--';
      if (type === 'laoyang') symbol = '○ —';
      if (type === 'laoyin') symbol = '× --';
      return {
        index: i,
        number: i + 1,
        isBian: !!bianArr[i],
        type,
        symbol
      };
    });
  }
  const originalGuaDetail = buildDetail(yaoArray, bianArray);
  const changedGuaDetail = buildDetail(changedYaoArray, bianArray);
  // 卦象信息（可根据需要扩展）
  return {
    yaoResults: yaoValues.map((v, i) => ({
      index: i,
      number: i + 1,
      isEmpty: false,
      result: {
        value: v,
        type: v === 9 ? 'laoyang' : v === 7 ? 'yang' : v === 8 ? 'yin' : 'laoyin',
        symbol: v === 9 ? '○' : v === 7 ? '—' : v === 8 ? '--' : '×',
        desc: v === 9 ? '老阳（变爻）' : v === 7 ? '少阳（不变）' : v === 8 ? '少阴（不变）' : '老阴（变爻）'
      }
    })),
    originalGuaDetail,
    changedGuaDetail,
    originalGuaName,
    changedGuaName,
    originalGuaInfo: { name: originalGuaName },
    changedGuaInfo: { name: changedGuaName },
    bian: bianArray
  };
}

module.exports = {
  baguaNames,
  guaLines,
  guaComponents,
  getBaguaIndexByName,
  getBaguaLinesByIndex,
  getGuaComponent,
  getGuaYaoArrayByIndex,
  getGuaNameByIndex,
  findGuaIndexByYaoArray,
  generateCompleteGuaResult
}; 