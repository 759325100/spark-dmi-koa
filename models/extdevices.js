'use strict'
const {DataTypes} = require('sequelize')

class ExtDevice {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'ExtDevice'
    // 定义模型实行
    this.model = sequelize.define('extdevices', {
      name: DataTypes.STRING,
      type: DataTypes.INTEGER,
      nd: DataTypes.INTEGER,
      deviceId: DataTypes.STRING,
      sid: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
      cmdId: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Device.model)
    this.model.belongsTo(models.ExtCmd.model, {foreignKey: 'cmdId', targetKey: 'id'})
  }
}

module.exports = ExtDevice
