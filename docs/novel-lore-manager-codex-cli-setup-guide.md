# Novel Lore Manager — Codex CLI × frontend-design × UI UX Pro Max 手順書

- 版：v1.0
- 作成日：2026-10-30
- 対象：Windows 11 / VS CodeのPowerShell / Codex CLI
- 制作対象：HTML5 + CSS3 + Vanilla JavaScript のローカルモックアップ
- 目的：Forest Workbench、Storybook Atelier、Quiet Lore Studioを同一画面・同一機能で比較する。

> この文書はAnthropic社内文書ではありません。Anthropic公式のfrontend-design Skillと、NextLevelBuilder公開のUI UX Pro Max、Codexの公開情報に基づく独立した手順書です。Skillの利用は、成果物の品質を保証するものではありません。

## 0. 今回の開発方針

- Codex CLI：作業全体の調整、HTML/CSS/JS実装、画面遷移、状態管理、検証。
- UI UX Pro Max：構造、レイアウト、情報の優先順位、文字サイズ、操作一貫性、アクセシビリティの検討。
- frontend-design：森の書斎・古書のアトリエ・静かな物語工房という3テーマの独自性、配色、タイポグラフィ、CSSの磨き込み。
- 最終製品はWindowsデスクトップアプリ。今回のブラウザ版は操作検証用プロトタイプであり、Windowsの最前面固定やグローバルショートカットは本実装で検証する。
- 本番ファイルを改変しない。リポジトリ内の `mockups/` に作業を限定する。

## 1. 事前準備：PowerShellで確認

### 1-1. ターミナル
VS Codeの「ターミナル → 新しいターミナル」を開き、PowerShellであることを確認する。Windowsホスト側で実行する。WSL2内のUbuntuとはインストール先が異なるため混在させない。

```powershell
$PSVersionTable.PSVersion
node --version
npm --version
npx --version
python --version
codex --version
git --version
```

- `npx skills` のCLI要件は Node.js 22.20以上。古い場合はNode.jsの対応LTS版へ更新し、ターミナルを再起動する。
- `python` はUI UX Pro Maxの検索スクリプトで使う。Python 3系であればよい。`python --version` が失敗したら `py -3 --version` も確認する。
- `codex` が見つからない場合は既存の導入状況を確認し、公式の方法（例：`npm install -g @openai/codex`）で導入する。既存の認証・設定を安易に削除しない。
- `codex --version` が成功しても、サンドボックスの起動が成功するとは限らない。過去にWindowsのsandbox provisioningエラーがあった場合は、後述の診断を行う。

### 1-2. 既存のリポジトリへ移動
以下のパスはダミー例。実際のローカル保存先に置き換える。

```powershell
cd "C:\path\to\novel-lore-manager"
Get-Location
git status --short
git branch --show-current
```

`git status --short` に変更が表示されたら、内容を確認する。既存変更を自動的に破棄しない。作業ブランチを作る場合：

```powershell
git switch -c feature/novel-lore-three-theme-mockup
```

ブランチ名が既に存在する場合は別名を選ぶ。事前にGitの状態を確認する。

### 1-3. 設計資料の配置
以下の資料をリポジトリの `docs/` に用意する（実際の場所が異なればCodexに探索させる）。

```text
docs/
  requirements.md
  data-management-design.md
  user-flows.md
  screen-specifications.md
```

資料が見つからない場合、Codexに架空の内容を補完させず、所在と不足を報告させる。正式仕様と仮仕様は区別する。

## 2. Skillを導入する

### 2-1. Anthropic公式 frontend-design

