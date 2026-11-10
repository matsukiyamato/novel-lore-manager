// All records are fictional, in-memory mock data. No File System API is used.
const records = [
  ['elena','エレナ・ヴァルツ','登場人物','人物',['魔導','王都','第2章'],['灰の記録者','えれな'],['academy','leon','library'],`# エレナ・ヴァルツ

> 王立魔導学院の記録官。
> 「灰冠」の由来を知る数少ない人物。

## 基本情報
- 年齢：27歳
- 所属：[[王立魔導学院]]
- 役職：第二書庫 記録官
- 別名：灰の記録者

## 人物像
慎重で寡黙。記録の欠落を何より恐れる一方、禁書庫の封印について独自に調べている。

## レオンとの関係
[[レオン・クロード]]とは幼少期からの知己。北方遠征の記録を共有する。

## 未解決の問い
- 灰冠の継承条件は何か。
- 学院が封じた第三の術式とは。`],
  ['leon','レオン・クロード','登場人物','人物',['北方','第2章'],['れおん'],['elena','knights'],`# レオン・クロード

北方騎士団の騎士。エレナとは幼少期からの知己。

## 経歴
北方遠征の記録をエレナと共有する。`],
  ['aria','アリア・ベルフォード','登場人物','人物',['王都'],['ありあ'],['academy'],`# アリア・ベルフォード

王都の歴史を研究する学院生。`],
  ['magic','魔法体系','世界観','世界観',['魔導'],[],['academy'],`# 魔法体系

術式は記録と詠唱により成立する。

## 第三の術式
禁書庫に封じられた記録がある。`],
  ['history','王国の歴史','世界観','世界観',['王都'],[],['capital'],`# 王国の歴史

灰冠の継承を巡る記録が残る。`],
  ['library','禁書庫','世界観','世界観',['魔導','第2章'],[],['elena'],`# 禁書庫

学院が封じた第三の術式の目録を保管する。`],
  ['custom','王国の慣習','世界観','世界観',['王都'],[],[],`# 王国の慣習

灰冠の継承式は王都で行われる。`],
  ['academy','王立魔導学院','組織','組織',['魔導','王都'],['がくいん'],['elena','magic'],`# 王立魔導学院

王都アストリアにある魔導研究機関。エレナが働く第二書庫には禁書庫の目録が残る。`],
  ['knights','北方騎士団','組織','組織',['北方'],[],['leon'],`# 北方騎士団

北方領グラシエを守る騎士団。`],
  ['capital','王都アストリア','地理','地理',['王都'],[],['academy'],`# 王都アストリア

王立魔導学院がある王国の都。`],
  ['north','北方領グラシエ','地理','地理',['北方'],[],['knights'],`# 北方領グラシエ

長い冬と古い遠征路で知られる。`],
  ['timeline','北方遠征年表','年表','年表',['北方','第2章'],[],['leon'],`# 北方遠征年表

- 王国暦412年：騎士団が北方へ遠征。
- 王国暦413年：レオンが記録をエレナに渡す。`]
];

export const documents = records.map(([id,title,folder,category,tags,aliases,links,content]) => ({id,title,folder,category,tags,aliases,links,content,saved:content,status:'active',mode:'copy',history:[]}));
export const byId = id => documents.find(doc => doc.id === id);
export const normalize = value => value.normalize('NFKC').toLocaleLowerCase('ja-JP');
export function matches(doc, query) { return normalize([doc.title,...doc.aliases,...doc.tags,doc.content].join(' ')).includes(normalize(query.trim())); }
