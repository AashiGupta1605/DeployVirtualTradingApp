// ----------Reviewed: Correct (Animation of no. show left, also don't take use of err)-------------------------------

import axios from "axios";
import React, { useState, useEffect } from "react";
// import { useSpring, animated } from "react-spring";

const InfoCards = () => {

    const [userData,setUserData]=useState([])
    const [orgData,setOrgData]=useState([])
    const [activeUsers,setActiveUsers]=useState(0)
    const [err,setErr]=useState("")

    const fetchOrgData = async () =>{
      try{
        const response = await axios.get('http://localhost:5000/v1/api/guestUser/searchOrganization');
        setOrgData(response.data.data);
        setErr("")
      }
      catch(error){
        console.log("InfoCard Error in Organizations Data fetch: ",error)
        setErr("InfoCard Error in Organizations Data fetch: ",error.message)
      }
    }
    
    const fetchUserData = async () =>{
      try{
        const response = await axios.get('http://localhost:5000/v1/api/user/display-users');
        setUserData(response.data);

        const activeCount = response.data.filter((data) => data.status === true).length;
        setActiveUsers(activeCount);
        setErr("")
      }
      catch(error){
        console.log("InfoCard Error in User Data fetch: ",error)
        setErr("InfoCard Error in User Data fetch: ",error.message)
      }
    }

    useEffect(() => {
      try {
        fetchOrgData()
        fetchUserData()
        setErr("")
      } 
      catch (error) {
        console.log("InfoCard Error: ",error);
        setErr("InfoCard Error: ",error.message)
      }
    }, [userData,orgData]);

    const popupCards = [
      { id: 1, headline: "Organizations", description: orgData.length},
      { id: 2, headline: "Registered Users", description: userData.length},
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
    <>
        <div className="-mt-14 mx-6">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {popupCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#cce0e8] mr-4 rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 ease-in-out hover:scale-104"
                >
                  <h3 className="text-xl font-bold text-[#213e4a] pb-4">{card.headline}</h3>
                  <h3 className="text-xl font-bold mb-4 text-[#2d5263]">{card.description}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default InfoCards

