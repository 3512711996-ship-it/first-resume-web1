import { EXPERIENCE_CATEGORIES, USER_STAGE_HINT } from '../types'
import { buildSkillPool, buildSummary, getRoleProfile, toneText } from './resumeTemplates'
import { TASK_TEMPLATES } from './taskTemplates'

const CATEGORY_KEYWORDS = [
  {
    id: 'course',
    words: ['课程', '作业', '展示', 'PPT', '汇报', '答辩', '课堂', '论文'],
  },
  {
    id: 'content',
    words: ['内容', '公众号', '小红书', '视频', '剪辑', '文案', '发布', '账号'],
  },
  {
    id: 'parttime',
    words: ['兼职', '家教', '门店', '服务员', '客服', '收银'],
  },
  {
    id: 'volunteer',
    words: ['志愿', '公益', '服务活动'],
  },
  {
    id: 'club',
    words: ['社团', '学生会', '班委', '活动', '组织'],
  },
  {
    id: 'life-project',
    words: ['旅游', '攻略', '预算', '路线', '安排', '朋友'],
  },
  {
    id: 'competition',
    words: ['比赛', '竞赛', '路演'],
  },
  {
    id: 'skill-learning',
    words: ['自学', '学习', '练习', '打卡', '课程学习'],
  },
  {
    id: 'personal-project',
    words: ['项目', '网站', '小程序', '原型', '作品'],
  },
  {
    id: 'self-driven',
    words: ['坚持', '记录', '复盘', '阅读', '健身'],
  },
]

const TOOL_KEYWORDS = ['Excel', 'Canva', 'Notion', 'PowerPoint', 'PPT', 'Figma', '问卷', '飞书', '表格']
const ACTION_KEYWORDS = ['整理', '协调', '沟通', '访谈', '统计', '分析', '复盘', '汇总', '执行', '规划']
const RISK_KEYWORDS = ['全链路', '行业领先', '顶级', '全盘负责', '爆发式', '闭环增长']

const getCategoryMeta = (id) =>
  EXPERIENCE_CATEGORIES.find((item) => item.id === id) || EXPERIENCE_CATEGORIES[1]

const detectCategory = (rawText, hintCategory) => {
  if (hintCategory && hintCategory !== 'auto') return hintCategory

  const normalized = rawText.toLowerCase()
  const matched = CATEGORY_KEYWORDS.find((item) =>
    item.words.some((word) => normalized.includes(word.toLowerCase())),
  )
  return matched ? matched.id : 'self-driven'
}

const inferTitleByCategory = (categoryId) => {
  const map = {
    education: '教育学习支持经历',
    course: '课程小组实践项目',
    campus: '校园协作实践',
    club: '社团活动执行经历',
    parttime: '兼职服务实践',
    volunteer: '志愿服务经历',
    'personal-project': '个人项目实践',
    content: '内容创作与运营实践',
    'skill-learning': '技能自学实践',
    competition: '竞赛准备与复盘经历',
    'life-project': '生活规划小项目',
    'self-driven': '自我驱动成长经历',
  }
  return map[categoryId] || '起步实践经历'
}

const hasAnyKeyword = (text, keywords) =>
  keywords.some((keyword) => text.toLowerCase().includes(keyword.toLowerCase()))

const hasNumber = (text) => /\d/.test(text)

const sliceText = (text, size = 20) => (text.length > size ? `${text.slice(0, size)}...` : text)

const createBullets = ({ rawText, targetRole, roleProfile, moduleLabel }) => {
  const clipped = sliceText(rawText, 26)
  const [verb1, verb2, verb3] = roleProfile.verbs

  return [
    `围绕${targetRole}相关目标，${verb1}“${clipped}”中的关键任务，明确优先级并推进落地。`,
    `在${moduleLabel}场景中完成信息${verb2}与节点同步，确保协作过程清晰可追踪。`,
    `输出可复用的执行记录与复盘要点，形成“动作-结果-改进”闭环，强化${verb3}意识。`,
  ]
}

const createImprovedDetails = (rawText) => {
  const details = []
  if (!hasNumber(rawText)) details.push('补充一个具体数字（人数、页数、时长、频次）。')
  if (!hasAnyKeyword(rawText, TOOL_KEYWORDS)) details.push('补充使用过的工具（如 Excel / PPT / Canva / Notion）。')
  if (!/结果|反馈|完成|上线|发布|通过|产出/.test(rawText)) details.push('补充最后产出或反馈（例如老师好评、完成交付、数据变化）。')
  if (!/和|与|组员|同学|老师|用户/.test(rawText)) details.push('补充协作对象（和谁沟通、怎么分工、如何推进）。')
  details.push('补充时间范围（例如“2026 年 3 月课程项目”），让经历更可信。')
  return details.slice(0, 5)
}

const createInterviewStory = ({ rawText, targetRole, categoryLabel }) => {
  const clipped = sliceText(rawText, 24)
  const brief30 = `这段经历来自${categoryLabel}。当时我面对的是“${clipped}”这件小事，我负责把零散信息整理成可执行方案，并和相关同学完成协作。虽然规模不大，但让我学会了在限制条件下推进任务。`
  const minute1 =
    `这不是正式实习，但很能代表我做事的方式。背景是“${clipped}”，一开始信息不完整、分工也不清楚。` +
    `我先把目标拆成几个可执行步骤，明确每一步交付内容，再逐步推进并记录过程。` +
    `最后形成了可展示的产出，也让我意识到，${targetRole}并不只是“做完”，而是要把过程讲清楚、结果留下证据。`

  const followUps = [
    '你在这件事里具体负责了哪一部分？',
    '你遇到的最大困难是什么，怎么解决的？',
    '如果再做一次，你会优先改哪一步？',
  ]

  const answerGuide = [
    '先讲背景和目标，再讲你负责的动作，不要跳步骤。',
    '至少说一个具体细节：人数、周期、文档页数、反馈类型。',
    '最后落在“我学到了什么 + 下次怎么做更好”。',
  ]

  const dontSay = [
    '不要把团队成果全部归功于自己。',
    '不要说没有做过的数据指标。',
    '不要使用“全盘负责、行业领先”这类夸张表述。',
  ]

  return { brief30, minute1, followUps, answerGuide, dontSay }
}

const scoreCredibility = ({ rawText, bullets }) => {
  let score = 68
  if (hasNumber(rawText)) score += 10
  if (hasAnyKeyword(rawText, TOOL_KEYWORDS)) score += 8
  if (hasAnyKeyword(rawText, ACTION_KEYWORDS)) score += 7
  if (rawText.length >= 20) score += 5
  if (bullets.some((bullet) => /复盘|记录|产出/.test(bullet))) score += 4
  if (hasAnyKeyword(rawText, RISK_KEYWORDS)) score -= 14
  if (rawText.length < 8) score -= 8
  if (!hasAnyKeyword(rawText, ACTION_KEYWORDS)) score -= 6
  return Math.max(42, Math.min(96, score))
}

const makeWarnings = (rawText, score) => {
  const warnings = []
  if (hasAnyKeyword(rawText, RISK_KEYWORDS)) warnings.push('有偏夸张词汇，建议改成更真实的动作表达。')
  if (!hasNumber(rawText)) warnings.push('缺少数字信息，建议补充人数、时长或成果规模。')
  if (score < 72) warnings.push('当前更像模板句，建议补一个真实细节后再投递。')
  return warnings.slice(0, 3)
}

export const generateTranslatedExperience = (input) => {
  const rawText = input.rawText.trim()
  const targetRole = input.targetRole || '通用实习'
  const roleProfile = getRoleProfile(targetRole)
  const categoryId = detectCategory(rawText, input.category)
  const categoryMeta = getCategoryMeta(categoryId)
  const bullets = createBullets({
    rawText,
    targetRole,
    roleProfile,
    moduleLabel: categoryMeta.module,
  })
  const credibilityScore = scoreCredibility({ rawText, bullets })
  const interviewStory = createInterviewStory({
    rawText,
    targetRole,
    categoryLabel: categoryMeta.label,
  })
  const improvedDetails = createImprovedDetails(rawText)
  const riskWarnings = makeWarnings(rawText, credibilityScore)

  return {
    id: `te-${Date.now()}`,
    rawText,
    title: inferTitleByCategory(categoryId),
    category: categoryMeta.label,
    module: categoryMeta.module,
    resumeBullets: bullets,
    improvedDetails,
    credibilityScore,
    interviewStory,
    riskWarnings,
  }
}

