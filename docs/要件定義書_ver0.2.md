# Novel Lore Manager 要件定義書 v1.0

作成時点：2026年9月  
対象：Windows向け小説設定リファレンス・マネージャー  
開発形態：個人開発 / 2028年新卒ポートフォリオ  

---

# 1. 文書の目的

本書は、企画書・要求分析書・画面一覧書、および本プロジェクト内で決定した事項を基に、
Novel Lore Manager のシステム要件を定義する。

本書では以下を明確化する。

- システムの目的
- 対象ユーザー
- システム範囲
- MVP / 60%版 / 80%版 / 完成版の対象範囲
- 機能要件
- 非機能要件
- AI利用境界
- データ管理要件
- Import要件
- 検索要件
- Quick Recall要件
- 画面要件
- セキュリティ要件
- 認証要件
- 技術的制約
- 受入条件
- 今後の基本設計で確定する事項

---

# 2. システム概要

## 2.1 システム名

**Novel Lore Manager**

## 2.2 コンセプト

> **書くためのアプリではない。  
> 書く手を止めないための設定管理アプリ。**

本システムは本文執筆エディタではなく、
小説制作時に必要となる設定情報を保存・整理・検索・関連付け・確認するための
Windows向けデスクトップアプリケーションである。

主な管理対象は以下とする。

- キャラクター
- 国家
- 組織
- 世界観
- 種族
- 場所
- 魔法
- 能力
- 武器
- アイテム
- 用語
- ルビ
- 伏線
- 時系列
- 地図
- 人物関係
- 画像
- その他のユーザー定義設定

---

# 3. システム目的

> **小説執筆者が、過去に自分で決めた設定を探すために本文執筆を中断する時間を減らす。**

中心価値は「Creation」ではなく「Recall」とする。

- 既に作成した設定を探す
- 必要な情報を思い出す
- 設定同士の関係を確認する
- 古い設定を再発見する

ことへ重点を置く。

---

# 4. 対象ユーザー

## 4.1 Primary User A：AIを使用しない作家

- 自分でキャラクター設定を作る
- 自分で世界観を作る
- 自分でプロットを作る
- 本文も自分で執筆する
- 生成AIを創作工程に利用しない

必要要件：

- AIなしで主要機能を利用可能
- 高速検索
- World Wiki
- tree表示
- ルビ辞書
- Relation
- Quick Recall
- Timeline
- World Map
- 伏線管理

## 4.2 Primary User B：AI補助を利用する作家

- AIで設定を整理する
- AIで資料整理を行う
- AIで調査補助を行う
- AIで作成したMarkdown/TXTを管理する

必要要件：

- 通常検索とAI検索を区別できる
- AI使用中であることを認識できる
- Local RAG
- Semantic Search
- AI矛盾候補
- Local AI OFF / ON

## 4.3 Primary User C：長編・世界観重視型作家

対象ジャンル例：

- 異世界ファンタジー
- VRMMO
- SF
- 歴史
- 群像劇
- 長期シリーズ

想定データ量：

- 100設定
- 500設定
- 1,000設定以上

---

# 5. 対象外

MVPでは以下を対象外とする。

- 本文執筆
- 本文自動生成
- 台詞自動生成
- 小説投稿
- SNS投稿
- スマートフォン版
- タブレット版
- チーム共同編集
- クラウド共同制作
- Googleログイン
- Cloud Sync
- Local RAG
- Semantic Search
- MCP Server
- AI矛盾チェック

---

# 6. ユーザー要求

| ID | ユーザー要求 |
|---|---|
| UR-01 | 執筆中に既存設定を高速に検索できること |
| UR-02 | 保存場所を覚えていなくても設定を発見できること |
| UR-03 | 本文執筆画面から大きく離れずに設定確認できること |
| UR-04 | 設定を分類・階層化して把握できること |
| UR-05 | 既存Markdown/TXT資産を利用できること |
| UR-06 | 設定編集内容を失いにくいこと |
| UR-07 | 生成AIを使用せず主要機能を利用できること |
| UR-08 | AIを使用する機能と使用しない機能を明確に識別できること |

