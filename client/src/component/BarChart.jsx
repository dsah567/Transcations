import React, {   useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { Chart } from "react-google-charts";

export default function BarChart() {

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
            const { data } = await axios.get(`https://transcations.onrender.com/order/barchat/${month}`)
            console.log(data);
            let arr=[]
            arr.push(["Price Range","Number of Orders"])
            for (const [key, value] of Object.entries(data)) {
              arr.push([key,value])
            }
            console.log(arr);
            
            setOrders(arr)
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
       <label className="block font-medium mb-1 text-3xl">Bar Chart Stats</label>
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

        <Chart chartType="ColumnChart" width="100%" height="100%" data={orders} />

      </div>
    
  )
}
