const app = getApp();

Page({
  data: {
    charA: '',
    charB: '',
    strokesA: '',
    strokesB: '',
    timeT: 0,
    result: {
      upper: null,
      lower: null,
      moving: null,
      guaName: ''
    }
  },
  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value });
    this.calculateGua();
  },
  onStrokesInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value.replace(/\D/g, '') });
    this.calculateGua();
  },
  onLoad() {
    this.updateTimeT();
  },
  updateTimeT() {
    // 当前毫秒数 % 9
    const t = new Date().getMilliseconds() % 9;
    this.setData({ timeT: t });
    this.calculateGua();
  },
  calculateGua() {
    const A = parseInt(this.data.strokesA, 10);
    const B = parseInt(this.data.strokesB, 10);
    const T = this.data.timeT;
    if (isNaN(A) || isNaN(B)) {
      this.setData({ result: { upper: '', lower: '', moving: '', guaName: '' } });
      return;
    }
    // 上卦数
    const upper = A % 8 || 8;
    // 下卦数
    const lower = B % 8 || 8;
    // 动爻数
    const moving = (A + B + T) % 6 || 6;
    // 查找卦名
    const guaName = this.getGuaName(upper, lower);
    this.setData({
      result: { upper, lower, moving, guaName }
    });
  },
  getGuaName(upper, lower) {
    const bagua = ['','乾','兑','离','震','巽','坎','艮','坤'];
    return `${bagua[upper]}上-${bagua[lower]}下`;
  },
  onRefreshTimeT() {
    this.updateTimeT();
  },
  onBack() {
    tt.navigateBack();
  }
}); 