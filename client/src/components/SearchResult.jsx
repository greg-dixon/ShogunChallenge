import React from 'react'

const SearchResult = (props) => {
    const { listing } = props

    const cells = []


    Object.entries(listing).forEach((el, index) =>  {
        const [key, value] = el
        let display
        if(key === "url") return
        key==="price" || key==="priceSqFt" ? display = `$${value}` : display = value

        cells.push(<td key={value+index}><a href={listing.url}>{display}</a></td>)
    })


   

    return (
       <tr>
          {cells}
       </tr>
    )

}

export default SearchResult