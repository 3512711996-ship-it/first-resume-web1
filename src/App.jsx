import { useMemo, useRef, useState } from 'react'
import { BottomActionBar } from './components/BottomActionBar'
import { CredibilityCheck } from './components/CredibilityCheck'
import { ExperienceInput } from './components/ExperienceInput'
import { ExperienceTranslator } from './components/ExperienceTranslator'
import { GrowthLoopPanel } from './components/GrowthLoopPanel'
import { HeroSection } from './components/HeroSection'
import { InterviewNarrative } from './components/InterviewNarrative'
import { ResumePreview } from './components/ResumePreview'
import { RoleSelector } from './components/RoleSelector'
import { StatusSelector } from './components/StatusSelector'
import { TaskGenerator } from './components/TaskGenerator'
import {
  addExperienceToResume,
  applyResumeTone,
  createEmptyResume,
  generateCredibilityCheck,
  generateGrowthTasks,
  generateTranslatedExperience,
  taskToTranslatedExperience,
} from './lib/mockGenerator'
import { buildSummary } from './lib/resumeTemplates'
import {
  DEFAULT_PROFILE,
  DISCOVERY_QUESTIONS,
  EXPERIENCE_CATEGORIES,
  QUICK_EXPERIENCE_TAGS,
  ROLE_OPTIONS,
  USER_STAGE_HINT,
  USER_STATUS_OPTIONS,
} from './types'

const DRAFT_KEY = 'first_resume_app_draft_v3'

const initialFeedbackForm = {
  company: '',
  stage: '已投递未回复',
  question: '',
  action: '',
}

const cloneProfile = (profile) => ({ ...DEFAULT_PROFILE, ...profile })

const buildEducationLine = (profile) =>
  `${profile.school || '学校待补充'} / ${profile.major || '专业待补充'} / ${
    profile.graduation || '毕业时间待补充'
  }`

const buildResumeMeta = (resume, profile, targetRole, statusId) => ({
  ...resume,
  name: profile.name || '',
  targetRole,
  education: buildEducationLine(profile),
  summary: buildSummary({
    profileName: profile.name,
    targetRole,
    userStage: USER_STAGE_HINT[statusId] || '起步阶段',
    experiencesCount: resume.experiences.length,
  }),
})

const loadInitialState = () => {
  const fallback = {
    statusId: 'blank',
    targetRole: '通用实习',
    profile: cloneProfile(DEFAULT_PROFILE),
    inputData: { rawText: '', category: 'auto', confidenceLevel: 'low' },
    translated: null,
    credibilityReport: null,
    resume: createEmptyResume({
      profile: cloneProfile(DEFAULT_PROFILE),
      targetRole: '通用实习',
      statusId: 'blank',
    }),
    tasks: [],
    feedbackLogs: [],
    savedAt: '',
  }

  if (typeof window === 'undefined') return fallback

  const cached = localStorage.getItem(DRAFT_KEY)
  if (!cached) return fallback

  try {
    const draft = JSON.parse(cached)
    const profile = cloneProfile(draft.profile || DEFAULT_PROFILE)
    const targetRole = draft.targetRole || '通用实习'
    const statusId = draft.statusId || 'blank'
    const resumeBase =
      draft.resume ||
      createEmptyResume({
        profile,
        targetRole,
        statusId,
      })

    return {
      statusId,
      targetRole,
      profile,
      inputData: draft.inputData || fallback.inputData,
      translated: draft.translated || null,
      credibilityReport: draft.credibilityReport || null,
      resume: buildResumeMeta(resumeBase, profile, targetRole, statusId),
      tasks: draft.tasks || [],
      feedbackLogs: draft.feedbackLogs || [],
      savedAt: draft.savedAt || '',
    }
  } catch {
    return fallback
  }
}

