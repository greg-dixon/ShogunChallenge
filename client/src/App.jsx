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

  useEffect(() => {
  axios.get('/api/retrieveCSV')
      .then(response => parseListings(response.data))
      .then(data => setHomeArray(data))
  }, [])

const handleSearchBarSubmit = (e) => {
    setSearchTerm(document.getElementById("searchBar").value)
    setStartIndex(0)
}

headingTerms
    .forEach(el => {
      headings.push(<th key={el}>{el}</th>)
    })

const filtered = homeArray
    .filter(el => 
      el.address.toLowerCase().includes(searchTerm.toLowerCase())
      || el.zip.includes(searchTerm)
  )

filtered.slice(startIndex, startIndex+19)
    .forEach((el, index) => {
      searchResults.push(
      <SearchResult key={el.url+index} listing={el}/>)
  })

if(startIndex>0) {
    buttons.push(
      <button key="prev"
      onClick={e =>{setStartIndex(startIndex-20)
      }}>Previous</button>
    )
  }
  if (startIndex+19<filtered.length){
    buttons.push(
    <button key="next" 
      onClick={e =>{setStartIndex(startIndex+20)
    }}>Next</button>)
  }

  return (
    <div>
      <h1>Address Search</h1>
    <div><input type="text" placeholder="Search by address or zip code" 
     id="searchBar" ></input>
     <button onClick={handleSearchBarSubmit}>Search</button></div>
      <br></br>
    {searchResults.length>0
      ? <div><table>
        <thead>
          <tr>
            {headings}
          </tr>
        </thead>
        <tbody>
            {searchResults}
        </tbody>
      </table>
        {buttons}
        </div>
      : <p>No Results Found</p>
    }
    </div>
  );
}

export default App;
