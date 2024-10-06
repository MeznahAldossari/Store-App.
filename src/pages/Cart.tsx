import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import { cartInfo } from "../types/types"
import axios from "axios"

function Cart() {
  const [itemDetails, setItemDetails] = useState<cartInfo[] | null>(null)

  useEffect(()=>{
    getCartItems()
  },[])

  const getCartItems = (): void =>{
    let getUser = localStorage.getItem("userID")
    axios.get(`https://667b1a30bd627f0dcc91b421.mockapi.io/Users/allUsers/${getUser}`).then((res)=>{
      setItemDetails(res.data.cartItem)
    })
  }
  return (
    <main>
      <Nav/>
      <section className="flex lg:grid lg:grid-cols-3 lg:gap-x-10 lg:py-6 max-sm:flex-col max-sm:py-12 max-sm:px-6 px-10 lg:px-10">
        <section className="flex justify-center lg:col-span-2  overflow-y-auto lg:h-[75vh]">
      {itemDetails &&(
         <table className="table-fixed h-fit w-full  border-[1.5px] shadow-lg border-gray rounded-md">
         <tr className="bg-gray-400">
           <th>Image</th>
           <th>Name</th>
           <th>Size</th>
           <th>Price</th>
           <th>quantity</th>
           <th>Total</th>
         </tr>
         {itemDetails?.map((item,index)=>(
           <tr key={index} className=" border-[1.5px] border-gray">
             <td className="border border-white  flex justify-center text-wrap px-4 py-2 text-center max-sm:px-0"><img src={item?.images} className="max-sm:w-10 max-sm:h-16 w-[6rem] h-[6rem]"></img></td>
             <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0" >{item?.title}</td>
             <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">{item?.size}</td>
             <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">{item?.price}</td>
             <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">{item.size? (
               <select value={item?.qty}>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
             </select>): "-"}</td>
             <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">{item?.qty * item?.price}</td>
           </tr>
         ))}
         
       </table>


      )}
         
        </section>
        <section className="flex lg:h-fit lg:py-4 px-2 rounded-md shadow-lg border-[1.2px] border-gray-300  flex-col max-ms:gap-y-3 max-sm:py-1 max-sm:mt-4  pb-2">
          
              <h1 className="font-bold max-sm:text-[1.2em] py-3 text-[1.2em]">Summary</h1>
              <p className="font-semibold">Products</p>
              <hr className="py-1"></hr>
          
           
            <section className="overflow-y-auto h-auto max-h-[32vh]">
              {itemDetails?.map((product,index)=>(
                    <section className="flex justify-between flex-wrap" key={index}>
                      <p>{product?.title}</p>
                      <span className="">
                        {product?.qty} X {product?.price}
                      </span>
                    </section>
              ))}
            </section>
           
           <section className="">
              <p className="flex justify-between py-4 max-sm:pb-7 font-bold"> <span>Total:</span><span className="text-red-500">20$</span></p>
              <button className="bg-[#6146cb] hover:bg-[#6141e0] rounded-sm py-1 text-white w-full">Checkout</button>
           </section>
           
        </section>

      </section>
     
    </main>
  )
}

export default Cart
