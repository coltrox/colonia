const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIMULAÇÃO: Armazenamento de usuários em memória
const users = [{
  id: 'user-monitor',
  username: 'monitor',
  passwordHash: bcrypt.hashSync('aurora2025', 10), // Senha: aurora2025
}];

// Middleware de Autenticação
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Controlador de Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Gera um JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } 
  );

  res.json({ message: 'Login bem-sucedido', token });
};

module.exports = {
  login,
  verifyToken
};