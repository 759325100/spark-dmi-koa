/**
 * Created by me on 2017/7/17.
 */

/**
 * Created by jinyang on 2017/6/02.
 */
'use strict'
const {DataTypes} = require('sequelize')

class ZoneDevice {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'ZoneDevice'
    // 定义模型实行
    this.model = sequelize.define('zonedevices', {
      zoneId: DataTypes.INTEGER,
      deviceId: DataTypes.STRING,
      position: DataTypes.STRING
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Device.model, {foreignKey: 'deviceId', targetKey: 'id'})
    this.model.belongsTo(models.Zone.model)
  }
}

module.exports = ZoneDevice