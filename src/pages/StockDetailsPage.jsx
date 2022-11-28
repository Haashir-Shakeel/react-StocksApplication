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
      
      let oneDay;
      if (date.getDay() === 1){
        oneDay = currentTime - 3 * 24 * 60 * 60
      }else if(date.getDay() === 2){
        oneDay = currentTime - 2 * 24 * 60 * 60
      }else{
        oneDay = currentTime - 24*60*60
      }

      const oneWeak = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      const response = await finnHub.get('/stock/candle',
      {params:{
        symbol: symbol,
        from : oneWeak,
        to : currentTime,
        resolution: 60,
      }
    })

    console.log(response);
    }

    fetchData()
  },[])
  return (
    <div>StockDetailsPage {symbol}</div>
  )
}