---

# 7. 開発フェーズ定義

## 7.1 MVP

MVPの目的：

> **「設定参照専用アプリ」にユーザー価値があるかを検証する。**

対象機能：

1. Project Management
2. World Wiki
3. Explorer/tree
4. Markdown/TXT Import
5. Japanese Full Text Search
6. Quick Recall
7. Ruby Dictionary
8. Relation
9. Auto Save
10. Alias
11. Standard Mode

## 7.2 60%完成版

- Voice Recall
- Character Shelf
- World Relation Graph
- Timeline
- Foreshadowing Tracker
- World Map
- Image Gallery
- Rule Contradiction Checker
- File Watch
- Tag
- Backlink
- Favorite
- Recent
- Backup
- Export
- Custom Category

## 7.3 80%版

- Embedding
- Semantic Search
- Local RAG
- Natural Language Search

## 7.4 完成版

- AI Contradiction Candidate
- Character DNA
- Plot Reference Board
- MCP Server
- External Integration
- Version History
- Advanced Graph
- Advanced Map
- Pencil Sound
- Cloud機能（必要性が確認できた場合）

---

# 8. 機能要件

## 8.1 Project Management

### FR-001 作品作成
ユーザーは新規作品を作成できること。

最低必須項目：
- 作品名

任意項目候補：
- Genre
- Cover Image
- Description
- Template

### FR-002 作品一覧
ユーザーは登録済み作品一覧をHome画面から確認できること。

### FR-003 作品選択
ユーザーは作品を選択し、対象Workspaceを開けること。

### FR-004 作品削除
ユーザーは作品を削除できること。削除操作時には確認を表示すること。

---

# 9. World Wiki要件

### FR-010 Entity登録
ユーザーは小説設定をEntityとして登録できること。

標準カテゴリ：
- Character
- Country
- Organization
- Race
- Location
- Item
- Weapon
- Skill
- Magic
- Religion
- Creature
- Event
- Concept
- Other

### FR-011 Entity閲覧
登録済みEntityを閲覧できること。

### FR-012 Entity編集
登録済みEntityを編集できること。

### FR-013 Entity削除
Entityを削除できること。

### FR-014 カテゴリ構造
Entityをカテゴリ別に分類できること。MVPでは標準カテゴリを使用し、60%版以降でCustom Categoryを追加する。

---

# 10. Explorer / tree要件

### FR-020 tree表示
設定をLinux `tree` / VS Code Explorerに近い階層表示で確認できること。

### FR-021 展開・折り畳み
カテゴリ・フォルダを展開、折り畳みできること。

### FR-022 Entity選択
treeからEntityを選択すると設定詳細を表示できること。

### FR-023 現在位置表示
ユーザーが現在どのカテゴリ・設定を見ているか把握できること。

---

# 11. 設定登録・編集要件

### FR-030 設定直接入力
ユーザーはアプリ上から設定を直接入力できること。

### FR-031 共通項目
最低限以下を管理可能とする。

- Name
- Ruby
- Alias
- Description
- Notes

### FR-032 Entity固有項目
Entity Typeごとに追加項目を表示できる構成とする。

### FR-033 Auto Save
入力・編集内容はAuto Saveされること。

### FR-034 Save Status
以下の状態をユーザーが把握できること。

- Saving
- Saved
- Save Error

### FR-035 データ消失防止
異常終了時のデータ損失を最小化すること。

---

# 12. Import要件

### FR-040 Markdown Import
指定フォーマットの`.md`を読み込めること。

### FR-041 TXT Import
指定フォーマットの`.txt`を読み込めること。

### FR-042 Folder Import
特定Directoryを選択し、その配下の対応ファイルを検出できること。

### FR-043 Import Preview
Import前またはImport後に検出ファイル・結果を確認できること。

### FR-044 Import Error
フォーマット不正ファイルについてエラー・警告を表示すること。

