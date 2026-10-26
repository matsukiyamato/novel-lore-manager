# Novel Lore Manager 人間向け開発・Git運用ルール

> **対象:** Novel Lore Manager を人間が開発・管理するときのルール\
> **用途:** ファイル作成、ブランチ作成、コミット、Pull
> Request、マージ、コンフリクト解消\
> **対象外:** Codex / AI エージェント向け指示（別途 `AGENTS.md`
> 等で管理する）\
> **適用範囲:** MVP ～ 完成度60%版、およびその後の開発

------------------------------------------------------------------------

## 1. この文書の目的

Novel Lore Manager
は、Windows向けの小説設定リファレンス・マネージャーとして個人開発する。

本プロジェクトでは、開発者本人が後から履歴を追えること、設計変更の理由を説明できること、誤った変更を安全に戻せることを重視する。

そのため、直接 `main`
に変更を積み上げるのではなく、原則として以下の流れで開発する。

``` text
Issue / 作業内容を決める
        ↓
作業用Branchを作る
        ↓
実装・資料変更
        ↓
小さな単位でCommit
        ↓
Push
        ↓
Pull Request
        ↓
内容確認
        ↓
必要なら修正
        ↓
mainへMerge
        ↓
作業Branchを削除
```

個人開発であっても、ポートフォリオとして「何を、なぜ変更したか」をGitHub上で追跡できる状態を維持する。

------------------------------------------------------------------------

# 2. 基本原則

## 2.1 `main` は常に壊さない

`main`
は、その時点で動作確認済み、またはレビュー済みの成果物を置くBranchとする。

原則として `main` へ直接Commitしない。

``` text
NG
main
 └─ 直接編集 → commit → push

OK
main
 └─ feature/xxx
       ↓
     commit
       ↓
     Pull Request
       ↓
     review
       ↓
     merge
```

READMEの誤字修正など非常に小さな変更であっても、開発運用に慣れるまではPull
Requestを利用する。

------------------------------------------------------------------------

## 2.2 1つのBranchには1つの目的

複数の無関係な変更を1つのBranchへ混ぜない。

### OK

``` text
feature/quick-recall-window
```

変更内容：

-   Quick Recall Window追加
-   Quick Recall用ショートカット追加
-   関連テスト追加

### NG

``` text
feature/update-app
```

変更内容：

-   Quick Recall追加
-   DB修正
-   README修正
-   Character Shelf追加
-   CSS全面変更

目的が異なる場合はBranchを分ける。

------------------------------------------------------------------------

## 2.3 1つのCommitには1つの意味を持たせる

Commitは「後からそのCommitだけを見ても、何を変更したか説明できる単位」にする。

大きすぎるCommitを避ける。

### OK

``` text
feat: Quick Recallウィンドウを追加
feat: グローバルショートカットを追加
test: Quick Recall検索テストを追加
docs: Quick Recall設計を更新
```

### NG

``` text
update
修正
いろいろ変更
完成
test
aaa
```

------------------------------------------------------------------------

# 3. Repository内の基本構成

現時点では以下を基本形とする。

``` text
novel-lore-manager/
│
├─ README.md
├─ AGENTS.md
├─ DEVELOPMENT_RULES.md
├─ LICENSE
├─ .gitignore
│
├─ docs/
│  ├─ planning/
│  ├─ requirements/
│  ├─ architecture/
│  ├─ ui-ux/
│  ├─ database/
│  ├─ api/
│  ├─ testing/
│  └─ adr/
│
├─ design/
│
├─ frontend/
│
├─ backend/
│
├─ src-tauri/
│
├─ scripts/
│
└─ tests/
```

実際の技術検証・基本設計によって構成が変わる場合は、先に設計資料またはIssueで変更理由を残す。

------------------------------------------------------------------------

# 4. ファイル命名規則

## 4.1 基本方針

ソースコード・設定ファイル・ディレクトリ名では、原則として以下を使用する。

-   半角英数字
-   ASCII記号
-   英語
-   空白を使用しない
-   全角スペースを使用しない
-   意味のない略語を避ける

