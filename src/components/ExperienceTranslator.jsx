import { ArrowClockwise, Checks, PlusCircle, Sparkle } from '@phosphor-icons/react'

export function ExperienceTranslator({ translated, onAddToResume, onRetry, addedCount }) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <h2 className="fr-title">第四步：经历转译</h2>
          <span className="fr-chip mono">已加入 {addedCount} 段</span>
        </div>
        <p className="fr-subtitle">这件“小事”，可以这样写进简历。先从真实动作出发，再逐步补细节。</p>

        {!translated ? (
          <article className="mt-4 fr-card-soft p-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
              <Sparkle size={14} />
              等待转译结果
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">
              输入一段真实经历后点击“帮我翻译”，这里会显示简历表达、可放入模块和可补充细节。
            </p>
          </article>
        ) : (
          <div className="mt-4 space-y-3">
            <article className="fr-card-soft p-4">
              <p className="text-xs text-[var(--ink-500)]">原始经历</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--ink-700)]">{translated.rawText}</p>
            </article>

            <article className="fr-card-soft p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-[var(--ink-800)]">{translated.title}</h3>
                  <p className="mt-1 text-xs text-[var(--ink-500)]">
                    可放入模块：{translated.module} ｜ 分类：{translated.category}
                  </p>
                </div>
                <span className="fr-chip mono">可信度 {translated.credibilityScore}/100</span>
              </div>
              <ul className="mt-3 space-y-2">
                {translated.resumeBullets.map((bullet) => (
                  <li key={bullet} className="fr-bullet">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>

            <article className="fr-card-soft p-4">
              <p className="text-sm font-medium text-[var(--ink-700)]">可以补充的细节</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-600)]">
                {translated.improvedDetails.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            </article>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onAddToResume} className="fr-btn fr-btn-main">
                <PlusCircle size={15} />
                <span>加入简历草稿</span>
              </button>
              <button type="button" onClick={onRetry} className="fr-btn fr-btn-soft">
                <ArrowClockwise size={15} />
                <span>再生成一版</span>
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-500)]">
                <Checks size={14} />
                不造假，只翻译和补齐真实经历
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
