/**
 * Created by jinyang on 2017/7/21.
 */

'use strict'
const {DataTypes} = require('sequelize')

class Student {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'Student'
    // 定义模型实行
    this.model = sequelize.define('students', {
      id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      studentno: DataTypes.STRING,
      zoneId: DataTypes.INTEGER,
      photo: DataTypes.STRING
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.hasMany(models.WechatStudent.model)
    this.model.belongsTo(models.Zone.model)
  }
}

module.exports = Student
