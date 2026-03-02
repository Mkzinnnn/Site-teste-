<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bem-vindo</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.container {
    background: white;
    width: 400px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    position: absolute;
    opacity: 0;
    transform: scale(0.9);
    transition: 0.4s ease;
}

.container.active {
    opacity: 1;
    transform: scale(1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

button {
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
}

.primary-btn {
    background: #667eea;
    color: white;
}

.primary-btn:hover {
    background: #5563d6;
    transform: scale(1.05);
}

.google-btn {
    background: white;
    border: 2px solid #ddd;
}

.google-btn:hover {
    background: #f1f1f1;
    transform: scale(1.05);
}

input[type="text"], input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

.rules {
    max-height: 150px;
    overflow-y: auto;
    font-size: 14px;
    margin-bottom: 15px;
}

.fade-out {
    animation: fadeOut 0.4s forwards;
}

@keyframes fadeOut {
    to {
        opacity: 0;
        transform: scale(0.9);
    }
}

.success-icon {
    font-size: 50px;
    text-align: center;
    color: #4CAF50;
    animation: pop 0.6s ease;
}

@keyframes pop {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
}

</style>
</head>
<body>

<!-- LOGIN -->
<div class="container active" id="loginPage">
    <h2>Login</h2>
    <input type="text" placeholder="Usuário">
    <input type="password" placeholder="Senha">
    <button class="primary-btn" onclick="nextPage('loginPage','agePage')">Entrar</button>
    <button class="google-btn" onclick="nextPage('loginPage','agePage')">
        🔵 Entrar com Google
    </button>
</div>

<!-- IDADE -->
<div class="container" id="agePage">
    <h2>Confirmação de Idade</h2>
    <p>Você tem 18 anos ou mais?</p>
    <button class="primary-btn" onclick="nextPage('agePage','rulesPage')">Sim, tenho 18+</button>
    <button onclick="alert('Você precisa ter 18 anos para continuar.')">Não</button>
</div>

<!-- REGRAS -->
<div class="container" id="rulesPage">
    <h2>Regras do Site</h2>
    <div class="rules">
        <p>✔ Respeite todos os usuários.</p>
        <p>✔ Não pratique preconceito.</p>
        <p>✔ Não compartilhe informações pessoais.</p>
        <p>✔ Não publique conteúdo ilegal.</p>
        <p>✔ Siga todas as leis locais.</p>
    </div>
    <button class="primary-btn" onclick="nextPage('rulesPage','readyPage')">Aceitar e Continuar</button>
</div>

<!-- FINAL -->
<div class="container" id="readyPage">
    <div class="success-icon">✔</div>
    <h2>Tudo pronto!</h2>
    <p style="text-align:center;">Seu acesso foi liberado com sucesso.</p>
    <button class="primary-btn" onclick="location.reload()">Voltar ao Início</button>
</div>

<script>

function nextPage(current, next) {
    let currentPage = document.getElementById(current);
    let nextPage = document.getElementById(next);

    currentPage.classList.remove("active");
    currentPage.classList.add("fade-out");

    setTimeout(() => {
        currentPage.classList.remove("fade-out");
        nextPage.classList.add("active");
    }, 400);
}

</script>

</body>
</html>
