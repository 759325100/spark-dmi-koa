'use strict'
const {DataTypes} = require('sequelize')

class UserGroup {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'UserGroup'
    // 定义模型实行
    this.model = sequelize.define('usergroups', {
      usergroupname: DataTypes.STRING,
      prefix: DataTypes.STRING
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.User.model)
  }
}

module.exports = UserGroup
