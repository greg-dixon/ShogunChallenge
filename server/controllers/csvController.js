const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

const csvController = {}

/*
My csv controller asyncronously parses the csv file and prepares it to be
sent to the frontend.
*/


csvController.retrieve = async (req, res, next) => {
  res.locals.homeData = []

  await fs.createReadStream(path.join(__dirname, '../../client/public/addresses.csv'))
    .pipe(csv())
    .on('data', (row) =>  res.locals.homeData.push(row))
    .on('end', () => next())

}

module.exports = csvController