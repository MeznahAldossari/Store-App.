import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { productsInfo } from "../types/types"
import Nav from "./Nav"
import { cartInfo } from "../types/types"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer"
import LoadingIcon from '../assets/loadingIcon.svg'
import loaderIcon from '../assets/Loadericon.svg'
import { CartContext } from "../context/Contextapi"

function Products() {
  const {id} = useParams<string>()
  const [productDetial, setProductDetails] = useState<productsInfo>({} as productsInfo)
  const [size, setSize] = useState<string>("")
  const [qty, setQty] = useState<number>(1)
  const [adding, setAdding]= useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const {itemsLength, setItemLength} = useContext(CartContext)
  
  useEffect(()=>{
    getProduct() 
  },[])

  const getProduct = (): void =>{
    axios.get(`https://665736969f970b3b36c8658a.mockapi.io/form/${id}`).then((res)=>{
      
      setProductDetails(res.data)
      setLoader(true)
    })
  }

  const addToCart = ():void =>{
      
      const getUser = localStorage.getItem("userID")
  
      if(getUser){

        axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then((res)=>{
          
          let arr: cartInfo[] = []
  
          if((productDetial.category?.name === "clothes" || productDetial.category?.name === "shoes") && size){
          
              let checkSize = res.data.cartItem?.some((item: cartInfo)=>item.size === size && item.id === id)
  
              if(!checkSize){
                arr = [...(res.data.cartItem ?? [])]
                
                arr.push({
                  "id":productDetial.id,
                  "title": productDetial.title,
                  "price": productDetial.price,
                  "images": productDetial.images,
                  "total": productDetial.price * qty,
                  "qty": qty,
                  "size":size
                })
  
                axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`,{
                  cartItem: arr
                }).then(()=>{
                    setAdding(true)
                    setItemLength(arr.length)
                    toast.success('The Product has been Added Successfuly 🎉', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                      });
                     
                })
  
              }else{
                  toast.error('The Product Already Exists', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                    });
              }
            
            }else if(productDetial.category?.name === "furniture"){
            
                let checkSize = res.data.cartItem?.some((item: cartInfo)=>item.title === productDetial.title)
  
                if(!checkSize){
                  arr = [...(res.data.cartItem ?? [])] 
                
                  arr.push({
                    "id":productDetial.id,
                    "title": productDetial.title,
                    "price": productDetial.price,
                    "images": productDetial.images,
                    "total": productDetial.price * qty,
                    "qty": qty
                  })
  
                  axios.put(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`,{
                    cartItem: arr
                  }).then(()=>{
                        setAdding(true)
                        setItemLength(arr.length)
                        toast.success('The Product has been Added Successfuly 🎉', {
                          position: "top-right",
                          autoClose: 3500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light"
                          });
                          
                  })
                  
                }else{
                    toast.error('The Product Already Exists', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light"
                      });
  
                }
         
            }else{
              toast.warn('Please Select your Size!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
            }
  
        })

      }else{

        toast.warn(
          <p>
            You have to Login<Link to='/signin' className='text-blue-500 underline ml-1'>Here</Link> to Complete the Process            
          </p>
          , {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
        
      }

      setTimeout(()=>{
         setAdding(false)
      },5000)

  }

  return (
    <>
    {loader ?(
          <main>
          <Nav/>
        
          <ToastContainer />
          <section className="flex items-center flex-col h-screen">
          <section className="grid   grid-cols-2  gap-x-6  max-sm:grid-cols-1 max-sm:px-6 px-10 max-sm:py-12 lg:px-12 lg:py-20 py-6">
    
             <section>
              <img src={productDetial.images} className="lg:h-[25rem] lg:w-[95vh] h-[15rem] w-[95vw]"></img>
             </section>
             <section className="flex w-full flex-grow  flex-col h-full max-sm:gap-y-4 max-sm:py-8 lg:gap-y-4  gap-y-5">
              <h1 className="text-[2em] font-bold">{productDetial.title}</h1>
              <p className="text-justify max-sm:text-[1.1em] text-[1.2em]">{productDetial.description}</p>
    
              <section className="flex items-center flex-wrap gap-6 max-sm:mt-4">
                {productDetial.category?.name === "clothes"  && 
                    <>
                   
                        <p className="font-bold  max-sm:text-[1.29em] text-[1.3em]">Size:</p>
                        <select className="w-fit px-4 border-[1.5px] lg:text-[1.1em] text-[1.1em] border-gray-300 rounded-sm py-1" value={size} onChange={(e)=>setSize(e.target.value)}>
                          <option value="" >Select Size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                    </>
                
                }
                {productDetial.category?.name === "shoes"  && 
                    <>
                   
                        <p className="font-bold  max-sm:text-[1.29em] text-[1.3em]">Size:</p>
                        <select className="w-fit px-4 border-[1.5px] lg:text-[1.1em] text-[1.1em] border-gray-300 rounded-sm py-1" value={size} onChange={(e)=>setSize(e.target.value)}>
                          <option value="" >Select Size</option>
                          <option value="36">36</option>
                          <option value="38">38</option>
                          <option value="40">40</option>
                        </select>
                    </>
                
                }
                <p className="font-bold max-sm:text-[1.29em] text-[1.3em]">Price: <span className="text-red-600 px-2">{(productDetial.price?? 0)  * qty}$</span></p>  
    
              </section>
              <section className="flex gap-4 mt-2 max-sm:mt-4">
                <button className={`${!adding?"bg-[#6146cb] hover:bg-[#6141e0]":"bg-[#c5c5c5]"} max-sm:text-[1em] text-[1.2em] lg:text-[1.2em] py-2 max-sm:w-[60vw] w-[26vw] px-8 rounded-sm text-white max-ms:px-12`} disabled={adding} onClick={()=> addToCart()}>{adding? <span className="w-full flex gap-x-2 items-center justify-center">Adding <img src={LoadingIcon} className="w-5 h-5"></img></span>: "Add to Cart"}</button>
                <select className="w-fit px-4 border-[1.5px] border-gray-300 rounded-sm" value={qty} onChange={(e)=>setQty(parseInt(e.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
    
              </section>
             </section>
          </section>
          </section>
         
          <Footer/>
        </main>
    
    ):
    (
        <section className="flex h-screen flex-col justify-center items-center">
           <img src={loaderIcon} className="w-8 h-7"></img>
        </section>
  
    
    )
    
    }
    </>
      )
}

export default Products