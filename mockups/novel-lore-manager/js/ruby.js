export const RUBY_SITES=['小説家になろう','カクヨム','アルファポリス'];
// Display examples for the mock. Site-specific export rules remain provisional.
export function rubyNotation(word,reading,site){
  if(!word||!reading)return '';
  if(site==='小説家になろう')return `|${word}《${reading}》`;
  if(site==='カクヨム')return `｜${word}《${reading}》`;
  return `|${word}《${reading}》`;
}
export const rubyEntries=[
  {id:'ruby-1',word:'灰冠',reading:'はいかん',site:'小説家になろう'},
  {id:'ruby-2',word:'王立魔導学院',reading:'おうりつまどうがくいん',site:'カクヨム'}
];
