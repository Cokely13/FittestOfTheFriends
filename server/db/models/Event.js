const Sequelize = require('sequelize')
const db = require('../db')


const Event = db.define('event', {
type: { type: Sequelize.STRING,
defaultValue:'run'},
    distance: { type: Sequelize.FLOAT,
      },
    weight: {
    type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.FLOAT,
      },
      reps: {
        type: Sequelize.INTEGER,
        }})



module.exports = Event
