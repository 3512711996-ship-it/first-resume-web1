import { ChartLineUp, NotePencil, TrendUp } from '@phosphor-icons/react'

export function GrowthLoopPanel({
  feedbackForm,
  onFeedbackChange,
  onAddFeedback,
  feedbackLogs,
  datasetCount,
  error,
}) {
  const total = feedbackLogs.length
  const screenPass = feedbackLogs.filter((item) =>
    ['简历筛选通过', '一面通过', '终面通过'].includes(item.stage),
  ).length
  const interviewPass = feedbackLogs.filter((item) => ['一面通过', '终面通过'].includes(item.stage)).length

  const screenRate = total === 0 ? 0 : Math.round((screenPass / total) * 100)
  const interviewRate = total === 0 ? 0 : Math.round((interviewPass / total) * 100)

  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <h2 className="fr-title">第九步：成长任务闭环与反馈沉淀</h2>
        <p className="fr-subtitle">
          记录“经历输入 → 简历表达 → 面试反馈”，让下一版简历更有针对性，而不是每次从头来过。
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="fr-card-soft p-3">
            <p className="text-xs text-[var(--ink-500)]">本地经历样本</p>
            <p className="mt-1 text-xl font-semibold text-[var(--ink-800)]">{datasetCount}</p>
          </article>
          <article className="fr-card-soft p-3">
            <p className="text-xs text-[var(--ink-500)]">简历筛选通过率</p>
            <p className="mt-1 text-xl font-semibold text-[var(--ink-800)]">{screenRate}%</p>
          </article>
          <article className="fr-card-soft p-3">
            <p className="text-xs text-[var(--ink-500)]">面试通过率</p>
            <p className="mt-1 text-xl font-semibold text-[var(--ink-800)]">{interviewRate}%</p>
          </article>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="fr-field">
            <span>公司与岗位</span>
            <input
              value={feedbackForm.company}
              onChange={(event) => onFeedbackChange('company', event.target.value)}
              placeholder="例如：某公司-运营实习生"
            />
          </label>
          <label className="fr-field">
            <span>结果阶段</span>
            <select value={feedbackForm.stage} onChange={(event) => onFeedbackChange('stage', event.target.value)}>
              <option value="已投递未回复">已投递未回复</option>
              <option value="简历筛选通过">简历筛选通过</option>
              <option value="一面通过">一面通过</option>
              <option value="终面通过">终面通过</option>
              <option value="未通过">未通过</option>
            </select>
          </label>
          <label className="fr-field md:col-span-2">
            <span>面试官追问 / 你卡住的问题</span>
            <textarea
              value={feedbackForm.question}
              onChange={(event) => onFeedbackChange('question', event.target.value)}
              placeholder="例如：追问“你做这件事的结果是什么”，我讲不出证据。"
            />
          </label>
          <label className="fr-field md:col-span-2">
            <span>下一步改进行动</span>
            <input
              value={feedbackForm.action}
              onChange={(event) => onFeedbackChange('action', event.target.value)}
              placeholder="例如：补充文档链接和数字细节，重写这段经历。"
            />
          </label>
        </div>

        {error ? <p className="mt-2 text-xs text-[var(--danger)]">{error}</p> : null}

        <button type="button" onClick={onAddFeedback} className="mt-3 fr-btn fr-btn-main">
          <NotePencil size={14} />
          <span>记录本次反馈</span>
        </button>

        <div className="mt-4 max-h-64 space-y-2 overflow-auto pr-1">
          {feedbackLogs.length === 0 ? (
            <article className="fr-card-soft p-3 text-sm text-[var(--ink-600)]">
              暂无反馈记录。每次投递和面试后记录一次，你会更快找到真正有效的表达。
            </article>
          ) : (
            feedbackLogs
              .slice()
              .reverse()
              .map((log) => (
                <article key={log.id} className="fr-card-soft p-3">
                  <p className="inline-flex items-center gap-2 text-xs text-[var(--ink-500)]">
                    <ChartLineUp size={13} />
                    {log.date} ｜ {log.stage}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--ink-700)]">{log.company}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-600)]">卡点：{log.question}</p>
                  <p className="mt-1 inline-flex items-start gap-2 text-xs leading-relaxed text-[var(--ink-600)]">
                    <TrendUp size={12} className="mt-0.5" />
                    改进：{log.action}
                  </p>
                </article>
              ))
          )}
        </div>
      </div>
    </section>
  )
}
