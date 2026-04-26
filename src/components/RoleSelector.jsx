import { Compass, Target } from '@phosphor-icons/react'
import { getRoleFocusText } from '../lib/resumeTemplates'

export function RoleSelector({ roles, value, onChange }) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <h2 className="fr-title">第二步：选择目标岗位方向</h2>
          <span className="fr-chip mono">岗位适配</span>
        </div>
        <p className="fr-subtitle">
          先选方向，再做表达重点。你可以随时改方向，系统会自动调节关键词和叙事重点。
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
          {roles.map((role) => {
            const active = value === role
            return (
              <button
                key={role}
                type="button"
                onClick={() => onChange(role)}
                className={`fr-role-chip ${active ? 'fr-role-chip-active' : ''}`}
              >
                {role}
              </button>
            )
          })}
        </div>

        <div className="mt-4 fr-card-soft p-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
            <Target size={14} />
            当前重点能力
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--ink-600)]">{getRoleFocusText(value)}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--ink-500)]">
            <Compass size={13} />
            不确定方向也没关系，先做“通用实习”版，再二次微调。
          </p>
        </div>
      </div>
    </section>
  )
}
