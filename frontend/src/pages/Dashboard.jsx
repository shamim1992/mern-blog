import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComp from '../components/DashboardComp'
function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }

    }, [location.search])

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* left sidebar */}
            <div className="md:w-56">
                <DashSidebar />
            </div>

            {/* Right side */}
            <div className="w-full">
                {
                    tab === 'profile' && <DashProfile />
                }
                {/* <DashProfile /> */}
                {tab === 'posts' && <DashPosts />}
                {tab === 'users' && <DashUsers />}
                {tab === 'comments' && <DashComments />}
                {/* dashboard comp */}
                {tab === 'dash' && <DashboardComp />}
            </div>
        </div>
    )
}

export default Dashboard