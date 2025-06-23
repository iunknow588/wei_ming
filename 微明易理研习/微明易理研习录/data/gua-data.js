// 卦象基础数据
// 64卦的爻线数据 (1=阳爻, 0=阴爻)
const guaLines = {
  // 1. 乾为天 - 111111
  0: [1, 1, 1, 1, 1, 1],
  // 2. 坤为地 - 000000
  1: [0, 0, 0, 0, 0, 0],
  // 3. 水雷屯 - 010001
  2: [0, 1, 0, 0, 0, 1],
  // 4. 山水蒙 - 100010
  3: [1, 0, 0, 0, 1, 0],
  // 5. 水天需 - 010111
  4: [0, 1, 0, 1, 1, 1],
  // 6. 天水讼 - 111010
  5: [1, 1, 1, 0, 1, 0],
  // 7. 地水师 - 000010
  6: [0, 0, 0, 0, 1, 0],
  // 8. 水地比 - 010000
  7: [0, 1, 0, 0, 0, 0],
  // 9. 风天小畜 - 110111
  8: [1, 1, 0, 1, 1, 1],
  // 10. 天泽履 - 111011
  9: [1, 1, 1, 0, 1, 1],
  // 11. 地天泰 - 000111
  10: [0, 0, 0, 1, 1, 1],
  // 12. 天地否 - 111000
  11: [1, 1, 1, 0, 0, 0],
  // 13. 天火同人 - 111101
  12: [1, 1, 1, 1, 0, 1],
  // 14. 火天大有 - 101111
  13: [1, 0, 1, 1, 1, 1],
  // 15. 地山谦 - 000100
  14: [0, 0, 0, 1, 0, 0],
  // 16. 雷地豫 - 001000
  15: [0, 0, 1, 0, 0, 0],
  // 17. 泽雷随 - 011001
  16: [0, 1, 1, 0, 0, 1],
  // 18. 山风蛊 - 100110
  17: [1, 0, 0, 1, 1, 0],
  // 19. 地泽临 - 000011
  18: [0, 0, 0, 0, 1, 1],
  // 20. 风地观 - 110000
  19: [1, 1, 0, 0, 0, 0],
  // 21. 火雷噬嗑 - 101001
  20: [1, 0, 1, 0, 0, 1],
  // 22. 山火贲 - 100101
  21: [1, 0, 0, 1, 0, 1],
  // 23. 山地剥 - 100000
  22: [1, 0, 0, 0, 0, 0],
  // 24. 地雷复 - 000001
  23: [0, 0, 0, 0, 0, 1],
  // 25. 天雷无妄 - 111001
  24: [1, 1, 1, 0, 0, 1],
  // 26. 山天大畜 - 100111
  25: [1, 0, 0, 1, 1, 1],
  // 27. 山雷颐 - 100001
  26: [1, 0, 0, 0, 0, 1],
  // 28. 泽风大过 - 011110
  27: [0, 1, 1, 1, 1, 0],
  // 29. 坎为水 - 010010
  28: [0, 1, 0, 0, 1, 0],
  // 30. 离为火 - 101101
  29: [1, 0, 1, 1, 0, 1],
  // 31. 泽山咸 - 011100
  30: [0, 1, 1, 1, 0, 0],
  // 32. 雷风恒 - 001110
  31: [0, 0, 1, 1, 1, 0],
  // 33. 天山遁 - 111100
  32: [1, 1, 1, 1, 0, 0],
  // 34. 雷天大壮 - 001111
  33: [0, 0, 1, 1, 1, 1],
  // 35. 火地晋 - 101000
  34: [1, 0, 1, 0, 0, 0],
  // 36. 地火明夷 - 000101
  35: [0, 0, 0, 1, 0, 1],
  // 37. 风火家人 - 110101
  36: [1, 1, 0, 1, 0, 1],
  // 38. 火泽睽 - 101011
  37: [1, 0, 1, 0, 1, 1],
  // 39. 水山蹇 - 010100
  38: [0, 1, 0, 1, 0, 0],
  // 40. 雷水解 - 001010
  39: [0, 0, 1, 0, 1, 0],
  // 41. 山泽损 - 100011
  40: [1, 0, 0, 0, 1, 1],
  // 42. 风雷益 - 110001
  41: [1, 1, 0, 0, 0, 1],
  // 43. 泽天夬 - 011111
  42: [0, 1, 1, 1, 1, 1],
  // 44. 天风姤 - 111110
  43: [1, 1, 1, 1, 1, 0],
  // 45. 泽地萃 - 011000
  44: [0, 1, 1, 0, 0, 0],
  // 46. 地风升 - 000110
  45: [0, 0, 0, 1, 1, 0],
  // 47. 泽水困 - 011010
  46: [0, 1, 1, 0, 1, 0],
  // 48. 水风井 - 010110
  47: [0, 1, 0, 1, 1, 0],
  // 49. 泽火革 - 011101
  48: [0, 1, 1, 1, 0, 1],
  // 50. 火风鼎 - 101110
  49: [1, 0, 1, 1, 1, 0],
  // 51. 震为雷 - 001001
  50: [0, 0, 1, 0, 0, 1],
  // 52. 艮为山 - 100100
  51: [1, 0, 0, 1, 0, 0],
  // 53. 风山渐 - 110100
  52: [1, 1, 0, 1, 0, 0],
  // 54. 雷泽归妹 - 001011
  53: [0, 0, 1, 0, 1, 1],
  // 55. 雷火丰 - 001101
  54: [0, 0, 1, 1, 0, 1],
  // 56. 火山旅 - 101100
  55: [1, 0, 1, 1, 0, 0],
  // 57. 巽为风 - 110110
  56: [1, 1, 0, 1, 1, 0],
  // 58. 兑为泽 - 011011
  57: [0, 1, 1, 0, 1, 1],
  // 59. 风水涣 - 110010
  58: [1, 1, 0, 0, 1, 0],
  // 60. 水泽节 - 010011
  59: [0, 1, 0, 0, 1, 1],
  // 61. 风泽中孚 - 110011
  60: [1, 1, 0, 0, 1, 1],
  // 62. 雷山小过 - 001100
  61: [0, 0, 1, 1, 0, 0],
  // 63. 水火既济 - 010101
  62: [0, 1, 0, 1, 0, 1],
  // 64. 火水未济 - 101010
  63: [1, 0, 1, 0, 1, 0]
};

