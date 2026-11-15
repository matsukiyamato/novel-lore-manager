# Novel Lore Manager — Codex CLI Skill活用プロンプト集 v2.0

- 改訂日：2026-11-02
- 対象：Windows 11 / PowerShell / Codex CLI / `frontend-design` / `ui-ux-pro-max`
- 成果物：HTML5・CSS3・Vanilla JavaScriptによる3テーマ比較用モックアップ
- 本書は既存の `novel-lore-manager-codex-cli-setup-guide(1).md` の **第4〜7章（AGENTS.mdと制作プロンプト）を改訂するための資料**。

## 0. なぜ改訂するか

- `ui-ux-pro-max` は単なる「UX専門家」ではない。実際の `search.py` を使い、`--design-system`、`--domain`、`--stack` による検索結果を根拠として設計する。
- `frontend-design` は単なる「CSS担当」ではない。対象の文脈から固有の美術方針を立て、色・書体・配置の意図をレビューして実装し、制作途中に自己批評する。
- いずれも独立したエージェントではない。Codexが各Skillを読んで実行する。
- Skillの資料は、ユーザーの要件・既存の設計書・AGENTS.mdより優先しない。
- UI UX Pro MaxはHTML+Tailwind向け知識を持つが、今回の技術指定は **素のHTML/CSS/JavaScript**。Tailwind導入を許可しない。

## 1. 最初の確認用プロンプト（Codex CLIへ入力）

```text
Novel Lore Managerのモックアップ準備です。まだファイルの変更・追加はしないでください。

1. git branch --show-current と git status --short を確認し、既存のモックアップブランチから勝手に移動しないこと。
2. リポジトリのAGENTS.mdと、requirements.md、data-management-design.md、user-flows.md、screen-specifications.mdの実際の配置を探し、内容を読み取る。見つからない場合は不足を報告し、仕様を創作しない。
3. インストール済みのfrontend-designとui-ux-pro-maxのSKILL.mdを実際に読み、保存場所と使用可能な補助スクリプトを報告する。
4. UI UX Pro Maxのsearch.pyとreferences/quick-reference.md、references/pro-rules.mdの存在を確認する。相対パスを推測せず実物を探す。
5. 各Skillの実際の責務、今回使う機能、使わない機能を比較表にする。
6. モックアップ本体はmockups/novel-lore-manager/以外を変更しない。AGENTS.mdなどの編集は別途確認する。

最終出力：検出した資料、Skill名、スクリプト実体、Git状態、未決事項。実装は行わない。
```

## 2. AGENTS.mdに追加・統合するルール

既存の `AGENTS.md` は自動上書きしない。次のセクションをレビュー後に追加する。

```markdown
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
```

## 3. Phase 1A — UI UX Pro Maxによる共通UX基盤の設計

```text
$ui-ux-pro-max

あなたはNovel Lore Managerの情報設計・操作設計・アクセシビリティ評価を担当します。まずインストール済みのui-ux-pro-maxのSKILL.mdを読み、その手順どおりに実際の検索スクリプトを利用してください。

【前提】
- 最終製品：Windowsデスクトップ設定資料エディタ。今回はHTML/CSS/Vanilla JSのモックアップ。
- 対象：小説家になろう・カクヨム・アルファポリスの作家。
- 本文執筆エディタではなく、資料管理、Markdown編集、検索、執筆中Quick Recallのための製品。
- requirements.md、data-management-design.md、user-flows.md、screen-specifications.mdを参照。
- 3テーマで同じ情報構造と主要操作を使用する。

【実施】
1. 検索スクリプトsearch.pyの実際の場所と --help を確認する。
2. `developer tool IDE knowledge editor desktop` など製品文脈に合う短い検索語で `--design-system -f markdown` を実行する。推奨の適合性を確認する。LP/SaaS営業ページの構造は採用しない。
3. `--domain ux` を使い、次を個別に調査する：keyboard focus、search result navigation、error validation、resizable panels、compact labels。対象のルールが見つからない場合は1回だけ絞って再検索し、未検証と記録する。
4. `--domain typography`、`--domain color`、`--domain icons` で日本語可読性、低彩度の配色、アイコンの意味を検討する。
5. 技術別検索を使う場合は `--stack html-tailwind` の結果を参照知識として扱う。ただしTailwind導入は禁止。デスクトップの参考としてwpf/winuiを検索する場合も、Web版に移植可能なルールだけ抽出する。
6. 検索結果と製品要件が衝突したら、製品要件を優先して理由を書く。

【設計する項目】
- 共通の情報アーキテクチャ、ナビゲーション、タブ・分割表示・ツリー
- SCR-02メインワークスペース、SCR-06 Quick Recallの画面領域と操作
- 空・選択中・未保存・検索0件・競合・削除・復元の状態
- フォーカス順、キーボード操作、スクロールとパネル幅、文字長への耐性
- 1366x768、1440x900、1920x1080、およびWindows 125%/150%相当の文字拡大での想定

【成果物】
mockups/novel-lore-manager/design/shared-ux.md
mockups/novel-lore-manager/design/ux-research-log.md
mockups/novel-lore-manager/design/shared-wireframes.md

設計資料のみ作成。HTML/CSS/JSはまだ作らない。
検索コマンド・採用した知識・適用を見送った知識・不明点を報告する。
```

