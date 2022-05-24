// import { createContext } from 'react';
// import useDataFetching from '../hooks/useDataFetching';
import { createContext,useCallback,useState,useEffect } from "react";
;




export const ItemsContext = createContext();

export const ItemsContextProvider = ({children}) => {


// const [loading,error,data] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items')


const[loading,setLoading] = useState(true);
const [items,setItems] = useState([]);
const [error,setError] = useState('');





// const fetchItems = useCallback(async (listId) => {
//     try {
//       const data = await fetch(
//         `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`,
//       );
//       const result = await data.json();

//       if (result) {
//           setItems(result);
//           setLoading(false)
    
//       }
//     } catch (e) {
//         setLoading(false)
//         setError(e.message)
     
//     }
//   }, []);


const fetchItems = useCallback(async ( listId) =>{


    try{

        console.log('hey',listId)
      
        const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`);

          

        const result = await data.json();

        console.log(result);

        if(result){
            setItems(result);
            setLoading(false);
        }
    }
    catch(err){
        setLoading(false);
        setError(err.message);

    }

},[])


 


return(
    <ItemsContext.Provider value={{items,loading,error,fetchItems
    }}>
        {children}
    </ItemsContext.Provider>
)}


export default ItemsContext