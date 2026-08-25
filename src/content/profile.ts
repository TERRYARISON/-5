/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  个人简介 + 简历 + 案例 —— 「关于」页的全部内容在这里         │
 * │  想加一段经历：在 TIMELINE 数组里照抄一条改内容即可。         │
 * │  想加一个案例：在 CASES 数组里照抄一条，把图放进 public/。    │
 * └──────────────────────────────────────────────────────────────┘
 */

/** 顶部简介 */
export const BIO = {
  name: '郑超',
  nameEn: 'Zheng Chao · Terry',
  age: 31,
  city: '广州',
  tags: ['主持人', '艺人统筹', '经纪人', '写作者', '独立开发者'],
  intro: [
    '从电台直播间到片场，从艺人统筹到小说和代码——我一直在做的其实是同一件事：把人、故事和注意力，连接在一起。',
    '广州大学播音与主持专业出身，做过电台主持人、摄影工作室主理人、4A 媒介公关、头部经纪公司艺人统筹与经纪人，也做过月 GMV 百万级的直播间运营。现在，我把这些年的审美和执行力，写进小说，也写进代码。',
  ],
  motto: 'Building meaningful things, from within.',
};

/**
 * 关于页 / 联系页的配图
 * portraitVideo 留空（null）= 静态照片；填 '/视频名.mp4' = 动态肖像盖在照片上
 */
export const PORTRAIT_MEDIA = {
  /** 关于页顶部大照片（个人照片） */
  portraitImg: '/portrait-main.jpg',
  portraitVideo: null as string | null,
  /** 关于页中部「街头双联」两张图 */
  streetLeft: '/street-market.jpg',
  streetRight: '/street-tattoo.jpg',
  /** 联系页右侧照片 */
  contactImg: '/portrait-studio.jpg',
};

/** 简历时间线（按时间倒序展示） */
export const TIMELINE = [
  {
    period: '2022 — 2023',
    role: '主播 & 运营负责人',
    org: '本尼家艺术博物馆',
    points: ['从零搭建艺术衍生品直播间', '月 GMV 稳定在 120 万级', '选品、脚本、投放、复盘全链路负责'],
  },
  {
    period: '2018 — 2022',
    role: '艺人经纪人',
    org: '汉森娱乐',
    points: [
      '负责徐志贤、权沛伦、蔡乐、GOD、PUSH 等艺人的影视与商务经纪',
      '项目：《传闻中的陈芊芊》《皓衣行》《恨君不似江楼月》《萌妻食神》《九州天空城 2》《初恋那件小事》《如果爱》《饭饭男友》《月上重火》',
      '大型项目：时尚芭莎 150 周年大展、LV 典藏展',
    ],
  },
  {
    period: '2017 — 2018',
    role: '艺人统筹 & 市场部经理',
    org: '北京时尚新势力',
    points: [
      '《语者 PERS》全网播放量 4.5 亿，话题阅读 6339 万',
      '卡萨帝「为爱不凡」品牌广告项目',
      '合作艺人：吴亦凡、黄轩、吴秀波、姚晨、韩庚、冯绍峰、李健、蔡康永、马东、冯唐、陈建斌等',
    ],
  },
  {
    period: '2014 — 2016',
    role: '媒介公关',
    org: '上海雄世达',
    points: [
      '服务 Saucony、LACOSTE 等品牌',
      '亚洲强音盛典艺人统筹：SNH48、EXO、蔡依林、2PM、BIGBANG',
    ],
  },
  {
    period: '2013 — 2015',
    role: '主理人',
    org: 'D-TIME 摄影工作室',
    points: ['广州马拉松官方拍摄', '轩尼诗、广汽丰田等品牌商业拍摄'],
  },
  {
    period: '2011 — 2014',
    role: '电台主持人',
    org: '广州人民广播电台',
    points: ['新闻及音乐节目主持', '大型户外活动主持'],
  },
] as const;

/** 学历与证书 */
export const CREDENTIALS = [
  '广州大学 · 播音与主持艺术（本科，2011—2015）',
  '演出经纪人资格证',
  'CET-4 · 全国计算机二级',
];

/**
 * 精选案例 —— 图片放 public/，这里填文件名。
 * img 可以是多张（轮播/组图）。
 */
export const CASES = [
  {
    id: 'yuzhe',
    title: '《语者 PERS》',
    kpi: '4.5 亿播放 · 6339 万话题阅读',
    role: '艺人统筹 / 市场部经理',
    desc: '一档让名人认真说话的演讲类节目。从艺人邀约到现场执行全程负责，把“内容+艺人+传播”做成了一条完整链路。',
    img: ['/case-yuzhe-1.jpg', '/case-yuzhe-2.jpg', '/case-yuzhe-3.jpg', '/case-yuzhe-4.jpg'],
  },
  {
    id: 'casarte',
    title: '卡萨帝「为爱不凡」',
    kpi: '品牌年度广告项目',
    role: '艺人统筹',
    desc: '高端家电品牌的情感营销战役，负责艺人侧的全流程统筹与落地。',
    img: ['/case-casarte-1.jpg', '/case-casarte-2.jpg', '/case-casarte-3.jpg'],
  },
  {
    id: 'dramas',
    title: '影视项目群',
    kpi: '《传闻中的陈芊芊》《皓衣行》《恨君不似江楼月》等',
    role: '艺人经纪人',
    desc: '经纪期内的主要影视项目，覆盖选角谈判、进组协调、宣传期商务配合。',
    img: ['/case-drama-cqq.jpg', '/case-drama-haoyixing.jpg', '/case-drama-henjun.jpg'],
  },
  {
    id: 'events',
    title: '大型活动与盛典',
    kpi: '时装周 · 电视节 · 品牌大展',
    role: '艺人统筹',
    desc: '时尚芭莎 150 周年大展、LV 典藏展、MAHB 年度先生盛典、施华洛世奇、VK 百男大秀、宫崎骏音乐会等大型活动的艺人统筹工作。',
    img: ['/case-event-fashionweek.jpg', '/case-event-tvfestival.jpg', '/case-event-mahb.jpg', '/case-event-swarovski.jpg', '/case-event-vk.jpg', '/case-event-ghibli.jpg'],
  },
] as const;
