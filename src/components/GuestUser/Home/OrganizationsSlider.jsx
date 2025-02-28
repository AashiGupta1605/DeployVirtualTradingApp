import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../Home/OrganizationsSliderCSS.css"


const OrganizationsSlider = () => {

  const [data, setData] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v1/api/organization/display-all-org');
        setData(response.data);
      } catch (error) {
        setErr(error.message);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 4,  // Number of images visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Makes it a continuous scroll effect
    cssEase: "linear",
    arrows: false, // Hides navigation arrows
  };

  return (
    <div className="mb-12 text-center">

    {err && <div className="error-message">Error: {err}</div>}

    <Slider {...settings}>
          {data.length > 0 ? (
            data.map((card, index) => (
              <div key={index} className="card flex flex-col h-86 bg-[] rounded-lg shadow-lg p-6 ease-in-out hover:scale-120" style={{}}>
              <div className="flex justify-center items-center">
                <img
                  src={card.imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"}
                  alt={card.name}
                  className="w-30 h-30 object-cover rounded-full"
                  // className="w-full h-32 object-contain rounded-lg"                
                />
                </div>
                <div className="card-content flex flex-col justify-between flex-grow">
                  <h2 className="text-[22px] font-bold text-[] mb-7 uppercase mt-4 decoration-3 border-b-4 border-[#591915] pb-2">{card.name}</h2>
                  <p className="mt-2 text-sm font-medium text-left pl-4">
                    <a href={card.website || '#'} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                        {card.website || 'No website available'}
                    </a>
                  </p>                  
                  <p className="mt-2 text-sm font-medium text-left pl-4 "><span className="font-bold text-[#591915]">Address:&nbsp;</span>
                  {card.address 
                    ? card.address.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                    : 'No address available'}     
                  </p>
                  <p className="mt-2 text-sm font-medium text-left pl-4"><span className="font-bold text-[#591915]">Head of Organization:&nbsp;</span>
                    {card.contactPerson 
                    ? card.contactPerson.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                    : 'No contact person available'}                  
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div><font color='red'><b>Loading...</b></font></div>
          )}
    </Slider>

    </div>
  );
};

export default OrganizationsSlider;