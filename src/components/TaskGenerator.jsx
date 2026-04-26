import { ArrowCircleRight, CalendarBlank, CheckCircle, ClockCountdown, Hammer } from '@phosphor-icons/react'

function TaskCard({ task, onSelect, onToggleStep, onEvidenceChange, onConvert }) {
  const completePercent =
    task.steps.length === 0 ? 0 : Math.round((task.completedSteps.length / task.steps.length) * 100)

  return (
    <article className="fr-card-soft p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--ink-800)]">{task.title}</h3>
          <p className="mt-1 text-xs text-[var(--ink-500)]">
            适合岗位：{task.targetRoles.slice(0, 2).join('、')} ｜ 难度：{task.difficulty}
          </p>
        </div>
        <span className="fr-chip mono">{task.duration}</span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[var(--ink-600)]">最终产物：{task.deliverable}</p>

      {!task.selected ? (
        <button type="button" onClick={() => onSelect(task.id)} className="mt-3 fr-btn fr-btn-soft">
          <ArrowCircleRight size={14} />
          <span>加入成长任务</span>
        </button>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="h-2 rounded-full bg-[var(--line-faint)]">
            <div
              className="h-2 rounded-full bg-[var(--accent-olive)] transition-all duration-500"
              style={{ width: `${completePercent}%` }}
            />
          </div>
          <p className="text-xs text-[var(--ink-500)]">任务完成度：{completePercent}%</p>
          <ul className="space-y-1.5">
            {task.steps.map((step, index) => {
              const checked = task.completedSteps.includes(index)
              return (
                <li key={step} className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] px-3 py-2">
                  <label className="flex items-start gap-2 text-xs leading-relaxed text-[var(--ink-600)]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleStep(task.id, index)}
                      className="mt-0.5"
                    />
                    <span>{step}</span>
                  </label>
                </li>
              )
            })}
          </ul>
          <input
            value={task.evidence}
            onChange={(event) => onEvidenceChange(task.id, event.target.value)}
            placeholder="补充证据：链接 / 文件名 / 截图说明"
          />
          <button type="button" onClick={() => onConvert(task.id)} className="fr-btn fr-btn-main">
            <CheckCircle size={14} />
            <span>把任务成果转为简历经历</span>
          </button>
        </div>
      )}
    </article>
  )
}

export function TaskGenerator({
  tasks,
  targetRole,
  onGenerateTasks,
  onSelectTask,
  onToggleTaskStep,
  onTaskEvidenceChange,
  onConvertTask,
}) {
  const hasTasks = tasks.length > 0

  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <div className="section-head">
          <h2 className="fr-title">第八步：真实经历补齐任务</h2>
          <button type="button" onClick={onGenerateTasks} className="fr-btn fr-btn-soft">
            <Hammer size={14} />
            <span>生成我的补经历任务</span>
          </button>
        </div>
        <p className="fr-subtitle">
          没有经历也不用焦虑。我们给你 1 天、3 天、7 天可完成的任务，做完就能写进简历。当前岗位方向：{targetRole}
        </p>

        {!hasTasks ? (
          <article className="mt-4 fr-card-soft p-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
              <ClockCountdown size={14} />
              先生成任务
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">
              任务将覆盖“课程项目补齐、调研任务、内容实验、岗位研究”等低门槛起步动作。
            </p>
          </article>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={onSelectTask}
                onToggleStep={onToggleTaskStep}
                onEvidenceChange={onTaskEvidenceChange}
                onConvert={onConvertTask}
              />
            ))}
          </div>
        )}

        <div className="mt-4 fr-card-soft p-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
            <CalendarBlank size={14} />
            成长闭环提醒
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">
            先做真实动作，再写简历，再练面试讲法。每次任务完成后，把证据和复盘补上，你的简历会越来越有说服力。
          </p>
        </div>
      </div>
    </section>
  )
}
