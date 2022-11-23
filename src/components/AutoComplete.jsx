import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'

export const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const renderDropdown = () => {
    const dropdownClass = searchTerm ? "show" : null
    return (
      <ul style={{
        height: '500px',
        overflowY: "scroll",
        overflowX: "hidden",
        cursor: "pointer"
        }} className={`dropdown-menu ${dropdownClass}`} >
        {
          searchResults.map((result)=>{
            return (
              <li className='dropdown-item' key={result.symbol}>{result.description} ({result.symbol})</li>
            )
          })
        }
      </ul>
    )
  }

  useEffect(()=>{
    let isMounted = true
    const fetchData = async () => {

      try{

        const response = await finnHub.get("/search", {
          params:{
            q: searchTerm
          }
        })
        isMounted && setSearchResults(response.data.result)

      } catch (error) {

      }
    }
    searchTerm.length > 0 ? fetchData() : setSearchResults([])

    return () => (isMounted = false)
  },[searchTerm])


  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}} id="search" type="text" className="form-control" 
        placeholder="Search" autoComplete='off' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}>
        </input>
        <label htmlFor='search'>Search</label>
        {renderDropdown()}
      </div>
    </div>
  )
}
