'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment, {
        foreignKey : 'postId',
        as : 'comment'
      })
      Post.hasMany(models.Upvote, {
        foreignKey : 'postId',
        as : 'like'
      })
      Post.belongsTo(models.User, {
        foreignKey : 'userId',
        as : 'user'
      })
      
    }
  }
  Post.init({
    caption: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    upvotesCount : {
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};