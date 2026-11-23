# ver3.0 追加機能の設計・確認

## 設計

資料一覧のフォルダ見出しに「フォルダ作成」を置き、各フォルダ行に資料作成アイコンを置く。フォルダとカテゴリは別の一覧として維持し、作った資料は一つの論理資料として両方から開く。資料名とフォルダ名の重複を画面内で確認する。記号使用例は表示モードの隣に置き、入力と表示結果を対で示す。

既存テーマの色を流用する。Forest は canvas `#151F1B`、surface `#1D2A24`、text `#EDF2E9`、accent `#C4D7A4`、focus `#F2D17F`。Storybook は canvas `#EFE9DA`、surface `#FAF6EA`、text `#302B25`、accent `#5B4537`、focus `#6A4B21`。Quiet は canvas `#F2F5F0`、surface `#FFFEFA`、text `#23342B`、accent `#315F4A`、focus `#245EAA`。本文と操作ラベルは既存の日本語ゴシック系、Storybook の見出しは既存の明朝系を使う。

配置: `フォルダ見出し [作成]` → `フォルダ名 [資料作成]` → `資料行`。同じDOMを3テーマで使う。今回の変更では、飾りを増やさず、アイコンはフォルダと資料の識別に限定した。新しい色とフォントは追加していない。

## UI UX Pro Max の参照

- `.agents/skills/ui-ux-pro-max/SKILL.md` と `.agents/skills/frontend-design/SKILL.md` を読んだ。
- `python .agents/skills/ui-ux-pro-max/scripts/search.py --help` を実行したが、環境に `python` コマンドがなく失敗した。`Get-Command python.exe,py.exe,uv.exe` にも結果はなかった。検索結果は得られていない。
- `.agents/skills/ui-ux-pro-max/references/pro-rules.md` は存在せず、最終レビュー用の参照はできなかった。
- SKILL.md のキーボードフォーカス、ラベル、エラー表示、意味のあるアイコンを採用した。モバイル向けのタッチ目標寸法を固定採用するとデスクトップの資料ツリー密度を損なうため採用しなかった。

## 実装・確認

- 共通HTML、共通CSS、JavaScriptのみ変更。既存3テーマのCSSは変更していない。
- 作成と保存はメモリ上の模擬操作。外部APIおよび実ファイルへの処理は追加していない。
- `node --check`、`tests/smoke.mjs`、`git diff --check` は成功。ローカルプレビューはCSSへのHTTP 200を確認したが、ブラウザ操作ホストが利用できず画面操作とスクリーンショットによる検証は未実施。
