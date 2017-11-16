'use strict'
const {DataTypes} = require('sequelize')

class Scene {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'Scene'
    // 定义模型实行
    this.model = sequelize.define('scenes', {
      name: DataTypes.STRING,
      code: DataTypes.INTEGER,
      icon: DataTypes.STRING,
      cmd: DataTypes.STRING,
      remark: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.DeviceScene.model)
  }
}

module.exports = Scene