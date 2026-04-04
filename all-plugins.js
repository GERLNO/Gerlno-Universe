(function() {

  // 1. 回到頂部
  const goTopBtn = document.createElement('button');
  goTopBtn.innerText = '↑';
  goTopBtn.style.cssText = 'position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,.5);color:#fff;border:none;cursor:pointer;display:none;z-index:999';
  document.body.appendChild(goTopBtn);
  window.addEventListener('scroll', () => {
    goTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  goTopBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // 2. 閱讀進度條
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:#6cf;z-index:9999';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  });

  // 3. 目錄
  setTimeout(() => {
    const headings = document.querySelectorAll('h1,h2,h3');
    if (!headings.length) return;
    const toc = document.createElement('div');
    toc.style.cssText = 'position:fixed;left:20px;top:100px;max-width:220px;max-height:70vh;overflow-y:auto;background:rgba(0,0,0,.3);color:#fff;padding:12px;border-radius:8px;backdrop-filter:blur(6px);z-index:999';
    toc.innerHTML = '<div style="margin-bottom:8px;font-weight:bold">目錄</div>';
    headings.forEach((h, i) => {
      h.id = 'heading-' + i;
      const a = document.createElement('a');
      a.href = '#heading-' + i;
      a.style.cssText = 'display:block;padding:4px 0;color:#ddd;text-decoration:none';
      a.innerText = h.innerText;
      toc.appendChild(a);
    });
    document.body.appendChild(toc);
  }, 500);

  // 4. 搜索
  const files = [
    {name:'README.md',path:'README.md'},
    {name:'LICENSE.md',path:'LICENSE.md'}
  ];
  const btn = document.createElement('button');
  btn.innerText = '🔍 搜索';
  btn.style.cssText = 'position:fixed;top:20px;right:80px;padding:8px 12px;background:rgba(0,0,0,.4);color:#fff;border:1px solid #fff3;border-radius:10px;backdrop-filter:blur(6px);cursor:pointer;z-index:999';
  document.body.appendChild(btn);
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9999;display:none;justify-content:center;align-items:center';
  modal.innerHTML = `<div style="background:#111;padding:24px;border-radius:12px;width:90%;max-width:500px"><input type="text" placeholder="搜索文件" style="width:100%;padding:10px;border-radius:8px;background:#222;color:#fff;border:1px solid #444"><div id="s-result" style="margin-top:12px;max-height:300px;overflow-y:auto"></div></div>`;
  document.body.appendChild(modal);
  const input = modal.querySelector('input');
  const res = modal.querySelector('#s-result');
  btn.onclick = () => modal.style.display = 'flex';
  modal.onclick = e => e.target === modal && (modal.style.display = 'none');
  input.oninput = () => {
    const kw = input.value.toLowerCase();
    res.innerHTML = files.filter(f => f.name.toLowerCase().includes(kw)).map(f => `<a href="${f.path}" style="display:block;padding:8px;color:#ddd">${f.name}</a>`).join('');
  };

  // 5. 深色模式
  const tbtn = document.createElement('button');
  tbtn.innerText = '🌙';
  tbtn.style.cssText = 'position:fixed;top:20px;right:160px;padding:8px 12px;border-radius:10px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;cursor:pointer;z-index:999';
  document.body.appendChild(tbtn);
  let dark = localStorage.getItem('theme') === 'dark';
  const setTheme = () => {
    document.body.style.background = dark ? '#000' : '#fff';
    document.body.style.color = dark ? '#eee' : '#111';
    tbtn.innerText = dark ? '🌙' : '☀️';
  };
  tbtn.onclick = () => { dark = !dark; localStorage.setItem('theme', dark ? 'dark' : 'light'); setTheme(); };
  setTheme();

  // 6. 一鍵複製
  document.querySelectorAll('code,pre').forEach(el => {
    const cbtn = document.createElement('button');
    cbtn.innerText = '複製';
    cbtn.style.cssText = 'position:absolute;top:4px;right:4px;padding:4px 8px;background:#333;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer';
    el.style.position = 'relative';
    el.appendChild(cbtn);
    cbtn.onclick = () => {
      navigator.clipboard.writeText(el.innerText.replace('複製','')).then(()=>{cbtn.innerText='已複製';setTimeout(()=>cbtn.innerText='複製',800);});
    };
  });

  // 7. 平滑滾動
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      t && t.scrollIntoView({ behavior:'smooth' });
    });
  });

  // 8. 外部連結新分頁
  document.querySelectorAll('a').forEach(a => {
    if (!a.href.includes(window.location.hostname)) a.target = '_blank';
  });

  // 9. 字體大小
  const fbtn = document.createElement('button');
  fbtn.innerText = 'Aa';
  fbtn.style.cssText = 'position:fixed;top:20px;right:200px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(fbtn);
  let size = 100;
  fbtn.onclick = () => {
    size = size === 100 ? 115 : size === 115 ? 85 : 100;
    document.body.style.fontSize = size + '%';
  };

  // 10. 列印
  const pbtn = document.createElement('button');
  pbtn.innerText = '🖨️';
  pbtn.style.cssText = 'position:fixed;top:20px;right:240px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(pbtn);
  pbtn.onclick = () => window.print();

  // 11. 點擊效果
  document.addEventListener('click', e => {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:rgba(100,150,255,.3);animation:clickEffect 0.6s forwards;z-index:9999`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 600);
  });
  const styleAnim = document.createElement('style');
  styleAnim.innerHTML = '@keyframes clickEffect{to{opacity:0;transform:translate(-50%,-50%) scale(1.5);}}';
  document.head.appendChild(styleAnim);

  // 12. 圖片燈箱
  document.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.onclick = () => {
      const lb = document.createElement('div');
      lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;justify-content:center;align-items:center';
      const im = new Image();
      im.src = img.src;
      im.style.maxHeight = '90vh';
      lb.appendChild(im);
      document.body.appendChild(lb);
      lb.onclick = () => lb.remove();
    };
  });

  // 13. 載入動畫
  const ld = document.createElement('div');
  ld.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;justify-content:center;align-items:center;z-index:99999';
  ld.innerHTML = '<div style="width:50px;height:50px;border:3px solid #444;border-top:3px solid #6cf;border-radius:50%;animation:spin 1s linear infinite"></div>';
  document.body.appendChild(ld);
  const spinStyle = document.createElement('style');
  spinStyle.innerHTML = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(spinStyle);
  window.addEventListener('load', () => ld.remove());

  // 14. 滾動淡入
  const fadeStyle = document.createElement('style');
  fadeStyle.innerHTML = '.fade-in{opacity:0;transform:translateY(20px);transition:0.6s}.fade-in.visible{opacity:1;transform:translateY(0)}';
  document.head.appendChild(fadeStyle);
  document.body.querySelectorAll('*:not(script):not(style):not(div):not(button)').forEach(el => {
    el.classList.add('fade-in');
  });
  const ob = new IntersectionObserver(es => {
    es.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
  });
  document.querySelectorAll('.fade-in').forEach(el => ob.observe(el));

  // 15. 打字機
  const h1 = document.querySelector('h1');
  if (h1) {
    const txt = h1.innerText;
    h1.innerText = '';
    let i = 0;
    const ty = () => {
      if (i < txt.length) {
        h1.innerText += txt[i++];
        setTimeout(ty, 100);
      }
    };
    setTimeout(ty, 500);
  }

  // 16. 懸浮動畫
  const hoverStyle = document.createElement('style');
  hoverStyle.innerHTML = 'button,a{transition:all 0.2s}button:hover,a:hover{filter:brightness(1.2);transform:scale(1.03)}';
  document.head.appendChild(hoverStyle);

  // 17. 粒子背景
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  let w,h,ps=[];
  const resize = () => {w=c.width=innerWidth;h=c.height=innerHeight;};
  resize();
  window.addEventListener('resize', resize);
  for(let i=0;i<80;i++) ps.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+1});
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#6cf3';
    ps.forEach(p => {ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});
    requestAnimationFrame(draw);
  };
  draw();

  // 18. 視差
  window.addEventListener('scroll', () => {
    document.body.style.backgroundPositionY = -(window.scrollY * 0.3) + 'px';
  });

  // 19. 滑鼠軌跡
  document.addEventListener('mousemove', e => {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:8px;height:8px;background:#6cf;border-radius:50%;pointer-events:none;animation:trail 0.8s forwards;z-index:999`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 800);
  });
  const trailStyle = document.createElement('style');
  trailStyle.innerHTML = '@keyframes trail{to{opacity:0;transform:scale(0.5)}}';
  document.head.appendChild(trailStyle);

  // 20. 滾動提示
  const tip = document.createElement('div');
  tip.innerText = '↓ 滾動閱讀';
  tip.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);color:#fff8;background:rgba(0,0,0,.3);padding:8px 16px;border-radius:20px;animation:bounce 1.5s infinite;z-index:999';
  document.body.appendChild(tip);
  window.addEventListener('scroll', () => {
    tip.style.display = window.scrollY > 200 ? 'none' : 'block';
  });
  const bounceStyle = document.createElement('style');
  bounceStyle.innerHTML = '@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}';
  document.head.appendChild(bounceStyle);

  // 21. 語音朗讀
  const voice = document.createElement('button');
  voice.innerText = '🔊';
  voice.style.cssText = 'position:fixed;top:20px;right:280px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(voice);
  voice.onclick = () => {
    const u = new SpeechSynthesisUtterance(document.body.innerText.slice(0,200));
    speechSynthesis.speak(u);
  };

  // 22. 字體切換
  const ftbtn = document.createElement('button');
  ftbtn.innerText = '字體';
  ftbtn.style.cssText = 'position:fixed;top:20px;right:320px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(ftbtn);
  const fonts = ['system-ui','monospace','serif'];
  let fi=0;
  ftbtn.onclick = () => {
    fi=(fi+1)%fonts.length;
    document.body.style.fontFamily = fonts[fi];
  };

  // 23. 複製鏈接
  const clink = document.createElement('button');
  clink.innerText = '🔗';
  clink.style.cssText = 'position:fixed;top:20px;right:360px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(clink);
  clink.onclick = () => {
    navigator.clipboard.writeText(location.href);
    alert('已複製當前頁面鏈接');
  };

  // 24. 歡迎彈窗
  setTimeout(() => {
    const wm = document.createElement('div');
    wm.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center;z-index:9999';
    wm.innerHTML = `<div style="background:#111;padding:24px 32px;border-radius:12px;color:#fff;text-align:center"><h3>歡迎來到格爾諾宇宙</h3><p>探索完整文檔體系</p><button id="close-wm" style="margin-top:12px;padding:8px 16px;background:#6cf;color:#000;border:none;border-radius:8px;cursor:pointer">確認</button></div>`;
    document.body.appendChild(wm);
    document.querySelector('#close-wm').onclick = () => wm.remove();
  }, 800);

  // 25. 標題高亮
  const hlStyle = document.createElement('style');
  hlStyle.innerHTML = 'h1:target,h2:target,h3:target{background:rgba(100,150,255,.1);padding:4px 8px;border-left:3px solid #6cf}';
  document.head.appendChild(hlStyle);

  // 26. 頁內查找
  const findBtn = document.createElement('button');
  findBtn.innerText = '🔎';
  findBtn.style.cssText = 'position:fixed;top:20px;right:400px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(findBtn);
  findBtn.onclick = () => {
    const kw = prompt('查找頁內文字：');
    if (kw) window.find(kw);
  };

  // 27. 折疊標題
  const fold = document.createElement('button');
  fold.innerText = '📂';
  fold.style.cssText = 'position:fixed;top:20px;right:440px;padding:8px 12px;background:rgba(0,0,0,.3);color:#fff;border:1px solid #fff3;border-radius:10px;cursor:pointer;z-index:999';
  document.body.appendChild(fold);
  fold.onclick = () => {
    document.querySelectorAll('h2,h3').forEach(h => {
      h.style.display = h.style.display === 'none' ? 'block' : 'none';
    });
  };

  // 28. 訪問次數
  const count = document.createElement('div');
  count.style.cssText = 'position:fixed;bottom:20px;left:20px;color:#fff8;background:rgba(0,0,0,.3);padding:6px 10px;border-radius:8px;font-size:12px;z-index:999';
  document.body.appendChild(count);
  let c = parseInt(localStorage.getItem('visit') || 0) + 1;
  localStorage.setItem('visit', c);
  count.innerText = '訪問次數：' + c;

})();
