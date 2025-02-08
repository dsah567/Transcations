import React from 'react'
import {BrowserRouter as Router,Routes, Route,Link } from 'react-router-dom'

import Orders from './component/Orders'
import Transactions from './component/Transcation'
import Statistics from './component/Statistics'
import BarChart from './component/BarChart'


function App() {

  return (
    <Router>
      <div className="flex flex-col items-center justify-center  bg-gray-100 ">
        <nav className="w-full bg-blue-600 p-4 sticky top-0">
          <ul className="flex justify-center space-x-4 text-white">
            <li>
              <Link to="/" className="hover:underline">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/transcation" className="hover:underline">
                Transcations
              </Link>
            </li>
            <li>
              <Link to="/stats" className="hover:underline">
                Statistics
              </Link>
            </li>
            <li>
              <Link to="/chart" className="hover:underline">
                BarChart
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-full max-w-4xl p-4">
          <Routes>
            <Route path="/" element={<Orders/>} />
            <Route path="/transcation" element={< Transactions/>} />
            <Route path="/stats" element={<Statistics/>} />
            <Route path="/chart" element={< BarChart/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App