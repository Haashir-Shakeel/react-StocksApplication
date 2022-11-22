import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'

export const StockList = () => {
  const [stock, setStock] = useState()
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT" , "AMZ"])

  useEffect(()=>{
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/quote", {
          params:{
            symbol : "MSFT",
          }
        })
        console.log(response);
        //we dont want to set value if component is unmounted
        isMounted && setStock(response.data)
      } catch (error) {

      }
    }
    fetchData()
    //this will run whenever component gets unmounted 
    return () => (isMounted = false)
  },[])

  return (
    <div>StockList</div>
  )
}