export const generateCredibilityCheck = (translatedExperience) => {
  if (!translatedExperience) return null

  const raw = translatedExperience.rawText
  const score = translatedExperience.credibilityScore
  const checks = [
    {
      key: 'overpack',
      label: '是否过度包装',
      ok: !hasAnyKeyword(raw, RISK_KEYWORDS),
      tip: '少用大词，多写你实际做过的动作。',
    },
    {
      key: 'action',
      label: '是否有具体动作',
      ok: hasAnyKeyword(raw, ACTION_KEYWORDS),
      tip: '写“做了什么”，不要只写“提升了能力”。',
    },
    {
      key: 'result',
      label: '是否有结果线索',
      ok: /完成|产出|发布|反馈|通过|交付/.test(raw),
      tip: '补一个可展示结果：文档、图表、链接、反馈。',
    },
    {
      key: 'interview',
      label: '面试能否讲得出来',
      ok: raw.length > 10,
      tip: '越贴近日常语言，面试越容易讲清楚。',
    },
  ]

  const verdict = score >= 82 ? '可直接使用' : score >= 70 ? '可用，建议补细节' : '先补细节再投递'
  return { score, verdict, checks }
}

export const createEmptyResume = ({ profile, targetRole, statusId }) => ({
  name: profile.name || '',
  targetRole: targetRole || '通用实习',
  education: `${profile.school || '学校待补充'} / ${profile.major || '专业待补充'} / ${
    profile.graduation || '毕业时间待补充'
  }`,
  summary: buildSummary({
    profileName: profile.name,
    targetRole: targetRole || '通用实习',
    userStage: USER_STAGE_HINT[statusId] || '起步阶段',
    experiencesCount: 0,
  }),
  experiences: [],
  skills: [],
  projects: [],
  generatedAt: new Date().toISOString(),
})

export const addExperienceToResume = ({ resume, translatedExperience, profile, statusId }) => {
  const experienceItem = {
    id: translatedExperience.id,
    title: translatedExperience.title,
    category: translatedExperience.category,
    module: translatedExperience.module,
    bullets: translatedExperience.resumeBullets,
    credibilityScore: translatedExperience.credibilityScore,
    interviewStory: translatedExperience.interviewStory,
    riskWarnings: translatedExperience.riskWarnings,
    rawText: translatedExperience.rawText,
  }

  const nextExperiences = [experienceItem, ...resume.experiences]
  const nextSkills = buildSkillPool(
    resume.targetRole,
    nextExperiences.flatMap((item) => item.bullets.map((bullet) => bullet.slice(0, 6))),
  )

  return {
    ...resume,
    experiences: nextExperiences,
    skills: nextSkills,
    summary: buildSummary({
      profileName: profile.name,
      targetRole: resume.targetRole,
      userStage: USER_STAGE_HINT[statusId] || '起步阶段',
      experiencesCount: nextExperiences.length,
    }),
    generatedAt: new Date().toISOString(),
  }
}

export const generateGrowthTasks = (targetRole) => {
  const role = targetRole || '通用实习'
  const picked = []
  ;['1 天', '3 天', '7 天'].forEach((duration) => {
    const candidates = TASK_TEMPLATES.filter(
      (task) => task.duration === duration && (task.targetRoles.includes(role) || task.targetRoles.includes('通用实习')),
    )
    if (candidates.length > 0) picked.push(candidates[0])
  })

  return picked.map((task) => ({
    ...task,
    selected: false,
    completedSteps: [],
    evidence: '',
  }))
}

export const taskToTranslatedExperience = (task, targetRole) => ({
  id: `task-exp-${task.id}-${Date.now()}`,
  rawText: `${task.title}，并完成成果物：${task.deliverable}`,
  title: task.title.replace(/^\d+\s*天完成/, '').trim() || '任务实践经历',
  category: '个人项目',
  module: '作品 / 个人项目',
  resumeBullets: task.resumeBullets,
  improvedDetails: ['补充任务时间范围', '补充成果链接或截图', '补充一次复盘改进点'],
  credibilityScore: 85,
  interviewStory: {
    brief30: task.interviewStory,
    minute1: `${task.interviewStory} 我按步骤推进并记录结果，这让我在${targetRole}方向更有实战感。`,
    followUps: ['你为什么选这个任务？', '结果里最有价值的一点是什么？', '这段经历如何迁移到岗位中？'],
    answerGuide: ['先讲目标再讲步骤', '强调你亲自做了什么', '讲一次具体调整或改进'],
    dontSay: ['不要把模拟任务说成正式商业项目', '不要杜撰数据', '不要夸大影响范围'],
  },
  riskWarnings: ['这是起步任务经历，面试中请如实说明任务规模。'],
})

export const applyResumeTone = (resume, mode) => ({
  ...resume,
  summary: toneText(resume.summary, mode),
  experiences: resume.experiences.map((item) => ({
    ...item,
    bullets: item.bullets.map((bullet) => toneText(bullet, mode)),
  })),
})
