# ver2.0 変更・検証記録

## 設計と比較

- 共通DOM、共通JS、共通モックデータを使い、Forest / Storybook / Quiet のテーマCSS切替を維持した。
- 森の書斎、古書の装丁、静かな資料室という既存テーマの視覚比喩を保持。新しい表紙・起動の木は共通コンポーネントで、テーマ色だけを継承する。日本語本文の密度と文字サイズは変えていない。
- ver2.0 の追加画面は、起動演出、表紙付き作品作成、最初の設定資料、Markdownガイド、ルビ辞書。Quick Recall の取り込み・保管庫は小窓内で完結する。
- ルビ候補は入力末尾が登録語と一致すると提示し、Tabまたはクリックで挿入する。同じ単語の複数登録時は右クリックで候補一覧を表示し、矢印キーで移動できる。
- 投稿サイト別ルビ表記はデザイン書だけでは規則が確定できないため、表示例を仮形式としている。実サイトへの出力は行わない。

## Skill 調査

- `.agents/skills/ui-ux-pro-max/SKILL.md` と `.agents/skills/frontend-design/SKILL.md` を確認。
- `python .agents/skills/ui-ux-pro-max/scripts/search.py "Windows desktop novel lore manager writing reference three themes" --design-system`、`python .agents/skills/ui-ux-pro-max/scripts/search.py "keyboard focus resizable panes Japanese text" --domain ux`、`py --version` を試したが、Pythonランチャーが存在しなかった。検索の一致結果は得られていない。Skill内の `references/pro-rules.md` と `references/quick-reference.md` も配置されていなかった。
- フレームワーク、Tailwind、外部アイコンライブラリは採用せず、既存のHTML/CSS/Vanilla JSとインラインSVGを使用した。

## 検証と制限

- `node --check`（変更した全JS）と `node tests/smoke.mjs` は通過。
- `http://127.0.0.1:4173/`、追加JS、PNGアイコンのHTTP 200を確認。
- ブラウザ操作ホストが利用できなかったため、1366×768 / 1440×900 / 1920×1080でのスクリーンショットと実操作は未検証。
- 保存・取り込み・削除・ルビ辞書は画面内メモリのみ。Quick Recall別窓とメイン画面のメモリ同期、Windows最前面・グローバルショートカットは未実装。
- 作品作成は表紙・ジャンル・題名のUI試作であり、作品ごとの独立した永続データ管理は未実装。
