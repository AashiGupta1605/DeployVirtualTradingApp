import React, { useEffect, useState } from 'react';

import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import "./FooterSlider.css";

const FooterSlider = () => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:5000/v1/api/organization/display-all-org");
                setData(response.data);
                console.log("Organization Data: ",data)
            } 
            catch(error) {
                setErr(error.message); 
            }
        };

        fetchData(); 
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="slider-container">

            {err && <div className="error-message">Error: {err}</div>}

            <Slider {...settings}>
                {data.length > 0 ? (
                    data.map((card, index) => (
                        <div key={index} className="card">
                            {/* <img
                                src={card.imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"}
                                alt={card.name}
                                className="card-image"
                            /> */}
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
                                alt={card.name}
                                className="card-image"
                            />
                            <div className="card-content">
                                <h3>{card.name}</h3>
                                <p>{card.website ? card.website : "No website available"}</p>
                                <p>{card.address ? card.address : "No address available"}</p>
                                <p>{card.contactPerson ? card.contactPerson : "No contact person available"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Slider>
        </div>
    );
};

export default FooterSlider; 
