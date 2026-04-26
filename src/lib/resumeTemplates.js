const ROLE_PROFILES = {
  通用实习: {
    focus: ['执行力', '协作沟通', '信息整理', '学习速度'],
    verbs: ['梳理', '执行', '协同', '复盘'],
    summaryTone: '稳健',
  },
  新媒体运营: {
    focus: ['内容选题', '文案表达', '平台理解', '数据意识', '用户反馈'],
    verbs: ['策划', '发布', '复盘', '优化'],
    summaryTone: '内容导向',
  },
  产品助理: {
    focus: ['用户调研', '需求拆解', '竞品观察', '结构化表达', '问题分析'],
    verbs: ['访谈', '拆解', '整理', '验证'],
    summaryTone: '分析导向',
  },
  行政助理: {
    focus: ['文档整理', '流程执行', '跨部门协调', '细节把控', '时间管理'],
    verbs: ['统筹', '协调', '跟进', '归档'],
    summaryTone: '稳定可靠',
  },
  市场营销: {
    focus: ['用户洞察', '活动执行', '传播协同', '数据回看', '转化意识'],
    verbs: ['策划', '执行', '跟踪', '复盘'],
    summaryTone: '增长导向',
  },
  电商运营: {
    focus: ['商品信息整理', '活动节奏', '页面优化', '基础数据分析', '客服协同'],
    verbs: ['上架', '维护', '优化', '记录'],
    summaryTone: '运营导向',
  },
  教育培训: {
    focus: ['表达能力', '学习规划', '教学协助', '耐心沟通', '反馈跟踪'],
    verbs: ['讲解', '辅导', '跟进', '总结'],
    summaryTone: '陪伴导向',
  },
  人力资源: {
    focus: ['沟通协调', '信息保密', '流程意识', '人才观察', '文档规范'],
    verbs: ['筛选', '记录', '沟通', '协调'],
    summaryTone: '规范导向',
  },
  设计助理: {
    focus: ['视觉表达', '需求理解', '工具应用', '迭代修改', '审美执行'],
    verbs: ['设计', '排版', '迭代', '交付'],
    summaryTone: '表达导向',
  },
  前端开发入门: {
    focus: ['页面实现', '组件拆分', '调试能力', '交互细节', '代码规范'],
    verbs: ['实现', '调试', '重构', '优化'],
    summaryTone: '技术导向',
  },
  数据分析入门: {
    focus: ['数据整理', '表格能力', '分析框架', '结论表达', '可视化展示'],
    verbs: ['清洗', '分析', '归纳', '呈现'],
    summaryTone: '证据导向',
  },
  '外贸 / 跨境电商': {
    focus: ['信息检索', '跨文化沟通', '平台规则理解', '订单协同', '跟单意识'],
    verbs: ['跟进', '沟通', '整理', '汇总'],
    summaryTone: '跨境协同',
  },
  文案策划: {
    focus: ['文案结构', '创意表达', '读者视角', '传播语感', '内容迭代'],
    verbs: ['撰写', '打磨', '优化', '改写'],
    summaryTone: '表达导向',
  },
  校园大使: {
    focus: ['校园触达', '社群沟通', '活动执行', '反馈收集', '影响力建立'],
    verbs: ['触达', '组织', '传播', '反馈'],
    summaryTone: '连接导向',
  },
  暂时不知道: {
    focus: ['通用能力', '执行习惯', '沟通协作', '学习主动性'],
    verbs: ['整理', '执行', '配合', '总结'],
    summaryTone: '探索导向',
  },
}

const DEFAULT_ROLE = ROLE_PROFILES['通用实习']

export const getRoleProfile = (role) => ROLE_PROFILES[role] || DEFAULT_ROLE

export const getRoleFocusText = (role) => getRoleProfile(role).focus.join('、')

export const buildSummary = ({ profileName, targetRole, userStage, experiencesCount }) => {
  const profile = getRoleProfile(targetRole)
  const name = profileName || '你'
  const countText = experiencesCount > 0 ? `已整理 ${experiencesCount} 段起步经历` : '正在搭建第一批起步经历'

  return `${name}当前处于${userStage}，面向${targetRole}方向，${countText}。重点体现${profile.focus
    .slice(0, 3)
    .join('、')}等基础能力，坚持不夸大、不造假，以真实动作和可验证产出建立可信度。`
}

export const buildSkillPool = (targetRole, extraSkills = []) => {
  const roleSkills = getRoleProfile(targetRole).focus
  return [...new Set([...roleSkills, ...extraSkills])].slice(0, 10)
}

export const toneText = (text, mode) => {
  if (!text) return text

  if (mode === 'student') {
    return text
      .replace(/主导/g, '参与推进')
      .replace(/全面负责/g, '承担主要执行')
      .replace(/显著提升/g, '有一定提升')
  }

  if (mode === 'professional') {
    return text
      .replace(/帮/g, '协助')
      .replace(/做了/g, '完成了')
      .replace(/弄了/g, '搭建了')
  }

  if (mode === 'safe') {
    return text
      .replace(/行业领先|顶级|全链路|闭环增长|从0到1完全搭建/g, '基础执行')
      .replace(/大幅/g, '逐步')
      .replace(/爆发式/g, '持续')
  }

  return text
}
