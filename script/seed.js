'use strict'

const {db, models: {User, Event, Result} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  //Creating Users
  const users = await Promise.all([
    User.create({ username: 'ryan', id: 1, password: 'test', admin: 'true' }),
    User.create({ username: 'matt', id: 2,  password: 'test' }),
  ])

  const events = await Promise.all([
    Event.create({ distance: '3' }),
    Event.create({ distance: '5' }),
    Event.create({ distance: '10' }),
  ])

  const results = await Promise.all([
    Result.create({ type: 'run', distance: '3', time: '21', eventId: 1, userId: 1}),
    Result.create({ type: 'run', distance: '3', time: '22', userId: 2, eventId: 1}),
    Result.create({ type: 'run', distance: '5', time: '40', userId: 1, eventId: 2}),
    Result.create({ type: 'run', distance: '5', time: '42', userId: 2, eventId: 2}),
    Result.create({ type: 'run', distance: '10', time: '58', userId: 1, eventId: 3}),
    Result.create({ type: 'run', distance: '10', time: '60', userId: 2, eventId: 3}),
  ])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