日本語はREADMEや設計書本文では使用してよい。

------------------------------------------------------------------------

## 4.2 ディレクトリ名

原則として **lowercase kebab-case** を使用する。

``` text
quick-recall/
world-map/
relation-graph/
import-parser/
```

既存Frameworkや言語の標準慣習がある場合は、その慣習を優先してよい。

------------------------------------------------------------------------

## 4.3 Markdown・ドキュメント

Repository直下の一般的な管理ファイルは慣例に合わせて大文字を使用できる。

``` text
README.md
AGENTS.md
LICENSE
CHANGELOG.md
DEVELOPMENT_RULES.md
```

`docs/` 配下の独自文書は、原則として英語の **kebab-case** とする。

``` text
basic-design-v0.1.md
requirements-v1.0.md
ui-ux-guidelines-v0.1.md
search-specification-v0.1.md
import-specification-v0.1.md
database-logical-design-v0.1.md
```

文書タイトルそのものは日本語でよい。

例：

``` markdown
# Novel Lore Manager 基本設計書 v0.1
```

### バージョン表記

ファイル名では次を使用する。

``` text
-v0.1
-v0.2
-v1.0
```

次のような命名は禁止する。

``` text
基本設計書_最新版.md
基本設計書_最終版.md
基本設計書_最終版2.md
新しい基本設計書.md
copy_of_basic_design.md
```

「最新版」はGit履歴・Release・文書内Versionで判断する。

------------------------------------------------------------------------

## 4.4 TypeScript / React

React Componentは原則 **PascalCase**。

``` text
QuickRecallWindow.tsx
SettingDetail.tsx
ProjectCard.tsx
RelationDrawer.tsx
```

通常のTypeScript module / utilityは **camelCase** を基本とする。

``` text
searchService.ts
formatRuby.ts
projectApi.ts
```

既存ツール・Frameworkの推奨規則を導入した場合は、プロジェクト全体で統一する。

------------------------------------------------------------------------

## 4.5 Python

PythonはPEP 8に合わせ、module/fileは **snake_case** を基本とする。

``` text
search_service.py
import_parser.py
relation_service.py
quick_recall.py
```

Class：

``` text
SearchService
ImportParser
```

Function / Variable：

``` text
search_entities()
parse_markdown()
project_id
```

------------------------------------------------------------------------

## 4.6 SQL / Migration

Migration toolを決定した後は、そのツールが生成する命名規則を優先する。

手動で名前を付ける場合は変更内容が分かる名前にする。

``` text
create_projects_table
add_alias_to_entities
create_relations_table
```

------------------------------------------------------------------------

## 4.7 画像・UI素材

画像ファイルは用途が分かる名前にする。

``` text
home-empty-state.png
quick-recall-mockup.png
character-placeholder.webp
world-map-sample.png
```

次は禁止する。

``` text
image1.png
aaa.png
スクリーンショット123.png
新しい画像.png
```

ユーザーが登録した画像については、アプリ内部でUUID等へ変換する設計を採用してもよい。これは実装設計で別途決定する。

------------------------------------------------------------------------

# 5. Branch命名規則

## 5.1 基本形式

``` text
<type>/<short-description>
```

すべて小文字の英語を基本とし、単語区切りには `-` を使用する。

------------------------------------------------------------------------

## 5.2 Branch Type

  Type          用途                     例
  ------------- ------------------------ -----------------------------
  `feature/`    新機能                   `feature/quick-recall`
  `fix/`        バグ修正                 `fix/search-result-order`
  `docs/`       文書のみ                 `docs/basic-design-v0.1`
  `refactor/`   挙動を変えない内部改善   `refactor/search-service`
  `test/`       テスト追加・修正         `test/import-parser`
  `chore/`      設定・依存関係・雑務     `chore/update-gitignore`
  `design/`     UI/UX・pen.dev等         `design/home-wireframe`
  `poc/`        技術検証                 `poc/tauri-global-shortcut`
  `hotfix/`     mainの緊急修正           `hotfix/startup-crash`

------------------------------------------------------------------------

## 5.3 Issue番号を使う場合

