import { DownloadSimple, MagicWand, SlidersHorizontal, Student } from '@phosphor-icons/react'

export function ResumePreview({
  profile,
  resume,
  onProfileChange,
  onToneAdjust,
  onExportPDF,
}) {
  return (
    <section className="fr-card full-print">
      <div className="p-5 md:p-7">
        <div className="section-head no-print">
          <h2 className="fr-title">第六步：你的第一份简历草稿</h2>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onToneAdjust('safe')} className="fr-btn fr-btn-soft">
              <MagicWand size={14} />
              <span>弱化夸张表达</span>
            </button>
            <button type="button" onClick={() => onToneAdjust('student')} className="fr-btn fr-btn-soft">
              <Student size={14} />
              <span>更学生化</span>
            </button>
            <button type="button" onClick={() => onToneAdjust('professional')} className="fr-btn fr-btn-soft">
              <SlidersHorizontal size={14} />
              <span>更专业</span>
            </button>
            <button type="button" onClick={onExportPDF} className="fr-btn fr-btn-main">
              <DownloadSimple size={14} />
              <span>导出 PDF</span>
            </button>
          </div>
        </div>

        <p className="fr-subtitle no-print">
          一页纸简洁版，先保证“可信、具体、讲得出来”，再追求格式精细化。
        </p>

        <div className="mt-4 grid gap-3 no-print md:grid-cols-2">
          <label className="fr-field">
            <span>姓名</span>
            <input value={profile.name} onChange={(event) => onProfileChange('name', event.target.value)} />
          </label>
          <label className="fr-field">
            <span>电话</span>
            <input value={profile.phone} onChange={(event) => onProfileChange('phone', event.target.value)} />
          </label>
          <label className="fr-field">
            <span>邮箱</span>
            <input value={profile.email} onChange={(event) => onProfileChange('email', event.target.value)} />
          </label>
          <label className="fr-field">
            <span>学校</span>
            <input value={profile.school} onChange={(event) => onProfileChange('school', event.target.value)} />
          </label>
          <label className="fr-field">
            <span>专业</span>
            <input value={profile.major} onChange={(event) => onProfileChange('major', event.target.value)} />
          </label>
          <label className="fr-field">
            <span>毕业时间</span>
            <input value={profile.graduation} onChange={(event) => onProfileChange('graduation', event.target.value)} />
          </label>
        </div>

        <article id="resume-print-area" className="resume-sheet mt-5">
          <header className="resume-head">
            <h3>{profile.name || '你的姓名'}</h3>
            <p>
              {profile.phone || '手机号'} ｜ {profile.email || '邮箱'} ｜ {resume.targetRole}
            </p>
            <p>{resume.education}</p>
          </header>

          <section className="resume-block">
            <h4>个人优势摘要</h4>
            <p>{resume.summary}</p>
          </section>

          <section className="resume-block">
            <h4>课程 / 项目 / 实践经历</h4>
            {resume.experiences.length === 0 ? (
              <p className="resume-empty">暂无经历，先在上方完成“经历转译”并加入简历。</p>
            ) : (
              resume.experiences.map((exp) => (
                <article key={exp.id} className="resume-exp">
                  <div className="resume-exp-head">
                    <strong>{exp.title}</strong>
                    <span>{exp.module}</span>
                  </div>
                  <ul>
                    {exp.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </section>

          <section className="resume-block">
            <h4>技能清单</h4>
            <p>{resume.skills.length > 0 ? resume.skills.join(' / ') : '待补充：工具能力、沟通协作、执行与复盘'}</p>
          </section>

          <section className="resume-block">
            <h4>其他经历</h4>
            <p>可补充：志愿活动、个人输出、阅读笔记、内容发布、日常项目化实践。</p>
          </section>
        </article>
      </div>
    </section>
  )
}
