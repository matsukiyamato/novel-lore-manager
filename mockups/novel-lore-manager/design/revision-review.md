# UI・UX修正レビュー

## 根拠と対象

- `docs/UI・UX修正設計書.md` と `docs/UI・UX修正結果まとめ.md` の指定を現行 `index.html`、`css/`、`js/` に適用。
- `mockups_image/` の作品選択、検索、保管庫、Quick Recallなどの静止画を確認。画像にない動作はコードを確認した。
- `docs/requirements.md`、`docs/data-management-design.md`、`docs/user-flows.md`、`docs/screen-specifications.md` の確定・暫定・未決を維持。

## デザイン案と見直し

| テーマ | 色（基本／面／補助／文字／強調） | 書体と比喩 |
|---|---|---|
| Forest Workbench | `#151F1B` / `#1D2A24` / `#25352C` / `#EDF2E9` / `#C4D7A4` | Yu Gothic UI本文、Yu Mincho作品名。木製の作業机と背表紙。 |
| Storybook Atelier | `#EFE9DA` / `#FAF6EA` / `#E7DECA` / `#302B25` / `#5B4537` | Yu Mincho見出し、Yu Gothic UI操作。装丁本と紙。 |
| Quiet Lore Studio | `#F2F5F0` / `#FFFEFA` / `#E6EEE7` / `#23342B` / `#315F4A` | Yu Gothic UI。余白のある資料棚と薄い見出し線。 |

共通配置：上に画面名と説明、下に「既存作品｜新規作成」の2列。新規作成の入力とボタンは同一フォーム内。その他の画面は既存の構造を基礎にした。単なる色替えにならないよう、作品選択の枠、背表紙、線、書体をテーマごとに変更。装飾より操作位置を優先し、画面が狭いときは縦一列へ移す。

## UI UX Pro Max の調査

次を実行したが、この環境には `python` コマンドがなく、スクリプトは開始できなかった。検索結果は得ておらず、採用した結果・却下した結果はない。

```text
python .agents/skills/ui-ux-pro-max/scripts/search.py 'desktop novel lore reference library forest workbench' --design-system
python .agents/skills/ui-ux-pro-max/scripts/search.py 'desktop novel lore reference library storybook atelier' --design-system
python .agents/skills/ui-ux-pro-max/scripts/search.py 'desktop novel lore reference library quiet studio' --design-system
python .agents/skills/ui-ux-pro-max/scripts/search.py 'search filters navigation keyboard desktop' --domain ux -n 5
```

同Skillの一般規則から、キーボードフォーカス、可読な状態表示、フォームの近接エラー、複数スクロールの抑制を確認した。React／Tailwind／モバイル専用の指針はこのHTML・CSSモックの根拠にしなかった。`references/pro-rules.md` はインストール内に存在せず参照できなかった。

## 実装範囲と未決

- 検索・取り込み・保管庫は専用ビューにし、資料ツリーと関連資料を隠す。検索結果には全件表示、短い抜粋、直接開く操作を置く。
- 取り込みはサンプル対象の選択、管理・整理方式、確認、結果を画面内で再現する。ファイル選択・本番ファイル操作はしない。
- 保管庫は状態タブ、件数、名前・タグ・本文検索、ゴミ箱移動の説明を表示する。ゴミ箱移動は論理状態のみ。
- Markdownは限定的なプレビュー構文を増やした。`｜漢字《かんじ》` は画面確認用のルビ表記であり、製品の保存記法ではない。投稿サイト別の変換規則は未決。
- Quick Recallは検索結果を残し、選択資料の詳細プレビューと機能切替を追加。Windows最前面と全域ショートカットはブラウザモックの対象外。

## 確認

`node --check` でJS3ファイルの構文、`node mockups/novel-lore-manager/tests/smoke.mjs` で検索とMarkdownの安全性を確認。ローカルプレビューはHTTP 200。ブラウザUIの接続先が利用できず、1366×768／1440×900／1920×1080および125%／150%の実画面スクリーンショット検証は未完了。
