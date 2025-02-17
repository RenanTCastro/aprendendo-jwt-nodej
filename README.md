# JWT Authentication API - Node.js & Express

Este é um projeto simples que demonstra como usar **JSON Web Token (JWT)** em uma API construída com **Node.js** e **Express**.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)

## 📌 Funcionalidades

- **Gerar Token** (`/generateToken`)
- **Verificar Token** (`/verifyToken`)
- **Decodificar Token** (`/decodeToken`)

## 📦 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/jwt-auth-api.git
   cd jwt-auth-api
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Crie um arquivo `.env` e adicione sua chave secreta JWT:
   ```sh
   JWT_SECRET_KEY=sua_chave_secreta_aqui
   ```

4. Inicie o servidor:
   ```sh
   node index.js
   ```

## 🔥 Como Usar

### 1️⃣ Gerar Token
**Rota:** `POST /generateToken`

**Exemplo de requisição:**
```json
{
  "email": "email@com"
}
```

**Resposta:**
```json
{
  "message": "Token criado!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2️⃣ Verificar Token
**Rota:** `POST /verifyToken`

**Exemplo de requisição:**
```json
{
  "token": "seu_token_aqui"
}
```

**Resposta:**
```json
{
	"message": "Token decodificado!",
	"decoded": {
		"header": {
			"alg": "HS256",
			"typ": "JWT",
			"kid": "chave-001"
		},
		"payload": {
			"userId": 123,
			"role": "admin",
			"iat": 1739826039,
			"nbf": 1739826049,
			"exp": 1739833239,
			"aud": "localhost:3000",
			"iss": "api.meusite.com",
			"sub": "usuário123",
			"jti": "token-12345"
		},
		"signature": "XS2_33ph9-ammovCV0JYvYuOX8oKmCqZ7DhPUTT9RR8"
	}
}
```

### 3️⃣ Decodificar Token
**Rota:** `POST /decodeToken`

**Exemplo de requisição:**
```json
{
  "token": "seu_token_aqui"
}
```

**Resposta:**
```json
{
	"message": "Token decodificado!",
	"decoded": {
		"userId": 123,
		"role": "admin",
		"iat": 1739826039,
		"nbf": 1739826049,
		"exp": 1739833239,
		"aud": "localhost:3000",
		"iss": "api.meusite.com",
		"sub": "usuário123",
		"jti": "token-12345"
	}
}
```