## 4. Phase 1B — frontend-designによる3テーマの美術設計

```text
$frontend-design

あなたはNovel Lore Managerのビジュアルデザインリードです。frontend-designのSKILL.mdを読み、まず小さなデザイン計画を立て、汎用的なAI生成UIになっていないか自己批評した後にデザイン仕様をまとめてください。

【必ず読む】
- 要件定義・画面仕様などの既存資料
- mockups/novel-lore-manager/design/shared-ux.md
- mockups/novel-lore-manager/design/shared-wireframes.md

【3つのテーマ】
A Forest Workbench：深緑の森の書斎。実用性のある暗色エディタ。深緑・木・鈍い金属のイメージを意味のある箇所に限定。
B Storybook Atelier：古書・羊皮紙・童話。資料を扱う喜びは表現するが、編集本文に装飾的背景を置かない。
C Quiet Lore Studio：セージグリーン、自然光、簡潔な現代の書斎。装飾を減らし操作と情報階層を優先。

【テーマごとに設計する】
- 4〜6の命名済みカラー・HEX、コントラスト検証の対象
- 日本語UI・Markdownエディタ・見出しに使う書体と役割、オフラインでの代替フォント
- 余白、線、角丸、陰影、選択/hover/focus/disabled/unsavedの状態
- SCR-02とSCR-06で、テーマ特有の一つの記憶に残る表現要素
- 世界観を演出する場所と、演出しない場所
- 過剰なカード、広告的ヒーロー、根拠のないグラフ、無意味な見出し、装飾アニメーションを避ける策

【比較に関する厳格な制約】
- 3テーマの情報・DOM領域・操作・画面サイズ・サンプル文章は同じ。
- 可読性・フォーカス・未保存/削除表示の意味を変えない。
- 配色だけの焼き直しにならず、書体、境界、質感の使い方で各テーマの個性を出す。
- 一方で、レイアウトを大きく変更して比較条件を崩さない。

【成果物】
mockups/novel-lore-manager/design/forest-workbench.md
mockups/novel-lore-manager/design/storybook-atelier.md
mockups/novel-lore-manager/design/quiet-lore-studio.md
mockups/novel-lore-manager/design/design-comparison.md

まず各テーマのデザイン計画を短く提示して批評・改善し、それを反映した最終仕様を保存する。コードはまだ書かない。
```

## 5. Phase 2 — 共通HTMLと3テーマCSSを実装

```text
$ui-ux-pro-max $frontend-design

Novel Lore ManagerのメインワークスペースとQuick Recallを、HTML5/CSS3/Vanilla JavaScriptによるローカルモックアップとして実装してください。

【参照順】
1. AGENTS.md、requirements.md、user-flows.md、screen-specifications.md、data-management-design.md
2. design/shared-ux.md、shared-wireframes.md、ux-research-log.md
3. 3テーマの設計書、design-comparison.md
4. 両SkillのSKILL.md（必要な詳細ルールだけ参照）

【Skillをどう使用するか】
- UI UX Pro Max：完成する画面に対して、キーボード操作、編集領域、フォーカス、コントラスト、状態表示、情報の優先順位を評価する。必要時だけ関連する `--domain` を調べる。
- frontend-design：設計済みの各テーマをCSSに変換し、画面の見た目を題材に合う品質へ磨く。実装途中にスクリーンショットが取得できるなら目視で批評して修正する。

【出力範囲】
mockups/novel-lore-manager/ 以下のみ。
- index.html
- css/base.css, layout.css, components.css
- css/themes/forest-workbench.css
- css/themes/storybook-atelier.css
- css/themes/quiet-lore-studio.css
- js/theme-manager.js（必要最小限）
- assets/（必要な素材だけ）

【画面】
SCR-02 メインワークスペース（ツリー・カテゴリ・タブ・Markdown編集・関連資料・ステータス）
SCR-06 Quick Recall（420x560程度の独立小型Windowsウィンドウ相当。スマートフォン画面にしない）

【共通モックデータ】
作品：灰冠の王国
人物：エレナ・ヴァルツ、レオン・クロード、アリア・ベルフォード
資料：王立魔導学院、魔法体系、王国の歴史

【絶対条件】
- 3テーマで同じHTML/DOM、同じ情報とコンポーネント機能。テーマ別CSSは装飾だけを変える。
- React/Vue/TypeScript/Tailwindは導入しない。外部CDNやフォントへのネット接続を必須にしない。
- ボタンやリンクが未実装なら無効状態と説明を明示する。機能しているように装わない。
- 実際のファイル・データベースには触れない。
- 1366x768、1440x900、1920x1080で表示確認する。

【納品前】
- UI UX Pro Maxのreferences/pro-rules.md等のチェック項目を確認。
- frontend-designに従い、汎用的デザインの兆候を具体的に指摘し修正。
- 3テーマの同じ状態・同じ寸法のスクリーンショットを撮れるなら保存する。撮れない場合は撮ったと報告しない。
- 成果物と既知の制約、起動方法、変更したファイルを報告する。
```