GitHub Issueを作成した後は、可能ならIssue番号を含める。

``` text
feature/12-quick-recall
fix/27-import-encoding
docs/31-api-design
```

これによりBranchとIssueの対応を追いやすくする。

------------------------------------------------------------------------

## 5.4 禁止するBranch名

``` text
test
work
develop2
new
aaa
my-branch
final
fix
```

何をするBranchなのか名前だけで分からないものは禁止する。

------------------------------------------------------------------------

# 6. Branch作成手順

作業開始前に最新の `main` を取得する。

``` bash
git switch main
git pull origin main
```

その後、作業Branchを作る。

``` bash
git switch -c feature/12-quick-recall
```

作業途中で別の機能を実装したくなった場合、そのまま同じBranchへ追加しない。

現在の作業をCommitまたはstashしてから、適切なBranchへ切り替える。

------------------------------------------------------------------------

# 7. Commitルール

## 7.1 Commit Message形式

Conventional Commitsを参考に、以下の形式を基本とする。

``` text
<type>: <変更内容>
```

例：

``` text
feat: Quick Recallウィンドウを追加
fix: ルビ検索で完全一致しない問題を修正
docs: 基本設計書v0.1を追加
refactor: 検索処理をSearchServiceへ分離
test: Markdown Importのテストを追加
chore: PostgreSQL開発設定を更新
design: Home画面ワイヤーフレームを更新
```

本文は日本語でよい。

------------------------------------------------------------------------

## 7.2 Commit Type

``` text
feat      新機能
fix       バグ修正
docs      文書
refactor  リファクタリング
test      テスト
chore     開発環境・設定等
style     コードの意味を変えない整形
perf      性能改善
build     Build関連
ci        CI関連
```

------------------------------------------------------------------------

## 7.3 Commit前チェック

Commit前に最低限確認する。

``` text
□ 意図しないファイルが含まれていない
□ API Key / Password / Tokenを含んでいない
□ .envをCommitしていない
□ デバッグ用コードを残していない
□ 変更した範囲が起動またはテストできる
□ 無関係な変更を混ぜていない
□ 大容量ファイルを誤って追加していない
```

必ず以下で対象を確認する。

``` bash
git status
git diff
```

Stage後も確認する。

``` bash
git diff --staged
```

------------------------------------------------------------------------

# 8. SecretをGitへ入れない

以下は原則としてCommit禁止。

``` text
.env
API Key
OAuth Client Secret
Password
Access Token
Refresh Token
秘密鍵
個人情報
本番用認証情報
```

`.env.example` には値ではなくキー名だけを書く。

``` env
DATABASE_URL=
GOOGLE_CLIENT_ID=
```

Secretを誤ってPushした場合、ファイルを削除するだけでは不十分な場合がある。

そのSecretは漏えいしたものとして扱い、該当サービス側で無効化・再発行する。

------------------------------------------------------------------------

# 9. Pull Requestルール

個人開発でも、原則として作業Branchから `main` へPull Requestを作る。

## PRタイトル

Commitと同様に内容が分かる名前にする。

``` text
feat: Quick Recallの基本機能を追加
docs: 基本設計書v0.1を追加
fix: 日本語検索結果の並び順を修正
```

------------------------------------------------------------------------

## PR本文

最低限以下を書く。

``` markdown
## 概要

何を変更したか。

## 目的

なぜ変更したか。

## 主な変更

- 変更1
- 変更2
- 変更3

## 確認方法

1. ...
2. ...
3. ...

## テスト

- [ ] 起動確認
- [ ] 関連テスト成功
- [ ] 既存機能への影響確認

## 関連Issue

Closes #12

## スクリーンショット

UI変更がある場合に添付。

## 補足

設計上の判断や残課題があれば記載。
```

------------------------------------------------------------------------

# 10. PRをMergeしてよい条件

以下を満たしてからMergeする。

``` text
□ PRの目的が明確
□ 意図しない変更がない
□ Conflictがない
□ Buildできる
□ 関連テストが通る
□ 主要な手動確認が完了
□ Secretが含まれていない
□ UI変更の場合は表示確認済み
□ DB変更の場合はMigrationを確認済み
□ 必要な設計資料も更新済み
```

