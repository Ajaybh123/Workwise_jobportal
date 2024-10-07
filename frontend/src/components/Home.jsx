import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import LatestJob from './LatestJob'
import Footer from './Footer'
import GetAllJobs from './Hooks/GetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
  GetAllJobs()

  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate('/admin/companies');
    }
  }, [])
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <LatestJob />
      <Footer />
    </div>
  )
}
