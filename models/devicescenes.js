'use strict'
const {DataTypes} = require('sequelize')

class DeviceScene {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'DeviceScene'
    // 定义模型实行
    this.model = sequelize.define('devicescenes', {
      deviceId: DataTypes.STRING,
      sceneId: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Device.model)
    this.model.belongsTo(models.Scene.model)
  }
}

module.exports = DeviceScene