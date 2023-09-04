import React from 'react'
import {FaPlus} from 'react-icons/fa';
import { useRef } from 'react';
const AddItem = ({newitem,setnewitem,handleSubmit}) => {
  const inputref=useRef();
  return (
    <form className='addForm' onSubmit={handleSubmit}>
    <label htmlFor='addItem'>Add Item</label>
    <input
        autoFocus
        id='addItem'
        type='text'
        ref={inputref}
        placeholder='Add Item'
        required
        value={newitem}
        onChange={(e) => setnewitem(e.target.value)}
        autoComplete='off'
    />
    <button
        type='submit'
        aria-label='Add Item'
        onClick={()=>inputref.current.focus()}
    >
        <FaPlus />
    </button>
</form>
  )
}

export default AddItem