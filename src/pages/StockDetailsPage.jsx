import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../apis/finnHub'
export const StockDetailsPage = () => {
  const {symbol} = useParams()
  useEffect(()=>{
    const fetchData = async () =>{

      const date = new Date()
      const currentTime = Math.floor(date.getTime()/1000)

      //depends on if stock market was closed day before
      const oneDay = currentTime - 24*60*60

      const oneWeak = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      try{
        const responses = await Promise.all([
          finnHub.get('/stock/candle',
          {params:{
            symbol: symbol,
            from : oneDay,
            to : currentTime,
            resolution: 30,
          }
        }),
          finnHub.get('/stock/candle',
          {params:{
            symbol: symbol,
            from : oneWeak,
            to : currentTime,
            resolution: 60,
          }
        }),
          finnHub.get('/stock/candle',
          {params:{
            symbol: symbol,
            from : oneYear,
            to : currentTime,
            resolution: "W",
          }
        })
  ])
  
      console.log(responses);

      }catch(error){
        console.log(error);
      }


    }

    fetchData()
  },[])
  return (
    <div>StockDetailsPage {symbol}</div>
  )
}
