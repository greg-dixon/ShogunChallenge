const parseListings = (array) => {
const results = []

array.forEach(el => {
    results.push({
        address : el.ADDRESS,
        zip: el["ZIP OR POSTAL CODE"],
        beds : el.BEDS,
        baths : el.BATHS,
        price : el.PRICE,
        sqFt : el["SQUARE FEET"],
        priceSqFt : el["$/SQUARE FEET"],
        type: el["PROPERTY TYPE"],
        url : el["URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)"],  
    })
})

    return results
}

export default parseListings