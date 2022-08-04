const Sequelize = require('sequelize')
const db = require('../db')


const Result = db.define('result', {
    distance: { type: Sequelize.FLOAT,
      },
    // weight: {
    // type: Sequelize.STRING,
    // },
    time: {
      type: Sequelize.FLOAT,
      },
      // reps: {
      //   type: Sequelize.INTEGER,
      //   }
      })


module.exports = Result