```powershell
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

対話式の選択画面ではCodexを選び、Projectスコープを選ぶ。インストール後に `.agents/skills/frontend-design/SKILL.md` があるか確認する。インストール先はCLIのバージョンや選択内容により異なるため、実行結果の出力を優先する。

```powershell
npx skills list
Test-Path .\.agents\skills\frontend-design\SKILL.md
```

### 2-2. UI UX Pro Max

```powershell
npm install -g ui-ux-pro-max-cli
uipro --help
uipro init --ai codex --dry-run
uipro init --ai codex
```

`--dry-run` は利用中のCLIが対応する場合に実行し、エラーなら `uipro init --help` で現在のオプションを確認する。通常、Codex用のSkillが `.agents/skills/ui-ux-pro-max/` に用意される。

```powershell
Test-Path .\.agents\skills\ui-ux-pro-max\SKILL.md
Get-ChildItem .\.agents\skills -Directory -ErrorAction SilentlyContinue
```

検索スクリプトのパスはインストール後の実ファイルに従う。Pythonが必要な場合がある。

### 2-3. 外部Skillの安全確認

```powershell
Get-Content .\.agents\skills\frontend-design\SKILL.md -TotalCount 60
Get-Content .\.agents\skills\ui-ux-pro-max\SKILL.md -TotalCount 60
git status --short
```

Skillがシェルコマンドを要求する場合は内容を確認する。機密情報送信、無断インストール、既存ファイルの破壊的変更を許可しない。依存関係・生成ファイルを確認し、信頼するものだけGitに含める。

## 3. Codex CLIでSkill認識を確認する

Skillを導入した後にCodexを再起動する。

```powershell
codex
```

Codex内で `/skills` を使用してSkill一覧を確認する。表示されない場合も `SKILL.md` の実際の配置とCodexバージョンを調べる。`/skills` のUIはバージョン差があり得る。

Codexへの確認メッセージ：

```text
この作業ディレクトリのSkill一覧を確認してください。
frontend-design と ui-ux-pro-max の SKILL.md が実際に利用可能か確認し、パスと読み込んだ文書名を報告してください。
まだコードは編集しないでください。
```

Skillの明示呼び出しは実際に認識された名前で行う（例：`$frontend-design`、`$ui-ux-pro-max`）。インストールされていないSkillを使ったと虚偽報告しない。

## 4. AGENTS.mdを作成する

リポジトリルートに `AGENTS.md` を配置する。既に存在する場合は上書きせず、内容を比較・統合する。次の文面を出発点とする。

```markdown
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
```

## 5. 第1回：3テーマのデザインシステム作成（コード実装前）

Codex内で次を送る。必要なら `$frontend-design`、`$ui-ux-pro-max` を先頭に置き、両Skillの指示を参照する。

```text
$ui-ux-pro-max $frontend-design

Novel Lore Managerの3テーマ共通UIとテーマ別デザインシステムを設計してください。
まずAGENTS.mdとdocsの4文書を読んで、確定要件、暫定要件、未決事項を要約してください。
ui-ux-pro-maxは情報階層・コンポーネント・アクセシビリティを検討し、frontend-designは3テーマ固有の視覚コンセプトを検討してください。

3テーマ：
- Forest Workbench：深緑、落ち着いた森の書斎、VS Code型の高情報密度
- Storybook Atelier：古書・羊皮紙・童話。読みやすさを犠牲にしない
- Quiet Lore Studio：セージグリーン、オフホワイト、静かなミニマル設計

テーマ間でレイアウトと情報を変えず、視覚的表現のみ変更してください。
mockups/novel-lore-manager/design/ に shared-layout.md、3テーマごとの設計.md、design-comparison.md を作成してください。
各テーマにカラーコード、文字設計、余白、状態、禁止する装飾、Markdown編集画面・Quick Recallの表現を含めてください。
この段階ではHTML/CSS/JavaScriptを実装しないでください。
```

確認すること：3案の色だけが異なる単純な焼き直しになっていないか／反対に画面構成まで変わっていないか／日本語の可読性と情報密度が保たれているか。

## 6. 第2回：共通HTML + 3テーマCSS

```text
$ui-ux-pro-max $frontend-design

