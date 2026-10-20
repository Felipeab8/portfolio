# Portfólio · Felipe Antunes Bachiega

Site pessoal publicado em <https://felipeab8.github.io/portfolio/>.
HTML, CSS e JavaScript puros: sem build, sem dependências, abre direto no navegador.

## Estrutura

```
index.html                 conteúdo (textos em PT e EN lado a lado)
styles.css                 tema claro/escuro, layout e responsivo
script.js                  troca de idioma, copiar e-mail, ano do rodapé
assets/felipe-*.jpg        foto: retrato 4:5 (480 e 800 px) e avatar quadrado para o celular
assets/projetos/*.jpg      capturas dos projetos (800 e 1600 px de largura)
assets/og.jpg              imagem de prévia ao compartilhar o link (1200 × 630)
```

## Idioma

Cada texto aparece duas vezes no `index.html`, uma com `lang="pt-BR"` e outra com
`lang="en"`; o CSS mostra só a do idioma ativo. O idioma vem, nesta ordem, de
`?lang=pt` / `?lang=en` na URL, da última escolha no botão PT/EN ou do idioma do navegador.

Link direto em inglês: <https://felipeab8.github.io/portfolio/?lang=en>

## Adicionar um projeto

1. Tire uma captura da página do projeto em 1600 × 1000 e salve em `assets/projetos/`
   como `nome-1600.jpg`, mais uma cópia reduzida `nome-800.jpg`.
2. Copie um bloco `<article class="project">` no `index.html` e troque textos, links e imagens.
