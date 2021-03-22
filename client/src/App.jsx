import React, { useState, useEffect } from "react";
import axios from 'axios'
import SearchResult from "./components/SearchResult";
import parseListings from "../functions/parseListings"
import headingTerms from "../constants/headingTerms"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [homeArray, setHomeArray] = useState([])
  const [startIndex, setStartIndex] = useState(0)

  const searchResults = []
  const headings = []
  const buttons =[]

/*
API calls are best done with useEffect as per React's documentation.
I'm storing the results in state so the data does not need to be re-retrieved
every time a search is done. In a more advanced applicaiton I would likely
cache this instead of keeping it in state.
*/

useEffect(() => {
  axios.get('/api/retrieveCSV')
      .then(response => parseListings(response.data))
      .then(data => setHomeArray(data))
  }, [])


/*
Whenever the search button is pressed, the array of homes is filtered based on
the search term (I added the ability to search by zip as well as address).
*/

const filtered = homeArray
    .filter(el => 
      el.address.toLowerCase().includes(searchTerm.toLowerCase())
      || el.zip.includes(searchTerm)
  )

  /*
  Due to the sheer volume of entries slowing down the application,I decided 
  to display 20 results at a time
  */

filtered.slice(startIndex, startIndex+20)
    .forEach((el, index) => {
      searchResults.push(
      <SearchResult key={el.url+index} listing={el}/>)
  })

  /*
  This dynamically generates the previous and next buttons, which increment the
  index tracker kept in state, allowing clients to cycle through the pages of
  results
  */

  if(startIndex>0) {
    buttons.push(
      <button key="prev"
      onClick={e =>{setStartIndex(startIndex-20)}}
      className="directionButton"
      >Previous</button>
    )
  }
  if (startIndex+19<filtered.length){
    buttons.push(
    <button key="next" 
      onClick={e =>{setStartIndex(startIndex+20)}}
      className="directionButton"
    >Next</button>)
  }

/*
This just handles the search button functionality. It resets the start index
to ensure a smooth user experience
*/

const handleSearchBarSubmit = (e) => {
    setSearchTerm(document.getElementById("searchBar").value)
    setStartIndex(0)
}

/*
This dynamically generates the headings to line up with the listings
*/

headingTerms
    .forEach(el => {
      headings.push(<th key={el}>{el}</th>)
    })


  return (
    <div>
      <center><h1>Address Search</h1></center>
    <div><center><input type="text" placeholder="Search by address or zip code" 
     id="searchBar"></input>
     <button onClick={handleSearchBarSubmit}>Search</button></center></div>
      <br></br>
    {
    /*
      This generates the table unless there are no matches in which case it gives
      a results not found message.
    */
    searchResults.length>0
      ? <div><table className="center">
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
            {searchResults}
        </tbody>
      </table>
        <div><center>{buttons}</center></div>
        </div>
      : <center><h2>No Results Found</h2></center>
    }
    </div>
  )
}

export default App;