Phase 1の設計資料を読み、Novel Lore ManagerのSCR-02（メインワークスペース）とSCR-06（Quick Recall）の高忠実度モックアップを作成してください。
HTML5とCSS3を使用し、JavaScriptはテーマ切替など必要最小限にしてください。バックエンドは不要です。

共通構造：上部タイトルバー、左アクティビティバー、フォルダ・カテゴリツリー、中央タブ付きMarkdown領域、右関連資料、下部ステータスバー。
Quick Recallは約420x560のWindows独立小型ウィンドウ相当で、検索、結果、概要、詳細、簡易メモを配置。スマホUIとして描かない。

Forest Workbench、Storybook Atelier、Quiet Lore Studioにはそれぞれ別のCSSファイルを用意し、同一のHTML・画面サイズ・データ・構造を共用してください。
サンプル作品は「灰冠の王国」、人物はエレナ・ヴァルツ、レオン・クロード、アリア・ベルフォード。設定資料に王立魔導学院、魔法体系などを使用。

実装先：mockups/novel-lore-manager/
作成後はプレビュー方法、3テーマ差分、未実装機能、表示崩れの有無を報告してください。
```

ここで3テーマのスクリーンショットを1440x900で揃え、見た目だけの比較を行う。評価の偏りを避けるため、同じパネルを開いた同じ状態を撮影する。

## 7. 第3回：JavaScriptによる操作可能なプロトタイプ

```text
$ui-ux-pro-max $frontend-design

Phase 2の共通HTMLと3テーマCSSを維持したまま、Vanilla JavaScript（ES Modules）で画面遷移とモック操作を実装してください。
3テーマのDOM・データ・操作仕様は共通にしてください。テーマ変更で機能が変わらないこと。

必須フロー：
1. 作品選択 → メイン画面
2. フォルダツリー開閉・カテゴリ切替
3. タブ開閉・左右分割
4. Markdown編集・プレビュー切替
5. Ctrl+Sによるモック保存、Undo、未保存警告
6. 作品内検索、範囲・カテゴリ・タグ絞り込み、ハイライト、結果から資料へ移動
7. インポートウィザード（コピー／直接編集、元階層維持／カテゴリ別整理の仮操作）
8. Quick Recallの起動、検索、閲覧、メモ、最小化相当の動作
9. ゴミ箱・アーカイブの仮操作と復元
10. テーマ切替

重要：ブラウザ上で本番ファイルを編集しない。`window.open()`を使う場合はブラウザのポップアップ制限を考慮し、失敗時はアプリ内のモック表示にフォールバックする。Windowsの常時最前面・OSショートカットは実装済みと主張しない。Markdownプレビューで任意HTML/JSを実行しない。

READMEに起動手順、実装済み、未実装、制約、テスト結果を書いてください。
```

## 8. 起動と確認

ES Modules利用時、HTMLをダブルクリックして `file://` で開くのではなく、ローカルHTTPサーバーから表示する。

```powershell
cd .\mockups\novel-lore-manager
py -3 -m http.server 5500 --bind 127.0.0.1
```

`py` がない場合は `python -m http.server 5500 --bind 127.0.0.1` を試す。ブラウザで `http://127.0.0.1:5500/` を開く。終了はPowerShellで Ctrl+C。

画面を少なくとも1366x768、1440x900、1920x1080で検証し、3テーマそれぞれで同一の操作を実行する。

### 受け入れテスト

- [ ] 作品選択からワークスペースに移れる
- [ ] フォルダ・カテゴリ・タブが反応する
- [ ] Markdown編集とプレビュー切替ができる
- [ ] 保存・Undo・未保存表示がある
- [ ] 検索結果に該当語の強調とプレビューがある
- [ ] 取り込みウィザードで選択・確認ができる（実ファイルは変更しない）
- [ ] Quick Recallで検索、概要、メモを試せる
- [ ] 削除・アーカイブ・復元を区別して再現できる
- [ ] 3テーマで同じタスクとコンテンツを比較できる
- [ ] JavaScriptコンソールエラーがない
- [ ] 画面幅変更・キーボードフォーカスで重大な問題がない

