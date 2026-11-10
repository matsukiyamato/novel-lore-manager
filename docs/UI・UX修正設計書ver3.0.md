## UI・UX修正設計書ver3.0.md

## 使用するファイル

今回のモックの起点は mockups/novel-lore-manager/index.html である。共通のCSS・JSとモックデータを使い、Forest Workbench／Storybook Atelier／Quiet Lore Studio の見た目をテーマ別CSSで切り替える。現行Quick Recallは同じHTMLに含まれ、別窓用URLは index.html?recall=1 である。

| 現行モックでの役割 | 実行報告に記載されたファイル |
|---|---|
| 画面の起点 | mockups/novel-lore-manager/index.html |
| 共通スタイル | css/base.css、css/layout.css、css/components.css、css/flows.css |
| 3テーマの見た目 | css/themes/forest-workbench.css、css/themes/storybook-atelier.css、css/themes/quiet-lore-studio.css |
| 共通の操作・表示 | js/theme-manager.js、js/flows.js、js/search.js、js/markdown.js |
| 起動・説明・簡易検査 | preview.mjs、README.md、tests/smoke.mjs |

表中の相対パスは、特記のない限り mockups/novel-lore-manager/ 以下を指す。実行報告で旧試作とされた quick-recall.html、styles/、scripts/ は現行画面の根拠にしない。design/shared-layout.md と design/visual-review.md も現行の実装状態を示す資料として扱わない。

**現在の画面の画像**は、mockups_imagever2.0の中に入っている。

## 修正して欲しいところ

下記に何も修正点、追加点が書かれていないところはデザイン、表示機能、機能に関して一切の変更を行わないでください。

スタート画面：スタート画面.png

- スタート画面でアイコンの表示は無し。
- このアプリ名の表示
- アプリ名の下に木の画像を表示する。
- 木は、朝、昼、夕、夜でアニメーション自体の木の背景の色を変える。季節ごとに木を、春：桜、夏：緑、秋：モミジの木、冬：クリスマスツリーに雪がかぶっている状態の木を表示する。

作品選択・作成画面：作品選択・作成画面(x)→作品作成・選択画面に名称変更：

・デザイン変更
 - 作品作成画面1.png
 - 作品作成画面2.png
 のようなデザインに変更して欲しい。

 ただし、現在の作品作成・選択画面の色、機能。表示されている機能も維持すること。色を維持した上で、作品作成画面1.pngと作品作成画面2.pngのデザインのみをこれに変更してください。








