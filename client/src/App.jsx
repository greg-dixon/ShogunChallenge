import React, { useState, useEffect } from "react";
import axios from 'axios'
import SearchResult from "./components/SearchResult";
import parseListings from "../functions/parseListings"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [homeArray, setHomeArray] = useState([])

  useEffect(() => {
  axios.get('/api/retrieveCSV')
      .then(response => parseListings(response.data))
      .then(data => setHomeArray(data))
  }, [])

  const searchResults = []
  const headings = []

  const terms = ["Address", "Zip Code", "Beds", "Baths", "Price"]

  terms.forEach(el => {
    headings.push(<th key={el}>{el}</th>)
  })

 homeArray
    .filter(el => 
      el.address.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      el.zip.includes(searchTerm)
  )
    .forEach((el, index) => {
    searchResults.push(<SearchResult key={el.url+index} listing={el}/>)
  })

  return (
    <div>
      <h1>Address Search</h1>
    <input type="text" placeholder="Search by address or zip code" onChange={e => setSearchTerm(e.target.value)} ></input>
      <br></br>
    <table>
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
      <tbody>
        {searchResults}
      </tbody>
    </table>
    </div>
  );
}

export default App;
