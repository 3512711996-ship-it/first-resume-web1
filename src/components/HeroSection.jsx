import { BookOpenText, FloppyDiskBack, Path, Sparkle, Student, UsersThree } from '@phosphor-icons/react'

function ValueCard({ icon: Icon, title, description }) {
  return (
    <article className="fr-card-soft p-4">
      <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)]">
        <Icon size={15} />
        <span>{title}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-600)]">{description}</p>
    </article>
  )
}

export function HeroSection({ onStart, onConfused, onSaveDraft, progressPercent, savedAt }) {
  return (
    <section className="fr-card fr-grid-paper no-print">
      <div className="p-5 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--paper-chip)] px-3 py-1 text-xs text-[var(--ink-700)]">
            <BookOpenText size={14} />
            <span>第一份简历</span>
          </div>
          <button type="button" onClick={onSaveDraft} className="fr-btn fr-btn-soft">
            <FloppyDiskBack size={14} />
            <span>保存草稿</span>
          </button>
        </div>

        <h1 className="mt-3 max-w-[14ch] text-[2.05rem] leading-[1.06] tracking-tight text-[var(--ink-900)] md:text-[3.1rem]">
          你的第一份简历，
          <br />
          不该从“我没经历”开始。
        </h1>

        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--ink-600)] md:text-base">
          输入你觉得“不值一提”的经历，我帮你翻译成简历语言。真的没经历，也能从一个小任务开始补出来。
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={onStart} className="fr-btn fr-btn-main">
            <Sparkle size={15} />
            <span>开始生成我的第一份简历</span>
          </button>
          <button type="button" onClick={onConfused} className="fr-btn fr-btn-soft">
            <Student size={15} />
            <span>我真的不知道写什么</span>
          </button>
        </div>
        {savedAt ? (
          <p className="mt-2 text-xs text-[var(--ink-500)]">草稿已保存：{savedAt}</p>
        ) : null}

        <div className="mt-4 rounded-2xl border border-[var(--line-soft)] bg-[var(--paper-chip)] p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--ink-700)]">
            <span className="inline-flex items-center gap-2">
              <Path size={13} />
              当前完成进度
            </span>
            <span className="mono">{progressPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--line-faint)]">
            <div
              className="h-2 rounded-full bg-[var(--accent-olive)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[var(--ink-500)]">
          不夸大，不造假，不写空话。让你的经历变得具体、可信、讲得出来。
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <ValueCard
            icon={UsersThree}
            title="小经历转译"
            description="把小组作业、兼职、课堂展示，变成可信的简历表达。"
          />
          <ValueCard
            icon={Sparkle}
            title="真实经历补齐"
            description="没有经历也不编造，给你 1-7 天能完成的小项目。"
          />
          <ValueCard
            icon={BookOpenText}
            title="面试讲得出来"
            description="每段经历都配套 30 秒和 1 分钟讲法，不怕追问。"
          />
        </div>
      </div>
    </section>
  )
}