実装と設計資料が食い違った状態を放置しない。

------------------------------------------------------------------------

# 11. Merge方式

通常の機能Branchは、原則として **Squash and merge** を第一候補とする。

理由：

-   個人開発で履歴を読みやすくしやすい
-   作業途中の細かいCommitをmainへ大量に残さない
-   1 PR = 1つの変更として追いやすい

ただし、技術検証や履歴自体に意味がある場合はMerge
Commit等を利用してよい。

Merge後は不要なBranchを削除する。

------------------------------------------------------------------------

# 12. コンフリクトが起きた場合

## 12.1 基本原則

**内容を理解せずに「どちらか一方を採用」しない。**

特に以下は注意する。

-   要件定義書
-   基本設計書
-   API設計
-   DB Schema
-   Migration
-   package設定
-   Tauri設定
-   検索ロジック
-   Import処理

コンフリクトは「Gitのエラー」ではなく、

> 同じ箇所に異なる変更が存在し、どちらを残すべきかGitが判断できない状態

として扱う。

------------------------------------------------------------------------

## 12.2 コンフリクト発生時の手順

まず現在の状態を確認する。

``` bash
git status
```

最新の `main` を取り込む場合は、作業内容をCommitしてから行う。

``` bash
git switch main
git pull origin main
git switch feature/12-quick-recall
git merge main
```

Conflictが発生したファイルには、一般的に次のような表示が入る。

``` text
<<<<<<< HEAD
自分のBranch側の内容
=======
main側の内容
>>>>>>> main
```

この記号を単純に削除するのではなく、

1.  自分側の変更を確認
2.  main側の変更を確認
3.  両方必要か判断
4.  正しい最終状態へ手動修正
5.  Conflict markerが残っていないことを確認
6.  Build / Testを実行
7.  Commit

の順で処理する。

``` bash
git add <resolved-file>
git commit
```

------------------------------------------------------------------------

## 12.3 判断できない場合

**推測で解消しない。**

以下を確認する。

``` text
1. GitHub Issue
2. Pull Request
3. 要件定義
4. 基本設計
5. ADR
6. git log
7. git diff
```

それでも判断できない場合は、変更を中断して設計判断を先に行う。

------------------------------------------------------------------------

## 12.4 コンフリクト解消後

必ず再確認する。

``` text
□ Conflict markerが残っていない
□ Build成功
□ Test成功
□ 両方の変更目的が維持されている
□ 設計資料との矛盾がない
□ UIが壊れていない
□ DB Migrationが壊れていない
```

検索例：

``` bash
git grep -n "<<<<<<<"
git grep -n "======="
git grep -n ">>>>>>>"
```

------------------------------------------------------------------------

# 13. コンフリクトを減らすルール

コンフリクトは完全には防げないが、次で減らす。

1.  Branchを長期間放置しない
2.  1 Branch = 1目的
3.  巨大なPRを作らない
4.  同じファイルを無関係な目的で大量編集しない
5.  `main` の更新を定期的に取り込む
6.  Formatterによる無関係な全面変更を混ぜない
7.  ファイル移動と大規模内容変更を可能なら別PRにする
8.  DB Migrationを手動で書き換えすぎない

------------------------------------------------------------------------

# 14. 「とりあえずForce Push」をしない

以下は原則として実行しない。

``` bash
git push --force
```

履歴を書き換える必要がある場合でも、理由を理解している場合に限る。

どうしても必要な場合は、少なくとも通常の `--force` より安全な

``` bash
git push --force-with-lease
```

を検討する。

ただし `main` へのForce Pushは禁止を基本とする。

------------------------------------------------------------------------

# 15. 誤ったCommitをした場合

まだPushしていない場合と、すでにGitHubへPushした場合を区別する。

## Push前

変更内容を確認して修正する。

履歴変更を行う場合は、対象Commitと影響を理解してから行う。

## Push後

共有済み履歴を安易に書き換えない。

基本は修正Commitを追加する。

