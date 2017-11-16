'use strict'
const {DataTypes} = require('sequelize')

class DeviceRing {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'DeviceRing'
    // 定义模型实行
    this.model = sequelize.define('devicering', {
      devicenodeId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
      nodeno: DataTypes.INTEGER,
      ringname: DataTypes.STRING,
      ringno: DataTypes.INTEGER,
      ison: DataTypes.INTEGER,
      brightness: DataTypes.INTEGER,
      R: DataTypes.INTEGER,
      G: DataTypes.INTEGER,
      B: DataTypes.INTEGER,
      W: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.DeviceNode.model)
  }
}

module.exports = DeviceRing
