export const USER_STATUS_OPTIONS = [
  { id: 'blank', label: '我完全不知道简历写什么', hint: '从空白开始，先找第一条可写经历。' },
  { id: 'small', label: '我有一些小经历，但觉得不值一提', hint: '把“小事”翻译成可投递表达。' },
  {
    id: 'course-life',
    label: '我没有实习，但有课程 / 作业 / 社团 / 生活经历',
    hint: '非传统经历也可以成为起步经历。',
  },
  { id: 'intern', label: '我想申请实习', hint: '优先生成面向实习岗的表达重点。' },
  { id: 'general', label: '我想做一份通用版第一份简历', hint: '先做稳定通用版，再按岗位微调。' },
  { id: 'empty', label: '我已经有简历，但写得很空', hint: '补动作细节和证据，避免模板话。' },
]

export const ROLE_OPTIONS = [
  '通用实习',
  '新媒体运营',
  '产品助理',
  '行政助理',
  '市场营销',
  '电商运营',
  '教育培训',
  '人力资源',
  '设计助理',
  '前端开发入门',
  '数据分析入门',
  '外贸 / 跨境电商',
  '文案策划',
  '校园大使',
  '暂时不知道',
]

export const EXPERIENCE_CATEGORIES = [
  { id: 'education', label: '教育背景', module: '教育背景' },
  { id: 'course', label: '课程项目', module: '课程 / 项目经历' },
  { id: 'campus', label: '校园经历', module: '校园 / 社团 / 班级经历' },
  { id: 'club', label: '社团经历', module: '校园 / 社团 / 班级经历' },
  { id: 'parttime', label: '兼职经历', module: '兼职 / 实践经历' },
  { id: 'volunteer', label: '志愿经历', module: '志愿 / 公益经历' },
  { id: 'personal-project', label: '个人项目', module: '作品 / 个人项目' },
  { id: 'content', label: '内容创作', module: '内容创作 / 运营实验' },
  { id: 'skill-learning', label: '技能学习', module: '技能学习 / 自我驱动经历' },
  { id: 'competition', label: '竞赛经历', module: '竞赛 / 活动经历' },
  { id: 'life-project', label: '生活项目', module: '生活项目 / 组织协调经历' },
  { id: 'self-driven', label: '自我驱动经历', module: '技能学习 / 自我驱动经历' },
]

export const QUICK_EXPERIENCE_TAGS = [
  '小组作业',
  '课堂展示',
  '社团活动',
  '兼职',
  '志愿活动',
  '自学技能',
  '帮别人做事',
  '内容创作',
  '旅游攻略',
  '问卷调研',
  '真的没有',
]

export const DISCOVERY_QUESTIONS = [
  '你有没有做过一次小组作业或课程大作业？',
  '你有没有负责过一次 PPT、汇报或资料整理？',
  '你有没有帮别人解决过一个具体问题？',
  '你有没有做过兼职、家教、摆摊或门店服务？',
  '你有没有运营过账号、社群或发布过内容？',
  '你有没有做过调研、访谈、问卷或资料收集？',
  '你有没有自学过一个软件、语言或技能？',
  '你有没有长期坚持过写作、健身、拍视频等事情？',
]

export const USER_STAGE_HINT = {
  blank: '从 0 到 1 起步',
  small: '小经历转译阶段',
  'course-life': '非传统经历整合阶段',
  intern: '实习投递准备阶段',
  general: '通用版简历搭建阶段',
  empty: '简历去空泛优化阶段',
}

export const DEFAULT_PROFILE = {
  name: '',
  phone: '',
  email: '',
  school: '',
  major: '',
  graduation: '',
}
