import './App.css'
import Router from './router/Router'
import { useState, useEffect } from 'react'
import { CartContext } from './context/Contextapi'
import axios from 'axios'

function App() {
  const [itemsLength, setItemLength] = useState<number>(0)

  useEffect(()=>{
    const getUser = localStorage.getItem("userID")
    axios(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then((res)=>{
        setItemLength(res.data.cartItem?.length)  
    })
  },[])

  return (
    <CartContext.Provider value={{itemsLength, setItemLength}}>
        <Router/>
    </CartContext.Provider>
    
  )

}

export default App
