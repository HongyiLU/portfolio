// 用 Playwright 为 public/play/ 下的网页游戏实拍截图，替换陈列页占位图。
// 用法：先启动作品集 dev 服务器（localhost:4321），再 node tools/capture_game_shots.mjs
// 新游戏接入时，仿照 stellaris/roguetetris 的段落扩展即可。
import { chromium } from 'playwright';
import path from 'node:path';

const BASE = 'http://localhost:4321';
const OUT = path.resolve('public/images/games');

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader-webgl']
});

const want = (name) => process.argv.slice(2).length === 0 || process.argv.slice(2).includes(name);

try {
  // ---------- Stellaris Web（Three.js，银河视图 + 选中星系面板） ----------
  if (want('stellaris')) {
    const page = await browser.newPage({ viewport: { width: 1360, height: 850 } });
    await page.goto(`${BASE}/play/stellaris-web/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(6000); // 等银河生成与渲染稳定
    await page.screenshot({ path: path.join(OUT, 'stellaris-web-shot-1.jpg'), type: 'jpeg', quality: 88 });
    console.log('✓ stellaris-web-shot-1.jpg（银河视图）');

    // 网格扫描点击画布，直到选中某个星系（侧栏面板的 empty 提示消失）
    const selected = async () =>
      (await page.locator('aside.panel .empty').count()) === 0;
    let hit = false;
    outer: for (const gx of [0.5, 0.42, 0.58, 0.35, 0.65, 0.46, 0.54]) {
      for (const gy of [0.5, 0.42, 0.58, 0.35, 0.65]) {
        await page.mouse.click(Math.round(1360 * gx), Math.round(850 * gy));
        await page.waitForTimeout(700);
        if (await selected()) {
          hit = true;
          break outer;
        }
      }
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, 'stellaris-web-shot-2.jpg'), type: 'jpeg', quality: 88 });
    console.log(hit ? '✓ stellaris-web-shot-2.jpg（星系面板已选中）' : '△ 未能选中星系，shot-2 为银河视图第二张');
    await page.close();
  }

  // ---------- RogueTetris（Canvas 2D，局内 + 三选一） ----------
  if (want('roguetetris')) {
    const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
    await page.goto(`${BASE}/play/roguetetris/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    const canvas = page.locator('canvas#game');

    await page.keyboard.press('Enter'); // 开始游戏
    await page.waitForTimeout(800);

    // 打 12 个方块：微调位置 + 硬降，形成真实堆叠
    for (let i = 0; i < 12; i++) {
      const taps = i % 3; // 左右移动 0-2 次
      for (let t = 0; t < taps; t++) {
        await page.keyboard.press(i % 2 ? 'ArrowRight' : 'ArrowLeft');
        await page.waitForTimeout(60);
      }
      if (i % 2 === 0) {
        await page.keyboard.press('ArrowUp'); // 旋转
        await page.waitForTimeout(60);
      }
      await page.keyboard.press('Space'); // 硬降
      await page.waitForTimeout(420);
      if (await page.evaluate(() => window.__game?.phase) === 'upgrade-pick') break;
    }
    await canvas.screenshot({ path: path.join(OUT, 'roguetetris-shot-1.png') });
    console.log('✓ roguetetris-shot-1.png（局内）');

    // 构造"差一格消行"局面：底部两行填满第 10 列，消行计数设为 4/5，
    // 再把当前方块换成竖直 I 落入第 10 列 → 真实触发波次三选一
    await page.evaluate(() => {
      const g = window.__game;
      const grid = g.engine.board.grid;
      const TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      for (let x = 0; x < 10; x++) {
        if (x === 9) continue;
        grid[19][x] = TYPES[(x + 19) % 7];
        grid[18][x] = TYPES[(x + 18) % 7];
      }
      g.engine.lines = 4;
    });
    const iX = await page.evaluate(() => {
      const { getCells } = window.__tetris;
      for (const rot of [1, 3, 2, 0]) {
        for (let x = 0; x < 10; x++) {
          try {
            const cells = getCells('I', rot, x, 0);
            if (cells.every((c) => c[0] === 9)) return { rot, x };
          } catch { /* 该旋转态不适用则跳过 */ }
        }
      }
      return null;
    });
    let upgraded = false;
    if (iX) {
      await page.evaluate(({ rot, x }) => {
        window.__game.engine.current = { type: 'I', rotation: rot, x, y: 0 };
      }, iX);
      await page.keyboard.press('Space');
      await page.waitForTimeout(600);
    }
    if ((await page.evaluate(() => window.__game?.phase)) === 'upgrade-pick') {
      upgraded = true;
    } else {
      // 兜底：继续正常打，最多 30 个方块等自然三选一
      for (let i = 0; i < 30; i++) {
        if ((await page.evaluate(() => window.__game?.phase)) === 'upgrade-pick') {
          upgraded = true;
          break;
        }
        for (let t = 0; t < 2; t++) {
          await page.keyboard.press(i % 2 ? 'ArrowLeft' : 'ArrowRight');
          await page.waitForTimeout(50);
        }
        await page.keyboard.press('Space');
        await page.waitForTimeout(380);
      }
    }
    if (upgraded) {
      await page.waitForTimeout(400);
      await canvas.screenshot({ path: path.join(OUT, 'roguetetris-shot-2.png') });
      console.log('✓ roguetetris-shot-2.png（三选一构筑界面）');
      await page.keyboard.press('1'); // 选第一个强化继续
    } else {
      await canvas.screenshot({ path: path.join(OUT, 'roguetetris-shot-2.png') });
      console.log('△ 未能到达三选一，shot-2 为局内第二张');
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log('截图完成');
