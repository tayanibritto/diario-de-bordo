Título: Diário de Bordo

Descrição: Aplicativo Web Progressivo (PWA) que permite o registro de atividades diárias do usuário. A aplicação funciona offline, permite instalação na tela inicial e persiste os dados localmente.

Tecnologias utilizadas: HTML5 · CSS3 · JavaScript (ES6+) · Web APIs (LocalStorage, Service Worker) · Progressive Web App (PWA)

Instalação:

Passos para clonar e rodar: git clone https://github.com/tayanibritto/diario-de-bordo.git · cd diario-de-bordo · abrir o arquivo index.html no navegador, clicando duas vezes no arquivo ou · usando uma extensão como Live Server (opcional): abra o projeto no Visual Studio Code, instale a extensão Live Server (caso ainda não tenha), clique com o botão direito no arquivo index.html e selecione "Open with Live Server"

Funcionalidades:

- Criar entradas com título, descrição e data;
- Listar entradas registradas;
- Remover entradas
- Ordenação automática por data;
- Armazenamento local com LocalStorage;
- Funciona offline;
- Instalável como aplicativo (PWA)

Estrutura do Projeto:

- /icons
    - icon-192.png
    - icon-512.png
- index.html
- manifest.json
- script.js
- service-worker.js
- style.css

Observações: O projeto foi validado com Lighthouse, obtendo nota 100 em performance, accessibility, best practices e SEO.
