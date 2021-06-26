const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { beforeCreate, beforeUpdate } = require("./Post");

class User extends Model {}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        username:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },

        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(userData){
                userData.password = await bcrypt.hash(passwordData.password, 10)
                return userData
            },
    
            async beforeUpdate(updatedData){
                updatedData.password = await bcrypt.hash(updatedData.password, 10)
                return userData
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTablename: true,
        underscored: true,
        modelName: "User"
    }
);

module.exports = User;