``` text
fix: Quick Recall設定の誤りを修正
```

公開済みのSecretを含む場合は通常の修正Commitでは不十分なので、Secretを即座に無効化・再発行する。

------------------------------------------------------------------------

# 16. 大きな機能を実装する場合

Quick Recall、検索、Import、Relation等は、一度に巨大PRへしない。

例：

``` text
Issue #20 Quick Recall
│
├─ #21 Window基盤
├─ #22 Global Shortcut
├─ #23 Search UI
├─ #24 Keyboard Navigation
├─ #25 Esc / Focus Return
└─ #26 Tests
```

必要に応じて小さなIssue / PRへ分割する。

------------------------------------------------------------------------

# 17. 設計変更を伴う実装

Novel Lore Managerでは、実装だけ変更して設計資料を放置しない。

例えば、

``` text
Main画面
3Pane固定
    ↓
2Pane + Related Drawer
```

へ変更した場合、

-   なぜ変更したか
-   どの要求に影響するか
-   どの画面に影響するか
-   DB/APIへの影響はあるか

を確認する。

重要な技術・設計判断は `docs/adr/` へADRとして残す。

例：

``` text
docs/adr/
├─ 0001-use-tauri.md
├─ 0002-use-postgresql.md
└─ 0003-quick-recall-window-strategy.md
```

------------------------------------------------------------------------

# 18. ドキュメント更新ルール

設計資料には少なくとも以下を持たせる。

``` text
文書名
Version
更新日
Status
```

Status例：

``` text
Draft
Review
Approved
Deprecated
```

「完成」「最終版」という名前だけで管理しない。

Gitの履歴とVersionを利用する。

------------------------------------------------------------------------

# 19. Issue運用

実装開始前に、原則としてIssueへ作業目的を書く。

Issueには最低限、

``` text
目的
背景
作業内容
完了条件
関連資料
```

を記載する。

例：

``` markdown
# Quick Recall Global Shortcut

## 目的

執筆エディタから離れずQuick Recallを呼び出せるようにする。

## 作業内容

- Windows Global Shortcut登録
- Quick Recall Window表示
- EscによるClose
- 元アプリへのFocus復帰確認

## 完了条件

- [ ] ShortcutでWindowが表示される
- [ ] Keyboardのみで操作できる
- [ ] Escで閉じられる
- [ ] 執筆作業へ戻れる
```

------------------------------------------------------------------------

# 20. UI変更時の追加ルール

UI/UX変更を含むPRでは、可能な限りBefore /
Afterまたはスクリーンショットを残す。

確認対象：

``` text
□ 1440×900基準で確認
□ 1280×720等の狭いWindowでも確認
□ Keyboard操作確認
□ Focus表示確認
□ 長い日本語テキスト確認
□ Empty State確認
□ Error State確認
□ Dark/Light対応範囲を確認
```

Quick Recallについては特に、

``` text
□ Global Shortcut
□ Autofocus
□ ↑ / ↓
□ Enter
□ Esc
□ Always on Top
□ 元の執筆環境への復帰
```

を確認する。

------------------------------------------------------------------------

# 21. DB変更時の追加ルール

PostgreSQL Schemaを変更する場合は、コードだけを変更しない。

確認するもの：

``` text
□ Migration
□ ORM Model
□ API
□ Test
□ ER図
□ DB論理設計
□ 既存データへの影響
□ Rollback可能性
```

本番・利用者データを直接手作業で修正することを前提にしない。

------------------------------------------------------------------------

# 22. Dependency追加ルール

npm / Python / Rust等のDependencyを追加する場合は、

``` text
1. 本当に必要か
2. 標準機能で代替できないか
3. Maintenance状況
4. License
5. Security
6. Bundle Size
7. Windows対応
8. 商用利用可能性
```

を確認する。

Novel Lore
Managerは将来的な販売も視野に入れるため、ライセンス確認を省略しない。

追加理由が重要なDependencyはPR本文またはADRへ記録する。

------------------------------------------------------------------------

# 23. MVPと60%版を混ぜない

MVP Branchで、理由なく60%版以降の機能を追加しない。