## 6. Phase 2.5 — 3テーマの比較・改善（JS実装前）

```text
$ui-ux-pro-max $frontend-design

現在のForest Workbench / Storybook Atelier / Quiet Lore Studioのモックアップを、同じ1440x900のワークスペース状態と420x560のQuick Recall状態で比較してください。

UI UX Pro Max：読めるか・操作が見つかるか・フォーカス、未保存、検索、関連資料が理解できるかを点検し、必要なら検索スクリプトを実行する。
frontend-design：3案の独自性、余白、文字の扱い、素材表現、過剰な装飾、統一性を批評する。

比較項目：
- Markdown可読性 25%
- 操作の直感性 25%
- 情報の発見しやすさ 20%
- 長時間作業への適性 20%
- 世界観表現 10%

これらの重みは仮であり、客観的ユーザーテストの結果を表すものではない。
レビューは、観測した問題・影響・改善内容・根拠の4列で報告する。実際に確認していない項目は未検証とする。

成果物：mockups/novel-lore-manager/design/visual-review.md
この工程では大幅な構造変更や本番用機能追加をしない。修正が必要なら理由と影響範囲を示す。
```

## 7. Phase 3 — JavaScriptで操作可能なプロトタイプへ

```text
$ui-ux-pro-max

承認されたHTML構造と3テーマのCSSを保持しながら、Vanilla JavaScript (ES Modules) で主要な操作をモック実装してください。frontend-designはテーマの見た目に変更が必要になったときにだけ使用します。

【必要な機能】
1. 作品選択→メインワークスペース
2. フォルダ展開・カテゴリ切替・タブ操作・左右分割
3. Markdownのテキスト編集と安全なプレビューの切替
4. Ctrl+Sによるモック保存、Ctrl+Z、未保存状態・警告
5. 作品内検索、現在資料の検索、簡易絞り込み、結果プレビュー、ヒット強調
6. 取り込みウィザード（コピー／元ファイル直接編集の選択と階層保持／カテゴリ振り分けをシミュレーション）
7. Quick Recallの起動、検索、概要、簡易メモ、閉じる・最小化相当の操作
8. ゴミ箱・アーカイブ・復元のモック
9. 3テーマの切替

【重要】
- 検索における漢字の読み・別名・ルビの高度な解決は、既知のモックデータと明示的な照合だけに限定。完全な日本語検索と主張しない。
- Markdownプレビューへ生HTMLを無検証で挿入しない。scriptやイベント属性の実行を防ぐ。
- ブラウザのwindow.openは常に最前面を保証しない。ポップアップが阻止された場合は画面内シミュレーションへ切り替える。
- ファイルの元データ、実ローカルファイル、DBを書き換えない。
- イベントと状態管理をHTML/CSSから分離し、3テーマ共通のJSのみ作成する。
- 必要なUI UX Pro Maxの領域別知識は実際のsearch.pyで確認し、結果を記録する。
- frontend-designはUIの見た目の最終検査が必要な場合だけ呼ぶ。

【受け入れテスト】
- 全3テーマに同じテストを実施する。
- 保存/未保存、検索0件、取り込みキャンセル、削除/復元が正しく表示される。
- キーボードフォーカスが見える。
- 同じ資料を別ビューで開いてもモック状態が破壊されない。
- 実装済みと未実装の境界がREADMEで明記される。

READMEにローカルHTTPサーバーによる起動手順、チェック結果、既知の制限をまとめる。
```

## 8. UI UX Pro Max実検索の参考（PowerShell）

**先に実インストール先を確認し、スクリプトが存在する場合のみ実行**。以下は `.agents/skills/ui-ux-pro-max/` に入った場合の例。

```powershell
$search = Resolve-Path '.\.agents\skills\ui-ux-pro-max\scripts\search.py'
py -3 $search 'developer tool IDE knowledge editor' --design-system -f markdown -p 'Novel Lore Manager'
py -3 $search 'keyboard focus navigation' --domain ux
py -3 $search 'error summary validation' --domain ux
py -3 $search 'icon button accessible label' --domain icons
py -3 $search 'readable japanese typography' --domain typography
```

結果が空・的外れなら一度だけ検索語を調整し、不明なら不明と報告する。デザインシステムの`--persist`は保存先と既存ファイルを確認してから行い、`--force`は無断使用しない。

## 9. 実装後の手動起動

```powershell
cd .\mockups\novel-lore-manager
py -3 -m http.server 5500 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:5500/` を開く。ターミナルでCtrl+Cを押すと停止する。これはブラウザプロトタイプであり、Windowsネイティブ配布アプリではない。

## 10. 公式参照

- frontend-design: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- UI UX Pro Max SKILL.md: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md

**注意**：各Skillのインストール済み版を最優先で確認する。オンラインのmainブランチの説明とインストール済みのバージョンが一致しない場合、Codexへその差を報告させる。
