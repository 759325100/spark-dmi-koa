/**
 * Created by jinyang on 2017/7/21.
 */

'use strict'
const {DataTypes} = require('sequelize')

class WechatStudent {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'WechatStudent'
    // 定义模型实行
    this.model = sequelize.define('wechatstudents', {
      wechatuserId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      active: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.WechatUser.model, {foreignKey: 'wechatuserId', targetKey: 'id'})
    this.model.hasMany(models.WechatUser.model, {foreignKey: 'id', sourceKey: 'wechatuserId'})
    this.model.belongsTo(models.Student.model, {foreignKey: 'studentId', targetKey: 'id'})
    this.model.hasMany(models.Student.model, {foreignKey: 'id', sourceKey: 'studentId'})
  }
}

module.exports = WechatStudent
