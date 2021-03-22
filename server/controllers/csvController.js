const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')

const csvController = {}

csvController.retrieve = async (req, res, next) => {
    res.locals.homeData = []

  await fs.createReadStream(path.join(__dirname, '../../client/public/addresses.csv'))
    .pipe(csv())
    .on('data', (row) =>  res.locals.homeData.push(row))
    .on('end', () => next())

}

module.exports = csvController