# 📸 ReactGram

> Um clone da interface do Instagram construído com React, focado em demonstrar a manipulação de estado, autenticação e interação com uma API REST.

O ReactGram permite que os usuários criem contas, postem fotos, interajam com as publicações de outros através de curtidas e comentários, replicando as funcionalidades centrais de uma rede social de imagens.

---

### ✨ Funcionalidades

* **Autenticação Completa:** Cadastro e login de usuários.
* **Feed de Fotos:** Página inicial com as fotos mais recentes de todos os usuários.
* **Publicação de Fotos:** Usuários logados podem fazer upload de uma imagem com legenda.
* **Perfil de Usuário:** Página de perfil exibindo as fotos postadas pelo usuário.
* **Interatividade:** Funcionalidade de curtir e comentar nas fotos.

---

### 🛠️ Tecnologias Utilizadas

* **[React](https://react.dev/)** - Biblioteca para a construção de toda a interface.
* **[React Router](https://reactrouter.com/)** - Para a navegação entre as páginas da aplicação.
* **[Context API](https://react.dev/learn/passing-data-deeply-with-context)** - Para prover o estado de autenticação de forma global.
* **Hooks Customizados** - Para abstrair e reutilizar lógicas complexas (ex: autenticação, requisições API).
* **JavaScript (ES6+)** - Linguagem utilizada para toda a lógica do front-end.
* **CSS** - Para a estilização dos componentes.

---

### 🚀 Como Executar o Projeto

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
* O **servidor back-end** do projeto deve estar em execução.

**Configuração do Ambiente:**

1.  Na raiz do projeto front-end, crie um arquivo chamado `.env.local`.
2.  Dentro deste arquivo, adicione a URL da sua API back-end:

    ```env
    VITE_REACT_APP_API_URL="http://localhost:5000/api"
    ```
    *Substitua a URL pelo endereço correto da sua API, caso seja diferente.*

**Instalação e Execução:**

1.  Clone o repositório: `git clone https://github.com/davismarciel/react-gram.git`
2.  Acesse a pasta: `cd react-gram`
3.  Instale as dependências: `npm install`
4.  Execute a aplicação: `npm run dev`
