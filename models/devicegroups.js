'use strict'
const {DataTypes} = require('sequelize')

class DeviceGroup {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'DeviceGroup'
    // 定义模型实行
    this.model = sequelize.define('devicegroups', {
      devicegroupname: DataTypes.STRING
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.Device.model)
  }
}

module.exports = DeviceGroup
