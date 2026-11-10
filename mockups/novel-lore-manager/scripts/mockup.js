const themeFiles = {
  forest: 'styles/forest.css',
  storybook: 'styles/storybook.css',
  quiet: 'styles/quiet.css'
};

function setTheme(theme) {
  if (!Object.hasOwn(themeFiles, theme)) return;
  document.documentElement.dataset.theme = theme;
  document.getElementById('theme-sheet').href = themeFiles[theme];
  const select = document.getElementById('theme-select');
  if (select) select.value = theme;
}

let storedTheme = 'forest';
try { storedTheme = localStorage.getItem('nlm-mock-theme') || 'forest'; } catch { /* Local files may block storage. */ }
setTheme(storedTheme);

document.getElementById('theme-select')?.addEventListener('change', event => {
  const theme = event.target.value;
  setTheme(theme);
  try { localStorage.setItem('nlm-mock-theme', theme); } catch { /* Visual preview still works. */ }
});

window.addEventListener('storage', event => {
  if (event.key === 'nlm-mock-theme' && event.newValue) setTheme(event.newValue);
});

const recallLink = document.getElementById('open-recall');
recallLink?.addEventListener('click', event => {
  const popup = window.open(recallLink.href, 'quickRecall', 'popup=yes,width=420,height=560,resizable=yes,scrollbars=yes');
  if (popup) event.preventDefault();
});

document.querySelectorAll('.mode-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mode-button').forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('.document-panes').dataset.view = button.dataset.mode;
  });
});

const recallDocuments = {
  elena: {
    title: 'エレナ・ヴァルツ', category: '人物',
    summary: '王立魔導学院の記録官。「灰冠」の由来を知る数少ない人物。禁書庫の封印を独自に調べている。',
    facts: [['所属', '王立魔導学院'], ['別名', '灰の記録者']],
    detail: '慎重で寡黙。記録の欠落を何より恐れる一方、禁書庫の封印について独自に調べている。'
  },
  leon: {
    title: 'レオン・クロード', category: '人物',
    summary: '北方騎士団の騎士。エレナとは幼少期からの知己で、北方遠征の記録を共有している。',
    facts: [['所属', '北方騎士団'], ['関係', 'エレナの知己']],
    detail: '北方領グラシエの出身。遠征で得た手記をエレナに託し、灰冠に関わる古い記録を追う。'
  },
  academy: {
    title: '王立魔導学院', category: '組織',
    summary: '王都アストリアにある魔導研究機関。エレナが働く第二書庫には禁書庫の目録が残る。',
    facts: [['所在地', '王都アストリア'], ['関連', '魔法体系']],
    detail: '学院は魔法体系の研究と記録の保管を担う。第二書庫の閲覧には記録官の立ち会いが必要。'
  }
};

function selectRecall(button) {
  document.querySelectorAll('.recall-result').forEach(item => {
    const active = item === button;
    item.classList.toggle('is-selected', active);
    item.setAttribute('aria-pressed', String(active));
  });
  const data = recallDocuments[button.dataset.document];
  if (!data) return;
  document.getElementById('overview-title').textContent = data.title;
  document.getElementById('overview-category').textContent = data.category;
  document.getElementById('overview-summary').textContent = data.summary;
  document.getElementById('overview-facts').replaceChildren(...data.facts.map(([label, value]) => {
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    row.append(dt, dd);
    return row;
  }));
  document.getElementById('detail-text').textContent = data.detail;
}

document.querySelectorAll('.recall-result').forEach(button => button.addEventListener('click', () => selectRecall(button)));

const query = document.getElementById('recall-query');
query?.addEventListener('input', () => {
  const term = query.value.trim().toLocaleLowerCase('ja-JP');
  const rows = [...document.querySelectorAll('.recall-result')];
  const matches = rows.filter(row => {
    const data = recallDocuments[row.dataset.document];
    const haystack = [data.title, data.summary, data.detail, ...data.facts.flat()].join(' ').toLocaleLowerCase('ja-JP');
    const match = !term || haystack.includes(term);
    row.hidden = !match;
    return match;
  });
  document.getElementById('result-count').textContent = `${matches.length}件`;
  document.getElementById('recall-empty').hidden = matches.length !== 0;
  document.querySelector('.recall-overview').hidden = matches.length === 0;
  document.querySelector('.recall-actions').hidden = matches.length === 0;
  if (matches.length && !matches.some(row => row.classList.contains('is-selected'))) selectRecall(matches[0]);
});

for (const [triggerId, panelId] of [['show-detail', 'recall-detail'], ['show-memo', 'recall-memo']]) {
  const trigger = document.getElementById(triggerId);
  const panel = document.getElementById(panelId);
  trigger?.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    trigger.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden && panelId === 'recall-memo') document.getElementById('memo-text').focus();
  });
}

document.getElementById('minimize-recall')?.addEventListener('click', event => {
  const minimized = document.body.classList.toggle('recall-minimized');
  event.currentTarget.setAttribute('aria-label', minimized ? 'Quick Recallを元の大きさに戻す' : 'Quick Recallを最小化');
});
document.getElementById('close-recall')?.addEventListener('click', () => {
  window.close();
  if (!window.closed) window.location.href = 'index.html';
});
