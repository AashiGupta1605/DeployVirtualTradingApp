import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useSpring, animated } from "react-spring";

const InfoCards = () => {

    const [userData,setUserData]=useState([])
    const [orgData,setOrgData]=useState([])
    const [activeUsers,setActiveUsers]=useState(0)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response1 = await axios.get('http://localhost:5000/v1/api/organization/display-all-org');
            setOrgData(response1.data);
            
            const response2 = await axios.get('http://localhost:5000/v1/api/user/display-users');
            setUserData(response2.data);
            
            const activeCount = response2.data.filter((data) => data.status === true).length;
    
            setActiveUsers(activeCount);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    const popupCards = [
      { id: 1, headline: "Organizations", description: orgData.length},
      { id: 2, headline: "Register Users", description: userData.length},
      { id: 3, headline: "Active Users", description: activeUsers },
      { id: 4, headline: "Available Stocks", description: "100" },
    ];
  
    // const animatedNumber = (value) => {
    //   return useSpring({
    //     from: { number: 0 },
    //     number: value,
    //     config: { tension: 200, friction: 20 },
    //   });
    // };

  return (
    <div>
        <div className="left-0 right-0">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {popupCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 ease-in-out hover:scale-103"
                >
                  <h3 className="text-2xl font-bold mb-4">{card.headline}</h3>
                  <h3 className="text-2xl font-semibold mb-4">{card.description}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default InfoCards