### FR-045 原本保護
Import失敗時を含め、外部Markdown/TXT原本を不用意に上書きしないこと。

---

# 13. Markdownフォーマット要件

第一候補としてYAML Front Matter + Markdown本文形式を採用する。

```markdown
---
type: character
name: アリシア
ruby: ありしあ
age: 19
race: human
tags:
  - knight
  - kingdom
---

# 概要
第一王国騎士団所属。

# 能力
氷魔法。

# 武器
銀月剣。

# 備考
主人公の幼馴染。
```

詳細Schemaは基本設計で確定する。

---

# 14. TXTフォーマット要件

```text
[TYPE]
character

[NAME]
アリシア

[RUBY]
ありしあ

[AGE]
19

[WEAPON]
銀月剣

[NOTE]
主人公の幼馴染。
```

詳細Formatは基本設計で確定する。

---

# 15. 検索要件

### FR-050 Exact Search
完全一致検索ができること。

### FR-051 Partial Search
部分一致検索ができること。

### FR-052 Alias Search
Aliasから対象Entityを検索できること。

### FR-053 Ruby Search
表記からRuby、Rubyから表記の双方向検索ができること。

### FR-054 Full Text Search
設定本文・Notes等を横断検索できること。

### FR-055 Search Filter
候補：
- Entity Type
- Tag
- Favorite
- Updated Date

### FR-056 AI非依存
MVP検索はLocal LLMを経由しないこと。

---

# 16. Quick Recall要件

### FR-060 Global Shortcut
他アプリを使用中でもGlobal ShortcutからQuick Recallを起動できること。

初期候補：`Ctrl + Shift + Space`

### FR-061 Separate Window
Quick RecallはMain Windowとは別の小型Windowとして表示できること。

### FR-062 Always on Top
Quick Recallは他の執筆画面上に表示できること。

### FR-063 Keyboard First
マウスなしで主要操作が完了できること。

- ↑ / ↓：候補移動
- Enter：決定
- Esc：閉じる

### FR-064 Minimal Display
検索結果には必要最低限の情報を優先して表示すること。

### FR-065 Main Window非前面化
Quick Recall利用時にMain Windowを不用意に前面化しないこと。

### FR-066 詳細表示
必要に応じて設定詳細画面へ移動できること。

### FR-067 LLM非依存
Standard ModeのQuick RecallはLocal LLMを経由しないこと。

---

# 17. Ruby Dictionary要件

### FR-070 Ruby登録
固有名詞とRubyを登録できること。

### FR-071 双方向検索
`終焉魔導 → ラグナロク`  
`ラグナロク → 終焉魔導`

### FR-072 Entity紐付け
Ruby情報をEntityへ紐付けできること。

---

# 18. Relation要件

### FR-080 Relation登録
`Source -> Relation Type -> Target` 形式で登録できること。

### FR-081 Relation編集
Relationを編集できること。

### FR-082 Relation削除
Relationを削除できること。

### FR-083 Entity横断
CharacterだけでなくCountry / Organization / Location / Item等を接続できること。

### FR-084 Graph表示
MVPではRelation登録のみとし、60%版でWorld Relation Graphとして視覚化する。

---

# 19. 60%版機能要件

## FR-090 Character Shelf
画像カード形式でCharacter一覧を表示できること。

## FR-100 Timeline
世界史・物語Eventを時系列で管理できること。

## FR-110 Foreshadowing Tracker
伏線の提示・回収状況を管理できること。

## FR-120 World Map
自作Map画像を登録し、Zoom / Pan / Pin / Location Linkができること。

## FR-125 Image Gallery
Character / Map / Weapon / Country / Flag / Magic / Creature / Other等の画像を管理できること。

## FR-130 Rule-based Contradiction Checker
AIなしで年齢、生年、死亡後登場、組織設立前所属等の確認候補を検出できること。

## FR-140 Voice Recall
`Speech Recognition -> Text -> Search -> Popup` で検索できること。LLMを必須にしない。

## FR-150 Backup / Export
Backup / Restore / Exportを提供すること。

