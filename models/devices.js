'use strict'
const {DataTypes} = require('sequelize')

class Device {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'Device'
    // 定义模型实行
    this.model = sequelize.define('devices', {
      devicename: DataTypes.STRING,
      coreid: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      iphoneidentify: DataTypes.STRING,
      androididentify: DataTypes.STRING,
      maindevice: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      ison: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.DeviceGroup.model)
    this.model.belongsTo(models.User.model)
    this.model.hasMany(models.DeviceNode.model)
    this.model.hasMany(models.ZoneDevice.model, {foreignKey: 'deviceId', sourceKey: 'id'})
    this.model.hasMany(models.DeviceScene.model)
    this.model.hasMany(models.ExtDevice.model)
  }
}

module.exports = Device
