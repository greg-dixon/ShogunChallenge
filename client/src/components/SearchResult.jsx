import React from 'react'

const SearchResult = (props) => {
    const { listing } = props

    const cells = []

    /*
    Here I generate the cells for each listing
    */

    Object.entries(listing).forEach((el, index) =>  {
        const [key, value] = el

        //I just want the url to add a link to the address, not be part of the table
        if (key === "url") return

        let display

        //Adding dollar sign for price values
        key==="price" || key==="priceSqFt" 
        ? display = `$${value}`
        : display = value

        //Accounting for empty values/strings
        if (!value || value==="") display = "-"
        
        //
        key==="address"
        ? cells.push(<td key={+index}><a href={listing.url}>{display}</a></td>)
        : cells.push(<td key={+index}>{display}</td>)
    })

    return (
       <tr>
          {cells}
       </tr>
    )
}

export default SearchResult