---

# 20. Local AI要件

80%版以降。

### FR-160 Local AI OFF / ON
ユーザーがLocal AIを明示的に有効化・無効化できること。

### FR-161 AI状態表示
Local AIがONかOFFか明示すること。

### FR-162 Semantic Search
曖昧な自然言語表現から関連設定を検索できること。

### FR-163 Local RAG
既存設定をRetrieverで取得し、Local LLMへ渡せること。

### FR-164 RAG目的
主目的は新規創作ではなく、既存設定の検索・要約・参照とする。

### FR-165 AI機能分離
通常検索とLocal AI検索を別UXとして提供すること。

---

# 21. AI矛盾候補要件

### FR-170 意味矛盾候補
Local LLM等を利用し、意味上の設定矛盾候補を提示できること。

### FR-171 断定禁止
AIは「矛盾」と断定せず、「確認候補」として表示すること。

### FR-172 Action
- Intentional
- Edit A
- Edit B
- Ignore

---

# 22. Character DNA要件

完成版対象。AIによるCharacter自動生成画面とはしない。

## Core
- Value
- Belief
- Desire
- Fear
- Weakness
- Secret
- Taboo

## Behavior
- Normal
- Anger
- Tension
- Battle

## Speech
- First Person
- Second Person
- Ending
- Characteristic Words
- Honorific Style

---

# 23. Plot Reference Board要件

本格的なPlot Editorにはしない。

- ChapterからCharacterを見る
- ChapterからLocationを見る
- ChapterからEventを見る
- ChapterからForeshadowingを見る

といった設定参照機能とする。

---

# 24. MCP要件

完成版候補。Advanced Settingsへ配置する。

Tool候補：
- `search_lore`
- `get_character`
- `get_relation`
- `get_location`
- `get_timeline`

採否・Schema詳細は基本設計以降で判断する。

---

# 25. AI利用境界要件

### AR-01 AI区分自動判定禁止
特定投稿サイト上のAI利用区分を本アプリが自動判定しない。

### AR-02 AI機能識別
生成AIを利用する機能はユーザーが識別できること。

### AR-03 AI完全OFF
生成AIを完全に無効化した状態でも主要機能を利用できること。

### AR-04 Import由来判定禁止
外部ImportファイルがAI生成物かどうかを勝手に推定しない。

### AR-05 規約適合保証禁止
「この機能を使用すればAI不使用扱いになる」等の保証表示を行わない。

### AR-06 利用実態優先
投稿サイト側のAI区分については、ユーザー自身の利用方法と最新規約を確認するよう案内する。

---

# 26. 小説家になろう向け考慮事項

2026年9月時点の公式ガイドラインでは、作品のAI利用状況設定が必須。

区分：
- AI直接使用
- AI間接利用
- AI補助的利用
- AI不使用

AI不使用は構想・プロット・執筆・校正の全工程でAIを使用していない場合と定義されている。

本アプリはこの区分を自動判定しない。

---

# 27. カクヨム向け考慮事項

2026年5月27日更新ガイドラインでは以下のタグ付けが推奨されている。

- AI本文利用
- AI本文一部利用
- AI補助利用

生成AIのアイデア・資料をもとに作者本人が本文を書く場合や生成AIによる校正等もAI補助利用の例となる。
一方、検索サービス等の日常的なAI補助やドキュメントソフトの自動校正は該当しない旨が示されている。

本アプリ側では利用区分を断定しない。

---

# 28. 非機能要件

## 28.1 性能

| ID | 対象 | 初期目標 |
|---|---|---:|
| NFR-PERF-01 | Quick Recall Window表示 | 500ms以内 |
| NFR-PERF-02 | 通常検索 | 500ms以内 |
| NFR-PERF-03 | Wiki設定表示 | 500ms以内 |
| NFR-PERF-04 | 約1,000設定の検索 | 1秒以内 |
| NFR-PERF-05 | Character Shelf初期表示 | 1秒以内 |

## 28.2 UX

