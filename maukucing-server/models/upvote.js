'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upvote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Upvote.belongsTo(models.User, {
        foreignKey : 'userId',
        as : 'user'
      })
      Upvote.belongsTo(models.Post, {
        foreignKey : 'postId',
        as : 'post'
      })
    }
  }
  Upvote.init({
    postId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', 
        key: 'id'
      }
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Upvote',
  });
  return Upvote;
};