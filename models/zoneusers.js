'use strict'
const {DataTypes} = require('sequelize')

class ZoneUser {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'ZoneUser'
    // 定义模型实行
    this.model = sequelize.define('zoneusers', {
      zoneId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Zone.model)
    this.model.belongsTo(models.User.model)
  }
}

module.exports = ZoneUser