- NFR-UX-01：既知設定は5秒以内に確認できることを目標
- NFR-UX-02：Quick Recallは3アクション程度を目標
- NFR-UX-03：Keyboard First
- NFR-UX-04：Quick Recallは執筆画面を大きく隠さない
- NFR-UX-05：Homeの見栄えよりQuick Recall / Main / Searchを優先

## 28.3 信頼性

- NFR-REL-01：Auto Saveで入力消失を減らす
- NFR-REL-02：SaveでUIを長時間Blockingしない
- NFR-REL-03：外部Import原本を不用意に変更しない
- NFR-REL-04：60%版でBackup / Restore
- NFR-REL-05：異常終了時のデータ損失を最小化

## 28.4 Local-first

- NFR-LOCAL-01：Standard Mode主要機能は原則Offlineで利用可能
- NFR-LOCAL-02：作品設定を外部AI APIへ自動送信しない
- NFR-LOCAL-03：Local AIは原則ローカル推論

## 28.5 Privacy

- NFR-PRIV-01：明示的同意なく作品設定を外部送信しない
- NFR-PRIV-02：外部AI由来かを自動推定しない
- NFR-PRIV-03：将来Cloud機能時は送信対象を確認可能にする

---

# 29. セキュリティ・認証要件

## MVP
Local-firstを優先し、ユーザーAccountは必須としない。Google LoginはMVP対象外。

## 将来のGoogle OAuth
Cloud Sync / Cloud Backup / Multi-PC / Subscription等を導入した場合に検討。

Google Passwordは取得・保存しない。

DB保存候補：
- internal_user_id
- google_sub
- email
- display_name
- created_at
- updated_at

## 独自Password認証
追加する場合のみArgon2id等を候補とする。

## Token保存
OAuth Refresh Token等は単純平文保存を避ける。

候補：
- Windows Credential Manager
- Windows DPAPI
- Tauri Stronghold

---

# 30. データベース要件

DatabaseはPostgreSQLを前提とする。

主要Entity候補：
- project
- entity
- character
- relation
- document
- tag
- ruby
- timeline
- foreshadowing
- location
- asset

詳細Table構成はER図・基本設計で確定する。

---

# 31. 日本語全文検索要件

候補構成：

- Exact Search：PostgreSQL
- Alias Search：PostgreSQL
- Japanese Full Text Search：PGroonga候補
- Semantic Search：pgvector候補

PGroonga / pgvectorの正式採否は技術検証後に決定する。

---

# 32. Vector Search要件

80%版以降、pgvectorを第一候補とする。

目的：
- Semantic Search
- RAG Retriever
- Hybrid Search

Index候補：
- HNSW
- IVFFlat

---

# 33. 技術スタック候補

| Layer | 第一候補 |
|---|---|
| Target OS | Windows |
| Desktop | Tauri 2 |
| Frontend | React |
| Frontend Language | TypeScript |
| Build | Vite |
| CSS | Tailwind CSS候補 |
| Backend | FastAPI |
| Backend Language | Python |
| Database | PostgreSQL |
| Japanese Search | PGroonga候補 |
| Vector Search | pgvector候補 |
| Local LLM Runtime | llama.cpp候補 |
| Local Model | 3B〜4B Q4程度を中心に検討 |
| Version Control | Git / GitHub |
| Development DB | Docker Compose候補 |

---

# 34. Desktop要件

- NFR-PLATFORM-01：MVP対象OSはWindows x64
- NFR-PLATFORM-02：スマートフォン・タブレットは初期対象外
- NFR-PLATFORM-03：Global Shortcutを利用できるDesktop Frameworkを採用する

---

# 35. 開発基準PC

- CPU：13th Gen Intel Core i7-13650HX
- RAM：16GB
- GPU：NVIDIA GeForce RTX 3050 6GB Laptop GPU
- OS：64-bit Windows / x64

Local LLMはこの環境で実用的に動作できる規模を優先する。

---

# 36. Local LLM要件

