// 八卦基础数据
const baguaNames = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const guaLines = [
  [1, 1, 1], // 乾
  [0, 1, 1], // 兑
  [1, 0, 1], // 离
  [0, 0, 1], // 震
  [1, 1, 0], // 巽
  [0, 1, 0], // 坎
  [1, 0, 0], // 艮
  [0, 0, 0]  // 坤
];

// 64卦的上卦、下卦索引（顺序与传统卦序一致）
// 例如：{ upper: 0, lower: 0 } 表示乾为天（上卦乾、下卦乾）
const guaComponents = [
  { upper: 0, lower: 0 }, // 乾为天
  { upper: 7, lower: 7 }, // 坤为地
  { upper: 5, lower: 3 }, // 水雷屯
  { upper: 6, lower: 5 }, // 山水蒙
  { upper: 5, lower: 0 }, // 水天需
  { upper: 0, lower: 5 }, // 天水讼
  { upper: 7, lower: 5 }, // 地水师
  { upper: 5, lower: 7 }, // 水地比
  { upper: 4, lower: 0 }, // 风天小畜
  { upper: 0, lower: 1 }, // 天泽履
  { upper: 7, lower: 0 }, // 地天泰
  { upper: 0, lower: 7 }, // 天地否
  { upper: 0, lower: 2 }, // 天火同人
  { upper: 2, lower: 0 }, // 火天大有
  { upper: 7, lower: 6 }, // 地山谦
  { upper: 3, lower: 7 }, // 雷地豫
  { upper: 1, lower: 3 }, // 泽雷随
  { upper: 6, lower: 4 }, // 山风蛊
  { upper: 7, lower: 1 }, // 地泽临
  { upper: 4, lower: 7 }, // 风地观
  { upper: 2, lower: 3 }, // 火雷噬嗑
  { upper: 6, lower: 2 }, // 山火贲
  { upper: 6, lower: 7 }, // 山地剥
  { upper: 7, lower: 3 }, // 地雷复
  { upper: 0, lower: 3 }, // 天雷无妄
  { upper: 6, lower: 0 }, // 山天大畜
  { upper: 6, lower: 3 }, // 山雷颐
  { upper: 1, lower: 4 }, // 泽风大过
  { upper: 5, lower: 5 }, // 坎为水
  { upper: 2, lower: 2 }, // 离为火
  { upper: 1, lower: 6 }, // 泽山咸
  { upper: 3, lower: 4 }, // 雷风恒
  { upper: 0, lower: 6 }, // 天山遁
  { upper: 3, lower: 0 }, // 雷天大壮
  { upper: 2, lower: 7 }, // 火地晋
  { upper: 7, lower: 2 }, // 地火明夷
  { upper: 4, lower: 2 }, // 风火家人
  { upper: 2, lower: 1 }, // 火泽睽
  { upper: 5, lower: 6 }, // 水山蹇
  { upper: 3, lower: 5 }, // 雷水解
  { upper: 6, lower: 1 }, // 山泽损
  { upper: 4, lower: 3 }, // 风雷益
  { upper: 1, lower: 0 }, // 泽天夬
  { upper: 0, lower: 4 }, // 天风姤
  { upper: 1, lower: 7 }, // 泽地萃
  { upper: 7, lower: 4 }, // 地风升
  { upper: 1, lower: 5 }, // 泽水困
  { upper: 5, lower: 4 }, // 水风井
  { upper: 1, lower: 2 }, // 泽火革
  { upper: 2, lower: 4 }, // 火风鼎
  { upper: 3, lower: 3 }, // 震为雷
  { upper: 6, lower: 6 }, // 艮为山
  { upper: 4, lower: 6 }, // 风山渐
  { upper: 3, lower: 1 }, // 雷泽归妹
  { upper: 3, lower: 2 }, // 雷火丰
  { upper: 2, lower: 6 }, // 火山旅
  { upper: 4, lower: 4 }, // 巽为风
  { upper: 1, lower: 1 }, // 兑为泽
  { upper: 4, lower: 5 }, // 风水涣
  { upper: 5, lower: 1 }, // 水泽节
  { upper: 4, lower: 1 }, // 风泽中孚
  { upper: 3, lower: 6 }, // 雷山小过
  { upper: 5, lower: 2 }, // 水火既济
  { upper: 2, lower: 5 }  // 火水未济
];

// 工具函数
function getGuaComponent(index) {
  return guaComponents[index] || null;
}

module.exports = {
  baguaNames,
  guaLines,
  guaComponents,
  getGuaComponent
}; 