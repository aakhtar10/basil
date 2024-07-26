import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SidebarWithHeader from './components/SideBar'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={<SidebarWithHeader/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes