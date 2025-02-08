import React, {  useLayoutEffect, useState } from 'react'
import axios from 'axios'
export default function Orders () {

  const [orders, setOrders] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [err,setErr]= useState(false)
  const [maxPage,setMaxPage]=useState(null)
  const [currentPage,setCurrentPage]=useState(1)
  
  useLayoutEffect(()=>{
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`https://transcations.onrender.com/order/${currentPage}`)
        console.log(data);
        setOrders(data.data)
        setMaxPage(data.pages)
        setDataLoading(false)
      } catch (error) {
        setErr(true)
        setDataLoading(false)
      }
    }
    fetchOrders()
  },[currentPage]);
   
  if (dataLoading) {
    return(
      <>
       <h1>Data is Loading</h1>
        
      </>
    )
  }
  if (err) {
    return <h1>Data loading failed</h1>;
  }

  return (
    <div className="bg-cyan-300">
      <h1 className="text-2xl text-center text-white p-4">Orders</h1>

      <table className="table-auto w-full bg-yellow-300 text-black border border-black">
        <thead>
          <tr className='border border-black'>
            <th className='border border-black' >ID</th>
            <th className='border border-black' >Title</th>
            <th className='border border-black' >Description</th>
            <th className='border border-black' >Price</th>
            <th className='border border-black' >Category</th>
            <th className='border border-black' >Sold</th>
            <th className='border border-black' >Image</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className='border border-black' >
                <td className='border border-black' >{order.id}</td>
                <td className='border border-black' >{order.title}</td>
                <td className='border border-black' >{order.description}</td>
                <td className='border border-black' >{order.price}</td>
                <td className='border border-black' >{order.category}</td>
                <td className='border border-black' >{order.sold ? "Yes" : "No"}</td>
                <td className='border border-black' >
                  <img src={order.image} alt={order.title} className="w-200 h-30" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data found</td>
            </tr>
          )}
        </tbody>
      </table>

     
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded mx-2"
        >
          Previous
        </button>
        <span className="text-xl mx-2">Page {currentPage} of {maxPage} </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage>=maxPage}
          className="px-4 py-2 bg-gray-600 text-white rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
