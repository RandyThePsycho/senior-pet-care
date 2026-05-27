# Senior Pet Care — Feature A MVP

Interactive HHHHHMM Quality of Life Scale Calculator.
Next.js 14 (App Router) + TypeScript + Tailwind CSS。无数据库、无外部 API、无复杂依赖。

本 MVP 已通过 `tsc --noEmit`(strict) 与 `next build`(5 页全部静态生成)验证,可直接运行。

---

## 一、本次实现范围

**已实现**:Calculator 页面、三步表单(Pet Profile / HHHHHMM 七项 / Symptoms)、完整评分函数、四级风险等级、结果页、低分维度反馈、Questions to Ask Your Vet、Email Capture(mock)、PDF 下载 CTA(mock)、Weekly Reassessment CTA(mock)、Product Matcher / End-of-Life 跳转卡片、Medical Disclaimer、Affiliate Disclosure 预留组件、基础埋点函数、TypeScript 类型、极简首页。

**用 mock / TODO 实现(按要求)**:Supabase、真实 PDF 生成、真实 ConvertKit/MailerLite、登录系统、Feature B/C 页面、多宠物账户、完整趋势图。代码中均以 `TODO:` 注释标注接入点。

---

## 二、文件结构(本次新增/修改)

```
src/
  app/
    layout.tsx                      # 根布局
    page.tsx                        # 极简首页(三入口)
    globals.css                     # Tailwind 入口 + 少量基础样式
    tools/
      senior-pet-quality-of-life-calculator/
        page.tsx                    # 计算器页(server, 含 metadata)
  components/
    calculator/
      CalculatorClient.tsx          # 客户端状态机(串联三步+结果页)★
      CalculatorProgress.tsx
      PetProfileStep.tsx            # Step 1 (含校验)
      HHHHHMMScoreStep.tsx          # Step 2 (滑块默认 null,未选不可提交)
      SymptomsStep.tsx              # Step 3
      ResultView.tsx                # 结果页编排
      ScoreResultCard.tsx
      RiskLevelCard.tsx
      DimensionFeedbackCard.tsx
      VetQuestionsList.tsx
      EmailCaptureForm.tsx          # mock 留资
      ReassessmentReminder.tsx      # mock 复评提醒
      NextStepCards.tsx             # B/C 跳转卡(end_of_life 不显示产品)
    common/
      CTAButton.tsx
      MedicalDisclaimer.tsx
      AffiliateDisclosure.tsx       # 预留位置
  lib/
    scoring.ts                      # 评分引擎 + 风险文案 + 维度元数据 + 低分反馈
    vetQuestions.ts                 # 兽医问题生成(去重,最多8条)
    analytics.ts                    # mock 埋点(console.log)
  types/
    pet.ts
    assessment.ts
```

> 相对建议结构的微调:① 新增 `CalculatorClient.tsx` 作为客户端状态机——因为 `page.tsx` 是 server component 用于承载 metadata(SEO),交互状态必须放在独立的 `'use client'` 组件里,这是 App Router 的标准做法。② `EmailCaptureForm` 列在 calculator 目录(它依赖评分产生的 tags)。③ 新增 `ReassessmentReminder.tsx`(对应蓝图的 ReassessmentReminderBlock)。

---

## 三、如何运行

```bash
# 1. 解压后进入目录
cd senior-pet-care

# 2. 安装依赖
npm install

# 3. 开发模式
npm run dev
# 打开 http://localhost:3000  -> 点 "Start now" 进入计算器
```

其他脚本:`npm run build`(生产构建)、`npm run typecheck`(类型检查)。

---

## 四、如何测试

1. **首页**:三入口卡片可见;主入口跳转 `/tools/senior-pet-quality-of-life-calculator`。
2. **Step 1 校验**:不选 dog/cat、不填 age/weight、dog 不选 size → 点 Continue 应报错。
3. **Step 2 滑块**:默认显示 "Slide to rate"(非 5 分);七项未全部滑动 → 提交报错。
4. **四级结果**:
   - 全 10 分(总分 70)→ Stable。
   - 全 6 分(42)→ Needs Monitoring。
   - 全 4 分(28)→ Vet Visit。
   - 全 3 分(21)→ End-of-Life,且**只显示温柔资源卡,无产品卡**。
5. **路由卡**:mobility ≤ 5 → Mobility 卡;hygiene ≤ 4 → Hygiene 卡;happiness ≤ 4 且 more_good_days ≤ 4 → End-of-Life 卡。
6. **安全提醒**:hurt ≤ 2 或 mobility ≤ 2 或勾选 rapid breathing → 风险卡内出现温柔提示(等级不变)。
7. **Vet Questions**:勾选 arthritis/kidney/dementia 等 + 低分维度 + rapid_breathing,问题随之增减,最多 8 条。
8. **Email / Reassessment**:输入邮箱点击 → 显示成功文案;复评按钮 → "Reminder set"。
9. **埋点**:打开浏览器 console,操作时可见 `[analytics] ...` 日志。

---

## 五、下一步:接 Supabase

1. `npm i @supabase/supabase-js`,在 `src/lib/supabase.ts` 建 client(用 env 变量)。
2. 按蓝图 §八建表 `users / pets / assessments`(MVP 关闭 Auth,`pets.id` 作匿名 Journal token)。
3. 在 `CalculatorClient.handleSubmit` 评分后,`POST /api/assessments/create` 落库,返回 `petId`。
4. 结果页改为可分享链接 `/journal/[petId]`。

## 六、下一步:接 ConvertKit / MailerLite

1. 在 `EmailCaptureForm.handleSubmit` 的 `TODO` 处,调 `POST /api/email/subscribe`,body `{ email, tags, source }`。
2. 服务端用 ESP API 写入订阅者并附 `tags`(评分已生成,如 `risk_*` / `low_*` / `condition_*` / `end_of_life_sensitive`)。
3. 在 ESP 后台配置自动化:Welcome+PDF → +7 天 Weekly Reassessment → 按 tag 进入 Mobility / Cognitive / Incontinence / End-of-Life 序列。

## 七、下一步:实现 PDF

- **MVP**:放一份通用 PDF(含 7-Day Tracker + Vet Questions + Log)到 `/public`,留资成功后邮件发下载链接。
- **V2**:`npm i @react-pdf/renderer`,在 `/api/pdf/generate` 按评分动态生成(pet name + 分数 + 雷达图 + 低分建议 + 复评日期),支持浏览器下载与邮件发送。

---

## 八、当前 MVP 限制

- 数据不持久化:刷新页面后状态清空(无 Supabase)。
- 留资/复评/PDF 均为前端 mock,未真正发送邮件或生成文件。
- 无历史记录,故结果页不显示趋势(`previousTotal` 预留未用)。
- 无 Feature B / C 的真实页面,跳转卡指向的路由暂未实现(点击会 404,接入后即通)。
- 埋点仅 console.log,未上报 Plausible/GA4。
- 未做账户/登录/多宠物。

以上均为蓝图中明确的"伪实现/V2"边界,接入点已用 `TODO:` 标注。
