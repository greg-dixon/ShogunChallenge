import React from 'react'

const SearchResult = (props) => {
    const { listing } = props

    const cells = []

    Object.entries(listing).forEach((el, index) =>  {
        const [key, value] = el
        if (key === "url") return

        let display

        key==="price" || key==="priceSqFt" 
        ? display = `$${value}`
        : display = value

        if (!value || value==="") display = "-"
        
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