
// CompraBem Navigation & Showcase Controller
(function() {
  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registrado:', reg.scope))
        .catch(err => console.warn('Falha SW:', err));
    });
  }

  // Network Offline Banner
  function updateOnlineStatus() {
    let banner = document.getElementById('offline-indicator');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'offline-indicator';
      banner.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:99999;background:#1F5A42;color:#fff;padding:8px 16px;border-radius:24px;font-family:sans-serif;font-size:13px;display:none;align-items:center;gap:8px;box-shadow:0 4px 16px rgba(0,0,0,0.2);';
      banner.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#E7A93B;"></span> <strong>Modo Offline Ativo</strong> (Dados em cache)';
      document.body.appendChild(banner);
    }
    banner.style.display = navigator.onLine ? 'none' : 'flex';
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  document.addEventListener('DOMContentLoaded', updateOnlineStatus);

  // Floating Showcase Navigator Menu
  document.addEventListener('DOMContentLoaded', () => {
    const screens = [
      { name: '1. Landing Page', url: '/index.html', icon: 'home' },
      { name: '2. Login & Autenticação', url: '/login.html', icon: 'lock' },
      { name: '3. Lista por Corredor', url: '/lista.html', icon: 'edit_note' },
      { name: '4. Meu Perfil Nutri & LGPD', url: '/perfil-nutri.html', icon: 'person' }
    ];

    const currentPath = window.location.pathname.replace(/^\//, '') || 'index.html';

    const showcaseBtn = document.createElement('div');
    showcaseBtn.id = 'comprabem-showcase-root';
    showcaseBtn.innerHTML = `
      <button id="showcase-trigger" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 99998;
        background: #0c6443;
        color: white;
        border: 2px solid #a4f3c8;
        padding: 10px 18px;
        border-radius: 9999px;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 8px 24px rgba(12, 100, 67, 0.35);
        transition: all 0.2s ease;
      " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
        Mostruário de Telas (${screens.length})
      </button>

      <div id="showcase-modal" style="
        position: fixed;
        bottom: 74px;
        right: 20px;
        width: 320px;
        max-height: 480px;
        background: #ffffff;
        color: #0f1f19;
        border: 1px solid #bfc9c0;
        border-radius: 18px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        z-index: 99998;
        display: none;
        flex-direction: column;
        overflow: hidden;
        font-family: 'Inter', system-ui, sans-serif;
      ">
        <div style="padding: 14px 18px; background: #0c6443; color: white; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 800; font-size: 14px;">CompraBem Mostruário</div>
            <div style="font-size: 11px; opacity: 0.85;">${screens.length} Telas Interligadas</div>
          </div>
          <button id="showcase-close" style="background:none;border:none;color:white;font-size:18px;cursor:pointer;">✕</button>
        </div>
        <div style="overflow-y: auto; padding: 8px 0; flex: 1;">
          ${screens.map(s => {
            const isActive = currentPath.endsWith(s.url.replace(/^\//, '')) || (currentPath === '' && s.url === '/index.html');
            return `
              <a href="${s.url}" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 18px;
                text-decoration: none;
                color: ${isActive ? '#0c6443' : '#24342e'};
                font-size: 13px;
                font-weight: ${isActive ? '700' : '500'};
                background: ${isActive ? '#dff2e9' : 'transparent'};
                border-left: ${isActive ? '4px solid #0c6443' : '4px solid transparent'};
                transition: background 0.15s;
              " onmouseover="if(!${isActive}) this.style.background='#f0fdf4'" onmouseout="if(!${isActive}) this.style.background='transparent'">
                <span>${s.name}</span>
                ${isActive ? '<span style="font-size:11px;background:#0c6443;color:white;padding:2px 6px;border-radius:6px;">Atual</span>' : '<span style="opacity:0.4;">→</span>'}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(showcaseBtn);

    const trigger = document.getElementById('showcase-trigger');
    const modal = document.getElementById('showcase-modal');
    const close = document.getElementById('showcase-close');

    trigger.addEventListener('click', () => {
      modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    });
    close.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
})();