- NFR-AI-01：軽量Modelを採用
- NFR-AI-02：3B〜4B前後の量子化Modelを中心に比較
- NFR-AI-03：要件定義段階で特定Modelへ固定しない
- NFR-AI-04：GGUF / llama.cpp等のローカル実行方式を候補とする

---

# 37. UI要件

デザイン思想：

> **作家の書斎 + デジタルアーカイブ**

Home：Shelf型  
Main：実用性重視  
Quick Recall：Minimal Popup

Main候補：
- Left：Explorer
- Center：Setting Detail
- Right：Relation / Metadata

---

# 38. 画面要件

## MVP

| ID | 画面 |
|---|---|
| SCR-001 | 起動画面 |
| SCR-002 | Home / 作品一覧 |
| SCR-003 | 新規作品作成 |
| SCR-004 | メイン設定管理 |
| SCR-005 | 設定新規作成 |
| SCR-006 | 設定詳細 |
| SCR-007 | 設定編集 |
| SCR-008 | 全文検索 |
| SCR-009 | Quick Recall |
| SCR-010 | Ruby Dictionary |
| SCR-011 | Relation管理 |
| SCR-012 | Import |
| SCR-013 | Import確認 |
| SCR-014 | Settings / Preferences |

## 60%版

| ID | 画面 |
|---|---|
| SCR-015 | Character Shelf |
| SCR-016 | World Relation Graph |
| SCR-017 | Timeline |
| SCR-018 | Foreshadowing Tracker |
| SCR-019 | World Map |
| SCR-020 | Image Gallery |
| SCR-021 | Rule Contradiction Checker |
| SCR-022 | Backup / Export |
| SCR-023 | Voice Recall |

## 完成版

| ID | 画面 |
|---|---|
| SCR-024 | Character DNA |
| SCR-025 | Semantic Search |
| SCR-026 | Local RAG |
| SCR-027 | AI矛盾候補 |
| SCR-028 | Plot Reference Board |
| SCR-029 | Local AI Settings |
| SCR-030 | MCP / External Integration |
| SCR-031 | Account（条件付き） |

---

# 39. Window構成

## Main Window
- Home
- Project
- Search
- Timeline
- Map
- Graph
- Gallery

## Secondary Window
- Quick Recall
- Voice Recall

## Modal / Drawer
- New Setting
- Relation
- Import
- Backup
- Settings

論理画面数をそのまま物理Window数にはしない。

---

# 40. UI優先順位

1. Quick Recall
2. Main Setting Manager
3. Search
4. Setting Detail
5. Home / Shelf

MVPワイヤーフレーム作成優先：

1. Quick Recall
2. Main
3. Setting Detail
4. Search
5. Home
6. Import

---

# 41. Pencil Sound要件

完成版のDelighter / Immersion機能。MVP対象外。

設定編集画面のみ。

候補：
- OFF
- Subtle
- Normal

毎キーではなく、一定入力量ごとに短いSEを再生する。

---

# 42. 受入条件

| ID | 受入条件 |
|---|---|
| AC-001 | 新規作品を作成・再表示できる |
| AC-002 | Entityを登録し再起動後も閲覧できる |
| AC-003 | treeからEntity選択→詳細表示できる |
| AC-004 | 指定FormatのMarkdownをImportして検索対象にできる |
| AC-005 | 指定FormatのTXTをImportして検索対象にできる |
| AC-006 | 約500設定で目的設定を全文検索から発見できる |
| AC-007 | 他アプリ中にGlobal Shortcut→Quick Recall→検索→Esc終了できる |
| AC-008 | 表記→Ruby、Ruby→表記を検索できる |
| AC-009 | Source / Relation / Targetを登録・確認できる |
| AC-010 | 明示SaveなしでもAuto Saveされる |
| AC-011 | Local LLMなしでMVP主要機能を利用できる |
| AC-012 | Import Error時も元Markdown/TXTが破損しない |

---

# 43. MVP成功基準

> **大量の設定を持つ作家にとって、本文から大きく離れずに設定を数秒で確認できることに価値がある。**

