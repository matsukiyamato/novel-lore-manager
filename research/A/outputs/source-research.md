# Scenario A 市場・競合・作家ニーズ／証拠台帳

確認日: 2026-10-25（日本時間）。対象は初期台帳21機能。過去を含む全構想の網羅性は未確認。インタビュー・競合の実操作計測は未実施。以下の要約は出典の限定された範囲のみを支持する。

## 調査方法・検索記録

公開Webを少数の対象別クエリで調査。一般語だけを送信し、ローカル入力の文面・作品データは送信していない。全文転載・ログイン・自動大量収集はしていない。以下は実行した検索語（同日の検索、順序・表記の軽微な正規化あり）。開いたURLは証拠台帳に記す。関連の薄い検索結果は根拠に採用しなかった。

- 市場: `小説 執筆環境 アンケート パソコン スマートフォン 作者 カクヨム`
- 課題: `小説 設定 管理 Obsidian 休筆 忘れる 作者`、`小説 設定管理 Obsidian 自分 忘れる note`
- Nola: `site.nola-novel.com 機能 設定 プロット 世界観`、`site.nola-novel.com 機能 世界観 プロット 料金`、`site.nola-novel.com OR site.note.com/nola_novel 世界観 プロット Nola 機能`、`site.nola-novel.com "料金"`、`site.nola-novel.com "世界観"`
- Obsidian: `site.help.obsidian.md Search Graph view local files`、`site.help.obsidian.md "How Obsidian stores data"`、`site.obsidian.md/pricing "Free"`
- Notion: `site.notion.com help offline mode export your content`
- OneNote: `site.support.microsoft.com OneNote search notebook backup Windows`、`site.support.microsoft.com "Search notes" "OneNote"`
- 秀丸: `site.hide.maruo.co.jp 秀丸 grep アウトライン 価格`、`site.hide.maruo.co.jp/software/hidemaru.html "4,400"`
- VS Code: `site.code.visualstudio.com docs editing codebasics search timeline local history`
- 規約: `site.alphapolis.co.jp AI 利用 投稿 ガイドライン`、`site.alphapolis.co.jp/guidelines AI生成作品`、`site.alphapolis.co.jp "AI生成作品" "ガイドライン"`、`site.alphapolis.co.jp "2025.11.18" "AI"`、`site.kakuyomu.jp 生成AI ガイドライン AI本文 2026`、`site.kakuyomu.jp/contests "12" "AI"`
- 技術: `site.sqlite.org FTS5 trigram backup atomic commit`、`site.genai.owasp.org "Prompt Injection" "2025"`、`site.learn.microsoft.com windows apps package signing msix update`。llama.cpp、OWASP、文化庁等は公式URLを直接開いた。

## 証拠レコード

全レコードの確認日は2026-10-25。公開日と取得日は区別する。「不明」はページ上の公開日を確定できなかったもの。OFFICIALは仕様・方針の一次資料という意味で、効果や需要の独立実証ではない。

