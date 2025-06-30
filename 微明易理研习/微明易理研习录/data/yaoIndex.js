// 按需加载爻辞数据，避免启动时加载所有JSON文件
let guaDetailCache = {};

/**
 * 获取卦象详细数据
 * @param {number} guaIndex - 卦象索引 (0-63)
 * @returns {Object|null} 卦象详细数据
 */
function getGuaDetail(guaIndex) {
  if (guaIndex < 0 || guaIndex > 63) {
    console.error('Invalid gua index:', guaIndex);
    return null;
  }

  // 检查缓存
  if (guaDetailCache[guaIndex]) {
    return guaDetailCache[guaIndex];
  }
  
  try {
    // 尝试动态加载对应的 JS 文件
    const guaDetail = require(`./${guaIndex + 1}.js`);
    guaDetailCache[guaIndex] = guaDetail;
    return guaDetail;
  } catch (error) {
    console.error(`Failed to load gua detail for index ${guaIndex}:`, error);
    return null;
  }
}

/**
 * 预加载卦象详细数据
 * @param {number} startIndex - 开始索引
 * @param {number} endIndex - 结束索引
 */
function preloadGuaDetail(startIndex = 0, endIndex = 63) {
  for (let i = startIndex; i <= endIndex; i++) {
    if (!guaDetailCache[i]) {
      getGuaDetail(i);
    }
  }
}

/**
 * 清除缓存
 */
function clearGuaDetailCache() {
  guaDetailCache = {};
}

// 使用CommonJS导出
module.exports = {
  getGuaDetail,
  preloadGuaDetail,
  clearGuaDetailCache
};