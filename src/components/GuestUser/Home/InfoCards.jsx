import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../utils/BaseUrl";
import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiActivity, FiDatabase, FiCheckCircle } from "react-icons/fi";
import CountUp from 'react-countup';

const InfoCards = ({shouldRefetch}) => {
  const [userData, setUserData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [approvedOrgs, setApprovedOrgs] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOrgData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/guestUser/getAllOrganizations`);
      setOrgData(response.data.data);
      const approvedOrgCount = response.data.data.filter(orgs => orgs.approvalStatus === 'approved').length;
      setApprovedOrgs(approvedOrgCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      setLoading(false);
    }
  };
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/guestUser/getAllUsers`);
      setUserData(response.data.data);
      const activeCount = response.data.data.filter(user => user.isDeleted === false).length;
      setActiveUsers(activeCount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(shouldRefetch){
      fetchOrgData();
      fetchUserData();
    }
  }, [shouldRefetch]);

  const stats = [
    { 
      id: 1, 
      title: "Partnered Organizations", 
      value: orgData.length,
      icon: <FiBriefcase className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      id: 2, 
      title: "Verified Organizations", 
      value: approvedOrgs,
      icon: <FiCheckCircle className="w-8 h-8" />,
      color: "bg-green-100 text-green-600"
    },
    { 
      id: 3, 
      title: "Registered Users", 
      value: userData.length,
      icon: <FiUsers className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      id: 4, 
      title: "Active Users", 
      value: activeUsers,
      icon: <FiActivity className="w-8 h-8" />,
      color: "bg-green-100 text-green-600"
    },
    // { 
    //   id: 5, 
    //   title: "Available Stocks", 
    //   value: 100,
    //   icon: <FiDatabase className="w-8 h-8" />,
    //   color: "bg-orange-100 text-orange-600"
    // },
  ];

  return (
    <section className="my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full ${stat.color} mb-4 mx-auto`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  {loading ? (
                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  ) : (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5} 
                      separator=","
                      className="block"
                    />
                  )}
                </h3>
                <p className="text-lg text-center text-gray-600 font-medium">
                  {stat.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfoCards;