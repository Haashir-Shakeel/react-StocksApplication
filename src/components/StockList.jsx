import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT" , "AMZ"])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/quote", {
          params:{
            symbol : "MSFT",
          }
        })
        console.log(response);
      } catch (error) {

      }
    }
    fetchData()
  },[])

  return (
    <div>StockList</div>
  )
}
