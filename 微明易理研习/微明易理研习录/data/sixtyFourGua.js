// 64卦静态数据（不可变）
const sixtyFourGuaData = [
  // 1. 乾为天
  {
    guaName: "乾",
    guaCi: "元亨利贞",
    yaoCi: [
      "初九：潜龙勿用",
      "九二：见龙在田，利见大人",
      "九三：君子终日乾乾，夕惕若厉，无咎",
      "九四：或跃在渊，无咎",
      "九五：飞龙在天，利见大人",
      "上九：亢龙有悔",
      "用九：见群龙无首，吉"
    ],
    image: "../../assets/images/1.jpg",
    explanation: "象征天，代表刚健和创造力。教导人应效法天道，自强不息，把握时机进退。",    
  },
  
  // 2. 坤为地
  {
    guaName: "坤",
    guaCi: "元亨，利牝马之贞",
    yaoCi: [
      "初六：履霜，坚冰至",
      "六二：直方大，不习无不利",
      "六三：含章可贞，或从王事，无成有终",
      "六四：括囊，无咎无誉",
      "六五：黄裳元吉",
      "上六：龙战于野，其血玄黄",
      "用六：利永贞"
    ],
    image: "../../assets/images/2.jpg",
    explanation: "象征地，代表柔顺和包容。强调厚德载物，以柔克刚，顺应自然规律。",    
  },
  
  // 3. 水雷屯
  {
    guaName: "屯",
    guaCi: "元亨利贞，勿用有攸往，利建侯",
    yaoCi: [
      "初九：磐桓，利居贞，利建侯",
      "六二：屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字",
      "六三：即鹿无虞，惟入于林中，君子几不如舍，往吝",
      "六四：乘马班如，求婚媾，往吉，无不利",
      "九五：屯其膏，小贞吉，大贞凶",
      "上六：乘马班如，泣血涟如"
    ],
    image: "../../assets/images/3.jpg",
    explanation: "象征万物初生时的艰难。启示在初创阶段需坚定意志，谨慎行事，积蓄力量。",    
  },
  
  // 4. 山水蒙
  {
    guaName: "蒙",
    guaCi: "亨。匪我求童蒙，童蒙求我。初噬告，再三渎，渎则不告。利贞",
    yaoCi: [
      "初六：发蒙，利用刑人，用说桎梏，以往吝",
      "九二：包蒙吉，纳妇吉，子克家",
      "六三：勿用取女，见金夫，不有躬，无攸利",
      "六四：困蒙，吝",
      "六五：童蒙，吉",
      "上九：击蒙，不利为寇，利御寇"
    ],
    image: "../../assets/images/4.jpg",
    explanation: "象征启蒙教育。强调虚心受教的重要性，教导者应因材施教，学习者需主动求教。",
  },
  
  // 5. 水天需
  {
    guaName: "需",
    guaCi: "有孚，光亨，贞吉，利涉大川",
    yaoCi: [
      "初九：需于郊，利用恒，无咎",
      "九二：需于沙，小有言，终吉",
      "九三：需于泥，致寇至",
      "六四：需于血，出自穴",
      "九五：需于酒食，贞吉",
      "上六：入于穴，有不速之客三人来，敬之终吉"
    ],
    image: "../../assets/images/5.jpg",
    explanation: "象征等待时机。教导在目标明确时，需耐心等待适宜时机，保持诚信以渡难关。",
    
  },
  
  // 6. 天水讼
  {
    guaName: "讼",
    guaCi: "有孚窒惕，中吉，终凶。利见大人，不利涉大川",
    yaoCi: [
      "初六：不永所事，小有言，终吉",
      "九二：不克讼，归而逋，其邑人三百户无眚",
      "六三：食旧德，贞厉，终吉。或从王事，无成",
      "九四：不克讼，复即命渝，安贞吉",
      "九五：讼元吉",
      "上九：或锡之鞶带，终朝三褫之"
    ],
    image: "../../assets/images/6.jpg",
    explanation: "象征争讼纠纷。警示避免无谓争执，大事化小，寻求公正裁决以平息纷争。",    
  },
  
  // 7. 地水师
  {
    guaName: "师",
    guaCi: "贞丈人吉，无咎",
    yaoCi: [
      "初六：师出以律，否臧凶",
      "九二：在师中吉，无咎，王三锡命",
      "六三：师或舆尸，凶",
      "六四：师左次，无咎",
      "六五：田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶",
      "上六：大君有命，开国承家，小人勿用"
    ],
    image: "../../assets/images/7.jpg",
    explanation: "象征行军作战。强调统帅需德才兼备，纪律严明，用正道引领众人。",    
  },
  
  // 8. 水地比
  {
    guaName: "比",
    guaCi: "吉，原筮，元永贞，无咎。不宁方来，后夫凶",
    yaoCi: [
      "初六：有孚比之，无咎。有孚盈缶，终来有它吉",
      "六二：比之自内，贞吉",
      "六三：比之匪人",
      "六四：外比之，贞吉",
      "九五：显比，王用三驱，失前禽，邑人不诫，吉",
      "上六：比之无首，凶"
    ],
    image: "../../assets/images/8.jpg",
    explanation: "象征亲密比辅。教导择善而亲，以诚信建立关系，避免结党营私。",    
  },
  
  // 9. 风天小畜
  {
    guaName: "小畜",
    guaCi: "亨。密云不雨，自我西郊",
    yaoCi: [
      "初九：复自道，何其咎？吉",
      "九二：牵复，吉",
      "九三：舆说辐，夫妻反目",
      "六四：有孚，血去惕出，无咎",
      "九五：有孚挛如，富以其邻",
      "上九：既雨既处，尚德载。妇贞厉。月几望，君子征凶"
    ],
    image: "../../assets/images/9.jpg",
    explanation: "象征小有积蓄。启示在力量不足时，需耐心积累，以柔顺之道待机而发。",    
  },
  
  // 10. 天泽履
  {
    guaName: "履",
    guaCi: "履虎尾，不咥人，亨",
    yaoCi: [
      "初九：素履往，无咎",
      "九二：履道坦坦，幽人贞吉",
      "六三：眇能视，跛能履，履虎尾，咥人，凶。武人为于大君",
      "九四：履虎尾，愬愬，终吉",
      "九五：夬履，贞厉",
      "上九：视履考祥，其旋元吉"
    ],
    image: "../../assets/images/10.jpg",
    explanation: "象征谨慎行事。如同踩虎尾，需时刻保持警惕，以柔顺态度应对险境。",    
  },
  
  // 11. 地天泰
  {
    guaName: "泰",
    guaCi: "小往大来，吉亨",
    yaoCi: [
      "初九：拔茅茹，以其汇，征吉",
      "九二：包荒，用冯河，不遐遗，朋亡，得尚于中行",
      "九三：无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福",
      "六四：翩翩不富，以其邻，不戒以孚",
      "六五：帝乙归妹，以祉元吉",
      "上六：城复于隍，勿用师。自邑告命，贞吝"
    ],
    image: "../../assets/images/11.jpg",
    explanation: "象征天地交泰。表示阴阳和谐，万物通泰。提醒在顺境中保持警惕，防微杜渐。",    
  },
  
  // 12. 天地否
  {
    guaName: "否",
    guaCi: "否之匪人，不利君子贞，大往小来",
    yaoCi: [
      "初六：拔茅茹，以其汇，贞吉亨",
      "六二：包承。小人吉，大人否亨",
      "六三：包羞",
      "九四：有命无咎，畴离祉",
      "九五：休否，大人吉。其亡其亡，系于苞桑",
      "上九：倾否，先否后喜"
    ],
    image: "../../assets/images/12.jpg",
    explanation: "象征闭塞不通。表示阴阳不交，上下隔阂。教导在逆境中坚守正道，等待转机。",    
  },
  
  // 13. 天火同人
  {
    guaName: "同人",
    guaCi: "同人于野，亨。利涉大川，利君子贞",
    yaoCi: [
      "初九：同人于门，无咎",
      "六二：同人于宗，吝",
      "九三：伏戎于莽，升其高陵，三岁不兴",
      "九四：乘其墉，弗克攻，吉",
      "九五：同人，先号咷而后笑，大师克相遇",
      "上九：同人于郊，无悔"
    ],
    image: "../../assets/images/13.jpg",
    explanation: "象征和同于人。强调与人和谐共处，超越门户之见，以公正无私之心团结众人。",    
  },
  
  // 14. 火天大有
  {
    guaName: "大有",
    guaCi: "元亨",
    yaoCi: [
      "初九：无交害，匪咎，艰则无咎",
      "九二：大车以载，有攸往，无咎",
      "九三：公用亨于天子，小人弗克",
      "九四：匪其彭，无咎",
      "六五：厥孚交如，威如，吉",
      "上九：自天祐之，吉无不利"
    ],
    image: "../../assets/images/14.jpg",
    explanation: "象征大有所获。表示物质精神双丰收。提醒富有时要坚守正道，心怀感恩，分享财富。",    
  },
  
  // 15. 地山谦
  {
    guaName: "谦",
    guaCi: "亨，君子有终",
    yaoCi: [
      "初六：谦谦君子，用涉大川，吉",
      "六二：鸣谦，贞吉",
      "九三：劳谦君子，有终吉",
      "六四：无不利，撝谦",
      "六五：不富以其邻，利用侵伐，无不利",
      "上六：鸣谦，利用行师，征邑国"
    ],
    image: "../../assets/images/15.jpg",
    explanation: "象征谦虚美德。强调无论地位高低都应保持谦逊，以德服人，自然能得道多助。",    
  },
  
  // 16. 雷地豫
  {
    guaName: "豫",
    guaCi: "利建侯行师",
    yaoCi: [
      "初六：鸣豫，凶",
      "六二：介于石，不终日，贞吉",
      "六三：盱豫，悔。迟有悔",
      "九四：由豫，大有得。勿疑，朋盍簪",
      "六五：贞疾，恒不死",
      "上六：冥豫，成有渝，无咎"
    ],
    image: "../../assets/images/16.jpg",
    explanation: "象征欢愉和乐。教导在安乐时要居安思危，保持清醒，避免沉溺享乐而招致祸患。",    
  },
  
  // 17. 泽雷随
  {
    guaName: "随",
    guaCi: "元亨利贞，无咎",
    yaoCi: [
      "初九：官有渝，贞吉。出门交有功",
      "六二：系小子，失丈夫",
      "六三：系丈夫，失小子。随有求得，利居贞",
      "九四：随有获，贞凶。有孚在道，以明，何咎",
      "九五：孚于嘉，吉",
      "上六：拘系之，乃从维之。王用亨于西山"
    ],
    image: "../../assets/images/17.jpg",
    explanation: "象征随从之道。强调择善而从，随机应变，但需保持原则，不盲从他人。",    
  },
  
  // 18. 山风蛊
  {
    guaName: "蛊",
    guaCi: "元亨，利涉大川。先甲三日，后甲三日",
    yaoCi: [
      "初六：干父之蛊，有子，考无咎，厉终吉",
      "九二：干母之蛊，不可贞",
      "九三：干父之蛊，小有悔，无大咎",
      "六四：裕父之蛊，往见吝",
      "六五：干父之蛊，用誉",
      "上九：不事王侯，高尚其事"
    ],
    image: "../../assets/images/18.jpg",
    explanation: "象征积弊需治。表示事物久安生弊，需及时整治。强调改革要循序渐进，继承中有创新。",    
  },
  
  // 19. 地泽临
  {
    guaName: "临",
    guaCi: "元亨利贞。至于八月有凶",
    yaoCi: [
      "初九：咸临，贞吉",
      "九二：咸临，吉无不利",
      "六三：甘临，无攸利。既忧之，无咎",
      "六四：至临，无咎",
      "六五：知临，大君之宜，吉",
      "上六：敦临，吉无咎"
    ],
    image: "../../assets/images/19.jpg",
    explanation: "象征领导统御。强调领导者应以德服人，亲临现场，体察民情，恩威并施。",    
  },
  
  // 20. 风地观
  {
    guaName: "观",
    guaCi: "盥而不荐，有孚颙若",
    yaoCi: [
      "初六：童观，小人无咎，君子吝",
      "六二：窥观，利女贞",
      "六三：观我生，进退",
      "六四：观国之光，利用宾于王",
      "九五：观我生，君子无咎",
      "上九：观其生，君子无咎"
    ],
    image: "../../assets/images/20.jpg",
    explanation: "象征观察之道。强调通过细致观察来认识世界，既要观外也要自省，以正确决策。",    
  },
  
  // 21. 火雷噬嗑
  {
    guaName: "噬嗑",
    guaCi: "亨。利用狱",
    yaoCi: [
      "初九：履校灭趾，无咎",
      "六二：噬肤灭鼻，无咎",
      "六三：噬腊肉，遇毒；小吝，无咎",
      "九四：噬干胏，得金矢，利艰贞，吉",
      "六五：噬干肉，得黄金，贞厉，无咎",
      "上九：何校灭耳，凶"
    ],
    image: "../../assets/images/21.jpg",
    explanation: "象征刑罚惩戒。表示以法治事，公正执法。强调刑罚要明察秋毫，轻重得当。",    
  },
  
  // 22. 山火贲
  {
    guaName: "贲",
    guaCi: "亨。小利有攸往",
    yaoCi: [
      "初九：贲其趾，舍车而徒",
      "六二：贲其须",
      "九三：贲如濡如，永贞吉",
      "六四：贲如皤如，白马翰如，匪寇婚媾",
      "六五：贲于丘园，束帛戋戋，吝，终吉",
      "上九：白贲，无咎"
    ],
    image: "../../assets/images/22.jpg",
    explanation: "象征文饰美化。强调外在修饰要适度，本质重于形式，返璞归真才是最高境界。",    
  },
  
  // 23. 山地剥
  {
    guaName: "剥",
    guaCi: "不利有攸往",
    yaoCi: [
      "初六：剥床以足，蔑贞凶",
      "六二：剥床以辨，蔑贞凶",
      "六三：剥之，无咎",
      "六四：剥床以肤，凶",
      "六五：贯鱼，以宫人宠，无不利",
      "上九：硕果不食，君子得舆，小人剥庐"
    ],
    image: "../../assets/images/23.jpg",
    explanation: "象征剥落衰败。表示阴盛阳衰，小人得势。教导在不利环境要保存实力，等待转机。",    
  },
  
  // 24. 地雷复
  {
    guaName: "复",
    guaCi: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往",
    yaoCi: [
      "初九：不远复，无祗悔，元吉",
      "六二：休复，吉",
      "六三：频复，厉无咎",
      "六四：中行独复",
      "六五：敦复，无悔",
      "上六：迷复，凶，有灾眚。用行师，终有大败，以其国君凶，至于十年不克征"
    ],
    image: "../../assets/images/24.jpg",
    explanation: "象征复归正道。表示阳气回复，生机重现。强调知错能改，迷途知返的重要性。",    
  },
  
  // 25. 天雷无妄
  {
    guaName: "无妄",
    guaCi: "元亨利贞。其匪正有眚，不利有攸往",
    yaoCi: [
      "初九：无妄，往吉",
      "六二：不耕获，不菑畬，则利有攸往",
      "六三：无妄之灾，或系之牛，行人之得，邑人之灾",
      "九四：可贞，无咎",
      "九五：无妄之疾，勿药有喜",
      "上九：无妄，行有眚，无攸利"
    ],
    image: "../../assets/images/25.jpg",
    explanation: "象征不妄为。强调顺其自然，不存非分之想，以真诚之心行事，方能避祸得福。",    
  },
  
  // 26. 山天大畜
  {
    guaName: "大畜",
    guaCi: "利贞，不家食吉，利涉大川",
    yaoCi: [
      "初九：有厉利已",
      "九二：舆说輹",
      "九三：良马逐，利艰贞。曰闲舆卫，利有攸往",
      "六四：童牛之牿，元吉",
      "六五：豮豕之牙，吉",
      "上九：何天之衢，亨"
    ],
    image: "../../assets/images/26.jpg",
    explanation: "象征大积蓄。表示德智财力的全面积累。强调养贤育能，止恶于初，厚积薄发。",    
  },
  
  // 27. 山雷颐
  {
    guaName: "颐",
    guaCi: "贞吉。观颐，自求口实",
    yaoCi: [
      "初九：舍尔灵龟，观我朵颐，凶",
      "六二：颠颐，拂经，于丘颐，征凶",
      "六三：拂颐，贞凶，十年勿用，无攸利",
      "六四：颠颐吉，虎视眈眈，其欲逐逐，无咎",
      "六五：拂经，居贞吉，不可涉大川",
      "上九：由颐，厉吉，利涉大川"
    ],
    image: "../../assets/images/27.jpg",
    explanation: "象征颐养之道。强调物质和精神的双重滋养，自食其力，养正则吉。",    
  },
  
  // 28. 泽风大过
  {
    guaName: "大过",
    guaCi: "栋桡，利有攸往，亨",
    yaoCi: [
      "初六：藉用白茅，无咎",
      "九二：枯杨生稊，老夫得其女妻，无不利",
      "九三：栋桡，凶",
      "九四：栋隆，吉；有它吝",
      "九五：枯杨生华，老妇得士夫，无咎无誉",
      "上六：过涉灭顶，凶，无咎"
    ],
    image: "../../assets/images/28.jpg",
    explanation: "象征大为过甚。表示非常时期的非常行动。强调打破常规时要把握分寸，寻求平衡。",    
  },
  
  // 29. 坎为水
  {
    guaName: "坎",
    guaCi: "习坎，有孚，维心亨，行有尚",
    yaoCi: [
      "初六：习坎，入于坎窞，凶",
      "九二：坎有险，求小得",
      "六三：来之坎坎，险且枕，入于坎窞，勿用",
      "六四：樽酒簋贰，用缶，纳约自牖，终无咎",
      "九五：坎不盈，祗既平，无咎",
      "上六：系用徽纆，寘于丛棘，三岁不得，凶"
    ],
    image: "../../assets/images/29.jpg",
    explanation: "象征重重险难。教导身处险境时要保持诚信，刚毅中正，寻求脱险之道。",    
  },
  
  // 30. 离为火
  {
    guaName: "离",
    guaCi: "利贞亨。畜牝牛吉",
    yaoCi: [
      "初九：履错然，敬之无咎",
      "六二：黄离，元吉",
      "九三：日昃之离，不鼓缶而歌，则大耋之嗟，凶",
      "九四：突如其来如，焚如，死如，弃如",
      "六五：出涕沱若，戚嗟若，吉",
      "上九：王用出征，有嘉折首，获匪其丑，无咎"
    ],
    image: "../../assets/images/30.jpg",
    explanation: "象征光明美丽。强调依附正道，柔顺守中，如同火焰依附可燃物才能发光发热。",    
  },
  
  // 31. 泽山咸
  {
    guaName: "咸",
    guaCi: "亨，利贞，取女吉",
    yaoCi: [
      "初六：咸其拇",
      "六二：咸其腓，凶，居吉",
      "九三：咸其股，执其随，往吝",
      "九四：贞吉悔亡，憧憧往来，朋从尔思",
      "九五：咸其脢，无悔",
      "上六：咸其辅颊舌"
    ],
    image: "../../assets/images/31.jpg",
    explanation: "象征感应交流。表示阴阳相互感应，以诚相待。强调真诚是人际交往的基础。",    
  },
  
  // 32. 雷风恒
  {
    guaName: "恒",
    guaCi: "亨，无咎，利贞，利有攸往",
    yaoCi: [
      "初六：浚恒，贞凶，无攸利",
      "九二：悔亡",
      "九三：不恒其德，或承之羞，贞吝",
      "九四：田无禽",
      "六五：恒其德，贞，妇人吉，夫子凶",
      "上六：振恒，凶"
    ],
    image: "../../assets/images/32.jpg",
    explanation: "象征恒久之道。强调持守正道，有恒心者事竟成，但需注意恒久不等于固执不变。",    
  },
  
  // 33. 天山遁
  {
    guaName: "遁",
    guaCi: "亨，小利贞",
    yaoCi: [
      "初六：遁尾，厉，勿用有攸往",
      "六二：执之用黄牛之革，莫之胜说",
      "九三：系遁，有疾厉，畜臣妾吉",
      "九四：好遁君子吉，小人否",
      "九五：嘉遁，贞吉",
      "上九：肥遁，无不利"
    ],
    image: "../../assets/images/33.jpg",
    explanation: "象征退避隐遁。表示小人得势时，君子应适时退避，保存实力，等待时机。",    
  },
  
  // 34. 雷天大壮
  {
    guaName: "大壮",
    guaCi: "利贞",
    yaoCi: [
      "初九：壮于趾，征凶，有孚",
      "九二：贞吉",
      "九三：小人用壮，君子用罔，贞厉。羝羊触藩，羸其角",
      "九四：贞吉悔亡，藩决不羸，壮于大舆之輹",
      "六五：丧羊于易，无悔",
      "上六：羝羊触藩，不能退，不能遂，无攸利，艰则吉"
    ],
    image: "../../assets/images/34.jpg",
    explanation: "象征大而强盛。提醒在强盛时要守正持中，不可恃强凌弱，否则物极必反。",    
  },
  
  // 35. 火地晋
  {
    guaName: "晋",
    guaCi: "康侯用锡马蕃庶，昼日三接",
    yaoCi: [
      "初六：晋如摧如，贞吉。罔孚，裕无咎",
      "六二：晋如愁如，贞吉。受兹介福，于其王母",
      "六三：众允，悔亡",
      "九四：晋如鼫鼠，贞厉",
      "六五：悔亡，失得勿恤，往吉无不利",
      "上九：晋其角，维用伐邑，厉吉无咎，贞吝"
    ],
    image: "../../assets/images/35.jpg",
    explanation: "象征晋升上进。如同太阳升起，表示事业蒸蒸日上。强调以德晋升，光明磊落。",    
  },
  
  // 36. 地火明夷
  {
    guaName: "明夷",
    guaCi: "利艰贞",
    yaoCi: [
      "初九：明夷于飞，垂其翼。君子于行，三日不食，有攸往，主人有言",
      "六二：明夷，夷于左股，用拯马壮，吉",
      "九三：明夷于南狩，得其大首，不可疾贞",
      "六四：入于左腹，获明夷之心，出于门庭",
      "六五：箕子之明夷，利贞",
      "上六：不明晦，初登于天，后入于地"
    ],
    image: "../../assets/images/36.jpg",
    explanation: "象征光明受损。表示黑暗时期，君子应韬光养晦，守正不移，待时而动。",    
  },
  
  // 37. 风火家人
  {
    guaName: "家人",
    guaCi: "利女贞",
    yaoCi: [
      "初九：闲有家，悔亡",
      "六二：无攸遂，在中馈，贞吉",
      "九三：家人嗃嗃，悔厉吉；妇子嘻嘻，终吝",
      "六四：富家，大吉",
      "九五：王假有家，勿恤吉",
      "上九：有孚威如，终吉"
    ],
    image: "../../assets/images/37.jpg",
    explanation: "象征家庭伦理。强调家庭成员各守其位，以严明家规治家，父慈子孝，夫义妇顺。",    
  },
  
  // 38. 火泽睽
  {
    guaName: "睽",
    guaCi: "小事吉",
    yaoCi: [
      "初九：悔亡，丧马勿逐，自复；见恶人无咎",
      "九二：遇主于巷，无咎",
      "六三：见舆曳，其牛掣，其人天且劓，无初有终",
      "九四：睽孤，遇元夫，交孚，厉无咎",
      "六五：悔亡，厥宗噬肤，往何咎",
      "上九：睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉"
    ],
    image: "../../assets/images/38.jpg",
    explanation: "象征乖离不合。表示意见相左，关系疏离。教导求同存异，以柔顺之道化解矛盾。",    
  },
  
  // 39. 水山蹇
  {
    guaName: "蹇",
    guaCi: "利西南，不利东北；利见大人，贞吉",
    yaoCi: [
      "初六：往蹇，来誉",
      "六二：王臣蹇蹇，匪躬之故",
      "九三：往蹇来反",
      "六四：往蹇来连",
      "九五：大蹇朋来",
      "上六：往蹇来硕，吉；利见大人"
    ],
    image: "../../assets/images/39.jpg",
    explanation: "象征行走艰难。表示前进受阻，处境艰难。教导见险而止，反身修德，寻求援助。",    
  },
  
  // 40. 雷水解
  {
    guaName: "解",
    guaCi: "利西南，无所往，其来复吉。有攸往，夙吉",
    yaoCi: [
      "初六：无咎",
      "九二：田获三狐，得黄矢，贞吉",
      "六三：负且乘，致寇至，贞吝",
      "九四：解而拇，朋至斯孚",
      "六五：君子维有解，吉；有孚于小人",
      "上六：公用射隼于高墉之上，获之，无不利"
    ],
    image: "../../assets/images/40.jpg",
    explanation: "象征解除困境。表示险难缓解，局势舒缓。强调把握时机，果断解除隐患。",    
  },
  
  // 41. 山泽损
  {
    guaName: "损",
    guaCi: "有孚，元吉，无咎，可贞，利有攸往？曷之用？二簋可用享",
    yaoCi: [
      "初九：已事遄往，无咎，酌损之",
      "九二：利贞，征凶，弗损益之",
      "六三：三人行，则损一人；一人行，则得其友",
      "六四：损其疾，使遄有喜，无咎",
      "六五：或益之十朋之龟，弗克违，元吉",
      "上九：弗损益之，无咎，贞吉，利有攸往，得臣无家"
    ],
    image: "../../assets/images/41.jpg",
    explanation: "象征减损之道。表示损下益上，但强调损所当损，诚信为本，终能受益。",    
  },
  
  // 42. 风雷益
  {
    guaName: "益",
    guaCi: "利有攸往，利涉大川",
    yaoCi: [
      "初九：利用为大作，元吉，无咎",
      "六二：或益之十朋之龟，弗克违，永贞吉。王用享于帝，吉",
      "六三：益之用凶事，无咎。有孚中行，告公用圭",
      "六四：中行，告公从。利用为依迁国",
      "九五：有孚惠心，勿问元吉。有孚惠我德",
      "上九：莫益之，或击之，立心勿恒，凶"
    ],
    image: "../../assets/images/42.jpg",
    explanation: "象征增益之道。表示损上益下，民悦无疆。强调见善则迁，有过则改，自利利他。",    
  },
  
  // 43. 泽天夬
  {
    guaName: "夬",
    guaCi: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往",
    yaoCi: [
      "初九：壮于前趾，往不胜为吝",
      "九二：惕号，莫夜有戎，勿恤",
      "九三：壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎",
      "九四：臀无肤，其行次且。牵羊悔亡，闻言不信",
      "九五：苋陆夬夬，中行无咎",
      "上六：无号，终有凶"
    ],
    image: "../../assets/images/43.jpg",
    explanation: "象征决断之道。表示阳刚决断阴柔，小人得除。强调决断要公正无私，恩威并施。",    
  },
  
  // 44. 天风姤
  {
    guaName: "姤",
    guaCi: "女壮，勿用取女",
    yaoCi: [
      "初六：系于金柅，贞吉，有攸往，见凶，羸豕踟躅",
      "九二：包有鱼，无咎，不利宾",
      "九三：臀无肤，其行次且，厉，无大咎",
      "九四：包无鱼，起凶",
      "九五：以杞包瓜，含章，有陨自天",
      "上九：姤其角，吝，无咎"
    ],
    image: "../../assets/images/44.jpg",
    explanation: "象征不期而遇。表示阴遇阳，女遇男。强调遇合要守正，防范未然，避免阴长阳消。",    
  },
  
  // 45. 泽地萃
  {
    guaName: "萃",
    guaCi: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往",
    yaoCi: [
      "初六：有孚不终，乃乱乃萃，若号一握为笑，勿恤，往无咎",
      "六二：引吉，无咎，孚乃利用禴",
      "六三：萃如，嗟如，无攸利，往无咎，小吝",
      "九四：大吉，无咎",
      "九五：萃有位，无咎。匪孚，元永贞，悔亡",
      "上六：赍咨涕洟，无咎"
    ],
    image: "../../assets/images/45.jpg",
    explanation: "象征聚集之道。表示人才荟萃，万物归附。强调以诚相聚，守正防乱，祭祀以聚心。",    
  },
  
  // 46. 地风升
  {
    guaName: "升",
    guaCi: "元亨，用见大人，勿恤，南征吉",
    yaoCi: [
      "初六：允升，大吉",
      "九二：孚乃利用禴，无咎",
      "九三：升虚邑",
      "六四：王用亨于岐山，吉无咎",
      "六五：贞吉，升阶",
      "上六：冥升，利于不息之贞"
    ],
    image: "../../assets/images/46.jpg",
    explanation: "象征上升发展。表示顺势而上，步步高升。强调积小成大，以柔顺之道稳步前进。",    
  },
  
  // 47. 泽水困
  {
    guaName: "困",
    guaCi: "亨，贞，大人吉，无咎，有言不信",
    yaoCi: [
      "初六：臀困于株木，入于幽谷，三岁不觌",
      "九二：困于酒食，朱绂方来，利用亨祀，征凶，无咎",
      "六三：困于石，据于蒺藜，入于其宫，不见其妻，凶",
      "九四：来徐徐，困于金车，吝，有终",
      "九五：劓刖，困于赤绂，乃徐有说，利用祭祀",
      "上六：困于葛藟，于臲卼，曰动悔。有悔，征吉"
    ],
    image: "../../assets/images/47.jpg",
    explanation: "象征困顿艰难。表示处境窘迫，行动受限。强调守正不移，修身养德，终能脱困。",    
  },
  
  // 48. 水风井
  {
    guaName: "井",
    guaCi: "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶",
    yaoCi: [
      "初六：井泥不食，旧井无禽",
      "九二：井谷射鲋，瓮敝漏",
      "九三：井渫不食，为我心恻，可用汲，王明，并受其福",
      "六四：井甃，无咎",
      "九五：井冽，寒泉食",
      "上六：井收勿幕，有孚元吉"
    ],
    image: "../../assets/images/48.jpg",
    explanation: "象征井养之道。表示井水养人不穷，以井喻君子之德。强调修身养性，惠泽他人。",    
  },
  
  // 49. 泽火革
  {
    guaName: "革",
    guaCi: "己日乃孚，元亨利贞，悔亡",
    yaoCi: [
      "初九：巩用黄牛之革",
      "六二：己日乃革之，征吉，无咎",
      "九三：征凶，贞厉，革言三就，有孚",
      "九四：悔亡，有孚改命，吉",
      "九五：大人虎变，未占有孚",
      "上六：君子豹变，小人革面，征凶，居贞吉"
    ],
    image: "../../assets/images/49.jpg",
    explanation: "象征变革之道。表示除旧布新，顺应时势。强调变革要把握时机，取信于民。",    
  },
  
  // 50. 火风鼎
  {
    guaName: "鼎",
    guaCi: "元吉，亨",
    yaoCi: [
      "初六：鼎颠趾，利出否，得妾以其子，无咎",
      "九二：鼎有实，我仇有疾，不我能即，吉",
      "九三：鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉",
      "九四：鼎折足，覆公餗，其形渥，凶",
      "六五：鼎黄耳金铉，利贞",
      "上九：鼎玉铉，大吉，无不利"
    ],
    image: "../../assets/images/50.jpg",
    explanation: "象征鼎新稳固。表示鼎能烹物养人，象征权力与责任。强调任用贤能，固本培元。",    
  },
  
  // 51. 震为雷
  {
    guaName: "震",
    guaCi: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯",
    yaoCi: [
      "初九：震来虩虩，后笑言哑哑，吉",
      "六二：震来厉，亿丧贝，跻于九陵，勿逐，七日得",
      "六三：震苏苏，震行无眚",
      "九四：震遂泥",
      "六五：震往来厉，亿无丧，有事",
      "上六：震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言"
    ],
    image: "../../assets/images/51.jpg",
    explanation: "象征雷震动荡。表示震动来临，恐惧修省。强调处变不惊，守中持正，可致亨通。",    
  },
  
  // 52. 艮为山
  {
    guaName: "艮",
    guaCi: "艮其背，不获其身，行其庭，不见其人，无咎",
    yaoCi: [
      "初六：艮其趾，无咎，利永贞",
      "六二：艮其腓，不拯其随，其心不快",
      "九三：艮其限，列其夤，厉薰心",
      "六四：艮其身，无咎",
      "六五：艮其辅，言有序，悔亡",
      "上九：敦艮，吉"
    ],
    image: "../../assets/images/52.jpg",
    explanation: "象征静止稳重。表示适可而止，知止不殆。强调动静有时，当止则止，心静身安。",    
  },
  
  // 53. 风山渐
  {
    guaName: "渐",
    guaCi: "女归吉，利贞",
    yaoCi: [
      "初六：鸿渐于干，小子厉，有言，无咎",
      "六二：鸿渐于磐，饮食衎衎，吉",
      "九三：鸿渐于陆，夫征不复，妇孕不育，凶；利御寇",
      "六四：鸿渐于木，或得其桷，无咎",
      "九五：鸿渐于陵，妇三岁不孕，终莫之胜，吉",
      "上九：鸿渐于逵，其羽可用为仪，吉"
    ],
    image: "../../assets/images/53.jpg",
    explanation: "象征渐进有序。如同鸿雁渐飞，表示循序渐进。强调脚踏实地，不可急于求成。",    
  },
  
  // 54. 雷泽归妹
  {
    guaName: "归妹",
    guaCi: "征凶，无攸利",
    yaoCi: [
      "初九：归妹以娣，跛能履，征吉",
      "九二：眇能视，利幽人之贞",
      "六三：归妹以须，反归以娣",
      "九四：归妹愆期，迟归有时",
      "六五：帝乙归妹，其君之袂，不如其娣之袂良，月几望，吉",
      "上六：女承筐无实，士刲羊无血，无攸利"
    ],
    image: "../../assets/images/54.jpg",
    explanation: "象征婚嫁之道。表示女子出嫁，但强调婚姻要合乎礼义，否则必有凶险。",    
  },
  
  // 55. 雷火丰
  {
    guaName: "丰",
    guaCi: "亨，王假之，勿忧，宜日中",
    yaoCi: [
      "初九：遇其配主，虽旬无咎，往有尚",
      "六二：丰其蔀，日中见斗，往得疑疾，有孚发若，吉",
      "九三：丰其沛，日中见沬，折其右肱，无咎",
      "九四：丰其蔀，日中见斗，遇其夷主，吉",
      "六五：来章，有庆誉，吉",
      "上六：丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶"
    ],
    image: "../../assets/images/55.jpg",
    explanation: "象征丰大盈满。表示事业盛大，如日中天。提醒盛极而衰，要持中守正，保持清醒。",    
  },
  
  // 56. 火山旅
  {
    guaName: "旅",
    guaCi: "小亨，旅贞吉",
    yaoCi: [
      "初六：旅琐琐，斯其所取灾",
      "六二：旅即次，怀其资，得童仆贞",
      "九三：旅焚其次，丧其童仆，贞厉",
      "九四：旅于处，得其资斧，我心不快",
      "六五：射雉一矢亡，终以誉命",
      "上九：鸟焚其巢，旅人先笑后号啕。丧牛于易，凶"
    ],
    image: "../../assets/images/56.jpg",
    explanation: "象征行旅在外。表示漂泊不定，寄人篱下。强调旅途中要柔顺守正，谨慎谦和。",    
  },
  
  // 57. 巽为风
  {
    guaName: "巽",
    guaCi: "小亨，利攸往，利见大人",
    yaoCi: [
      "初六：进退，利武人之贞",
      "九二：巽在床下，用史巫纷若，吉无咎",
      "九三：频巽，吝",
      "六四：悔亡，田获三品",
      "九五：贞吉悔亡，无不利。无初有终，先庚三日，后庚三日，吉",
      "上九：巽在床下，丧其资斧，贞凶"
    ],
    image: "../../assets/images/57.jpg",
    explanation: "象征顺从之道。表示谦逊柔顺，无孔不入。强调以柔克刚，申命行事，过谦则卑。",    
  },
  
  // 58. 兑为泽
  {
    guaName: "兑",
    guaCi: "亨，利贞",
    yaoCi: [
      "初九：和兑，吉",
      "九二：孚兑，吉，悔亡",
      "六三：来兑，凶",
      "九四：商兑，未宁，介疾有喜",
      "九五：孚于剥，有厉",
      "上六：引兑"
    ],
    image: "../../assets/images/58.jpg",
    explanation: "象征欣悦和乐。表示和谐喜悦，以诚相待。强调悦人悦己要持正，避免谄媚邪佞。",    
  },
  
  // 59. 风水涣
  {
    guaName: "涣",
    guaCi: "亨。王假有庙，利涉大川，利贞",
    yaoCi: [
      "初六：用拯马壮，吉",
      "九二：涣奔其机，悔亡",
      "六三：涣其躬，无悔",
      "六四：涣其群，元吉。涣有丘，匪夷所思",
      "九五：涣汗其大号，涣王居，无咎",
      "上九：涣其血，去逖出，无咎"
    ],
    image: "../../assets/images/59.jpg",
    explanation: "象征涣散分离。表示人心涣散，需凝聚力量。强调以诚信聚合人心，挽救涣散局面。",    
  },
  
  // 60. 水泽节
  {
    guaName: "节",
    guaCi: "亨。苦节不可贞",
    yaoCi: [
      "初九：不出户庭，无咎",
      "九二：不出门庭，凶",
      "六三：不节若，则嗟若，无咎",
      "六四：安节，亨",
      "九五：甘节，吉；往有尚",
      "上六：苦节，贞凶，悔亡"
    ],
    image: "../../assets/images/60.jpg",
    explanation: "象征节制有度。表示自我约束，适可而止。强调节制要适中，过则为苦，反受其害。",    
  },
  
  // 61. 风泽中孚
  {
    guaName: "中孚",
    guaCi: "豚鱼吉，利涉大川，利贞",
    yaoCi: [
      "初九：虞吉，有他不燕",
      "九二：鸣鹤在阴，其子和之，我有好爵，吾与尔靡之",
      "六三：得敌，或鼓或罢，或泣或歌",
      "六四：月几望，马匹亡，无咎",
      "九五：有孚挛如，无咎",
      "上九：翰音登于天，贞凶"
    ],
    image: "../../assets/images/61.jpg",
    explanation: "象征诚信中正。表示心怀诚信，感化万物。强调诚信为本，内外一致，言行相符。",    
  },
  
  // 62. 雷山小过
  {
    guaName: "小过",
    guaCi: "亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉",
    yaoCi: [
      "初六：飞鸟以凶",
      "六二：过其祖，遇其妣；不及其君，遇其臣；无咎",
      "九三：弗过防之，从或戕之，凶",
      "九四：无咎，弗过遇之。往厉必戒，勿用永贞",
      "六五：密云不雨，自我西郊，公弋取彼在穴",
      "上六：弗遇过之，飞鸟离之，凶，是谓灾眚"
    ],
    image: "../../assets/images/62.jpg",
    explanation: "象征小有过越。表示小事可过，大事不可过。强调行为要适度，谦恭柔顺可获吉祥。",    
  },
  
  // 63. 水火既济
  {
    guaName: "既济",
    guaCi: "亨小，利贞，初吉终乱",
    yaoCi: [
      "初九：曳其轮，濡其尾，无咎",
      "六二：妇丧其茀，勿逐，七日得",
      "九三：高宗伐鬼方，三年克之，小人勿用",
      "六四：繻有衣袽，终日戒",
      "九五：东邻杀牛，不如西邻之禴祭，实受其福",
      "上六：濡其首，厉"
    ],
    image: "../../assets/images/63.jpg",
    explanation: "象征事已成。表示大功告成，但暗藏危机。强调成功后更要谨慎，防微杜渐。",    
  },
  
  // 64. 火水未济
  {
    guaName: "未济",
    guaCi: "亨。小狐汔济，濡其尾，无攸利",
    yaoCi: [
      "初六：濡其尾，吝",
      "九二：曳其轮，贞吉",
      "六三：未济，征凶。利涉大川",
      "九四：贞吉，悔亡。震用伐鬼方，三年有赏于大国",
      "六五：贞吉无悔。君子之光，有孚吉",
      "上九：有孚于饮酒，无咎。濡其首，有孚失是"
    ],
    image: "../../assets/images/64.jpg",
    explanation: "象征事未成。表示事业未竟，仍需努力。提醒在接近成功时更需谨慎，保持诚信以防功亏一篑。",    
  }
];

