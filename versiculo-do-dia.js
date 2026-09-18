(function () {
  const STORAGE_KEY = 'versiculo-do-dia-fechado';
  const DURATION_SECONDS = 20;
  const hojeStr = new Date().toDateString();

  if (localStorage.getItem(STORAGE_KEY) === hojeStr) return;

  function getSafeBottomOffset() {
    const margin = 16;
    const viewportHeight = window.innerHeight;
    let maxOffset = margin;

    document.querySelectorAll('body *').forEach((el) => {
      if (el.id === 'versiculo-banner' || el.closest('#versiculo-banner')) return;
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed') return;
      const rect = el.getBoundingClientRect();
      if (rect.height === 0 || rect.bottom < viewportHeight - 5) return;
      const distanceFromBottom = viewportHeight - rect.top;
      if (distanceFromBottom > maxOffset) maxOffset = distanceFromBottom;
    });

    return maxOffset + margin;
  }

  fetch('/versiculos.json')
    .then((r) => r.json())
    .then((versiculos) => {
      const hoje = new Date();
      const indice = (
        hoje.getFullYear() * 1000 +
        hoje.getMonth() * 100 +
        hoje.getDate()
      ) % versiculos.length;

      const versiculo = versiculos[indice];
      const banner = document.getElementById('versiculo-banner');
      const textoEl = document.getElementById('versiculo-texto');
      const refEl = document.getElementById('versiculo-ref');
      const timerEl = document.getElementById('versiculo-timer');
      const botaoFechar = document.getElementById('fechar-versiculo');

      if (!banner || !textoEl || !refEl || !botaoFechar) return;

      textoEl.textContent = `“${versiculo.texto}”`;
      refEl.textContent = versiculo.ref;
      banner.style.bottom = `${getSafeBottomOffset()}px`;
      banner.style.display = 'block';

      let intervalId = null;

      const fecharBanner = () => {
        if (intervalId) clearInterval(intervalId);
        banner.style.display = 'none';
        localStorage.setItem(STORAGE_KEY, hojeStr);
      };

      let remaining = DURATION_SECONDS;
      if (timerEl) timerEl.textContent = `${remaining}s`;

      intervalId = setInterval(() => {
        remaining -= 1;
        if (timerEl) timerEl.textContent = `${remaining}s`;
        if (remaining <= 0) fecharBanner();
      }, 1000);

      botaoFechar.addEventListener('click', fecharBanner);
      window.addEventListener('resize', () => {
        banner.style.bottom = `${getSafeBottomOffset()}px`;
      });
    })
    .catch((err) => console.error('Erro ao carregar versículo do dia:', err));
})();
