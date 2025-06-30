// 64卦静态数据（不可变）
const sixtyFourGuaData = [
  // 1. 乾为天
  {
    guaName: "乾",
    guaCi: "元亨利贞",
    image: "../../assets/images/1.jpg",
    explanation: "象征天，代表刚健和创造力。教导人应效法天道，自强不息，把握时机进退。",    
    ex:"",
  },
  
  // 2. 坤为地
  {
    guaName: "坤",
    guaCi: "元亨，利牝马之贞",
    image: "../../assets/images/2.jpg",
    explanation: "象征地，代表柔顺和包容。强调厚德载物，以柔克刚，顺应自然规律。",     
    ex:"",
  },
  
  // 3. 水雷屯
  {
    guaName: "屯",
    guaCi: "元亨利贞，勿用有攸往，利建侯",
    image: "../../assets/images/3.jpg",
    explanation: "象征万物初生时的艰难。启示在初创阶段需坚定意志，谨慎行事，积蓄力量。",     
    ex:"",
  },
  
  // 4. 山水蒙
  {
    guaName: "蒙",
    guaCi: "亨。匪我求童蒙，童蒙求我。初噬告，再三渎，渎则不告。利贞",
    image: "../../assets/images/4.jpg",
    explanation: "象征启蒙教育。强调虚心受教的重要性，教导者应因材施教，学习者需主动求教。", 
    ex:"",
  },
  
  // 5. 水天需
  {
    guaName: "需",
    guaCi: "有孚，光亨，贞吉，利涉大川",
    image: "../../assets/images/5.jpg",
    explanation: "象征等待时机。教导在目标明确时，需耐心等待适宜时机，保持诚信以渡难关。", 
    ex:"",    
  },
  
  // 6. 天水讼
  {
    guaName: "讼",
    guaCi: "有孚窒惕，中吉，终凶。利见大人，不利涉大川",
    image: "../../assets/images/6.jpg",
    explanation: "象征争讼纠纷。警示避免无谓争执，大事化小，寻求公正裁决以平息纷争。",     
    ex:"",
  },
  
  // 7. 地水师
  {
    guaName: "师",
    guaCi: "贞丈人吉，无咎",
    image: "../../assets/images/7.jpg",
    explanation: "象征行军作战。强调统帅需德才兼备，纪律严明，用正道引领众人。",     
    ex:"",
  },
  
  // 8. 水地比
  {
    guaName: "比",
    guaCi: "吉，原筮，元永贞，无咎。不宁方来，后夫凶",
    image: "../../assets/images/8.jpg",
    explanation: "象征亲密比辅。教导择善而亲，以诚信建立关系，避免结党营私。",     
    ex:"",
  },
  
  // 9. 风天小畜
  {
    guaName: "小畜",
    guaCi: "亨。密云不雨，自我西郊",
    image: "../../assets/images/9.jpg",
    explanation: "象征小有积蓄。启示在力量不足时，需耐心积累，以柔顺之道待机而发。",     
    ex:"",
  },
  
  // 10. 天泽履
  {
    guaName: "履",
    guaCi: "履虎尾，不咥人，亨",
    image: "../../assets/images/10.jpg",
    explanation: "象征谨慎行事。如同踩虎尾，需时刻保持警惕，以柔顺态度应对险境。",   
    ex:"",  
  },
  
  // 11. 地天泰
  {
    guaName: "泰",
    guaCi: "小往大来，吉亨",
    image: "../../assets/images/11.jpg",
    explanation: "象征天地交泰。表示阴阳和谐，万物通泰。提醒在顺境中保持警惕，防微杜渐。",    
    ex:"", 
  },
  
  // 12. 天地否
  {
    guaName: "否",
    guaCi: "否之匪人，不利君子贞，大往小来",
    image: "../../assets/images/12.jpg",
    explanation: "象征闭塞不通。表示阴阳不交，上下隔阂。教导在逆境中坚守正道，等待转机。",     
    ex:"",
  },
  
  // 13. 天火同人
  {
    guaName: "同人",
    guaCi: "同人于野，亨。利涉大川，利君子贞",
    image: "../../assets/images/13.jpg",
    explanation: "象征和同于人。强调与人和谐共处，超越门户之见，以公正无私之心团结众人。",     
    ex:"",
  },
  
  // 14. 火天大有
  {
    guaName: "大有",
    guaCi: "元亨",
    image: "../../assets/images/14.jpg",
    explanation: "象征大有所获。表示物质精神双丰收。提醒富有时要坚守正道，心怀感恩，分享财富。",     
    ex:"",
  },
  
  // 15. 地山谦
  {
    guaName: "谦",
    guaCi: "亨，君子有终",
    image: "../../assets/images/15.jpg",
    explanation: "象征谦虚美德。强调无论地位高低都应保持谦逊，以德服人，自然能得道多助。",     
    ex:"",
  },
  
  // 16. 雷地豫
  {
    guaName: "豫",
    guaCi: "利建侯行师",
    image: "../../assets/images/16.jpg",
    explanation: "象征欢愉和乐。教导在安乐时要居安思危，保持清醒，避免沉溺享乐而招致祸患。",     
    ex:"",
  },
  
  // 17. 泽雷随
  {
    guaName: "随",
    guaCi: "元亨利贞，无咎",
    image: "../../assets/images/17.jpg",
    explanation: "象征随从之道。强调择善而从，随机应变，但需保持原则，不盲从他人。",     
    ex:"",
  },
  
  // 18. 山风蛊
  {
    guaName: "蛊",
    guaCi: "元亨，利涉大川。先甲三日，后甲三日",
    image: "../../assets/images/18.jpg",
    explanation: "象征积弊需治。表示事物久安生弊，需及时整治。强调改革要循序渐进，继承中有创新。",     
    ex:"",
  },
  
  // 19. 地泽临
  {
    guaName: "临",
    guaCi: "元亨利贞。至于八月有凶",
    image: "../../assets/images/19.jpg",
    explanation: "象征领导统御。强调领导者应以德服人，亲临现场，体察民情，恩威并施。",     
    ex:"",
  },
  
  // 20. 风地观
  {
    guaName: "观",
    guaCi: "盥而不荐，有孚颙若",
    image: "../../assets/images/20.jpg",
    explanation: "象征观察之道。强调通过细致观察来认识世界，既要观外也要自省，以正确决策。",     
    ex:"",
  },
  
  // 21. 火雷噬嗑
  {
    guaName: "噬嗑",
    guaCi: "亨。利用狱",
    image: "../../assets/images/21.jpg",
    explanation: "象征刑罚惩戒。表示以法治事，公正执法。强调刑罚要明察秋毫，轻重得当。",     
    ex:"",
  },
  
  // 22. 山火贲
  {
    guaName: "贲",
    guaCi: "亨。小利有攸往",
    image: "../../assets/images/22.jpg",
    explanation: "象征文饰美化。强调外在修饰要适度，本质重于形式，返璞归真才是最高境界。",    
    ex:"", 
  },
  
  // 23. 山地剥
  {
    guaName: "剥",
    guaCi: "不利有攸往",
    image: "../../assets/images/23.jpg",
    explanation: "象征剥落衰败。表示阴盛阳衰，小人得势。教导在不利环境要保存实力，等待转机。",    
    ex:"", 
  },
  
  // 24. 地雷复
  {
    guaName: "复",
    guaCi: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往",
    image: "../../assets/images/24.jpg",
    explanation: "象征复归正道。表示阳气回复，生机重现。强调知错能改，迷途知返的重要性。",    
    ex:"", 
  },
  
  // 25. 天雷无妄
  {
    guaName: "无妄",
    guaCi: "元亨利贞。其匪正有眚，不利有攸往",
    image: "../../assets/images/25.jpg",
    explanation: "象征不妄为。强调顺其自然，不存非分之想，以真诚之心行事，方能避祸得福。",    
    ex:"", 
  },
  
  // 26. 山天大畜
  {
    guaName: "大畜",
    guaCi: "利贞，不家食吉，利涉大川",
    image: "../../assets/images/26.jpg",
    explanation: "象征大积蓄。表示德智财力的全面积累。强调养贤育能，止恶于初，厚积薄发。",    
    ex:"", 
  },
  
  // 27. 山雷颐
  {
    guaName: "颐",
    guaCi: "贞吉。观颐，自求口实",
    image: "../../assets/images/27.jpg",
    explanation: "象征颐养之道。强调物质和精神的双重滋养，自食其力，养正则吉。",     
    ex:"",
  },
  
  // 28. 泽风大过
  {
    guaName: "大过",
    guaCi: "栋桡，利有攸往，亨",
    image: "../../assets/images/28.jpg",
    explanation: "象征大为过甚。表示非常时期的非常行动。强调打破常规时要把握分寸，寻求平衡。",     
    ex:"",
  },
  
  // 29. 坎为水
  {
    guaName: "坎",
    guaCi: "习坎，有孚，维心亨，行有尚",
    image: "../../assets/images/29.jpg",
    explanation: "象征重重险难。教导身处险境时要保持诚信，刚毅中正，寻求脱险之道。",     
    ex:"",
  },
  
  // 30. 离为火
  {
    guaName: "离",
    guaCi: "利贞亨。畜牝牛吉",
    image: "../../assets/images/30.jpg",
    explanation: "象征光明美丽。强调依附正道，柔顺守中，如同火焰依附可燃物才能发光发热。",     
    ex:"",
  },
  
  // 31. 泽山咸
  {
    guaName: "咸",
    guaCi: "亨，利贞，取女吉",
    image: "../../assets/images/31.jpg",
    explanation: "象征感应交流。表示阴阳相互感应，以诚相待。强调真诚是人际交往的基础。",     
    ex:"",
  },
  
  // 32. 雷风恒
  {
    guaName: "恒",
    guaCi: "亨，无咎，利贞，利有攸往",
    image: "../../assets/images/32.jpg",
    explanation: "象征恒久之道。强调持守正道，有恒心者事竟成，但需注意恒久不等于固执不变。",     
    ex:"",
  },
  
  // 33. 天山遁
  {
    guaName: "遁",
    guaCi: "亨，小利贞",
    image: "../../assets/images/33.jpg",
    explanation: "象征退避隐遁。表示小人得势时，君子应适时退避，保存实力，等待时机。",    
    ex:"", 
  },
  
  // 34. 雷天大壮
  {
    guaName: "大壮",
    guaCi: "利贞",
    image: "../../assets/images/34.jpg",
    explanation: "象征大而强盛。提醒在强盛时要守正持中，不可恃强凌弱，否则物极必反。",   
    ex:"",  
  },
  
  // 35. 火地晋
  {
    guaName: "晋",
    guaCi: "康侯用锡马蕃庶，昼日三接",
    image: "../../assets/images/35.jpg",
    explanation: "象征晋升上进。如同太阳升起，表示事业蒸蒸日上。强调以德晋升，光明磊落。",    
    ex:"", 
  },
  
  // 36. 地火明夷
  {
    guaName: "明夷",
    guaCi: "利艰贞",
    image: "../../assets/images/36.jpg",
    explanation: "象征光明受损。表示黑暗时期，君子应韬光养晦，守正不移，待时而动。",     
    ex:"",
  },
  
  // 37. 风火家人
  {
    guaName: "家人",
    guaCi: "利女贞",
    image: "../../assets/images/37.jpg",
    explanation: "象征家庭伦理。强调家庭成员各守其位，以严明家规治家，父慈子孝，夫义妇顺。",     
    ex:"",
  },
  
  // 38. 火泽睽
  {
    guaName: "睽",
    guaCi: "小事吉",
    image: "../../assets/images/38.jpg",
    explanation: "象征乖离不合。表示意见相左，关系疏离。教导求同存异，以柔顺之道化解矛盾。",    
    ex:"", 
  },
  
  // 39. 水山蹇
  {
    guaName: "蹇",
    guaCi: "利西南，不利东北；利见大人，贞吉",
    image: "../../assets/images/39.jpg",
    explanation: "象征行走艰难。表示前进受阻，处境艰难。教导见险而止，反身修德，寻求援助。",     
    ex:"",
  },
  
  // 40. 雷水解
  {
    guaName: "解",
    guaCi: "利西南，无所往，其来复吉。有攸往，夙吉",
    image: "../../assets/images/40.jpg",
    explanation: "象征解除困境。表示险难缓解，局势舒缓。强调把握时机，果断解除隐患。",    
    ex:"", 
  },
  
  // 41. 山泽损
  {
    guaName: "损",
    guaCi: "有孚，元吉，无咎，可贞，利有攸往？曷之用？二簋可用享",
    image: "../../assets/images/41.jpg",
    explanation: "象征减损之道。表示损下益上，但强调损所当损，诚信为本，终能受益。",     
    ex:"",
  },
  
  // 42. 风雷益
  {
    guaName: "益",
    guaCi: "利有攸往，利涉大川",
    image: "../../assets/images/42.jpg",
    explanation: "象征增益之道。表示损上益下，民悦无疆。强调见善则迁，有过则改，自利利他。", 
    ex:"",    
  },
  
  // 43. 泽天夬
  {
    guaName: "夬",
    guaCi: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往",
    image: "../../assets/images/43.jpg",
    explanation: "象征决断之道。表示阳刚决断阴柔，小人得除。强调决断要公正无私，恩威并施。",     
    ex:"",
  },
  
  // 44. 天风姤
  {
    guaName: "姤",
    guaCi: "女壮，勿用取女",
    image: "../../assets/images/44.jpg",
    explanation: "象征不期而遇。表示阴遇阳，女遇男。强调遇合要守正，防范未然，避免阴长阳消。",     
    ex:"",
  },
  
  // 45. 泽地萃
  {
    guaName: "萃",
    guaCi: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往",
    image: "../../assets/images/45.jpg",
    explanation: "象征聚集之道。表示人才荟萃，万物归附。强调以诚相聚，守正防乱，祭祀以聚心。",     
    ex:"",
  },
  
  // 46. 地风升
  {
    guaName: "升",
    guaCi: "元亨，用见大人，勿恤，南征吉",
    image: "../../assets/images/46.jpg",
    explanation: "象征上升发展。表示顺势而上，步步高升。强调积小成大，以柔顺之道稳步前进。",     
    ex:"",
  },
  
  // 47. 泽水困
  {
    guaName: "困",
    guaCi: "亨，贞，大人吉，无咎，有言不信",
    image: "../../assets/images/47.jpg",
    explanation: "象征困顿艰难。表示处境窘迫，行动受限。强调守正不移，修身养德，终能脱困。",    
    ex:"", 
  },
  
  // 48. 水风井
  {
    guaName: "井",
    guaCi: "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶",
    image: "../../assets/images/48.jpg",
    explanation: "象征井养之道。表示井水养人不穷，以井喻君子之德。强调修身养性，惠泽他人。",    
    ex:"", 
  },
  
  // 49. 泽火革
  {
    guaName: "革",
    guaCi: "己日乃孚，元亨利贞，悔亡",
    image: "../../assets/images/49.jpg",
    explanation: "象征变革之道。表示除旧布新，顺应时势。强调变革要把握时机，取信于民。",    
    ex:"", 
  },
  
  // 50. 火风鼎
  {
    guaName: "鼎",
    guaCi: "元吉，亨",
    image: "../../assets/images/50.jpg",
    explanation: "象征鼎新稳固。表示鼎能烹物养人，象征权力与责任。强调任用贤能，固本培元。",     
    ex:"",
  },
  
  // 51. 震为雷
  {
    guaName: "震",
    guaCi: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯",
    image: "../../assets/images/51.jpg",
    explanation: "象征雷震动荡。表示震动来临，恐惧修省。强调处变不惊，守中持正，可致亨通。",  
    ex:"",   
  },
  
  // 52. 艮为山
  {
    guaName: "艮",
    guaCi: "艮其背，不获其身，行其庭，不见其人，无咎",
    image: "../../assets/images/52.jpg",
    explanation: "象征静止稳重。表示适可而止，知止不殆。强调动静有时，当止则止，心静身安。",  
    ex:"",   
  },
  
  // 53. 风山渐
  {
    guaName: "渐",
    guaCi: "女归吉，利贞",
    image: "../../assets/images/53.jpg",
    explanation: "象征渐进有序。如同鸿雁渐飞，表示循序渐进。强调脚踏实地，不可急于求成。",  
    ex:"",   
  },
  
  // 54. 雷泽归妹
  {
    guaName: "归妹",
    guaCi: "征凶，无攸利",
    image: "../../assets/images/54.jpg",
    explanation: "象征婚嫁之道。表示女子出嫁，但强调婚姻要合乎礼义，否则必有凶险。",     
    ex:"",
  },
  
  // 55. 雷火丰
  {
    guaName: "丰",
    guaCi: "亨，王假之，勿忧，宜日中",
    image: "../../assets/images/55.jpg",
    explanation: "象征丰大盈满。表示事业盛大，如日中天。提醒盛极而衰，要持中守正，保持清醒。",  
    ex:"",   
  },
  
  // 56. 火山旅
  {
    guaName: "旅",
    guaCi: "小亨，旅贞吉",
    image: "../../assets/images/56.jpg",
    explanation: "象征行旅在外。表示漂泊不定，寄人篱下。强调旅途中要柔顺守正，谨慎谦和。",     
    ex:"",
  },
  
  // 57. 巽为风
  {
    guaName: "巽",
    guaCi: "小亨，利攸往，利见大人",
    image: "../../assets/images/57.jpg",
    explanation: "象征顺从之道。表示谦逊柔顺，无孔不入。强调以柔克刚，申命行事，过谦则卑。",  
    ex:"",   
  },
  
  // 58. 兑为泽
  {
    guaName: "兑",
    guaCi: "亨，利贞",
    image: "../../assets/images/58.jpg",
    explanation: "象征欣悦和乐。表示和谐喜悦，以诚相待。强调悦人悦己要持正，避免谄媚邪佞。", 
    ex:"",    
  },
  
  // 59. 风水涣
  {
    guaName: "涣",
    guaCi: "亨。王假有庙，利涉大川，利贞",
    image: "../../assets/images/59.jpg",
    explanation: "象征涣散分离。表示人心涣散，需凝聚力量。强调以诚信聚合人心，挽救涣散局面。",   
    ex:"",  
  },
  
  // 60. 水泽节
  {
    guaName: "节",
    guaCi: "亨。苦节不可贞",
    image: "../../assets/images/60.jpg",
    explanation: "象征节制有度。表示自我约束，适可而止。强调节制要适中，过则为苦，反受其害。",   
    ex:"",  
  },
  
  // 61. 风泽中孚
  {
    guaName: "中孚",
    guaCi: "豚鱼吉，利涉大川，利贞",
    image: "../../assets/images/61.jpg",
    explanation: "象征诚信中正。表示心怀诚信，感化万物。强调诚信为本，内外一致，言行相符。",    
    ex:"", 
  },
  
  // 62. 雷山小过
  {
    guaName: "小过",
    guaCi: "亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉",
    image: "../../assets/images/62.jpg",
    explanation: "象征小有过越。表示小事可过，大事不可过。强调行为要适度，谦恭柔顺可获吉祥。",   
    ex:"",  
  },
  
  // 63. 水火既济
  {
    guaName: "既济",
    guaCi: "亨小，利贞，初吉终乱",
    image: "../../assets/images/63.jpg",
    explanation: "象征事已成。表示大功告成，但暗藏危机。强调成功后更要谨慎，防微杜渐。",   
    ex:"",  
  },
  
  // 64. 火水未济
  {
    guaName: "未济",
    guaCi: "亨，小狐汔济，濡其尾，无攸利",
    image: "../../assets/images/64.jpg",
    explanation: "象征事未完成。表示事情接近成功但尚未完成，需谨慎行事，避免功亏一篑。",     
    ex:"",
  }
];

// 工具函数
// 移除 Node.js 模块导入，小程序环境不支持
// const fs = require('fs');
// const path = require('path');

/**
 * 获取卦象数据（不加载爻辞ex内容，仅返回静态数据）
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 卦象数据
 */
function getGuaData(guaIndex) {
  if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
    return { ...sixtyFourGuaData[guaIndex] };
  }
  return null;
}

/**
 * 获取卦象数据（如ex为空字符串则自动加载爻辞）
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 卦象数据，带ex（爻辞）
 */
function getGuaDataWithYaoCi(guaIndex) {
  if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
    const gua = { ...sixtyFourGuaData[guaIndex] };
    if (gua.ex === "") {
      try {
        // 小程序环境不支持 fs 和 path，改为使用 tt.getFileSystemManager
        // 或者直接返回空数组，后续通过其他方式加载
        gua.ex = [];
      } catch (e) {
        // 读取失败忽略
        gua.ex = [];
      }
    }
    return gua;
  }
  return null;
}

// 使用CommonJS导出
module.exports = {
  sixtyFourGuaData,
  getGuaData,
  getGuaDataWithYaoCi
};