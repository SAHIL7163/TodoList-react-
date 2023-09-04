
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useEffect, useState } from "react";
import AddItem from './AddItem'
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  //const name="sahil";
 const API_URL='http://localhost:3500/items';

    const[items ,setitems]=useState([]);
  const[newitem ,setnewitem]=useState('');
  const[search,setsearch]=useState('');
  const[fetchError, setFetchError]=useState(null);
  const[isloading, setisLoading]=useState(true);
  useEffect(()=>
  {
      const fetchItems =  async () =>
      {
        try{
          const response=await fetch(API_URL);
          const listItems=await response.json();
          if(!response.ok) throw Error('Did Not received expected data');
          console.log(listItems);
          setitems(listItems);
        }
        catch(err)
        {
         console.log(err.stack);
         setFetchError(err.message);
        }
        finally{
          setisLoading(false);
        }
      }
      setTimeout(() => {
        (async ()=>await fetchItems())();
      }, 2000);
     
  },[])

/*   const setandSaveItem=(listItems)=>
  {
    setitems(listItems);
   
  } */
const addItem= async (item)=>
  {
    const id=items.length ?items[items.length-1].id+1 :1;
    const Mynewitem={id, checked :false ,item};
    const listItems=[...items,Mynewitem];
    setitems(listItems); 
    
    const postOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(Mynewitem)
    }
    const result =await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }
  const handleCheck= async (id)=>
  {
      const listItems=items.map((item)=>item.id===id? 
        {...item, checked:!item.checked}: item
    );
    setitems(listItems);

 const myItem= listItems.filter((item)=>item.id ===id);
  const updateOptions ={
    method:'PATCH',
    headers :{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({checked:myItem[0].checked})
   } 
      const requrl=`${API_URL}/${id}`;
      const result = await apiRequest(requrl,updateOptions);
      if(result) setFetchError(result);
  }
  const handleDelete= async(id)=>
  {
      const listItems=items.filter((item)=>item.id!==id);
      setitems(listItems);

      const deleteOptions ={method:'DELETE'};
      const reqUrl=`${API_URL}/${id}`;
      const result = await apiRequest(reqUrl,deleteOptions);
      if(result) setFetchError(result);
  }

    
  const handleSubmit=(e)=>
  { e.preventDefault();

    if(!newitem) return;
    addItem(newitem);

    setnewitem(' ');
  }
  return (
    <div className="App">
     <Header title="Groceries List" /> 
     <AddItem 
     newitem={newitem}
     setnewitem={setnewitem}
     handleSubmit={handleSubmit}/>
      <SearchItem 
     search={search}
     setsearch={setsearch}
     />
     <main>
      { isloading && <p style={{fontSize: "1.5rem"}}>Loading Items...</p>}
     {fetchError &&  <p style={{color:"red",fontSize: "1.5rem"}}>{`Error:${fetchError}`}</p>}
     {!fetchError&&!isloading && 
   <Content
   items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
   handleCheck={handleCheck}
   handleDelete={handleDelete}/>}
   </main>
   <Footer length={items.length}/>
    </div>
  );
}

export default App;
   /* [
      {
          id: 1,
          checked: true,
          item: "One half pound bag of Cocoa Covered Almonds Unsalted"
      },
      {z
          id: 2,
          checked: false,
          item: "Item 2"
      },
      {
          id: 3,
          checked: false,
          item: "Item 3"
      }
  ] */