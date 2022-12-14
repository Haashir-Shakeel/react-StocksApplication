import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import StockChart from '../components/StockChart'
import { StockProfile } from '../components/StockProfile'


const formatData = (data) => {
  return data.t.map((item,index)=>{
    return {
      x: item * 1000,
      y: (data.c[index]).toFixed(2),
    }
  })
}

export const StockDetailsPage = () => {
  const [chartData, setChartData] = useState()
  const {symbol} = useParams()
  useEffect(()=>{
    const fetchData = async () =>{

      const date = new Date()
      const currentTime = Math.floor(date.getTime()/1000)

      //depends on if stock market was closed day before
      const oneDay = currentTime - 24*60*60

      const oneWeek = currentTime - 7 * 24 * 60 * 60
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
            from : oneWeek,
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
  

      setChartData({
        day: formatData(responses[0].data),
        week:formatData(responses[1].data),
        year:formatData(responses[2].data),
      })

      }catch(error){
        console.log(error);
      }


    }

    fetchData()
  },[symbol])
  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData= {chartData} symbol={symbol}/>
          <StockProfile symbol={symbol}/>
        </div>
      )}

      </div>
  )
}
