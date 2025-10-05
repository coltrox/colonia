import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Local = sequelize.define('Local', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        // NOVOS CAMPOS PARA A SEGURANÇA DOS COLONOS
        temperaturaMinima: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 18.0, // Ex: Temp. mínima segura para habitação
        },
        temperaturaMaxima: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 24.0, // Ex: Temp. máxima segura para habitação
        }
    }, {
        timestamps: true,
        tableName: 'locais'
    });

    return Local;
};