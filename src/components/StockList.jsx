import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import finnHub from '../apis/finnHub'
import {useNavigate} from 'react-router-dom'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import { useGlobalWatchListContext } from '../context/watchListContext'
import "../App.css"

export const StockList = () => {
  const [stock, setStock] = useState([])
  const {watchList, deleteStock} = useGlobalWatchListContext()

  const navigate = useNavigate()
  


  const changeColor= (change) => {
    return change > 0 ? "success" : "danger"
  }

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
  }


  useEffect(()=>{
    let isMounted = true
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map((stockItem)=>{
          return finnHub.get("/quote", {
            params:{
              symbol : stockItem,
            }
          })
        }))
        
        const data = responses.map((response)=>{
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          }
        })
        //we dont want to set value if component is unmounted
        isMounted && setStock(data)
      } catch (error) {

      }
    }
    fetchData()
    //this will run whenever component gets unmounted 
    return () => (isMounted = false)
  },[watchList])

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
 
  return (
    <div>
      <table className='table hover mt-5'>
        <thead style={{color: "rgb(79,82,102)"}}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData)=>{
            return (
              <tr style={{"cursor": "pointer"}} onClick={()=> handleStockSelect(stockData.symbol)} className='table-row' key={stockData.symbol}>
                <th scope='row'>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`} >{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.dp} {renderIcon(stockData.data.d)}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc} 
                <button
                 className='btn btn-danger btn-sm ml-10 d-inline-block delete-button'
                 onClick={(event)=>{
                  //event bubbling up
                  event.stopPropagation() //to stop event bubbling
                  deleteStock(stockData.symbol)
                }}
                 >Remove</button></td>

              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
