(function () {
  const STORAGE_KEY = 'versiculo-do-dia-fechado';
  const hojeStr = new Date().toDateString();

  if (localStorage.getItem(STORAGE_KEY) === hojeStr) return;

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
      const botaoFechar = document.getElementById('fechar-versiculo');

      if (!banner || !textoEl || !refEl || !botaoFechar) return;

      textoEl.textContent = `“${versiculo.texto}”`;
      refEl.textContent = versiculo.ref;
      banner.style.display = 'block';

      const fecharBanner = () => {
        banner.style.display = 'none';
        localStorage.setItem(STORAGE_KEY, hojeStr);
      };

      botaoFechar.addEventListener('click', fecharBanner);
      setTimeout(() => {
        if (banner.style.display !== 'none') fecharBanner();
      }, 20000);
    })
    .catch((err) => console.error('Erro ao carregar versículo do dia:', err));
})();
