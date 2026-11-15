# novel-lore-manager-codex-prompts-v2 実行報告

確認日：2026-11-03  
対象：`docs/novel-lore-manager-codex-prompts-v2.md` に沿って作成された、現在の3テーマ比較用ブラウザモック

## 結論：今回使う最新版

起点は **`mockups/novel-lore-manager/index.html`** です。ここから共通の `css/` と `js/` を読み込み、3テーマを切り替えます。Quick Recall の現行版も同じHTML内にあり、別窓表示には `index.html?recall=1` を使います。起動・制限事項の説明は同じディレクトリの `README.md` が現行版です。

### 実行・表示に使うファイル

| ファイル | 現在の役割・変更内容 |
|---|---|
| `mockups/novel-lore-manager/index.html` | 作品、ワークスペース、Quick Recall、未保存確認の共通HTML。作品選択・検索・取り込み・保管庫はJSで画面を追加する構成に変更。 |
| `mockups/novel-lore-manager/css/base.css` | 共通の文字、基本色、フォーカスなど。 |
| `mockups/novel-lore-manager/css/layout.css` | ワークスペースと小窓の共通配置。 |
| `mockups/novel-lore-manager/css/components.css` | タブ、編集領域、資料一覧などの共通部品。 |
| `mockups/novel-lore-manager/css/flows.css` | 作品選択、検索、取り込み、保管庫など追加画面の表示。 |
| `mockups/novel-lore-manager/css/themes/forest-workbench.css` | Forest Workbench の見た目。 |
| `mockups/novel-lore-manager/css/themes/storybook-atelier.css` | Storybook Atelier の見た目。 |
| `mockups/novel-lore-manager/css/themes/quiet-lore-studio.css` | Quiet Lore Studio の見た目。 |
| `mockups/novel-lore-manager/js/theme-manager.js` | 共通資料データ、タブ、Markdown編集、保存状態、Quick Recall、テーマ切替の起点。 |
| `mockups/novel-lore-manager/js/flows.js` | 作品選択、検索画面、取り込みウィザード、アーカイブ・ゴミ箱のモック操作。 |
| `mockups/novel-lore-manager/js/search.js` | 資料検索と絞り込みの共通処理。 |
| `mockups/novel-lore-manager/js/markdown.js` | 限定的なMarkdown表示とHTMLエスケープ。 |
| `mockups/novel-lore-manager/preview.mjs` | 追加パッケージなしのローカルHTTPサーバー。 |
| `mockups/novel-lore-manager/README.md` | 現行の起動方法、実装済み操作、未実装・未検証事項。 |
| `mockups/novel-lore-manager/tests/smoke.mjs` | 検索、Markdownの安全性、3テーマ共通参照の簡易検査。 |

起動方法：`mockups/novel-lore-manager/` で `node preview.mjs` を実行し、`http://127.0.0.1:4173/` を開きます。

### 設計・検討記録として参照するファイル

| ファイル | 内容 |
|---|---|
| `mockups/novel-lore-manager/design/shared-ux.md` | 共通の情報設計と操作方針。 |
| `mockups/novel-lore-manager/design/shared-wireframes.md` | 共通画面構成。図示例の文言は実装データの正本ではありません。 |
| `mockups/novel-lore-manager/design/forest-workbench.md` | Forest の視覚設計。 |
| `mockups/novel-lore-manager/design/storybook-atelier.md` | Storybook の視覚設計。 |
| `mockups/novel-lore-manager/design/quiet-lore-studio.md` | Quiet の視覚設計。 |
| `mockups/novel-lore-manager/design/design-comparison.md` | 3テーマの比較条件と採否。実装状況の記述は作成時点のものです。 |
| `mockups/novel-lore-manager/design/ux-research-log.md` | UI UX Pro Max の調査経緯。Pythonが使えず `search.py` の結果は未取得。 |

## 旧試作・古い時点の記録：現行版として使わないファイル

`mockups/novel-lore-manager/quick-recall.html`、`styles/base.css`、`styles/forest.css`、`styles/storybook.css`、`styles/quiet.css`、`scripts/app.js`、`scripts/data.js`、`scripts/mockup.js` は以前の独立試作です。現行の `index.html` はこれらを読み込みません。`preview.mjs` のコンソールに `quick-recall.html` のURLが表示されますが、現行Quick RecallのURLは上記の `index.html?recall=1` です。

`design/shared-layout.md` は初期の配置案、`design/visual-review.md` は旧試作と現行ワークスペースが混在していた時点のレビューです。現在の実装状態や完成した比較結果としては扱わないでください。削除はしていません。

## 追加・編集の判定と今回の報告書

上記の実行・表示用15ファイルと設計記録7ファイルが、プロンプト集の工程に対応する現存成果物です。HTML/CSS/JSの操作部分は、共通画面の追加と動作拡張を経た現行状態です。ただし **`mockups/`、`docs/`、`AGENTS.md` は現在すべてGit上で未追跡**のため、過去の各作業で「新規追加」と「既存ファイルの編集」のどちらだったかを履歴から確定できません。更新日時から作業者や変更順を断定していません。要件資料と `AGENTS.md` は照合対象であり、この報告では今回編集した成果物に含めません。

今回新しく追加したファイルは **`docs/novel-lore-manager-codex-prompts-v2実行報告.md`（本書）だけ**です。既存のモック、要件資料、ユーザーファイルは今回変更していません。

確認方法：`index.html` のCSS/JS読み込み、JSのモジュール参照、現行 `README.md` と旧レビューの記述を照合し、`node tests/smoke.mjs` が通過しました。これは構造と一部処理の確認です。3テーマを指定解像度でブラウザ操作した結果、Windowsの最前面動作、実ファイルの保存・取り込み・削除を検証したものではありません。製品要件の確定・暫定・未決・将来拡張の区別も、この報告によって変更しません。