// 用户学习进度数据（可变，需要本地存储）
const sixtyFourGuaDataStudy = [
  { guaIndex: 0, completed: false },
  { guaIndex: 1, completed: false },
  { guaIndex: 2, completed: false },
  { guaIndex: 3, completed: false },
  { guaIndex: 4, completed: false },
  { guaIndex: 5, completed: false },
  { guaIndex: 6, completed: false },
  { guaIndex: 7, completed: false },
  { guaIndex: 8, completed: false },
  { guaIndex: 9, completed: false },
  { guaIndex: 10, completed: false },
  { guaIndex: 11, completed: false },
  { guaIndex: 12, completed: false },
  { guaIndex: 13, completed: false },
  { guaIndex: 14, completed: false },
  { guaIndex: 15, completed: false },
  { guaIndex: 16, completed: false },
  { guaIndex: 17, completed: false },
  { guaIndex: 18, completed: false },
  { guaIndex: 19, completed: false },
  { guaIndex: 20, completed: false },
  { guaIndex: 21, completed: false },
  { guaIndex: 22, completed: false },
  { guaIndex: 23, completed: false },
  { guaIndex: 24, completed: false },
  { guaIndex: 25, completed: false },
  { guaIndex: 26, completed: false },
  { guaIndex: 27, completed: false },
  { guaIndex: 28, completed: false },
  { guaIndex: 29, completed: false },
  { guaIndex: 30, completed: false },
  { guaIndex: 31, completed: false },
  { guaIndex: 32, completed: false },
  { guaIndex: 33, completed: false },
  { guaIndex: 34, completed: false },
  { guaIndex: 35, completed: false },
  { guaIndex: 36, completed: false },
  { guaIndex: 37, completed: false },
  { guaIndex: 38, completed: false },
  { guaIndex: 39, completed: false },
  { guaIndex: 40, completed: false },
  { guaIndex: 41, completed: false },
  { guaIndex: 42, completed: false },
  { guaIndex: 43, completed: false },
  { guaIndex: 44, completed: false },
  { guaIndex: 45, completed: false },
  { guaIndex: 46, completed: false },
  { guaIndex: 47, completed: false },
  { guaIndex: 48, completed: false },
  { guaIndex: 49, completed: false },
  { guaIndex: 50, completed: false },
  { guaIndex: 51, completed: false },
  { guaIndex: 52, completed: false },
  { guaIndex: 53, completed: false },
  { guaIndex: 54, completed: false },
  { guaIndex: 55, completed: false },
  { guaIndex: 56, completed: false },
  { guaIndex: 57, completed: false },
  { guaIndex: 58, completed: false },
  { guaIndex: 59, completed: false },
  { guaIndex: 60, completed: false },
  { guaIndex: 61, completed: false },
  { guaIndex: 62, completed: false },
  { guaIndex: 63, completed: false }
];

