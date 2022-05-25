import {createContext,useCallback,useReducer,useEffect} from 'react';
import useDataFetching from '../hooks/useDataFetching';








const intialState = {
    lists:[],
    loading:true,
    error:'',
    list:{}

}


const reducer = (state,action) => {

    switch(action.type){
        case 'GET_LISTS_SUCCESS':

        return {
            ...state,
            lists:action.payload,
            loading:false
        }


        case 'GET_LIST_SUCCESS':{

            return{
               
                ...state,
                list:action.payload,
                loading:false
            }
        }


        case 'GET_LISTS_ERROR':

         return {
             ...state,
             lists:[],
             loading:false,
             error:action.payload
         };

         case 'GET_LIST_ERROR':{


            return{
                ...state,
                list:{},
                loading:false,
                error:action.payload
            }

            
         }


         default:
             return state;

    }







}


export const ListsContext  = createContext();

export const ListsContextProvider = ({children}) => {
 
    // const [loading,error,data] = useDataFetching(
    //     'https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists'
    // );


    const [state,dispatch] = useReducer(reducer,intialState);




    const fetchList = useCallback(async (listId) => {

        

        
        try{
           
            const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/lists`)


            const result = await data.json();

            if(result){
                dispatch({type:'GET_LIST_SUCCESS',payload:result})
            }

        }

        catch(e){
             dispatch({type:'GET_LIST_ERROR', payload:e.message})

        }

    },[])



    const fetchLists = useCallback(async () =>{



       try{
           const data = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists`);
           const result = await data.json()


           if(result){
               dispatch({type:'GET_LISTS_SUCCESS', payload:result})
           }
       }

       catch(e){
           dispatch({type:'GET_LISTS_ERROR',payload:e.message})
       }

    },[]) 



    return(
        // <ListsContext.Provider value={{lists:data,loading,error}}>
        //     {children}
        // </ListsContext.Provider>

        <ListsContext.Provider value={{...state, fetchLists,fetchList}}>
            {children}
        </ListsContext.Provider>
    )



}



export default ListsContext


