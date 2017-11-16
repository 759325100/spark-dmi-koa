'use strict'
const {DataTypes} = require('sequelize')

class ExtCmd {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'ExtCmd'
    // 定义模型实行
    this.model = sequelize.define('extcmd', {
      action: DataTypes.STRING,
      cmd: DataTypes.STRING,
      split: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.ExtDevice.model, {foreignKey: 'cmdId', sourceKey: 'id'})
  }
}

module.exports = ExtCmd
