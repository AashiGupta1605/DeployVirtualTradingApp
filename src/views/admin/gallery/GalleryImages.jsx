import React from 'react'
import StatsSection from "../../../components/Admin/Cards/StatsSection";
import ShowGalleryImages from '../../../components/Admin/GalleryComponents/ShowGalleryImages'

const GalleryImages = ({ sidebarExpanded }) => {
  return (
    <>
    <div className="mt-12 overflow-hidden">
    <StatsSection isDashboard={false} />
    <div>
    <ShowGalleryImages sidebarExpanded={sidebarExpanded}/>
    </div>
    </div>
    </>
  )
}

export default GalleryImages
