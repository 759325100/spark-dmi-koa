/**
 * Created by jinyang on 2017/6/02.
 */
'use strict'
const {DataTypes} = require('sequelize')

class Zone {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'Zone'
    // 定义模型实行
    this.model = sequelize.define('zones', {
      no: DataTypes.STRING,
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      scenarioimg: DataTypes.STRING,
      parentid: DataTypes.INTEGER,
      depth: DataTypes.STRING,
      sortno: DataTypes.INTEGER,
      state: DataTypes.INTEGER,
      remark: DataTypes.STRING,
      ispublish: DataTypes.INTEGER,
      token: DataTypes.STRING,
      thumb: DataTypes.STRING
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.ZoneUser.model)
    this.model.hasMany(models.Student.model)
    this.model.hasMany(models.ZoneDevice.model)
    this.model.hasMany(models.SchoolNotice.model)
    this.model.hasMany(models.SubjectSchedule.model)
    this.model.belongsTo(models.Zone.model, {foreignKey: 'parentid'})
  }
}

module.exports = Zone
