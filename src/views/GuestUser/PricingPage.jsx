import React from 'react'
import Pricing from '../../components/GuestUser/Pricing/Pricing'
// import DummyPricing from '../../components/GuestUser/Pricing/DummyPricing'
import MainHomeNavbar from '../../components/GuestUser/Navbars/MainHomeNavbar'
// import NiftyNavbarCarousel from '../../components/GuestUser/Navbars/NiftyNavbarCarousel'
// import EtfNavbarCarousel from '../../components/GuestUser/Navbars/EtfNavbarCarousel'
import Footer from '../../components/GuestUser/Footers/Footer'

const PricingPage = () => {
  return (
    <>
    <MainHomeNavbar fixed/>
    {/* <NiftyNavbarCarousel fixed/> */}
    {/* <EtfNavbarCarousel fixed/> */}
    <div className='mt-12'>
      <Pricing/>
      {/* <DummyPricing/> */}
    </div>
    <Footer/>
    </>
  )
}

export default PricingPage
