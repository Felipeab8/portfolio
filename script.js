// ============================================
// IDIOMA
// O HTML traz os textos em PT e EN; o CSS mostra só o idioma ativo.
// Aqui ficam o título da aba, os textos alternativos e a escolha salva.
// ============================================
const root = document.documentElement;

const titles = {
  pt: 'Felipe Antunes Bachiega | Consultor Jr na KPMG',
  en: 'Felipe Antunes Bachiega | Advisory Associate at KPMG'
};

const copyMessages = {
  pt: { done: 'E-mail copiado', failed: 'Não foi possível copiar. Selecione o endereço acima.' },
  en: { done: 'Email copied', failed: 'Could not copy. Select the address above instead.' }
};

function currentLang() {
  return root.dataset.lang === 'en' ? 'en' : 'pt';
}

function setLang(lang, save) {
  const suffix = lang === 'en' ? 'En' : 'Pt';

  root.dataset.lang = lang;
  root.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.title = titles[lang];

  document.querySelectorAll('[data-set-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setLang === lang));
  });

  document.querySelectorAll('[data-alt-pt]').forEach((img) => {
    img.alt = img.dataset['alt' + suffix];
  });

  document.querySelectorAll('[data-aria-pt]').forEach((el) => {
    el.setAttribute('aria-label', el.dataset['aria' + suffix]);
  });

  if (save) {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      // Sem armazenamento (aba anônima, cookies bloqueados): vale só para esta visita.
    }
  }
}

document.querySelectorAll('[data-set-lang]').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.setLang, true));
});

setLang(currentLang(), false);

// ============================================
// COPIAR E-MAIL
// ============================================
const copyButton = document.querySelector('[data-copy]');
const copyStatus = document.querySelector('[data-copy-status]');
let copyTimer;

function copyWithSelection(text) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  return ok;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Cai para o método antigo abaixo.
    }
  }
  try {
    return copyWithSelection(text);
  } catch (e) {
    return false;
  }
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const ok = await copyText(copyButton.dataset.copy);
    const messages = copyMessages[currentLang()];

    copyStatus.textContent = ok ? messages.done : messages.failed;
    if (!ok) {
      // Deixa o endereço selecionado para a pessoa copiar na mão.
      const email = document.querySelector('.email');
      if (email) window.getSelection().selectAllChildren(email);
      return;
    }

    copyButton.classList.add('is-copied');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copyButton.classList.remove('is-copied');
      copyStatus.textContent = '';
    }, 2200);
  });
}

// ============================================
// ANO DO RODAPÉ
// ============================================
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
