import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Footers/FooterSlider3.css';

const FooterSlider3 = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState('');

  // Fetch the data from the API
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

  return (
    <div className="slider-container">
      {err && <div className="error-message">Error: {err}</div>}

      <div className="slider-wrapper">
        <div className="slider">
          {data.length > 0 ? (
            data.map((card, index) => (
              <div key={index} className="card">
                {/* <img
                  src={card.imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"}
                  alt={card.name}
                  className="w-full h-32 object-contain rounded-lg"                
                /> */}
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
                    alt={card.name}
                    className="w-full h-30 object-contain rounded-lg"
                />
                <div className="card-content">
                  <h3 className="text-2xl font-bold text-[] mb-6 uppercase">{card.name}</h3>
                  <p className="mt-2 text-lg font-medium">
                    <a href={card.website || '#'} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                        {card.website || 'No website available'}
                    </a>
                  </p>                  
                  <p className="mt-2 text-lg font-medium">{card.address || 'No address available'}</p>
                  <p className="mt-2 text-lg font-medium">{card.contactPerson || 'No contact person available'}</p>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FooterSlider3;
