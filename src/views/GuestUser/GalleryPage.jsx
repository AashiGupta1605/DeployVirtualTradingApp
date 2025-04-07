import React from 'react'
import ShowGalleryImages from '../../components/GuestUser/Gallery/ShowGalleryImages'

const GalleryPage = () => {
    return (
        <>
        <div className="fixed left-0 top-30 w-full py-[6px] z-20 bg-white"/>
        <div className='mt-33'>
        <ShowGalleryImages/>
        </div>
        </>
    )
}

export default GalleryPage
