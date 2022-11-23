import { useContext } from "react";
import { createContext, useState } from "react";

const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT" , "AMZN"])

    const addStock = (stock) => {
        watchList.indexOf(stock) === -1 && setWatchList([...watchList, stock])
        console.log(watchList);
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((item)=>{return item !== stock}))
    }

    return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}

export const useGlobalWatchListContext = () => {
    return useContext(WatchListContext)
}