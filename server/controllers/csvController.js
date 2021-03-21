const axios = require('axios')
const papa = require('papaparse')
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
  
// axios.get(csvUrl)
//     .then(response => papa.parse(response))
//     .then(data => console.log(data))
  
//   ('../../csv/addresses.csv', (err, data) => {
//       if(err) throw err
//       console.log("in read file")
//       console.log(data)
//   })

    // .then(res => res.text())
    // .then(data => console.log(data))

    
    // fetch('../csv/addresses.csv')
    //     .then(csvString => papa.parse(csvString))
    //     .then(data => console.log(data))
    // axios.get('../../csv/addresses.csv')
    //     .then(response => console.log("text", response.text()))
    //     .then(csvString => papa.parse(csvString))
    //     .then(data => console.log(data))
    //     .then(data => console.log(data))
    //     .then(() => next())
}

module.exports = csvController