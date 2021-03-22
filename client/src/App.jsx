import React, { useState, useEffect } from "react";
import axios from 'axios'
import SearchResult from "./components/SearchResult";
import parseListings from "../functions/parseListings"
import headingTerms from "../constants/headingTerms"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [homeArray, setHomeArray] = useState([])
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
  axios.get('/api/retrieveCSV')
      .then(response => parseListings(response.data))
      .then(data => setHomeArray(data))
  }, [])

  const searchResults = []
  const headings = []
  const buttons =[]

  
  // const filterTerms = ["maxPrice", "minPrice"]
  // const priceOptions = ["-", "$50k", "$100k", "$250k", "$500k", "$750k", "$1M"]

  headingTerms
    .forEach(el => {
      headings.push(<th key={el}>{el}</th>)
  })

 const filtered = homeArray
    .filter(el => 
      el.address.toLowerCase().includes(searchTerm.toLowerCase()) ||  
      el.zip.includes(searchTerm)
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
    <input type="text" placeholder="Search by address or zip code" 
    onChange={e => {setSearchTerm(e.target.value)
      setStartIndex(0)
    }} id="searchBar" ></input>
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
        {buttons}
    </div>
  );
}

export default App;
