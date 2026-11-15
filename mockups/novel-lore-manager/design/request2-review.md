# やって欲しいこと2.md 対応記録

## 設計と比較

共通DOMと操作は3テーマで同じ。Forest Workbench は深緑の書斎、Storybook Atelier は古書の紙面、Quiet Lore Studio は明るい整理机という既存の色・書体を維持した。作品画面は見出し、最近開いた本、すべての本と作成フォームの順。表紙に視覚的な重心を置き、検索や保管庫の文字密度は作業画面に合わせた。

色の役割は背景 `--canvas`、面 `--surface`、持ち上がった面 `--raised`、本文 `--text`、強調 `--accent`、境界 `--border`。書体は日本語本文に既存の画面用書体、本の表紙に明朝を使う。左右の本棚と作成欄は狭い幅で縦積みにする。汎用カードを均等に並べる案は、作品という実体の見分けが付きにくいため採用しなかった。

## 調査記録

- `python .agents/skills/ui-ux-pro-max/scripts/search.py "desktop novel lore archive library pixel art interface" --design-system -p "Novel Lore Manager"` を実行したが、`python` コマンドがなく結果を取得できなかった。
- `python .agents/skills/ui-ux-pro-max/scripts/search.py "desktop search filter order keyboard focus" --domain ux -n 5` も同じ理由で結果なし。推薦内容は捏造せず、要件と参照画像を根拠にした。
- `references/pro-rules.md` は設置されていなかった。フォーカス、ラベル、空状態、狭い画面、動きの低減は既存ルールに沿って確認した。
- 参照URL `https://feralui.dev/pixel-play?ref=x` は閲覧ツールから開けなかった。スタート画面は提供画像の構成と、文字・木を使う既存仕様を合わせ、ローカルSVGの角張った図案にした。

## 実装と制約

- 作品の追加、作品別資料、最近開いた順、一覧検索、名前順をページ内メモリで再現。再読み込みで初期化される。作品ファイルの読み込みと書庫保管庫は追加していない。
- 作品内検索の絞り込みは現行コードで既に「フォルダ → カテゴリ → タグ」。内容と順序を維持した。
- 保管庫は名前・本文の検索とタグ選択を横並びにし、その下に通常・アーカイブ・ゴミ箱を配置した。
- 取り込み、ルビ辞書、Quick Recall の既存動作には今回の変更を加えていない。
- ブラウザ接続ホストが利用できず、スクリーンショットによる3テーマ・3解像度の目視検証は完了していない。
