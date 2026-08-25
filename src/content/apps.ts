/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  APP 板块配置                                                 │
 * │  每个 APP 一条记录：概念图放 public/，repo 填 GitHub 地址。   │
 * │  还没准备好的 APP，status 写 '构想中'，页面会显示占位卡。     │
 * └──────────────────────────────────────────────────────────────┘
 */

export interface AppProject {
  id: string;
  name: string;
  zhName?: string;
  status: '开发中' | '已上线' | '构想中';
  conceptImg: string | null;  // public/ 下的概念图；null = 占位
  desc: string;
  repo: string | null;        // GitHub 仓库地址；null = 暂不公开
  tags: string[];
}

export const APPS: AppProject[] = [
  {
    id: 'ptg',
    name: 'PTG',
    zhName: '看见天空的颜色',
    status: '开发中',
    conceptImg: '/app-ptg.jpg',
    desc: '一套为创意工作者设计的 AI 协作系统原型——不把 AI 当替代品，而是当“回蓝”的工具：人负责抬头看天，机器负责低头干活。概念源自同名长篇小说。',
    repo: 'https://github.com/TERRYARISON',
    tags: ['AI 协作', '创意工具', '原型'],
  },
  {
    id: 'more',
    name: '下一个小玩意儿',
    status: '构想中',
    conceptImg: null,
    desc: '脑子里还排着几个想做的工具和小应用，等 PTG 跑顺了就动工。这里先留个位置。',
    repo: null,
    tags: ['占位'],
  },
];

/** GitHub 主页（页头展示） */
export const GITHUB_HOME = 'https://github.com/TERRYARISON';
