import React, {  useLayoutEffect, useState } from 'react'
import axios from 'axios'
export default function Transcation()  {

  const [orders, setOrders] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [err,setErr]= useState(false)
  const [maxPage,setMaxPage]=useState(null)
  const [currentPage,setCurrentPage]=useState(1)
  const [month,setMonth]=useState(3)
  const [searchText, setSearchText] = useState("");
  

  const handleSearchChange = async (e)=>{
         setSearchText(e.target.value )
  }

  const handleMonthChange  =(e)=>{
    setMonth( e.target.value)
  }
  useLayoutEffect(()=>{
    const fetchOrders = async () => {
      try {

        
        if (!searchText) {
        const { data } = await axios.get(`http://localhost:8000/order/m/${month}/${currentPage}`)
        console.log(data);
        setOrders(data.data)
        setMaxPage(data.pages)
        setDataLoading(false)}

        else {
        const { data } = await axios.get(`http://localhost:8000/order/mt/${month}/${searchText}/${currentPage}`)
                                     
        console.log(data);
        setOrders(data.data)
        setMaxPage(data.pages)
        setDataLoading(false)}
        
      } catch (error) {
        console.log("fin");
        if(orders.length==0){
          setErr(true)
          setDataLoading(false)
        }
      }
    }
    fetchOrders()
  },[currentPage,month,searchText]);
   
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
      <h1 className="text-2xl text-center text-white p-auto">Transcation Dashboard</h1>

      <div className="flex justify-center my-auto">
       
      <div className="m-auto">
        <label className="block font-medium mb-1">Search:</label>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Enter search text..."
          className="w-full p-2 border rounded-md"
        />
      </div>
     
        <div className="m-auto">
        <label className="block font-medium mb-1">Select Month:</label>
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      </div>

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
        <span className="text-xl mx-2">Page {currentPage} of {maxPage}</span>
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