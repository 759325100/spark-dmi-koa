/**
 * Created by jinyang on 2017/7/21.
 */

'use strict'
const {DataTypes} = require('sequelize')

class WechatUser {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'WechatUser'
    // 定义模型实行
    this.model = sequelize.define('wechatusers', {
      openId: DataTypes.STRING,
      nickname: DataTypes.STRING,
      sex: DataTypes.INTEGER,
      language: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      country: DataTypes.STRING,
      headimgurl: DataTypes.STRING,
      subscribetime: DataTypes.STRING,
      mobile: DataTypes.STRING,
      channel: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      pushSensor: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.WechatStudent.model, {foreignKey: 'wechatuserId', sourceKey: 'id'})
    this.model.belongsTo(models.WechatStudent.model, {foreignKey: 'id', targetKey: 'wechatuserId'})
  }
}

module.exports = WechatUser