// 工具函数
/**
 * 获取卦象数据
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 卦象数据
 */
function getGuaData(guaIndex) {
  if (guaIndex >= 0 && guaIndex < sixtyFourGuaData.length) {
    return sixtyFourGuaData[guaIndex];
  }
  return null;
}

/**
 * 获取用户学习进度
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 学习进度
 */
function getStudyProgress(guaIndex) {
  const progress = sixtyFourGuaDataStudy.find(item => item.guaIndex === guaIndex);
  return progress || null;
}

/**
 * 更新学习进度
 * @param {number} guaIndex - 卦象索引
 * @param {boolean} completed - 是否完成
 */
function updateStudyProgress(guaIndex, completed) {
  const progress = sixtyFourGuaDataStudy.find(item => item.guaIndex === guaIndex);
  if (progress) {
    progress.completed = completed;
  }
}

/**
 * 获取完整卦象信息（包含学习进度）
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 完整卦象信息
 */
function getCompleteGuaInfo(guaIndex) {
  const guaData = getGuaData(guaIndex);
  const studyProgress = getStudyProgress(guaIndex);
  
  if (guaData && studyProgress) {
    return {
      ...guaData,
      completed: studyProgress.completed
    };
  }
  
  return null;
}

/**
 * 获取所有完成学习的卦象索引
 * @returns {Array} 完成的卦象索引数组
 */
