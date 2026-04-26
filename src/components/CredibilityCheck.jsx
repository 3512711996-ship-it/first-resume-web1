import { ShieldCheckered, Warning, XCircle } from '@phosphor-icons/react'

export function CredibilityCheck({ report, warnings }) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <h2 className="fr-title">第五步：可信度检查</h2>
        <p className="fr-subtitle">避免“太像模板话”或“面试讲不出来”。先保证真实，再谈优化。</p>

        {!report ? (
          <article className="mt-4 fr-card-soft p-4">
            <p className="text-sm text-[var(--ink-600)]">生成一段经历后，这里会自动检查可信度风险。</p>
          </article>
        ) : (
          <div className="mt-4 space-y-3">
            <article className="fr-card-soft p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
                  <ShieldCheckered size={15} />
                  可信度评分
                </p>
                <span className="fr-chip mono">
                  {report.score}/100 · {report.verdict}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[var(--line-faint)]">
                <div
                  className="h-2 rounded-full bg-[var(--accent-olive)] transition-all duration-500"
                  style={{ width: `${report.score}%` }}
                />
              </div>
            </article>

            <article className="fr-card-soft p-4">
              <ul className="space-y-2">
                {report.checks.map((check) => (
                  <li key={check.key} className="rounded-xl border border-[var(--line-soft)] bg-[var(--paper-plain)] p-3">
                    <p className="text-sm font-medium text-[var(--ink-700)]">
                      {check.ok ? '通过' : '待优化'} · {check.label}
                    </p>
                    <p className="mt-1 text-xs text-[var(--ink-500)]">{check.tip}</p>
                  </li>
                ))}
              </ul>
            </article>

            {warnings.length > 0 ? (
              <article className="fr-card-soft p-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--danger)]">
                  <Warning size={14} />
                  风险提示
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-600)]">
                  {warnings.map((warning) => (
                    <li key={warning} className="inline-flex items-start gap-2">
                      <XCircle size={14} className="mt-0.5 text-[var(--danger)]" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
