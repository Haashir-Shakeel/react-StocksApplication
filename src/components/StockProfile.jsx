import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const StockProfile = ({symbol}) => {
    const [stockProfileData, setStockProfileData] = useState()
    useEffect(()=>{
        let isMounted = true
        const fetchData = async () => {
            try{
                const response = await finnHub.get("/stock/profile2",{
                    params:{
                        symbol: symbol
                    }
                })
                if (isMounted){
                    setStockProfileData(response.data)
                }
            }catch (error){
                console.log(error);
            }
        }
        fetchData()
        return () => (isMounted = false);
    },[symbol])
  return (
    <div>
        {stockProfileData && (
            <div className='row border bg-white rounded shadow-sm p-4 mt-5 mb-4'>
                <div className='col '>
                    <div>
                        <span className='fw-bold'>name: </span>
                        {stockProfileData.name}
                    </div>
                    <div>
                        <span className='fw-bold'>country: </span>
                        {stockProfileData.country}
                    </div>
                    <div>
                        <span className='fw-bold'>ticker: </span>
                        {stockProfileData.ticker}
                    </div> 
                </div>
                <div className='col '>
                    <div>
                        <span className='fw-bold'>Exchange: </span>
                        {stockProfileData.exchange}
                    </div>
                    <div>
                        <span className='fw-bold'>Industry: </span>
                        {stockProfileData.finnhubIndustry}
                    </div>
                    <div>
                        <span className='fw-bold'>IPO: </span>
                        {stockProfileData.ipo}
                    </div> 
                </div>
                <div className='col '>
                    <div>
                        <span className='fw-bold'>MarketCap: </span>
                        {(stockProfileData.marketCapitalization).toFixed(3)}
                    </div>
                    <div>
                        <span className='fw-bold'>Shares Outstanding: </span>
                        {stockProfileData.shareOutstanding}
                    </div>
                    <div>
                        <span className='fw-bold'>url: </span>
                        <a href={stockProfileData.weburl}>{stockProfileData.name}</a> 
                    </div> 
                </div>
            </div>
        )}
    </div>
  )
}