検証例：

```text
設定500件
↓
Ctrl + Shift + Space
↓
検索語入力
↓
結果表示
↓
設定確認
```

目標：**5秒以内**

---

# 44. 要件トレーサビリティ

| User Requirement | 主な機能要件 |
|---|---|
| UR-01 高速検索 | FR-050〜056, FR-060〜067 |
| UR-02 保存場所を忘れても検索 | FR-020〜023, FR-054 |
| UR-03 執筆画面から離れない | FR-060〜067 |
| UR-04 分類・階層化 | FR-010〜014, FR-020〜023 |
| UR-05 Markdown/TXT活用 | FR-040〜045 |
| UR-06 データ消失防止 | FR-033〜035, NFR-REL-* |
| UR-07 AIなし利用 | AR-03, FR-056, FR-067 |
| UR-08 AI機能識別 | AR-02, FR-160〜165 |

---

# 45. MVP対象外要件

- Voice Recall
- Relation Graph
- Character Shelf
- Timeline
- Foreshadowing Tracker
- World Map
- Image Gallery
- Rule Contradiction Checker
- Backup / Restore
- Semantic Search
- Local RAG
- AI矛盾候補
- Character DNA
- Plot Reference
- MCP
- Google Login
- Cloud Sync
- Pencil Sound

---

# 46. 基本設計で確定する事項

- Desktop Framework最終決定
- React UI Library
- ORM
- PostgreSQL Table詳細
- ER図
- API Endpoint
- PGroonga Schema
- pgvector dimension
- Embedding Model
- Local LLM Model
- Chunk Size
- Retriever方式
- Reranking方式
- Speech Recognition Engine
- Tauri Sidecar方式
- OAuth Token保存方式
- File Watch方式
- Backup File Format詳細

---

# 47. 技術選択の基本原則

```text
構造化情報
→ PostgreSQL / SQL

日本語本文検索
→ PGroonga候補

意味検索
→ pgvector候補

複数資料横断検索
→ RAG

回答生成
→ Local LLM
```

通常検索へLocal LLMを挟まない。

---

# 48. ポートフォリオとしての要件

以下を説明できる状態を目指す。

- なぜDesktopアプリなのか
- なぜLocal-firstなのか
- なぜ通常検索とRAGを分離したのか
- なぜPostgreSQLなのか
- なぜ日本語全文検索を別途考慮したのか
- なぜMVPからAIを外したのか
- なぜQuick Recallを最優先したのか
- なぜGoogle LoginをMVPから外したのか
- なぜAI OFF Modeが必要なのか

> **課題 → 要求 → 技術選定**

の流れを説明できることを重視する。

---

# 49. 参照資料

本要件定義書は以下を基に作成した。

- `企画書.docx`
- `要求分析書.docx`
- `画面一覧書.docx`
- 本プロジェクトのチャット内で確定した内容

外部公式情報：

- 小説家になろう「AI利用状況に関して」
  - https://syosetu.com/site/ai/
- カクヨム「カクヨムの小説投稿ガイドラインを一部変更しました」
  - https://kakuyomu.jp/info/entry/gen_ai_guideline
- Tauri 2 Global Shortcut
  - https://v2.tauri.app/plugin/global-shortcut/
- pgvector
  - https://github.com/pgvector/pgvector

---

# 50. 結論

Novel Lore Managerは、

> **PCで小説を書く人のための、Local-First小説設定リファレンス・マネージャー**

として要件を定義する。

MVPではAI機能を中心にせず、

- Project
- World Wiki
- Explorer
- Import
- Search
- Quick Recall
- Ruby
- Relation
- Auto Save
- Alias
- Standard Mode

に集中する。

最も重要な評価対象は、

> **「設定を探す時間を本当に短縮できるか」**

である。

その価値をMVPで確認した後、
60%版で日常利用機能、
80%版でSemantic Search / Local RAG、
完成版でAI矛盾候補・Character DNA・MCP等へ拡張する。
