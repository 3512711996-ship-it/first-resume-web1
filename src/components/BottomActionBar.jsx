import { DownloadSimple, FloppyDiskBack, Pulse, TrashSimple } from '@phosphor-icons/react'

export function BottomActionBar({
  progressPercent,
  resumeCount,
  onSaveDraft,
  onExportPDF,
  onReset,
}) {
  return (
    <div className="fr-bottom-bar no-print">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 text-xs text-[var(--ink-600)]">
            <Pulse size={13} />
            当前进度 {progressPercent}% ｜ 已写入 {resumeCount} 段经历
          </p>
          <div className="mt-1 h-1.5 rounded-full bg-[var(--line-faint)]">
            <div
              className="h-1.5 rounded-full bg-[var(--accent-olive)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={onSaveDraft} className="fr-mini-btn">
            <FloppyDiskBack size={13} />
            <span>保存</span>
          </button>
          <button type="button" onClick={onExportPDF} className="fr-mini-btn">
            <DownloadSimple size={13} />
            <span>PDF</span>
          </button>
          <button type="button" onClick={onReset} className="fr-mini-btn fr-mini-danger">
            <TrashSimple size={13} />
            <span>重置</span>
          </button>
        </div>
      </div>
    </div>
  )
}
