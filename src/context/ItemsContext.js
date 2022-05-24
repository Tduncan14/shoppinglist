// import { createContext } from 'react';
// import useDataFetching from '../hooks/useDataFetching';
import { createContext,useCallback,useState,useReducer} from "react";
;


const intialState = {
    items:[],
    loading:true,
    error:''
}


 const reducer = (state,action) => {


     switch(action.type){

        case 'GET_ITEMS_SUCCESS':
            return{
                ...state,
                items:action.payload,
                loading:false
            };


        case 'GET_ITEMS_ERROR':
             return{
                 ...state,
                 items:[],
                 loading:false,
                 error:action.payload
             };

            

             default:
                 return state


     }








 }

export const ItemsContext = createContext();

export const ItemsContextProvider = ({children}) => {


// const [loading,error,data] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items')


// const[loading,setLoading] = useState(true);
// const [items,setItems] = useState([]);
// const [error,setError] = useState('');


const [state,dispatch] = useReducer(reducer,intialState);


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
            // setItems(result);
            // setLoading(false);
            dispatch({type:'GET_ITEMS_SUCCESS',payload:result})
        }
    }
    catch(err){
        // setLoading(false);
        // setError(err.message);
        dispatch({type:'GET_ITEMS_ERROR',payload:err.message})

    }

},[])


 


return(
    // <ItemsContext.Provider value={{items,loading,error,fetchItems
    // }}>
    //     {children}
    // </ItemsContext.Provider>

    <ItemsContext.Provider value={{...state,fetchItems}}>
        {children}
    </ItemsContext.Provider>
)}


export default ItemsContext