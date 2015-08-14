'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len:{args: [1,400], msg: "Comment must be between 1 and 400 characters!"}
      }
    },
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};