# Novel Lore Manager — UI Mockup Rules

## Product
Windowsデスクトップ向け、小説の設定資料管理・編集・参照アプリ。小説本文執筆エディタではない。

## Read first
- docs/requirements.md
- docs/data-management-design.md
- docs/user-flows.md
- docs/screen-specifications.md

実際のパスを確認。確定、暫定、未決、将来拡張を混同しない。

## Skill roles
- ui-ux-pro-max: 情報階層、配置、操作一貫性、アクセシビリティ、デザインシステムの調査
- frontend-design: 3テーマ固有のビジュアル、書体、配色、CSS品質、テンプレート的UIの回避
- Codex: 実装と検証。Skillは独立した別エージェントではなく参照する設計指針。

## Technology
HTML5 + CSS3 + Vanilla JavaScript (ES Modules)。React、Vue、TypeScript、DB、LLM、RAG、MCPは今回使用しない。

## Scope
新規コードは `mockups/novel-lore-manager/` に限定。既存アプリ、本番データ、ユーザーファイルは変更しない。

## Three-theme comparison
Forest Workbench / Storybook Atelier / Quiet Lore Studio の機能・DOM構造・データ・画面遷移・操作順を共通化する。視覚デザインだけをテーマ別CSSで変える。

## Required mock UI
作品選択、メインワークスペース、Markdown編集・プレビュー、検索、インポートウィザード、Quick Recall、ゴミ箱・アーカイブ、テーマ切替。

## Data safety
本番ファイルの編集、削除、インポート、エクスポートを行わず、モックデータで動作再現。ブラウザのWindows最前面・グローバルショートカットは保証しない。

## Quality
日本語の可読性、1366x768/1440x900/1920x1080でのレイアウト、キーボードフォーカス、未保存表示、エラー・空状態、アクセシビリティを検証。

## Workflow
設計→3テーマの比較→共通HTML/CSS→JavaScript操作→同一シナリオでテスト。各工程で差分と未実装を報告。

## Skill-driven UI workflow

### Priority
1. User-approved product requirements and screen specifications
2. Existing repository constraints and accepted decisions
3. UI UX Pro Max recommendations that match this desktop product
4. frontend-design's subject-specific visual proposals
5. Generic design advice

### UI UX Pro Max: evidence-based UX
- Read the installed SKILL.md before use.
- For each new visual direction, run the actual local `search.py` with `--design-system` and a product-appropriate query.
- For specific UX problems, search the appropriate `--domain` (especially ux, icons, style, typography, color).
- Do not fabricate search results. Record executed commands, matches, rejected recommendations and rationale.
- Check references/quick-reference.md when needed, and references/pro-rules.md before final UI review.
- The reference stack `html-tailwind` is not authority to add Tailwind. This mockup uses plain CSS.
- Never persist an unreviewed generated design system or overwrite an existing MASTER.md.

### frontend-design: distinct visual identity
- Read the installed SKILL.md before use.
- Before implementation, propose a compact visual plan: 4–6 named colors, type roles, layout sketch, distinctive principles.
- Critique that plan against the actual writing/lore-management brief before coding; revise generic choices.
- Create each theme from a different intentional material/visual metaphor, not merely hue swapping.
- Keep the same functional HTML/DOM structure, user flows, content, and component roles across themes.
- Preserve readable Japanese, professional desktop information density, keyboard focus, reduced motion and contrast.
- During implementation, self-critique with screenshots if available; report what was changed and why.

### Application constraints
- Windows desktop product represented by local HTML5/CSS3/Vanilla JavaScript prototype.
- Do not invent AI integrations, production filesystem writes, database servers or OS-level always-on-top behavior.
- Never edit or delete real user documents. Save/import/delete behavior is only mocked.
- Distinguish UI simulation from actual Windows features.
- Never install packages or add network dependencies without explicit permission.
- Source files and mockup output must remain separate.
