# 第一份简历

一个面向大学生、应届生、转专业学生和零经历用户的「第一份简历」网页 MVP。

它不是传统简历模板站，而是一个低压力的无经历用户起步系统：

- 把用户觉得“不值一提”的小事转译成可信的简历表达
- 在真的没有经历时，生成 1-7 天可完成的真实补经历任务
- 把每段简历内容连接到面试叙事，避免写上去却讲不出来
- 沉淀「低经验经历 -> 可投递表达 -> 面试反馈」的本地数据闭环

## 预览入口

直接打开：

```text
flow/step1-status.html
```

完整流程页面位于 `flow/`：

1. `step1-status.html`：选择当前状态
2. `step2-role.html`：选择目标岗位
3. `step3-experience.html`：输入小经历
4. `step4-translate.html`：经历转译
5. `step5-task.html`：补经历任务
6. `step6-resume.html`：简历草稿
7. `step7-interview.html`：面试讲法
8. `step8-loop.html`：成长闭环

## 当前版本

当前版本是纯静态 HTML/CSS/JS，可直接部署到 GitHub Pages。

核心文件：

- `flow/app.js`
- `flow/styles.css`
- `flow/assets/forest-bg.jpg`
- `flow/step*.html`

## 产品原则

- 不造假，只转译和补齐真实经历
- 不制造焦虑，先帮助用户发现自己已经拥有的素材
- 不追求万能简历，优先让第一份简历具体、可信、讲得出来
- 不只生成文档，而是形成「经历发现 -> 简历表达 -> 面试叙事 -> 反馈迭代」闭环
