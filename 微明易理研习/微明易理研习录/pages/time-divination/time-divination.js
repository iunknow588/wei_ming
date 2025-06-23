const app = getApp();

// 地支与数字映射
const dizhiMap = [
  { label: '子', value: 1 }, { label: '丑', value: 2 }, { label: '寅', value: 3 }, { label: '卯', value: 4 },
  { label: '辰', value: 5 }, { label: '巳', value: 6 }, { label: '午', value: 7 }, { label: '未', value: 8 },
  { label: '申', value: 9 }, { label: '酉', value: 10 }, { label: '戌', value: 11 }, { label: '亥', value: 12 }
];

Page({
  data: {
    lunarYear: 2024,
    lunarYearBranch: 6, // 巳年
    lunarMonth: 4,
    lunarDay: 18,
    hourBranch: 7, // 午时
    minute: 30,
    dizhiMap,
    result: {
      lower: null,
      upper: null,
      moving: null,
      guaName: '',
      guaInfo: null
    }
  },
  onLoad() {
    this.calculateGua();
  },
  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: Number(e.detail.value) });
    this.calculateGua();
  },
  calculateGua() {
    const year = this.data.lunarYearBranch;
    const month = this.data.lunarMonth;
    const day = this.data.lunarDay;
    const hour = this.data.hourBranch;
    const minute = this.data.minute;
    // 下卦数
    const lower = (year + month + day) % 8 || 8;
    // 上卦数
    const upper = (year + month + day + hour) % 8 || 8;
    // 动爻数
    const moving = (year + month + day + hour + minute) % 6 || 6;
    // 查找卦名
    const guaName = this.getGuaName(upper, lower);
    this.setData({
      result: {
        lower, upper, moving, guaName
      }
    });
  },
  getGuaName(upper, lower) {
    // 八卦序号：1-8，乾1、兑2、离3、震4、巽5、坎6、艮7、坤8
    const bagua = ['','乾','兑','离','震','巽','坎','艮','坤'];
    return `${bagua[upper]}上-${bagua[lower]}下`;
  },
  onBack() {
    tt.navigateBack();
  }
}); 