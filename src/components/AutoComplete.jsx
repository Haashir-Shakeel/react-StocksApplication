import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'

export const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await finnHub.get("/search", {
          params:{
            q: searchTerm
          }
        })
        console.log(response);
      }catch (error) {

      }
    }
    searchTerm.length > 0 && fetchData()
  },[searchTerm])
  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}} id="search" type="text" className="form-control" 
        placeholder="Search" autoComplete='off' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}>
        </input>
        <label htmlFor='search'>Search</label>
        <ul className='dropdown-menu '>
          <li>stock1</li>
          <li>stock2</li>
        </ul>
      </div>
    </div>
  )
}
