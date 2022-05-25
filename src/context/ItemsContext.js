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


        case 'ADD_ITEM_SUCCESS':

           return{
               ...state,
               items:[...state.items,action.payload],
               loading:false
           }

            

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

        console.log('yoooo',listId)
      
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




  const addItems = useCallback(async ({listId,title,quantity,price}) => {



    const itemId = Math.floor(Math.random() * 100)


    try{
         const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items`,
         
         {
            method:'POST',
            body:JSON.stringify({
                id:itemId,
                listId,
                title,
                quantity,
                price
            })
         }
         );

         const result = await data.json()


         if(result){

            dispatch({
                type:'ADD_ITEM_SUCCESS',
                payload: {
                    id:itemId,
                    listId,
                    title,
                    quantity,
                    price
                }
            });
         }
    }

    catch(err){}

  },[])
 


return(
    // <ItemsContext.Provider value={{items,loading,error,fetchItems
    // }}>
    //     {children}
    // </ItemsContext.Provider>

    <ItemsContext.Provider value={{...state,fetchItems,addItems}}>
        {children}
    </ItemsContext.Provider>
)}


export default ItemsContext