### MVP

``` text
Project Management
World Wiki
Explorer
Markdown/TXT Import
Japanese Full Text Search
Quick Recall
Ruby Dictionary
Relation
Auto Save
Alias
Standard Mode
```

### 60%版

``` text
Voice Recall
Character Shelf
World Relation Graph
Timeline
Foreshadowing Tracker
World Map
Image Gallery
Rule Contradiction Checker
File Watch
Tag
Backlink
Favorite
Recent
Backup / Export
Custom Category
```

Local RAG / Semantic Search / Local LLM等はさらに後の段階として扱う。

「ついでに実装できそうだから」という理由でScopeを広げない。

------------------------------------------------------------------------

# 24. AI / Codexとのルール分離

この文書は **人間向けGit・開発運用ルール** である。

Codexに対する、

-   ファイルを変更する前の確認
-   読むべき設計資料
-   使用可能なコマンド
-   自動変更してよい範囲
-   禁止事項
-   テスト実行ルール
-   UI生成ルール
-   MCP利用ルール

などは、このファイルへ混在させない。

Codex用ルールは別途、

``` text
AGENTS.md
```

等で管理する。

役割は次のように分離する。

``` text
DEVELOPMENT_RULES.md
        │
        └─ 人間が守る開発・Git運用

AGENTS.md
        │
        └─ Codex / AI Agentが守る実装ルール
```

------------------------------------------------------------------------

# 25. 作業開始時チェックリスト

``` text
□ Issueまたは作業目的を決めた
□ mainを最新化した
□ 適切なBranchを作成した
□ Branch名から目的が分かる
□ 関連する設計資料を確認した
□ MVP / 60% / 将来機能のScopeを確認した
```

------------------------------------------------------------------------

# 26. 作業終了時チェックリスト

``` text
□ git statusを確認した
□ git diffを確認した
□ Secretを含んでいない
□ 不要ファイルを含んでいない
□ Buildできる
□ Testが通る
□ 必要な手動確認を行った
□ 必要な設計資料を更新した
□ Commit Messageが内容を説明している
□ GitHubへPushした
□ Pull Requestを作成した
□ PR本文を書いた
□ Merge条件を満たした
□ mainへMergeした
□ 不要なBranchを削除した
```

------------------------------------------------------------------------

# 27. 最低限覚えるGitコマンド

``` bash
# 状態確認
git status

# mainへ移動
git switch main

# 最新化
git pull origin main

# Branch作成
git switch -c feature/12-quick-recall

# 差分確認
git diff

# Stage
git add <file>

# Stage済み差分確認
git diff --staged

# Commit
git commit -m "feat: Quick Recallウィンドウを追加"

# Push
git push -u origin feature/12-quick-recall

# 履歴確認
git log --oneline --graph --decorate

# Branch確認
git branch

# mainを作業Branchへ取り込む
git merge main
```

不明なコマンドを意味を理解せず実行しない。

特に、

``` text
reset --hard
clean -fd
push --force
rebase
```

は、影響を理解してから使用する。

------------------------------------------------------------------------

# 28. このプロジェクトでの最終ルール

迷った場合は、以下の優先順位で判断する。

``` text
1. ユーザーデータを失わない
2. Secretを公開しない
3. mainを壊さない
4. 要件・設計との整合性を守る
5. 1 Branch = 1目的
6. 1 PR = 1つの説明可能な変更
7. 変更理由を履歴に残す
8. 動作確認してからMergeする
9. MVPのScopeを守る
10. 分からない状態で危険なGit操作をしない
```

Novel Lore Managerでは、

> **「動いたからMergeする」ではなく、\
> 「なぜ変更したかを説明でき、確認できたからMergeする」**

ことを開発運用の基本とする。

------------------------------------------------------------------------

## Document Information

  Item             Value
  ---------------- -------------------------------
  Document         Human Development & Git Rules
  Project          Novel Lore Manager
  File             `DEVELOPMENT_RULES.md`
  Version          v0.1
  Status           Draft
  Target           Human Developer
  AI/Codex Rules   Not included


