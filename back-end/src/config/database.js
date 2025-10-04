import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME,    
  host: process.env.DB_HOST,         
  port: process.env.DB_PORT,         
  dialect: 'postgres',
  logging: false,  
});

export default sequelize;
