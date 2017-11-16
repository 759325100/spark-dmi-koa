'use strict'
const {DataTypes} = require('sequelize')

class DeviceNode {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'DeviceNode'
    // 定义模型实行
    this.model = sequelize.define('devicenodes', {
      deviceId: DataTypes.INTEGER,
      devicenodename: DataTypes.STRING,
      devicetype: DataTypes.INTEGER,
      devicenodetype: DataTypes.INTEGER,
      nodeno: DataTypes.INTEGER,
      ison: DataTypes.INTEGER,
      sId: DataTypes.INTEGER,
      scenarioId: DataTypes.INTEGER,
      brightness: DataTypes.INTEGER,
      cct: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Device.model)
    this.model.hasMany(models.DeviceRing.model)
  }
}

module.exports = DeviceNode