function App() {
  const [boot] = useState(loadInitialState)
  const statusRef = useRef(null)
  const taskRef = useRef(null)

  const [statusId, setStatusId] = useState(boot.statusId)
  const [targetRole, setTargetRole] = useState(boot.targetRole)
  const [profile, setProfile] = useState(boot.profile)
  const [inputData, setInputData] = useState(boot.inputData)
  const [translated, setTranslated] = useState(boot.translated)
  const [credibilityReport, setCredibilityReport] = useState(boot.credibilityReport)
  const [resume, setResume] = useState(boot.resume)
  const [tasks, setTasks] = useState(boot.tasks)
  const [feedbackForm, setFeedbackForm] = useState(initialFeedbackForm)
  const [feedbackLogs, setFeedbackLogs] = useState(boot.feedbackLogs)
  const [generateError, setGenerateError] = useState('')
  const [feedbackError, setFeedbackError] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedAt, setSavedAt] = useState(boot.savedAt)

  const progressPercent = useMemo(() => {
    const checks = [
      Boolean(statusId),
      Boolean(targetRole),
      Boolean(translated || inputData.rawText.trim()),
      resume.experiences.length > 0,
      resume.experiences.length > 0,
      tasks.some((task) => task.selected) || feedbackLogs.length > 0,
    ]
    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
  }, [statusId, targetRole, translated, inputData.rawText, resume.experiences.length, tasks, feedbackLogs.length])

  const persistDraft = () => {
    const time = new Date()
    const formatted = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
    const payload = {
      statusId,
      targetRole,
      profile,
      inputData,
      translated,
      credibilityReport,
      resume,
      tasks,
      feedbackLogs,
      savedAt: formatted,
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
    setSavedAt(formatted)
  }

  const handleStart = () => {
    statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleConfused = () => {
    setStatusId('blank')
    setResume((prev) => buildResumeMeta(prev, profile, targetRole, 'blank'))
    setTasks(generateGrowthTasks(targetRole))
    taskRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleRawChange = (value) => {
    setInputData((prev) => ({ ...prev, rawText: value }))
  }

  const handleQuickTag = (tag) => {
    if (tag === '真的没有') {
      handleConfused()
      return
    }

    const nextText = inputData.rawText.trim()
      ? `${inputData.rawText.trim()}\n我做过：${tag}`
      : `我做过：${tag}`
    setInputData((prev) => ({ ...prev, rawText: nextText }))
  }

  const runTranslate = () => {
    if (!inputData.rawText.trim()) {
      setGenerateError('先写一条你做过的小事，哪怕很小也可以。')
      return
    }

    setGenerateError('')
    setLoading(true)
    window.setTimeout(() => {
      const result = generateTranslatedExperience({
        rawText: inputData.rawText,
        category: inputData.category,
        targetRole,
        userStage: USER_STAGE_HINT[statusId],
        confidenceLevel: inputData.confidenceLevel,
      })
      setTranslated(result)
      setCredibilityReport(generateCredibilityCheck(result))
      setLoading(false)
    }, 420)
  }

  const handleAddToResume = () => {
    if (!translated) return
    setResume((prev) =>
      addExperienceToResume({
        resume: buildResumeMeta(prev, profile, targetRole, statusId),
        translatedExperience: translated,
        profile,
        statusId,
      }),
    )
    setGenerateError('')
  }

  const handleGenerateTasks = () => {
    const generated = generateGrowthTasks(targetRole)
    setTasks(generated)
  }

  const handleSelectTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, selected: true } : task)),
    )
  }

  const handleToggleTaskStep = (taskId, stepIndex) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task
        const has = task.completedSteps.includes(stepIndex)
        return {
          ...task,
          selected: true,
          completedSteps: has
            ? task.completedSteps.filter((index) => index !== stepIndex)
            : [...task.completedSteps, stepIndex],
        }
      }),
    )
  }

  const handleTaskEvidence = (taskId, value) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, selected: true, evidence: value } : task)),
    )
  }

  const handleConvertTask = (taskId) => {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return
    const result = taskToTranslatedExperience(task, targetRole)
    setTranslated(result)
    setCredibilityReport(generateCredibilityCheck(result))
    setInputData((prev) => ({ ...prev, rawText: result.rawText }))
    setGenerateError('')
    statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleProfileChange = (field, value) => {
    setProfile((prev) => {
      const nextProfile = { ...prev, [field]: value }
      setResume((resumePrev) => buildResumeMeta(resumePrev, nextProfile, targetRole, statusId))
      return nextProfile
    })
  }

  const handleRoleChange = (role) => {
    setTargetRole(role)
    setResume((prev) => buildResumeMeta(prev, profile, role, statusId))
  }

  const handleStatusChange = (nextStatus) => {
    setStatusId(nextStatus)
    setResume((prev) => buildResumeMeta(prev, profile, targetRole, nextStatus))
  }

  const handleToneAdjust = (mode) => {
    setResume((prev) => applyResumeTone(prev, mode))
  }

  const handleExportPDF = () => {
    document.body.classList.add('print-mode')
    const cleanup = () => document.body.classList.remove('print-mode')
    window.addEventListener('afterprint', cleanup, { once: true })
    window.print()
  }

  const handleFeedbackChange = (field, value) => {
    setFeedbackForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddFeedback = () => {
    if (!feedbackForm.company.trim() || !feedbackForm.question.trim() || !feedbackForm.action.trim()) {
      setFeedbackError('请至少填写公司岗位、卡点问题和下一步改进行动。')
      return
    }

    setFeedbackLogs((prev) => [
      ...prev,
      {
        id: `fb-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        company: feedbackForm.company.trim(),
        stage: feedbackForm.stage,
        question: feedbackForm.question.trim(),
        action: feedbackForm.action.trim(),
      },
    ])
    setFeedbackForm(initialFeedbackForm)
    setFeedbackError('')
  }

  const handleResetAll = () => {
    const ok = window.confirm('确认重置当前页面数据吗？本地草稿会被覆盖。')
    if (!ok) return
    localStorage.removeItem(DRAFT_KEY)
    setStatusId('blank')
    setTargetRole('通用实习')
    setProfile(DEFAULT_PROFILE)
    setInputData({ rawText: '', category: 'auto', confidenceLevel: 'low' })
    setTranslated(null)
    setCredibilityReport(null)
    setResume(
      createEmptyResume({
        profile: DEFAULT_PROFILE,
        targetRole: '通用实习',
        statusId: 'blank',
      }),
    )
    setTasks([])
    setFeedbackLogs([])
    setFeedbackForm(initialFeedbackForm)
    setGenerateError('')
    setFeedbackError('')
    setSavedAt('')
  }

  return (
    <>
      <main className="fr-page pb-24">
        <HeroSection
          onStart={handleStart}
          onConfused={handleConfused}
          onSaveDraft={persistDraft}
          progressPercent={progressPercent}
          savedAt={savedAt}
        />

        <div ref={statusRef} className="fr-grid-two">
          <StatusSelector options={USER_STATUS_OPTIONS} value={statusId} onChange={handleStatusChange} />
          <RoleSelector roles={ROLE_OPTIONS} value={targetRole} onChange={handleRoleChange} />
        </div>

        <ExperienceInput
          rawText={inputData.rawText}
          selectedCategory={inputData.category}
          confidenceLevel={inputData.confidenceLevel}
          categories={EXPERIENCE_CATEGORIES}
          quickTags={QUICK_EXPERIENCE_TAGS}
          discoveryQuestions={DISCOVERY_QUESTIONS}
          onRawTextChange={handleRawChange}
          onCategoryChange={(category) => setInputData((prev) => ({ ...prev, category }))}
          onConfidenceChange={(confidenceLevel) =>
            setInputData((prev) => ({ ...prev, confidenceLevel }))
          }
          onQuickTagPick={handleQuickTag}
          onGenerate={runTranslate}
          onNoExperience={handleConfused}
          error={generateError}
          loading={loading}
        />

        <div className="fr-grid-two">
          <ExperienceTranslator
            translated={translated}
            onAddToResume={handleAddToResume}
            onRetry={runTranslate}
            addedCount={resume.experiences.length}
          />
          <CredibilityCheck report={credibilityReport} warnings={translated?.riskWarnings || []} />
        </div>

        <section ref={taskRef}>
          <TaskGenerator
            tasks={tasks}
            targetRole={targetRole}
            onGenerateTasks={handleGenerateTasks}
            onSelectTask={handleSelectTask}
            onToggleTaskStep={handleToggleTaskStep}
            onTaskEvidenceChange={handleTaskEvidence}
            onConvertTask={handleConvertTask}
          />
        </section>

        <ResumePreview
          profile={profile}
          resume={resume}
          onProfileChange={handleProfileChange}
          onToneAdjust={handleToneAdjust}
          onExportPDF={handleExportPDF}
        />

        <InterviewNarrative experiences={resume.experiences} />

        <GrowthLoopPanel
          feedbackForm={feedbackForm}
          onFeedbackChange={handleFeedbackChange}
          onAddFeedback={handleAddFeedback}
          feedbackLogs={feedbackLogs}
          datasetCount={resume.experiences.length}
          error={feedbackError}
        />
      </main>

      <BottomActionBar
        progressPercent={progressPercent}
        resumeCount={resume.experiences.length}
        onSaveDraft={persistDraft}
        onExportPDF={handleExportPDF}
        onReset={handleResetAll}
      />
    </>
  )
}

export default App
