/**
 * Created by jinyang on 2017/7/20.
 */

/**
 * Created by jinyang on 2017/6/02.
 */
'use strict'
const {DataTypes} = require('sequelize')

class SubjectSchedule {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'SubjectSchedule'
    // 定义模型实行
    this.model = sequelize.define('subjectschedules', {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      teacher: DataTypes.STRING,
      zoneId: DataTypes.INTEGER,
      weekday: DataTypes.INTEGER
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.Zone.model)
  }
}

module.exports = SubjectSchedule
