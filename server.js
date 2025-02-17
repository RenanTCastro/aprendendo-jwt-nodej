const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const api = express();

api.use(express.json());

dotenv.config();

api.listen('3000',()=>{
    console.log("Server is running!")
})

api.post("/generateToken", (req, res) => {
    if(req.body.email !== 'email@com'){
        res.send("Usuário com esse e-mail não encontrado!")
    }

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const payload = {
        userId: 123, 
        role: "admin",
    };
    
    // sign(payload, secretOrPrivateKey, [options, callback])

    const token = jwt.sign(payload, jwtSecretKey, {
        expiresIn: "2h",         // Define quando o token expira. Aqui, o token será válido por 2 horas.
        notBefore: "10s",        // Define um tempo antes do qual o token não pode ser usado. Aqui, só poderá ser usado após 10 segundos.
        algorithm: "HS256",      // Define o algoritmo de assinatura. O padrão é HS256.
        audience: "localhost:3000", // Define quem pode usar o token, útil para restringir o acesso.
        issuer: "api.meusite.com", // Define quem gerou o token, útil para validar a autenticidade da origem.
        subject: "usuário123",   // Define o assunto do token, pode ser um ID de usuário ou um contexto específico.
        jwtid: "token-12345",    // Define um identificador único para o token, útil para evitar reutilização.
        noTimestamp: false,      // Se true, remove o timestamp `iat` do payload. O campo iat (Issued At) representa o timestamp de quando o token foi gerado, ajudando na validação de tempo.
        header: {                // Permite adicionar cabeçalhos personalizados ao JWT.
            kid: "chave-001"     // Exemplo de key ID para identificar a chave usada na assinatura.
        },
        keyid: "chave-001",      // Define o `kid` no cabeçalho, usado para identificação de chaves em sistemas com várias chaves.
        mutatePayload: false,    // Se true, modifica diretamente o objeto `payload` original, aplicando as claims antes da assinatura.
        allowInsecureKeySizes: false, // Se true, permite o uso de chaves RSA menores que 2048 bits (não recomendado por segurança).
        allowInvalidAsymmetricKeyTypes: false // Se true, permite chaves assimétricas incompatíveis com o algoritmo escolhido (não recomendado).
    });

    res.json({
        message: "Token criado!",
        token
    });
});

api.post("/verifyToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido!" });
    }

    // jwt.verify(token, secretOrPublicKey, [options, callback])

    jwt.verify(token, jwtSecretKey, {
        algorithms: ["HS256", "HS384"], // Define os algoritmos permitidos para a verificação
        audience: ["meusite.com", "app.parceiro.com", "localhost:3000"], // Verifica se o token foi emitido para um público específico
        issuer: ["api.meusite.com"], // Verifica se o token foi gerado pelo emissor correto
        jwtid: "token-12345", // Verifica se o token tem um ID específico (jti)
        ignoreExpiration: false, // Se true, ignora a expiração do token (não recomendado)
        ignoreNotBefore: false, // Se true, ignora a claim `nbf` (não recomendado)
        subject: "usuário123", // Verifica se o token pertence ao usuário correto
        clockTolerance: 5, // Tolera até 5 segundos de diferença de horário entre servidores para `nbf` e `exp`
        maxAge: "2h", // Define um tempo máximo que o token pode ter desde sua emissão (independente da expiração)
        clockTimestamp: Math.floor(Date.now() / 1000), // Define um tempo de referência para a verificação do token
        allowInvalidAsymmetricKeyTypes: false, // Se true, permite chaves assimétricas incompatíveis com o algoritmo escolhido (não recomendado)
        complete: true // Retorna um objeto com { payload, header, signature } ao invés do payload puro
    }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido ou expirado!", error: err.message });
        }

        res.json({
            message: "Token válido!",
            decoded
        });
    });
});

api.post("/decodeToken", (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ message: "Token não fornecido!" });
    }

    const decoded = jwt.decode(token, { complete: false });

    res.json({
        message: "Token decodificado!",
        decoded
    });
});