(() => {
  const titles = { home: '我的墓园', decorate: '装修模式', friend: 'TA 的墓园', visitors: '访客记录', shop: '商店 / 图鉴' };
  const history = [];
  let current = 'home';
  let coins = 580;
  const screens = [...document.querySelectorAll('.screen')];
  const back = document.getElementById('back-button');
  const balance = document.getElementById('coin-balance');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('hidden'), 1800);
  }

  function go(name, push = true) {
    if (!titles[name]) return;
    if (push && current !== name) history.push(current);
    current = name;
    screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screen === name));
    document.getElementById('screen-title').textContent = titles[name];
    back.classList.toggle('hidden', name === 'home');
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-go]');
    if (button) go(button.dataset.go);
  });

  back.addEventListener('click', () => go(history.pop() || 'home', false));
  document.getElementById('share-button').addEventListener('click', () => {
    showToast('已模拟分享：好友正在打开…');
    setTimeout(() => go('friend'), 550);
  });

  document.querySelectorAll('#decoration-items .item').forEach(item => item.addEventListener('click', () => {
    document.querySelectorAll('#decoration-items .item').forEach(node => node.classList.remove('selected'));
    item.classList.add('selected');
    document.getElementById('preview-grave').className = `grave selectable ${item.dataset.style}`;
  }));

  document.getElementById('save-decoration').addEventListener('click', () => showToast('装扮已保存'));
  document.getElementById('sweep-button').addEventListener('click', event => {
    event.currentTarget.textContent = '今日已来过 · 双方获得金币';
    event.currentTarget.disabled = true;
    coins += 10;
    balance.textContent = String(coins);
    document.getElementById('message-choices').classList.remove('hidden');
    showToast('你 +10 ◎，墓主人 +20 ◎');
  });

  document.querySelectorAll('.message-choices button').forEach(button => button.addEventListener('click', () => {
    showToast(`已留下：${button.textContent}`);
    document.getElementById('message-choices').classList.add('hidden');
  }));

  document.querySelectorAll('.buy').forEach(button => button.addEventListener('click', () => {
    const price = Number(button.dataset.price);
    if (coins < price) return showToast('金币不足');
    coins -= price;
    balance.textContent = String(coins);
    button.textContent = '已拥有';
    button.disabled = true;
    showToast('购买成功，可前往装修试穿');
  }));
})();
