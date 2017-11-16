'use strict'

const fs = require('fs')

class Models {
  init (sequelize) {
    this.db = {}
    fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
      })
      .forEach((file) => {
        const Model = require(('./' + file))
        const model = new Model(sequelize)
        this.db[model.name || file.substr(0, file.indexOf('.'))] = model
      })
    Object.keys(this.db).forEach((modelName) => {
      this.db[modelName].associate && this.db[modelName].associate(this.db)
    })
    console.log(this.db)
    return this.db
  }
}

module.exports = Models
