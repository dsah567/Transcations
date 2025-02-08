import React, {  use, useLayoutEffect, useState } from 'react'
import axios from 'axios'

export default function Statistics() {

  const [orders, setOrders] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [err,setErr]= useState(false)
    const [month,setMonth]=useState(3)

    const handleMonthChange  =(e)=>{
      setMonth( e.target.value)
    }

    useLayoutEffect(()=>{
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8000/order/statistics/${month}`)
          console.log(data);
          setOrders(data)
          setDataLoading(false)
        } catch (error) {
          setErr(true)
          setDataLoading(false)
        }
      }
      fetchOrders()
    },[month]);

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
    <div>

<div className="m-auto">
        <label className="block font-medium mb-1 text-3xl">statistics</label>
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

      <div className='flex flex-col justify-center bg-yellow-200 m-auto p-4 rounded-3xl '>
          <h1 className='whitespace-pre text-2xl'> Total Sale               {orders.totalSales}</h1>        
          <h1 className='whitespace-pre text-2xl'> Total sold item        {orders.soldNo}</h1>
          <h1 className='whitespace-pre text-2xl'> Total not sold item  { orders.notSoldNo}</h1>

      </div>


    </div>
  )
}
