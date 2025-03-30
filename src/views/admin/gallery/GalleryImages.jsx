import React from 'react'
import StatsSection from "../../../components/Admin/Cards/StatsSection";
import GalleryImageNavbar from '../../../components/Admin/GalleryComponents/GalleryImageNavbar'
import ShowGalleryImages from '../../../components/Admin/GalleryComponents/ShowGalleryImages'

const GalleryImages = ({ sidebarExpanded }) => {
  return (
    <>
    <div className="mt-12 overflow-hidden">
    <StatsSection isDashboard={false} />
    <GalleryImageNavbar sidebarExpanded={sidebarExpanded}/>
    <div>
    <ShowGalleryImages sidebarExpanded={sidebarExpanded}/>
    </div>
    </div>
    </>
  )
}

export default GalleryImages
