import { Lightning, MagnifyingGlass, Sparkle, WarningCircle } from '@phosphor-icons/react'

export function ExperienceInput({
  rawText,
  selectedCategory,
  confidenceLevel,
  categories,
  quickTags,
  discoveryQuestions,
  onRawTextChange,
  onCategoryChange,
  onConfidenceChange,
  onQuickTagPick,
  onGenerate,
  onNoExperience,
  error,
  loading,
}) {
  return (
    <section className="fr-card no-print">
      <div className="p-5 md:p-7">
        <h2 className="fr-title">第三步：经历挖掘（先说人话）</h2>
        <p className="fr-subtitle">
          先不用想“这能不能写进简历”，只要告诉我你做过什么。哪怕只是一次小组作业、一次帮忙、一次自学，都可能成为第一段经历。
        </p>

        <div className="mt-4 fr-card-soft p-4">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
            <MagnifyingGlass size={14} />
            经历挖掘问题
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[var(--ink-600)]">
            {discoveryQuestions.slice(0, 4).map((question) => (
              <li key={question}>- {question}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onQuickTagPick(tag)}
              className="fr-tag-btn"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="fr-field">
            <span>经历分类（可先自动）</span>
            <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
              <option value="auto">自动判断</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label className="fr-field">
            <span>你觉得这段可写程度</span>
            <select value={confidenceLevel} onChange={(event) => onConfidenceChange(event.target.value)}>
              <option value="low">几乎写不出来</option>
              <option value="medium">勉强可写</option>
              <option value="high">应该能写</option>
            </select>
          </label>
        </div>

        <label className="mt-3 fr-field">
          <span>把你觉得“不值一提”的经历写下来</span>
          <textarea
            value={rawText}
            onChange={(event) => onRawTextChange(event.target.value)}
            placeholder="比如：我帮小组做了一次 PPT，然后上台讲了。"
          />
          <span className="fr-helper">越口语越好，系统会负责“翻译成简历语言”。</span>
        </label>

        {error ? (
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--danger)]">
            <WarningCircle size={14} />
            {error}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={onGenerate} className="fr-btn fr-btn-main" disabled={loading}>
            <Lightning size={15} />
            <span>{loading ? '正在转译...' : '帮我翻译成简历语言'}</span>
          </button>
          <button type="button" onClick={onNoExperience} className="fr-btn fr-btn-soft" disabled={loading}>
            <Sparkle size={15} />
            <span>我真的没有经历</span>
          </button>
        </div>
      </div>
    </section>
  )
}
