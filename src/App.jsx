import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import RoboticsLab from './Pages/Labs/RoboticsLab'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import ARVRLab from './Pages/Labs/ARVRLab'
import CompositeLab from './Pages/Labs/CompositeLab'
import ILMS from "./Pages/ILMS/ILMS"
import Competition from './Pages/Competition/Competition'
import Contact from './Pages/Contact/Contact'

import AdminHero from "./Admin/Home/AdminHero"
import AdminChooseSection from './Admin/Home/AdminChooseSection'
import AdminTestimonials from './Admin/Home/AdminTestimonials'
import AdminContactSection from './Admin/Home/AdminContactSection'
import AdminRoboticsLab from './Admin/Labs/AdminRoboticsLab'
import AdminAiLab from './Admin/Labs/AdminAiLab'
import AdminCompositeLab from './Admin/Labs/AdminCompositeLab'
import CourseLabSample from './Admin/Labs/CourseLabSample'
import AdminOurFacilities from './Admin/Labs/AdminOurFacilities'
import AdminQuestions from './Admin/Labs/AdminQuestions'

import AdminIlmsHero from './Admin/ILMS/AdminIlmsHero'
import AdminIlmsChoose from './Admin/ILMS/AdminIlmsChoose'
import AdminCompetitionHero from './Admin/Competiton/AdminCompetitionHero'
import AdminVictory from './Admin/Competiton/AdminVictory'
import AdminWin from './Admin/Competiton/AdminWin'
import AdminContact from './Admin/ContactFooter/AdminContact'
import AdminFooter from './Admin/ContactFooter/AdminFooter'
import DashboardLayout from './Admin/Dashboard/AdminDashboard'
import AdminDashboard from './Admin/Dashboard/AdminDashboard'
import AdminLogin from './Admin/AdminLogin/AdminLogin'

const App = () => {
  return (
    <div>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/robotics-lab" element={<RoboticsLab/>} />
        <Route path="/ar-vr-lab" element={<ARVRLab/>} />
        <Route path="/composite-lab" element={<CompositeLab/>} />
        <Route path="/ilms" element={<ILMS/>} />
        <Route path="/competition-and-exhibition" element={<Competition/>} />
        <Route path="/contact" element={<Contact/>} />


        <Route path='/admin/hero' element= {<AdminHero/>} />
        <Route path='/admin/choose-section' element= {<AdminChooseSection/>} />
        <Route path='/admin/testimonials' element= {<AdminTestimonials/>} />
        <Route path='/admin/contact-form' element= {<AdminContactSection/>} />


        
        <Route path='/admin/robotics-lab' element= {<AdminRoboticsLab/>} />
        <Route path='/admin/ai-lab' element= {<AdminAiLab/>} />
        <Route path='/admin/composite-lab' element= {<AdminCompositeLab/>} />
        <Route path='/admin/tri-section' element= {<CourseLabSample/>} />
        <Route path='/admin/our-facilities' element= {<AdminOurFacilities/>} />
        <Route path='/admin/questions-section' element= {<AdminQuestions/>} />

        <Route path='/admin/ilms-hero' element= {<AdminIlmsHero/>} />
        <Route path='/admin/ilms-choose' element= {<AdminIlmsChoose/>} />

        <Route path='/admin/competition-hero' element= {<AdminCompetitionHero/>} />
        <Route path='/admin/victory-section' element= {<AdminVictory/>} />
        <Route path='/admin/win-section' element= {<AdminWin/>} />

        
        <Route path='/admin/contact-section' element= {<AdminContact/>} />
        <Route path='/admin/footer' element= {<AdminFooter/>} />

        <Route path='/admin/dashboard' element= {<AdminDashboard/>} />
        <Route path='/admin/login' element= {<AdminLogin/>} />
        
      </Routes>
        <Footer/>
    </div>
  )
}

export default App