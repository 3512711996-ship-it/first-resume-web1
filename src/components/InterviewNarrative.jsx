import { ChatCircleDots, Timer, WarningOctagon } from '@phosphor-icons/react'

export function InterviewNarrative({ experiences }) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <h2 className="fr-title">第七步：面试讲法（讲得出来才算完成）</h2>
        <p className="fr-subtitle">
          每段经历都给你 30 秒版、1 分钟版、可能追问和答题提示。重点是自然表达，不是背模板。
        </p>

        {experiences.length === 0 ? (
          <article className="mt-4 fr-card-soft p-4">
            <p className="text-sm text-[var(--ink-600)]">先把经历加入简历，这里会自动生成面试叙事。</p>
          </article>
        ) : (
          <div className="mt-4 space-y-3">
            {experiences.map((exp) => (
              <article key={exp.id} className="fr-card-soft p-4">
                <h3 className="text-base font-semibold text-[var(--ink-800)]">{exp.title}</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-700)]">
                      <Timer size={13} />
                      30 秒版本
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-600)]">
                      {exp.interviewStory.brief30}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink-700)]">
                      <ChatCircleDots size={13} />
                      1 分钟版本
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-600)]">
                      {exp.interviewStory.minute1}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="text-xs font-medium text-[var(--ink-700)]">面试官可能追问</p>
                    <ul className="mt-1.5 space-y-1 text-xs text-[var(--ink-600)]">
                      {exp.interviewStory.followUps.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="text-xs font-medium text-[var(--ink-700)]">你可以这样回答</p>
                    <ul className="mt-1.5 space-y-1 text-xs text-[var(--ink-600)]">
                      {exp.interviewStory.answerGuide.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="inline-flex items-center gap-2 text-xs font-medium text-[var(--danger)]">
                      <WarningOctagon size={13} />
                      不能乱说
                    </p>
                    <ul className="mt-1.5 space-y-1 text-xs text-[var(--ink-600)]">
                      {exp.interviewStory.dontSay.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