// 八卦名称
const baguaNames = {
  '111': '乾',
  '000': '坤', 
  '100': '艮',
  '001': '震',
  '010': '坎',
  '101': '离',
  '110': '巽',
  '011': '兑'
};

// 64卦的上下卦信息
const guaComponents = {
  // 1. 乾为天 - 乾上乾下
  0: { upper: '乾', lower: '乾', upperLines: [1,1,1], lowerLines: [1,1,1] },
  // 2. 坤为地 - 坤上坤下
  1: { upper: '坤', lower: '坤', upperLines: [0,0,0], lowerLines: [0,0,0] },
  // 3. 水雷屯 - 坎上震下
  2: { upper: '坎', lower: '震', upperLines: [0,1,0], lowerLines: [0,0,1] },
  // 4. 山水蒙 - 艮上坎下
  3: { upper: '艮', lower: '坎', upperLines: [1,0,0], lowerLines: [0,1,0] },
  // 5. 水天需 - 坎上乾下
  4: { upper: '坎', lower: '乾', upperLines: [0,1,0], lowerLines: [1,1,1] },
  // 6. 天水讼 - 乾上坎下
  5: { upper: '乾', lower: '坎', upperLines: [1,1,1], lowerLines: [0,1,0] },
  // 7. 地水师 - 坤上坎下
  6: { upper: '坤', lower: '坎', upperLines: [0,0,0], lowerLines: [0,1,0] },
  // 8. 水地比 - 坎上坤下
  7: { upper: '坎', lower: '坤', upperLines: [0,1,0], lowerLines: [0,0,0] },
  // 9. 风天小畜 - 巽上乾下
  8: { upper: '巽', lower: '乾', upperLines: [1,1,0], lowerLines: [1,1,1] },
  // 10. 天泽履 - 乾上兑下
  9: { upper: '乾', lower: '兑', upperLines: [1,1,1], lowerLines: [0,1,1] },
  // 11. 地天泰 - 坤上乾下
  10: { upper: '坤', lower: '乾', upperLines: [0,0,0], lowerLines: [1,1,1] },
  // 12. 天地否 - 乾上坤下
  11: { upper: '乾', lower: '坤', upperLines: [1,1,1], lowerLines: [0,0,0] },
  // 13. 天火同人 - 乾上离下
  12: { upper: '乾', lower: '离', upperLines: [1,1,1], lowerLines: [1,0,1] },
  // 14. 火天大有 - 离上乾下
  13: { upper: '离', lower: '乾', upperLines: [1,0,1], lowerLines: [1,1,1] },
  // 15. 地山谦 - 坤上艮下
  14: { upper: '坤', lower: '艮', upperLines: [0,0,0], lowerLines: [1,0,0] },
  // 16. 雷地豫 - 震上坤下
  15: { upper: '震', lower: '坤', upperLines: [0,0,1], lowerLines: [0,0,0] },
  // 17. 泽雷随 - 兑上震下
  16: { upper: '兑', lower: '震', upperLines: [0,1,1], lowerLines: [0,0,1] },
  // 18. 山风蛊 - 艮上巽下
  17: { upper: '艮', lower: '巽', upperLines: [1,0,0], lowerLines: [1,1,0] },
  // 19. 地泽临 - 坤上兑下
  18: { upper: '坤', lower: '兑', upperLines: [0,0,0], lowerLines: [0,1,1] },
  // 20. 风地观 - 巽上坤下
  19: { upper: '巽', lower: '坤', upperLines: [1,1,0], lowerLines: [0,0,0] },
  // 21. 火雷噬嗑 - 离上震下
  20: { upper: '离', lower: '震', upperLines: [1,0,1], lowerLines: [0,0,1] },
  // 22. 山火贲 - 艮上离下
  21: { upper: '艮', lower: '离', upperLines: [1,0,0], lowerLines: [1,0,1] },
  // 23. 山地剥 - 艮上坤下
  22: { upper: '艮', lower: '坤', upperLines: [1,0,0], lowerLines: [0,0,0] },
  // 24. 地雷复 - 坤上震下
  23: { upper: '坤', lower: '震', upperLines: [0,0,0], lowerLines: [0,0,1] },
  // 25. 天雷无妄 - 乾上震下
  24: { upper: '乾', lower: '震', upperLines: [1,1,1], lowerLines: [0,0,1] },
  // 26. 山天大畜 - 艮上乾下
  25: { upper: '艮', lower: '乾', upperLines: [1,0,0], lowerLines: [1,1,1] },
  // 27. 山雷颐 - 艮上震下
  26: { upper: '艮', lower: '震', upperLines: [1,0,0], lowerLines: [0,0,1] },
  // 28. 泽风大过 - 兑上巽下
  27: { upper: '兑', lower: '巽', upperLines: [0,1,1], lowerLines: [1,1,0] },
  // 29. 坎为水 - 坎上坎下
  28: { upper: '坎', lower: '坎', upperLines: [0,1,0], lowerLines: [0,1,0] },
  // 30. 离为火 - 离上离下
  29: { upper: '离', lower: '离', upperLines: [1,0,1], lowerLines: [1,0,1] },
  // 31. 泽山咸 - 兑上艮下
  30: { upper: '兑', lower: '艮', upperLines: [0,1,1], lowerLines: [1,0,0] },
  // 32. 雷风恒 - 震上巽下
  31: { upper: '震', lower: '巽', upperLines: [0,0,1], lowerLines: [1,1,0] },
  // 33. 天山遁 - 乾上艮下
  32: { upper: '乾', lower: '艮', upperLines: [1,1,1], lowerLines: [1,0,0] },
  // 34. 雷天大壮 - 震上乾下
  33: { upper: '震', lower: '乾', upperLines: [0,0,1], lowerLines: [1,1,1] },
  // 35. 火地晋 - 离上坤下
  34: { upper: '离', lower: '坤', upperLines: [1,0,1], lowerLines: [0,0,0] },
  // 36. 地火明夷 - 坤上离下
  35: { upper: '坤', lower: '离', upperLines: [0,0,0], lowerLines: [1,0,1] },
  // 37. 风火家人 - 巽上离下
  36: { upper: '巽', lower: '离', upperLines: [1,1,0], lowerLines: [1,0,1] },
  // 38. 火泽睽 - 离上兑下
  37: { upper: '离', lower: '兑', upperLines: [1,0,1], lowerLines: [0,1,1] },
  // 39. 水山蹇 - 坎上艮下
  38: { upper: '坎', lower: '艮', upperLines: [0,1,0], lowerLines: [1,0,0] },
  // 40. 雷水解 - 震上坎下
  39: { upper: '震', lower: '坎', upperLines: [0,0,1], lowerLines: [0,1,0] },
  // 41. 山泽损 - 艮上兑下
  40: { upper: '艮', lower: '兑', upperLines: [1,0,0], lowerLines: [0,1,1] },
  // 42. 风雷益 - 巽上震下
  41: { upper: '巽', lower: '震', upperLines: [1,1,0], lowerLines: [0,0,1] },
  // 43. 泽天夬 - 兑上乾下
  42: { upper: '兑', lower: '乾', upperLines: [0,1,1], lowerLines: [1,1,1] },
  // 44. 天风姤 - 乾上巽下
  43: { upper: '乾', lower: '巽', upperLines: [1,1,1], lowerLines: [1,1,0] },
  // 45. 泽地萃 - 兑上坤下
  44: { upper: '兑', lower: '坤', upperLines: [0,1,1], lowerLines: [0,0,0] },
  // 46. 地风升 - 坤上巽下
  45: { upper: '坤', lower: '巽', upperLines: [0,0,0], lowerLines: [1,1,0] },
  // 47. 泽水困 - 兑上坎下
  46: { upper: '兑', lower: '坎', upperLines: [0,1,1], lowerLines: [0,1,0] },
  // 48. 水风井 - 坎上巽下
  47: { upper: '坎', lower: '巽', upperLines: [0,1,0], lowerLines: [1,1,0] },
  // 49. 泽火革 - 兑上离下
  48: { upper: '兑', lower: '离', upperLines: [0,1,1], lowerLines: [1,0,1] },
  // 50. 火风鼎 - 离上巽下
  49: { upper: '离', lower: '巽', upperLines: [1,0,1], lowerLines: [1,1,0] },
  // 51. 震为雷 - 震上震下
  50: { upper: '震', lower: '震', upperLines: [0,0,1], lowerLines: [0,0,1] },
  // 52. 艮为山 - 艮上艮下
  51: { upper: '艮', lower: '艮', upperLines: [1,0,0], lowerLines: [1,0,0] },
  // 53. 风山渐 - 巽上艮下
  52: { upper: '巽', lower: '艮', upperLines: [1,1,0], lowerLines: [1,0,0] },
  // 54. 雷泽归妹 - 震上兑下
  53: { upper: '震', lower: '兑', upperLines: [0,0,1], lowerLines: [0,1,1] },
  // 55. 雷火丰 - 震上离下
  54: { upper: '震', lower: '离', upperLines: [0,0,1], lowerLines: [1,0,1] },
  // 56. 火山旅 - 离上艮下
  55: { upper: '离', lower: '艮', upperLines: [1,0,1], lowerLines: [1,0,0] },
  // 57. 巽为风 - 巽上巽下
  56: { upper: '巽', lower: '巽', upperLines: [1,1,0], lowerLines: [1,1,0] },
  // 58. 兑为泽 - 兑上兑下
  57: { upper: '兑', lower: '兑', upperLines: [0,1,1], lowerLines: [0,1,1] },
  // 59. 风水涣 - 巽上坎下
  58: { upper: '巽', lower: '坎', upperLines: [1,1,0], lowerLines: [0,1,0] },
  // 60. 水泽节 - 坎上兑下
  59: { upper: '坎', lower: '兑', upperLines: [0,1,0], lowerLines: [0,1,1] },
  // 61. 风泽中孚 - 巽上兑下
  60: { upper: '巽', lower: '兑', upperLines: [1,1,0], lowerLines: [0,1,1] },
  // 62. 雷山小过 - 震上艮下
  61: { upper: '震', lower: '艮', upperLines: [0,0,1], lowerLines: [1,0,0] },
  // 63. 水火既济 - 坎上离下
  62: { upper: '坎', lower: '离', upperLines: [0,1,0], lowerLines: [1,0,1] },
  // 64. 火水未济 - 离上坎下
  63: { upper: '离', lower: '坎', upperLines: [1,0,1], lowerLines: [0,1,0] }
};

// 工具函数
function getGuaLines(guaIndex) {
  return guaLines[guaIndex] || null;
}

function getGuaComponents(guaIndex) {
  return guaComponents[guaIndex] || null;
}

function getBaguaName(lines) {
  const key = lines.join('');
  return baguaNames[key] || '';
}

// 使用CommonJS导出
module.exports = {
  guaLines,
  guaComponents,
  baguaNames,
  getGuaLines,
  getGuaComponents,
  getBaguaName
}; 