function getCompletedGuaIndexes() {
  return sixtyFourGuaDataStudy
    .filter(item => item.completed)
    .map(item => item.guaIndex);
}

/**
 * 获取学习进度统计
 * @returns {Object} 学习进度统计
 */
function getStudyStatistics() {
  const total = sixtyFourGuaDataStudy.length;
  const completed = sixtyFourGuaDataStudy.filter(item => item.completed).length;
  const percentage = Math.round((completed / total) * 100);
  
  return {
    total,
    completed,
    remaining: total - completed,
    percentage
  };
}

/**
 * 从本地存储同步学习进度到内存
 */
function syncStudyProgressFromStorage() {
  try {
    const stored = tt.getStorageSync('sixtyFourGuaDataStudy');
    if (Array.isArray(stored) && stored.length === sixtyFourGuaDataStudy.length) {
      for (let i = 0; i < sixtyFourGuaDataStudy.length; i++) {
        if (stored[i] && typeof stored[i].completed === 'boolean') {
          sixtyFourGuaDataStudy[i].completed = stored[i].completed;
        }
      }
    }
  } catch (e) {
    // 读取失败忽略，使用默认值
  }
}

// 使用CommonJS导出
module.exports = {
  sixtyFourGuaData,
  sixtyFourGuaDataStudy,
  getGuaData,
  getStudyProgress,
  updateStudyProgress,
  getCompleteGuaInfo,
  getCompletedGuaIndexes,
  getStudyStatistics,
  syncStudyProgressFromStorage
};