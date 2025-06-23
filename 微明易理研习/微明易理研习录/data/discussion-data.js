// 讨论数据
const discussionData = [
  {
    id: 1,
    title: "本质定位",
    pro: {
      view: "《易经》本质是上古占卜记录",
      advantage: "符合考古证据，贴近原始用途",
      disadvantage: "忽略孔子对义理的升华"
    },
    con: {
      view: "经圣贤演绎已成为哲学经典",
      advantage: "涵盖辩证法和伦理观",
      disadvantage: "可能过度解读脱离历史语境"
    },
    personalView: "占卜是载体，哲学是内核，二者不可割裂"
  },
  {
    id: 2,
    title: "思维方式",
    pro: {
      view: "只有归纳法缺乏推演，阻碍科学逻辑发展",
      advantage: "解释近代科学未诞生中国的原因",
      disadvantage: "忽视卦变等推演模型存在"
    },
    con: {
      view: "象思维的整体性认知优于机械拆解",
      advantage: "提供宏观视角，启发现代系统科学",
      disadvantage: "缺乏精细化验证"
    },
    personalView: "推演思维与整体观应互补，后者在复杂问题上具独特价值"
  },
  {
    id: 3,
    title: "科学影响",
    pro: {
      view: "阻碍科学发展，混淆自然与社会规律",
      advantage: "呼应李约瑟难题",
      disadvantage: "忽略宋元前中国科技领先事实"
    },
    con: {
      view: "启发二进制等科学发现",
      advantage: "展现跨学科启发性",
      disadvantage: "部分关联牵强附会"
    },
    personalView: "阻碍论在方法论层面成立，但责任不全在《易经》；启发价值多在隐喻层面"
  },
  {
    id: 4,
    title: "占卜有效性",
    pro: {
      view: "是阴阳变化的推演系统",
      advantage: "千年传承验证经验有效性",
      disadvantage: "难通过双盲实验"
    },
    con: {
      view: "实为心理投射工具",
      advantage: "解释不同派别结论冲突",
      disadvantage: "否定天人感应认知逻辑"
    },
    personalView: "作为文化行为学现象，价值在提供决策心理支持与风险反思框架"
  },
  {
    id: 5,
    title: "天人合一",
    pro: {
      view: "生态智慧，倡导人与自然和谐",
      advantage: "纠正人定胜天生态观",
      disadvantage: "可能阻碍技术变革"
    },
    con: {
      view: "导致科学认知混淆",
      advantage: "揭示科学需摆脱伦理预设",
      disadvantage: "忽视符号象征哲学意义"
    },
    personalView: "宇宙观层面具先进性，方法论层面需与科学互补"
  },
  {
    id: 6,
    title: "文本解读",
    pro: {
      view: "象数优先，离象无易",
      advantage: "贴近文本结构",
      disadvantage: "易陷繁琐术数"
    },
    con: {
      view: "义理优先，直取哲学内核",
      advantage: "提炼普世价值",
      disadvantage: "可能脱离历史语境"
    },
    personalView: "象数是密码本，义理是译文，二者如鸟之双翼"
  },
  {
    id: 7,
    title: "起源争议",
    pro: {
      view: "占卜演进，非圣贤创制",
      advantage: "符合文化人类学规律",
      disadvantage: "削弱思想体系性"
    },
    con: {
      view: "三圣作易的自觉建构",
      advantage: "赋予文化神圣性",
      disadvantage: "考古无直接证据"
    },
    personalView: "层累形成更合理：初始占卜符号经世代加工为哲学体系"
  },
  {
    id: 8,
    title: "现代价值",
    pro: {
      view: "智慧结晶，启迪多领域",
      advantage: "提供危机应对智慧",
      disadvantage: "易被神秘化包装"
    },
    con: {
      view: "文化糟粕，助长迷信",
      advantage: "警惕商业化滥用",
      disadvantage: "全盘否定文化基因"
    },
    personalView: "取其精华去其糟粕：继承哲学思辨，剥离占卜迷信"
  },
  {
    id: 9,
    title: "学习门槛",
    pro: {
      view: "高门槛，非一流智慧勿碰",
      advantage: "强调系统学习必要性",
      disadvantage: "精英化阻碍传播"
    },
    con: {
      view: "普适，敬畏心即可入门",
      advantage: "推动文化普惠",
      disadvantage: "简化版稀释精髓"
    },
    personalView: "分层教育：学术研究需严谨，大众普及可符号化"
  },
  {
    id: 10,
    title: "伦理功能",
    pro: {
      view: "道德教化，吉凶取决于德行",
      advantage: "赋予积极能动性",
      disadvantage: "可能沦为道德绑架"
    },
    con: {
      view: "宿命论，削弱自主性",
      advantage: "解释阶层固化认知",
      disadvantage: "违背变易核心精神"
    },
    personalView: "动态理解命运：命为约束条件，运为选择空间"
  }
]; 

// 讨论分类数据
const discussionCategories = [
  {
    id: "all",
    name: "全部",
    count: discussionData.length
  },
  {
    id: "卦象解读",
    name: "卦象解读",
    count: discussionData.filter(item => item.category === "卦象解读").length
  },
  {
    id: "应用探讨",
    name: "应用探讨",
    count: discussionData.filter(item => item.category === "应用探讨").length
  },
  {
    id: "理论研究",
    name: "理论研究",
    count: discussionData.filter(item => item.category === "理论研究").length
  }
];

// 热门标签数据
const popularTags = [
  { name: "本质定位", count: 3 },
  { name: "思维方法", count: 2 },
  { name: "科学角色", count: 4 },
  { name: "占卜性质", count: 2 },
  { name: "天人关系", count: 2 }, 
];

module.exports = {
  discussionData,
  discussionCategories,
  popularTags
}; 