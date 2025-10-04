API de Monitoramento de Temperatura e Mantimentos
📖 Sobre o Projeto
Esta é uma API RESTful desenvolvida em Node.js com Express e Sequelize, projetada para monitorar a temperatura de locais de armazenamento (como geladeiras e freezers) e gerenciar os mantimentos contidos neles. O sistema permite o cadastro de locais, mantimentos com suas faixas de temperatura ideais, e o registro contínuo de logs de temperatura, garantindo a conservação e segurança dos produtos.

O banco de dados utilizado é o PostgreSQL, e o projeto está configurado para se conectar facilmente a serviços em nuvem como o Supabase.

✨ Funcionalidades Principais
Gestão de Locais: Crie, liste e detalhe locais de armazenamento.

Gestão de Mantimentos: Crie e liste mantimentos, especificando suas temperaturas mínima e máxima ideais.

Associação Flexível: Associe múltiplos mantimentos a múltiplos locais através de uma relação N:M.

Registro de Temperatura: Adicione logs de temperatura para qualquer local cadastrado, criando um histórico para análise.

Consulta Detalhada: Obtenha todos os dados de um local, incluindo os mantimentos associados e seu histórico completo de temperaturas.

🛠️ Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript no servidor.

Express.js: Framework para a construção da API.

Sequelize: ORM (Object-Relational Mapper) para interagir com o banco de dados PostgreSQL.

PostgreSQL: Banco de dados relacional.

Dotenv: Para gerenciamento de variáveis de ambiente.

🚀 Como Executar o Projeto
Siga os passos abaixo para configurar e rodar a aplicação localmente.

Pré-requisitos
Node.js (versão 18 ou superior)

NPM ou Yarn

Uma instância de banco de dados PostgreSQL acessível.

1. Clone o Repositório (se aplicável)
git clone [https://seu-repositorio-aqui.git](https://seu-repositorio-aqui.git)
cd back-end

2. Instale as Dependências
Execute o comando abaixo para instalar todos os pacotes necessários:

npm install

3. Configure as Variáveis de Ambiente
Crie um arquivo chamado .env na raiz da pasta back-end. Copie o conteúdo do exemplo abaixo e preencha com suas credenciais do banco de dados.

.env.example

# Configurações do Servidor
PORT=3000

# Credenciais do Banco de Dados (PostgreSQL/Supabase)
DB_USER=postgres
DB_PASSWORD=vamopranasa
DB_NAME=postgres
DB_HOST=db.wttlxcunyuwcjikawnkc.supabase.co
DB_PORT=5432

# Chave para JWT (funcionalidade futura)
JWT_SECRET=sua_chave_secreta_aqui

4. Inicie o Servidor
Para rodar o servidor em modo de desenvolvimento (com reinicialização automática a cada alteração), use:

npm run dev

O servidor estará disponível em http://localhost:3000.

⚙️ Endpoints da API
A URL base para todos os endpoints é /api.

Locais
POST /locais: Cria um novo local.

Body: { "nome": "Freezer Estoque", "descricao": "Freezer vertical de backup" }

Resposta (201): O objeto do local criado.

GET /locais: Lista todos os locais cadastrados.

Resposta (200): Um array de objetos de locais.

Mantimentos
POST /mantimentos: Cria um novo mantimento.

Body: { "nome": "Vacina T-Virus", "temperaturaMinima": 2, "temperaturaMaxima": 8 }

Resposta (201): O objeto do mantimento criado.

GET /mantimentos: Lista todos os mantimentos cadastrados.

Resposta (200): Um array de objetos de mantimentos.

Associações e Logs
POST /locais/:localId/add-mantimento: Associa um mantimento existente a um local.

Parâmetros: localId (ID do local na URL).

Body: { "mantimentoId": 1 }

Resposta (200): Mensagem de sucesso.

POST /locais/:localId/logs: Adiciona um novo registro de temperatura para um local.

Parâmetros: localId (ID do local na URL).

Body: { "temperatura": -18.5 }

Resposta (201): O objeto do log criado.

GET /locais/:localId/details: Retorna os detalhes completos de um local, incluindo seus mantimentos e logs de temperatura.

Parâmetros: localId (ID do local na URL).

Resposta (200): Um objeto de local com arrays aninhados para Mantimentos e logs.