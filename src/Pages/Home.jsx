import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import ImpactSection from '../Components/ImpactSection/ImpactSection'
import ChooseSection from '../Components/ChooseSection/ChooseSection'
import CaseStudies from '../Components/CaseStudies/CaseStudies'
import Testimonials from '../Components/Testimonials/Testimonials'
import ContactForm from '../Components/ContactForm/ContactForm'

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL

  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then(res => res.json())
      .then(data => {
        setHomeData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return null // ya loader

  return (
    <div>
      <Hero hero={homeData?.hero} />
      <ImpactSection />
      <ChooseSection data={homeData?.chooseSection} />
      <CaseStudies />
      <Testimonials data={homeData?.testimonialsSection} />
      <ContactForm data={homeData?.contactSection} />
    </div>
  )
}

export default Home
