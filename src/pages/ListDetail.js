import { useState, useEffect,useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
// import useDataFetching from '../hooks/useDataFetching';
import NavBar from '../components/NavBar/NavBar';
import ListItem from '../components/ListItem/ListItem';
import ItemsContext from '../context/ItemsContext';
import ListsContext from '../context/ListsContext';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

function ListDetail() {
  let navigate = useNavigate();
  const { listId } = useParams();

  // const [loading, error, data] = useDataFetching(
  //   'https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items/',
  // );


  console.log(listId,'hellow')


  // const [items, setItems] = useState([]);


  const {loading,error,items,fetchItems} = useContext(ItemsContext)


  const {list, fetchList} = useContext(ListsContext);

  // const {loading,error, items:data} = useContext(ItemsContext)

  // useEffect(() => {
  //   // console.log(data,'this is the data')
  //   data &&
  //     listId &&
  //     setItems(data.filter((item) => item.listId === parseInt(listId)));
  // }, [data, listId]);




    useEffect(() =>{

      console.log(listId,items.length)

      listId && !items.length && fetchItems(listId)

    },[fetchItems,items,listId])



    useEffect(() => {

      listId && fetchList(listId);

    },[fetchList,listId])

  return (
    <>
      {navigate && (
        <NavBar
          goBack={() => navigate(-1)}
          title={list && list.title}
          openForm={() => navigate(`/list/${listId}/new`)}
        />
      )}
      <ListItemWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          items.map((item) => <ListItem key={item.id} data={item} />)
        )}
      </ListItemWrapper>
    </>
  );
}

export default ListDetail;
