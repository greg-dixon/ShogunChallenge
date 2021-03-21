import React, { useState, useEffect } from "react";
import axios from 'axios'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [csvArray, setCsvArray] = useState([])

  useEffect(() => {
  axios.get('/api/retrieveCSV')
      .then(data => console.log(data))
    // fetch('../../addresses.csv')
    // .then(data => )
    // return () => {
    // }
  }, [])

  const searchResults = []


  return (
    <div>
      <h1>Address Search</h1>
      <input type="text" placeholder="1234 Appleseed Lane" onChange={e => setSearchTerm(e.target.value)} ></input>
      <p>{searchTerm}</p>
    <table>
      <thead>
      <tr><th>test</th></tr>
      </thead>
      <tbody>
    <tr><td>test</td></tr>
    </tbody></table>
    </div>
  );
}

export default App;