| ID | 題名・発信主体・出所 | 公開日／種類 | 支持主張と確認内容 | 範囲・限界・独立性 |
|---|---|---|---|---|
| A-E001 | 製品制約、ユーザー提供 `research/A/inputs/constraints.md` | 不明（SQLite確定日は2026-10-25と記載）／SELF_OBSERVATION | A-C001: Windows・SQLite・非AI経路等の指定 | 仕様制約。需要証拠でない。A-E002/003と同じ提供者 |
| A-E002 | 現行機能候補台帳、ユーザー提供 `research/A/inputs/feature-inventory.md` | 不明／SELF_OBSERVATION | A-C002: F-001〜F-021、初期台帳 | 完全版と確認されていない。独立した市場証拠でない |
| A-E003 | 開発者自己観察、ユーザー提供 `research/A/inputs/developer-observation.md` | 不明／SELF_OBSERVATION | A-C003: 分散、旧版、再開、消失の自己申告 | 1名の要約。原回答未照合。競合仕様を立証しない |
| A-E004 | 第22話へのコメント、蒼井星空ほか、[カクヨム](https://kakuyomu.jp/works/16817330667799284350/episodes/16817330668628691860/comments) | 対象コメント2023-12〜2024-09／FIRST_PERSON | A-C004: 蒼井星空は複数アプリに書いて混乱と報告。別投稿者にはスマホのみの例 | 自発的投稿の選択偏り。執筆の話で設定管理率でない。返信を独立標本に加算しない |
| A-E005 | 執筆環境とな？、加瀬優妃、[カクヨム](https://kakuyomu.jp/works/1177354054921224173/episodes/1177354054984840497) | 本文記載2020-11-22／FIRST_PERSON | A-C005: Excelで時系列×人物を整理、地図は手描きという本人の方法 | 個別手法。時点管理のニーズの手掛かり。専用アプリへの不満・購入意思ではない。A-E004とは別筆者 |
| A-E006 | 集中しやすい執筆・作業環境の作り方、榎本メソッド、[調査記事](https://enomotomethod.jp/column/environment/) | 公開日不明／STUDY | A-C006: 事務所にゆかりのある21名の調査と明記、PC利用を報告 | 便宜的標本。対象3サイト作者全体やWindows率・設定管理PC率には外挿不可。調査票・回収率未確認 |
| A-E007 | How Obsidian stores data、Obsidian、[公式](https://obsidian.md/help/Files+and+folders/How+Obsidian+stores+data) | 不明／OFFICIAL | A-C007: ローカルMarkdown vault、外部変更反映、複数vault | 実操作や競合解決品質は未測定。E008〜011と同じ提供者 |
| A-E008 | Search、Obsidian、[公式](https://obsidian.md/help/Plugins/Search) | 不明／OFFICIAL | A-C008: 標準コアプラグインの検索・絞り込み | 探索でグラフ必須という根拠はない。日本語検索精度は未測定 |
| A-E009 | Graph view、Obsidian、[公式](https://obsidian.md/help/Plugins/Graph+view) | 不明／OFFICIAL | A-C009: ノート間リンクをグラフ表示するコア機能 | 物語内の型付き・時点別関係DBと同一ではない。利用頻度の統計なし |
| A-E010 | File recovery、Obsidian、[公式](https://obsidian.md/help/Plugins/File+recovery) | 不明／OFFICIAL | A-C010: スナップショット復旧、完全バックアップとは区別 | 保持設定に依存。外部編集を含む全損失の復旧保証ではない |
| A-E011 | Pricing、Obsidian、[公式](https://obsidian.md/pricing.html) | 不明／OFFICIAL | A-C011: 基本アプリ無料、Sync等は別の有料サービス | 価格は確認時点。無料でも移行・設定の時間は別 |
| A-E012 | Use pages offline、Notion、[公式](https://www.notion.com/help/use-pages-offline) | 不明／OFFICIAL | A-C012: アプリでオフライン可、個別ダウンロード、DBの初期取得範囲に制限 | クラウドから独立したローカル専用ではない。プラン別自動取得の細部は公式ガイド間に表記差。E013/014と同じ提供者 |
| A-E013 | Export your content、Notion、[公式](https://www.notion.com/help/export-your-content) | 不明／OFFICIAL | A-C013: Markdown/CSV/HTML等でエクスポート、再取込で元環境が即再現されるとは限らない | 各DB構造・リンク・添付の移行忠実度は実測が必要 |
| A-E014 | Search for pages & content、Notion、[公式](https://www.notion.com/help/search) | 不明／OFFICIAL | A-C014: 通常の検索とNotion AIによる追加検索を区別 | AI使用が通常検索の必要条件とは言えない。価格・オフライン検索範囲未計測 |
| A-E015 | Basic editing、Microsoft、[VS Code公式](https://code.visualstudio.com/docs/editing/codebasics) | 不明／OFFICIAL | A-C015: フォルダ横断検索・結果プレビュー・範囲指定 | 拡張導入は横断検索の必須条件でない。E016と同じ提供者 |
| A-E016 | User interface / Local file history、Microsoft、[VS Code公式](https://code.visualstudio.com/docs/editing/getting-started/userinterface) | 公開日不明／OFFICIAL | A-C016: 標準のローカル履歴で比較・復元、設定制限あり | 保存・保持数・サイズ等に依存し完全バックアップではない。Git利用は必要条件でない |
| A-E017 | grepの実行、サイトー企画、[秀丸公式ヘルプ](https://help.maruo.co.jp/hidemaru/html/190_CmdSearch_Grep.html) | 公開日不明、取得時Ver9.59表記／OFFICIAL | A-C017: 複数ファイル検索と結果からのジャンプ | マクロ不要で基本検索可。E018と同じ提供者。操作負担未計測 |
| A-E018 | 価格、サイトー企画、[公式](https://hide.maruo.co.jp/swreg/price.html) | 表の適用日2019-10-01、公開日不明／OFFICIAL | A-C018: 通常版秀丸エディタ1ライセンス税込4,400円 | ストア版・団体割引を混同しない。確認時点の表示 |
| A-E019 | Search notes in OneNote、Microsoft、[公式](https://support.microsoft.com/en-au/onenote/onenote-help-and-learning/search-notes-in-onenote) | 不明／OFFICIAL | A-C019: Windowsデスクトップ版のノート横断検索・範囲指定 | Web版や旧Windows 10アプリと同一視しない。E020と同じ提供者 |
| A-E020 | Restore notes from a backup、Microsoft、[公式](https://support.microsoft.com/en-us/onenote/restore-notes-from-a-backup) | 不明／OFFICIAL | A-C020: 既存バックアップからセクション等を復元 | バックアップ存在が前提。保存先・契約・版差は別途確認必要 |
| A-E021 | Nola 作家専用エディタツール、Nola、[公式](https://nola-novel.com/agent) | 不明／OFFICIAL（取得制限） | A-C021: 検索インデックス上は人物・世界観・プロット・PCスマホ同期を説明 | **本文openはJavaScript有効化要求のみ**。重要仕様として確定しない。料金や現行版の操作・入出力は未確認。トップページも同じ制約 |
| A-E022 | AI利用状況に関して、ヒナプロジェクト、[なろう公式](https://syosetu.com/site/ai/) | 公開日不明／OFFICIAL | A-C022: 区分の設定必須。直接使用・間接利用・補助的利用・不使用を区別 | 本文の扱い・創作工程次第。一般投稿と個別公募を区別。個別作品の判定保証ではない |
| A-E023 | 小説投稿ガイドライン、カクヨム、[公式](https://kakuyomu.jp/legal/guideline) | 公開日不明／OFFICIAL | A-C023: 再取得で本文89〜102行のAI3タグ・推奨・公募要項別確認を確認 | 初回findで取得差があったが後続findで本文確認できた。本文末尾の更新日一覧だけでAI節の改訂日を推測しない。E024と独立証拠として二重計上しない |
| A-E024 | ガイドラインを一部変更しました、カクヨム、[公式告知](https://kakuyomu.jp/info/entry/gen_ai_guideline) | 2026-05-27／OFFICIAL | A-C024: AI本文利用・本文一部利用・補助利用の推奨タグ、50%は目安、補助利用の除外例を確認 | その後の全改訂不存在を保証しない。E023との取得差は監査で残す |
| A-E025 | 投稿ガイドライン、アルファポリス、[公式URL](https://www.alphapolis.co.jp/guidelines#ai-tagging) | 不明／OFFICIAL（未取得） | A-C025: 到達不能、本文未確認 | 2回open失敗。第三者まとめの記載を公式規約として代用しない。AI作品の投稿・公募・出版の条件は保留 |
| A-E026 | FTS5 Extension、SQLite、[公式](https://sqlite.org/fts5.html) | 取得した検索版の末尾更新2026-10-09、公開日不明／OFFICIAL | A-C026: trigram部分一致、3文字未満の全文クエリ制約、外部contentの整合責任 | 日本語の読み・別名を自動解決する証拠でない。E027/028と同じ提供者 |
| A-E027 | SQLite Backup API、SQLite、[公式](https://www.sqlite.org/backup.html) | 不明／OFFICIAL | A-C027: 稼働DBのスナップショット用API | 外部添付や元ファイルをまとめて保全するものではない |
| A-E028 | Atomic Commit In SQLite、SQLite、[公式](https://www.sqlite.org/atomiccommit.html) | 不明／OFFICIAL | A-C028: DBトランザクションの原子性、ハードウェア前提等 | 任意の外部mdファイルとの一括原子性を保証しないという設計上の解釈は別扱い |
| A-E029 | llama.cpp README、ggml-org、[公式リポジトリ](https://github.com/ggml-org/llama.cpp) | 継続更新、公開日不明／OFFICIAL | A-C029: x86 CPU・量子化・CUDA等の推論経路 | 日本語設定問答の品質、特定PCの速度・メモリ・モデル再配布権を実証しない。クローンやインストールは未実施 |
| A-E030 | Cross Site Scripting、OWASP、[一次資料](https://community.owasp.org/attacks/xss/) | 不明／OFFICIAL | A-C030: 未信頼データを検証せず表示する攻撃面 | Webの一般原理。対象アプリが既に脆弱という診断ではない |
| A-E031 | LLM01:2025 Prompt Injection、OWASP、[一次資料](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2025版、公開日不明／OFFICIAL | A-C031: 外部ファイル由来の間接注入、RAGでも十分に解消されないリスク | ローカル実行でも命令混同は残る、という設計上の含意。E030と同じ組織だが別の攻撃分類 |
| A-E032 | AIと著作権について、文化庁、[公式資料案内](https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html) | ページ公開日不明、ガイダンス2024-07-31／OFFICIAL | A-C032: 当事者別のリスク低減資料が提供されている | [PDF](https://www.bunka.go.jp/seisaku/chosakuken/pdf/94097701_01.pdf)は取得タイムアウト。個別適法性や条文の適用、リンク先全文の法的精査は未確認 |
| A-E033 | Sign an MSIX package、Microsoft、[公式](https://learn.microsoft.com/en-us/windows/msix/package/signing-package-overview) | 不明／OFFICIAL | A-C033: MSIXの署名・デバイス側信頼が必要 | MSIXを選ぶ場合だけ。配布方式未決定。金額・日本の個人開発者の利用資格を確定しない |
| A-E034 | カクヨムコンテスト12応募要項、KADOKAWA、[公式](https://kakuyomu.jp/contests/kakuyomu_contest_12/detail) | 公開日不明／OFFICIAL（部分確認） | A-C034: 一般投稿と別の応募要項が存在、元データ提供を求める可能性が記載 | 今回はAI条項を含む全要項の精査未完。一般投稿可能＝公募可能とは判定しない |

## 主張台帳

| 主張ID | 区分 | 主張／根拠 |
|---|---|---|
| A-C001 | VERIFIED | 入力がWindows・SQLite・非AI経路を指定する。E001。実装確認ではない |
| A-C002 | VERIFIED | 初期台帳に21候補があるが完全性保証なし。E002 |
| A-C003 | REPORTED | 開発者1名が分散・旧版混同・消失等を報告。E003 |
| A-C004 | REPORTED | 外部作者に複数保存先の混乱とスマホのみの例がある。E004 |
| A-C005 | REPORTED | 外部作者が人物別時系列表・手描き地図を使う。E005 |
| A-C006 | VERIFIED | 21名の限定的なPC執筆環境調査がある。E006。市場率は未確認 |
| A-C007 | VERIFIED | ObsidianはローカルMarkdownと外部変更を扱う。E007 |
| A-C008 | VERIFIED | Obsidianに通常検索がある。E008 |
| A-C009 | VERIFIED | Obsidianにリンクグラフがある。E009。頻度は未確認 |
| A-C010 | VERIFIED | Obsidianに復旧用スナップショットがある。E010 |
| A-C011 | VERIFIED | Obsidian基本利用は無料と公式表示。E011 |
| A-C012 | VERIFIED | Notionは制限のあるアプリでのオフライン利用に対応。E012 |
| A-C013 | VERIFIED | Notionに汎用形式の出力経路がある。E013 |
| A-C014 | VERIFIED | Notion公式は通常検索とAI追加検索を区別。E014 |
| A-C015 | VERIFIED | VS Code標準でフォルダ横断検索。E015 |
| A-C016 | VERIFIED | VS Code標準で設定依存の履歴・復元。E016 |
| A-C017 | VERIFIED | 秀丸のgrepと該当行移動。E017 |
| A-C018 | VERIFIED | 秀丸通常版の表示価格4,400円。E018 |
| A-C019 | VERIFIED | WindowsデスクトップOneNoteの横断検索。E019 |
| A-C020 | VERIFIED | OneNoteは存在するバックアップから復元可。E020 |
| A-C021 | UNVERIFIED | Nolaの候補機能は公式検索結果に見えるが現行本文を取得できず。E021 |
| A-C022 | VERIFIED | なろうの区分設定は必須、4区分を区別。E022 |
| A-C023 | VERIFIED | カクヨム現行ガイドラインのAI3タグ・推奨・応募要項別確認を再取得本文で確認。E023。初回取得差は監査記録に残す |
| A-C024 | VERIFIED | 2026-05-27公式告知で3つの推奨タグと基準を確認。E024 |
| A-C025 | UNVERIFIED | アルファポリスの現行原文。E025取得失敗 |
| A-C026 | VERIFIED | SQLiteのtrigram等の仕様・短い文字列の制約。E026 |
| A-C027 | VERIFIED | SQLiteに稼働DBバックアップAPIがある。E027 |
| A-C028 | VERIFIED | SQLiteはDBトランザクションの原子性を説明。E028 |
| A-C029 | VERIFIED | llama.cppにCPU/GPU等の実行手段がある。E029 |
| A-C030 | VERIFIED | OWASPが未信頼データ表示に起因するXSSを説明。E030 |
| A-C031 | VERIFIED | OWASPがファイル経由注入とRAGの限界を説明。E031 |
| A-C032 | VERIFIED | 文化庁に当事者別ガイダンス案内がある。E032。個別適法性は未確認 |
| A-C033 | VERIFIED | MSIX選択時は署名・信頼が必要。E033 |
| A-C034 | VERIFIED | 個別応募要項が別に存在する。E034。AI応募適格性は未確認 |
| A-C035 | INFERENCE | 検索だけでは「どの版を正本にするか」は決まらない。E003/004と版管理の設計論 |
| A-C036 | UNVERIFIED | 対象3サイト作者のPC設定管理率、Windows比率、AI別・長さ別・ジャンル別の需要率、グラフ使用頻度、支払意思。本調査で代表性ある証拠を確認できず。不存在の証明ではない |
| A-C037 | INFERENCE | 全21機能が揃っても既存代替に対する優位は未立証。E007〜020の代替と実測不在 |
| A-C038 | INFERENCE | 非AI検索・正本明示・履歴・復旧・再開支援の組合せは検証価値がある。E003〜005。採用や市場適合確定ではない |
| A-C039 | UNVERIFIED | 個人開発の完成可能性、保守工数、価格、動作要件、RAG品質。実装・計測・見積がない |
| A-C040 | INFERENCE | Windows限定はスマホのみ・macOS等の作者を除外し、併用者にも移行の手間を作る。E001/004。影響率は未確認 |

## 競合比較（操作・費用・移行）

標準＝提供者が組み込む機能（コアプラグインを含む）、設定＝利用者の整理・選択が必要、拡張＝別の追加コード。実装不能と判断できたものはない。未確認を「非対応」にしない。

| 製品 | 代替可能なこと／区分 | ローカル性と移行 | 費用・導入負担／不足確認 |
|---|---|---|---|
| Nola | 人物・世界観・プロットは候補、標準か現行範囲は保留 E021 | 同期を説明する検索結果あり、完全ローカル可否・md/txt入出力未確認 | 現行料金未確認。画面切替が全員に不便とは言わない。本文・実機確認が必要 |
| Obsidian | 標準検索、コアグラフ、復旧。作品ごとのvaultや命名は設定。時点表・別名辞書の構成は利用者設計 | ローカルmdで外部編集可能。既存txtの直接扱い、画像・リンク互換は別途検証 | 基本無料 E011。初期分類やテンプレートの時間は未測定。グラフを開く必要はない |
| Notion | 通常検索・ページ構造は標準。作品別DBや正本フラグは利用者設定案。AIは通常検索と別 | オフライン可だがクラウド同期型。md/CSV等出力あり。再取込の忠実度は未測定 E012〜014 | 料金全体は今回未確認。AIを使うことが必須とは確認されない。DB設計・移行の時間未測定 |
| OneNote（Windowsデスクトップ） | 標準のノート横断検索・バックアップ復元。作品別ノートと時点表は利用者構成案 | ローカル専用可否は版・契約込みで未確認。md/txtとの往復は未確認。クラウドキャッシュと独立バックアップを混同しない | 契約費用・対象版の初期導入・移行時間未確認。Web版の制限をデスクトップの制限としない E019/020 |
| 秀丸（通常版） | 標準grepと該当行移動。正本命名・作品フォルダは利用者ルール。専用Wiki等は本調査未確認 | ローカルのテキスト群を検索する代替。独自構造化を要しないが時点の意味は作者が管理 | 表示価格4,400円 E018。検索設定の学習時間は未計測。検索にマクロは不要 E017 |
| VS Code | 標準のフォルダ検索、履歴比較・復元。フォルダ分離は設定。特殊な設定資料機能の拡張は未調査 | 既存テキストを扱う代替。履歴はサイズ・保持制限に注意 E015/016。全作品の復旧保証ではない | 今回価格ページ未確認。通常検索に拡張は不要。拡張の安全性懸念を全機能利用の必須リスクとしない |

どの製品も本製品との同条件の操作数・切替回数・所要時間は未計測。公式のショートカット記載は手順の存在を示すだけで速さの比較ではない。世界観グラフDB、DNA、時点参照が全く実現不能な競合だとは判断しない。任意の拡張で実現できるとも断定しない。

## 市場・利用場面の分析

PCで管理する層の存在には限定的な根拠があるが、市場規模への換算はできない（A-C006/036）。サイト閲覧者の端末比率・登録者数・累計作品数は、活動作者のWindows利用者数でも購入者数でもないため推計に使わなかった。長編は情報量・時点関係が増える、短編は構造入力負担が割に合わない、ファンタジーは地図を要する、といった差は調査仮説でありジャンル別需要統計ではない。

作家・編集者の視点で想定するタスクは、(1)別名から採用済み設定へ移動、(2)旧版と正本を比較、(3)休筆時の未解決事項を再開時に確認、(4)ある話数で人物が知っていた事実を確認、である（A-C035/038、解釈）。通常検索は文字列のある資料を見つける。正本の認定・棄却理由・物語時点はメタデータや作者判断を要する。編集者への資料共有・校閲は未取材で、専用の編集者需要は未確認。

A-E003にはスマホ標準メモ中心という自己観察もあり、Windows限定方針との摩擦がある。ローカル専用は持ち出し・共同作業・外出時の即記録を満たさない可能性がある（A-C040）。別端末から手動で移す頻度と負担を測る必要がある。これはスマホ対応への仕様変更提案ではなく、対象の限界である。

分散の第三者事例は確認できたが、旧版取り違え・休筆後の再開・フォルダ増殖それぞれについて独立した複数の外部証拠は今回未確認。自己観察だけを市場傾向へ拡大しない。追加インタビューでは実際の検索失敗と回避策、最近の旧版混同、復旧の成否を画面操作で確認する必要がある。
