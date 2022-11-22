import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT" , "AMZ"])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/quote?symbol=MSFT&token=cdgtt42ad3i2r375gtb0cdgtt42ad3i2r375gtbg")
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
