const app = getApp();

Page({
  data: {
    ten: '',
    unit: '',
    result: {
      upper: null,
      lower: null,
      moving: null,
      guaName: ''
    }
  },
  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [field]: e.detail.value.replace(/\D/g, '') });
    this.calculateGua();
  },
  calculateGua() {
    const ten = parseInt(this.data.ten, 10);
    const unit = parseInt(this.data.unit, 10);
    if (isNaN(ten) || isNaN(unit)) {
      this.setData({ result: { upper: '', lower: '', moving: '', guaName: '' } });
      return;
    }
    // 上卦数
    const upper = ten % 8 || 8;
    // 下卦数
    const lower = unit % 8 || 8;
    // 动爻数
    const moving = (ten + unit) % 6 || 6;
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
  onBack() {
    tt.navigateBack();
  }
}); 