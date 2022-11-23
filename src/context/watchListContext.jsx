import { useContext } from "react";
import { createContext, useState } from "react";

const WatchListContext = createContext()

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT" , "AMZN"])

    return <WatchListContext.Provider value={{watchList}}>
        {props.children}
    </WatchListContext.Provider>
}

export const useGlobalWatchListContext = () => {
    return useContext(WatchListContext)
}