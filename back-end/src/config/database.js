import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,     
  host: process.env.DB_HOST,         
  port: process.env.DB_PORT,         
  dialect: 'postgres',
  
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false, 
});

export default sequelize;