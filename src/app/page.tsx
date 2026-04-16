import React from 'react'
import Hero from './components/shared/Hero'
import FeaturedCourses from './components/shared/FeaturedCourses'
import Categories from './components/shared/Categories'
import WhyChooseUs from './components/shared/WhyChooseUs'
import HowItWorks from './components/shared/HowItWorks'
import Testimonials from './components/shared/Testimonials'
import CTA from './components/shared/CTA'

export default function home() {
  return (
    <div>
      <Hero/>
      <FeaturedCourses/>
      <WhyChooseUs/>
      <HowItWorks/>
      <Testimonials/>
      <CTA/>
      
    </div>
  )
}
