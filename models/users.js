'use strict'
const {DataTypes} = require('sequelize')

class User {
  constructor (sequelize) {
    // 定义模型名称，用于调用
    this.name = 'User'
    // 定义模型实行
    this.model = sequelize.define('users', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      sex: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      channelcode: DataTypes.INTEGER,
      verificationcode: DataTypes.STRING,
      expirationtime: DataTypes.DATE
    })
  }

  // 定义模型关联关系
  associate (models) {
    this.models = models
    this.model.belongsTo(models.UserGroup.model)
    this.model.hasMany(models.ZoneUser.model)
  }

  // 定义该模型具有的业务方法
  async login (username, password) {
    let result = await this.model.findOne({where: {username: username, password: password}})
    return result
  }

  async getUserById (id) {
    let result = await this.model.findById(id)
    return result
  }
}

module.exports = User
