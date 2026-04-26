import { CheckCircle, Circle } from '@phosphor-icons/react'

export function StatusSelector({ options, value, onChange }) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <h2 className="fr-title">第一步：先选你的当前状态</h2>
        <p className="fr-subtitle">
          先不填简历。选一个最接近你当下的状态，我们会按这个状态给你引导路径。
        </p>

        <div className="mt-4 grid gap-3">
          {options.map((option, index) => {
            const active = value === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChange(option.id)}
                className={`fr-option-card text-left ${
                  active ? 'border-[var(--accent-olive)] bg-[var(--paper-active)]' : ''
                }`}
                style={{ '--index': index }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--ink-800)]">{option.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--ink-500)]">{option.hint}</p>
                  </div>
                  {active ? (
                    <CheckCircle size={18} weight="fill" className="text-[var(--accent-olive)]" />
                  ) : (
                    <Circle size={18} className="text-[var(--ink-500)]" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
