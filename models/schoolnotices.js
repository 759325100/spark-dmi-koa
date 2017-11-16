/**
 * Created by jinyang on 2017/6/02.
 */
'use strict'
const {DataTypes} = require('sequelize')

class SchoolNotice {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'SchoolNotice'
    // 定义模型实行
    this.model = sequelize.define('schoolnotices', {
      name: DataTypes.STRING,
      html: DataTypes.STRING,
      type: DataTypes.INTEGER,
      customtime: DataTypes.DATE,
      zoneId: DataTypes.INTEGER,
      audit: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Zone.model)
  }
}

module.exports = SchoolNotice