## 9. デザイン比較の方法

3案は同じ画面サイズ、同じ資料、同じ操作状態で比較する。以下の重みは初期案であり、実測値ではない。

| 評価項目 | 重み |
|---|---:|
| Markdownの読みやすさ | 25% |
| 操作の直感性 | 25% |
| 情報の見つけやすさ | 20% |
| 長時間作業への適性 | 20% |
| 森・童話の世界観 | 10% |

5段階評価の点数に重みを適用し、印象と操作テストの結果を別々に記録する。

## 10. トラブルシューティング

### Skillが見つからない
1. Codexを完全終了して再起動。
2. PowerShellで `Get-ChildItem .agents\skills -Recurse -Filter SKILL.md` を確認。
3. `npx skills list` とインストーラー出力を確認。
4. プロジェクトルートで `codex` を起動しているか確認。
5. `$skill-name` は実際に表示される名前に合わせる。

### `uipro` が見つからない

```powershell
npm prefix -g
Get-Command uipro -ErrorAction SilentlyContinue
npx ui-ux-pro-max-cli init --ai codex
```

### Node.jsが古い
`node --version` が 22.20 未満なら、対応するLTS版に更新しPowerShellを再起動。古いNode環境がPATHに残っていないか確認。

### PowerShellでスクリプト実行が禁止された
システム全体の実行ポリシーを安易に緩めない。`npm.cmd` や `npx.cmd` を明示して試し、組織管理PCの場合は管理者の方針に従う。

### Codex CLIのWindows Sandbox provisioningに失敗
過去の `helper_unknown_error` などはSkillの不足とは別問題。`codex --version`、`codex` の起動、診断メッセージを分けて確認する。既存の `.codex` 設定や権限を一括削除せず、エラー本文に応じて公式案内に沿って修復する。WSL2への切替は別環境になるため、ファイルパスとSkill導入先の違いを認識する。

### Quick Recallが最前面にならない
ブラウザでは常時最前面を保証できない。これは失敗ではなくモックアップの制約。実Windows版でネイティブウィンドウAPIを評価する。

### AIが見た目を勝手に変える
`AGENTS.md` とPhase 1のデザイントークンを参照させ、HTML構造と機能を固定する。CSS差分に変更を限定し、スクリーンショットを同一条件で再比較する。

## 11. 推奨する成果物ツリー

```text
novel-lore-manager/
├── AGENTS.md
├── docs/
│   ├── requirements.md
│   ├── data-management-design.md
│   ├── user-flows.md
│   └── screen-specifications.md
├── .agents/skills/        # インストーラーの実際の出力に従う
└── mockups/
    └── novel-lore-manager/
        ├── design/
        │   ├── shared-layout.md
        │   ├── forest-workbench.md
        │   ├── storybook-atelier.md
        │   ├── quiet-lore-studio.md
        │   └── design-comparison.md
        ├── index.html
        ├── css/
        │   ├── base.css
        │   ├── layout.css
        │   ├── components.css
        │   └── themes/
        │       ├── forest-workbench.css
        │       ├── storybook-atelier.css
        │       └── quiet-lore-studio.css
        ├── js/
        │   ├── app.js
        │   ├── mock-data.js
        │   ├── navigation.js
        │   ├── editor.js
        │   ├── search.js
        │   └── quick-recall.js
        └── README.md
```

## 12. 参考・一次情報

- Anthropic frontend-design： https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- Skills CLI： https://github.com/vercel-labs/skills/blob/main/docs/commands.md
- UI UX Pro Max：https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- UI UX Pro Max CLI：https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/cli/README.md
- Codex Skills catalog：https://github.com/openai/skills
- Codex本体：https://github.com/openai/codex

> 仕様変更に備えて、インストール時には各ツールの `--help` と公式READMEも確認すること。
