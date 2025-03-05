import React from 'react'
import Pricing from '../../components/GuestUser/Pricing/Pricing'
// import DummyPricing from '../../components/GuestUser/Pricing/DummyPricing'
import MainHomeNavbar from '../../components/GuestUser/Navbars/MainHomeNavbar'
import NavbarCarousel from '../../components/GuestUser/Navbars/NiftyNavbarCarousel'
import Footer from '../../components/GuestUser/Footers/Footer'

const PricingPage = () => {
  return (
    <>
    <MainHomeNavbar/>
    <NavbarCarousel/>
    <div className='mt-12'>
      <Pricing/>
      {/* <DummyPricing/> */}
    </div>
    <Footer/>
    </>
  )
}

export default PricingPage
