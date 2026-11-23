## モックアップで使用しているファイルとやって欲しいこと

以下は `mockups/novel-lore-manager/index.html` を起点に、HTMLの参照とJavaScriptの静的 `import` をローカルで確認したファイル一覧である。パスはすべて同ディレクトリからの相対パス。ファイルの存在と参照関係を示すもので、各機能の動作検証結果ではない。

| 区分 | 現行 `index.html` で使用するファイル | 参照方法・役割 |
|---|---|---|
| 画面の入口 | `index.html` | 共通の画面構造、編集・プレビュー、Quick Recallの小窓、未保存確認ダイアログを定義する。 |
| アイコン | `novel_lore_manager_icon.png` | `<link rel="icon">` と画面上部の `<img>` が直接参照する。 |
| 共通CSS | `css/base.css`、`css/layout.css`、`css/components.css`、`css/flows.css`、`css/revisions.css`、`css/ver3.css`、`css/ver3-features.css` | HTMLの `<link rel="stylesheet">` で直接読み込む。基礎表示、配置、部品、画面遷移、追加調整に使う。 |
| テーマCSS | `css/themes/forest-workbench.css`、`css/themes/storybook-atelier.css`、`css/themes/quiet-lore-studio.css` | 初期表示では Forest をHTMLから読み込み、テーマ選択時に `js/theme-manager.js` が `#theme-css` の参照先を切り替える。同時に3ファイルを重ねて読み込む構成ではない。 |
| JavaScriptの入口 | `js/theme-manager.js` | HTMLの `<script type="module">` から読み込む。架空の6資料と画面状態、編集・保存表示、タブ、プレビュー、Quick Recall、テーマ切替を扱う。 |
| 画面遷移・検索画面 | `js/flows.js` | `theme-manager.js` が取り込む。作品選択、資料作成、検索、保管庫などの画面と操作を組み立てる。 |
| 追加操作 | `js/enhancements.js` | `theme-manager.js` が取り込む。パネル幅、ルビ入力補助、Quick Recall側の機能表示などを追加する。 |
| 検索処理 | `js/search.js` | `flows.js` が取り込む。架空資料の部分一致検索と絞り込みを行う。 |
| Markdown表示 | `js/markdown.js` | `theme-manager.js` と `enhancements.js` が取り込む。対応範囲を限定したMarkdownをプレビュー用HTMLに変換する。 |
| ルビデータ・表記 | `js/ruby.js` | `flows.js` と `enhancements.js` が取り込む。仮のルビ辞書と投稿先向け表記を提供する。 |
| 取り込みウィザード | `js/import-wizard.js` | `flows.js` と `enhancements.js` が取り込む。選択したファイルの名前・相対パス、またはサンプル資料だけを使い、取り込み結果を画面内で模擬する。 |

読み込み関係は `index.html` → `js/theme-manager.js` → `js/flows.js`・`js/markdown.js`・`js/enhancements.js`、さらに `flows.js` → `js/search.js`・`js/ruby.js`・`js/import-wizard.js`、`enhancements.js` → `js/ruby.js`・`js/markdown.js`・`js/import-wizard.js` である。Quick Recallの別窓も現在の `index.html` に `?recall=1` を付けて開くため、別のHTMLファイルは読み込まない。

`preview.mjs` はローカル静的プレビュー用、`tests/smoke.mjs` は簡易確認用であり、画面から読み込むファイルには含めない。旧 `quick-recall.html`、`scripts/`、`styles/` も現行 `index.html` の参照先ではない。HTML・CSS・JavaScriptの確認範囲では外部APIへの通信処理や外部配信の依存ファイルは見つからず、この追記作業でも外部APIには接続していない。`js/enhancements.js` の `http://www.w3.org/2000/svg` はDOMでSVG要素を作るための名前空間であり、通信先ではない。
