# Sistema de Posts - Desafio Pontue

Um sistema completo de gerenciamento de posts desenvolvido com React, TypeScript e Vite. Permite autenticação de usuários, criação, edição e visualização de posts com interface moderna e responsiva.

## 🚀 Funcionalidades

### ✅ Implementadas

- **Autenticação completa**: Login, registro e logout de usuários
- **Gerenciamento de posts**: Criar, editar, visualizar e deletar posts
- **Listagem paginada**: Posts organizados com paginação
- **Área do usuário**: Visualização de dados pessoais e posts próprios
- **Interface responsiva**: Design moderno com Tailwind CSS
- **Roteamento protegido**: Páginas que requerem autenticação
- **Validação de formulários**: Validação com Zod e React Hook Form
- **Gerenciamento de estado**: Context API para autenticação

### 🎯 Extras

- **Visualização individual**: Página dedicada para cada post
- **Edição inline**: Editar posts diretamente na página de visualização
- **Controle de permissões**: Apenas o autor pode editar/deletar seus posts
- **Token management**: Verificação automática de expiração de token

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **TanStack Query** - Gerenciamento de estado servidor
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd desafio_pontue
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

O arquivo `.env` já está configurado com a API do desafio:

```env
VITE_API_URL='https://desafio.pontue.com.br'
```

### 4. Execute o projeto

```bash
npm run dev
# ou
yarn dev
```

### 5. Acesse a aplicação

Abra o navegador e acesse: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Configuração da API
│   └── projectApi.tsx
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── ProtectedRoute.tsx
│   ├── Auth/             # Componentes de autenticação
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ModalAuth.tsx
│   └── Post/             # Componentes de posts
│       ├── Post.tsx
│       ├── CreatePost.tsx
│       └── Pagination.tsx
├── contexts/             # Context API
│   └── UserContext/
├── hooks/                # Custom hooks
│   ├── useUser.tsx
│   ├── Auth/            # Hooks de autenticação
│   ├── Posts/           # Hooks de posts
│   └── User/            # Hooks de usuário
├── pages/                # Páginas da aplicação
│   ├── Home.tsx
│   ├── PostPage.tsx
│   ├── User.tsx
│   └── NotFound.tsx
└── routes/               # Configuração de rotas
    └── Router.tsx
```

## 🔧 Scripts Disponíveis

```bash
# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build de produção
npm run preview

# Linting
npm run lint
```

## 🌟 Como usar o sistema

### 1. **Página Inicial**

- Visualize todos os posts públicos
- Navegue entre as páginas usando a paginação
- Clique em "Entrar" ou "Cadastrar" para se autenticar

### 2. **Autenticação**

- **Registro**: Crie uma conta com nome, email e senha
- **Login**: Faça login com email e senha
- **Logout**: Use o botão "Sair" no header

### 3. **Após Login**

- **Criar Posts**: Use o botão "Criar Post" na página inicial
- **Ver Seus Dados**: Clique no seu nome no header → "Meus Dados e Posts"
- **Editar Posts**: Clique em qualquer post seu para editá-lo
- **Deletar Posts**: Use o botão "Deletar" na página do post

### 4. **Navegação**

- **Home**: Lista todos os posts públicos
- **Post Individual**: Clique em qualquer post para visualizá-lo
- **Área do Usuário**: Acesse via dropdown no header

## 🛡️ Segurança

- **Rotas Protegidas**: Páginas que requerem login
- **Controle de Permissões**: Usuários só podem editar/deletar seus próprios posts

## 🎨 Interface

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Tema Moderno**: Interface limpa e intuitiva

## 🚧 Possíveis Melhorias Futuras

- [ ] Testes automatizados (Jest + Testing Library)
- [ ] Modo escuro/claro
- [ ] Upload de imagens nos posts
- [ ] Sistema de comentários
- [ ] Busca e filtros avançados
- [ ] Notificações em tempo real
- [ ] Cache offline

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
