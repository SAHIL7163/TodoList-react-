
import ItemList from './ItemList';
const Content = ({items,handleCheck,handleDelete}) => {
  return (
    <>
    { items.length ?(
  <ItemList
  items={items}
  handleCheck={handleCheck} 
  handleDelete={handleDelete} />
 ) : (
  <p style={{ marginTop: "2rem", fontSize: "2rem" }}>
    Your List is Empty
  </p>
  )
 }
  </> );
}

export default Content;
// const[count,setcount]=useState(0);
/*   const handelNameChange=()=>
  {
   const names=['dhameja','sahil','ds'];
   const i=Math.floor(Math.random()*3);
        setName(names[i]);
        console.log(names[i]);
       
  }  
     const handleClick=()=>
    {
      setcount(count+1);
      console.log(count);
    } 
   
    const handleclick2=(name)=>
    {
      console.log(`${name} was clicked` );
    }
    const handleclick3=(e)=>
    {
      console.log(e.target.innerText);
    } */
