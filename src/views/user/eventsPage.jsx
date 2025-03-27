import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Trophy,
  Gift,
  Users,
  Star,
  ArrowRight,
  Info,
  Medal,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
  BarChart2,
  DollarSign,
  Bitcoin,
  TrendingUp,
  Shield,
  BadgeCheck,
  Coins
} from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [expandedEvent, setExpandedEvent] = useState(null);

  const toggleEventExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const events = [
    {
      id: 1,
      title: "Elite Crypto Trading Championship",
      type: "ongoing",
      description: "Compete against the best traders in our premier crypto trading competition with massive prizes!",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      participants: 1250,
      prize: "$50,000",
      prizeBreakdown: [
        { position: "1st", reward: "$15,000 + VIP Trading Account" },
        { position: "2nd", reward: "$10,000 + Premium Tools" },
        { position: "3rd", reward: "$7,500 + Mentorship" },
        { position: "4-10th", reward: "$2,500 each" },
        { position: "11-50th", reward: "$500 each" },
        { position: "All Participants", reward: "5% Cashback" }
      ],
      cashbackPercentage: 5,
      difficulty: "Expert",
      icon: <Trophy className="text-blue-500" size={24} />,
      entryFee: 100,
      rewards: [
        "Exclusive VIP trading signals for top 3",
        "5% cashback on all trades during event",
        "Verified trader badge for top 10",
        "Early access to new features",
        "Personalized performance analytics"
      ],
      backgroundColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      highlight: "Most Popular",
      requirements: "Minimum 20 trades during event period",
      progress: 65,
      progressText: "65% of spots filled"
    },
    {
      id: 2,
      title: "Stock Market Prediction League",
      type: "upcoming",
      description: "Test your analytical skills by predicting stock movements with high accuracy!",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      participants: 0,
      prize: "$25,000",
      prizeBreakdown: [
        { position: "1st", reward: "$10,000" },
        { position: "2nd", reward: "$6,000" },
        { position: "3rd", reward: "$4,000" },
        { position: "4-10th", reward: "$1,000 each" },
        { position: "Top 10%", reward: "3% Cashback" }
      ],
      cashbackPercentage: 3,
      difficulty: "Advanced",
      icon: <Star className="text-yellow-500" size={24} />,
      entryFee: 150,
      rewards: [
        "Premium stock analysis tools for winners",
        "3% cashback on predictions",
        "Featured in our Hall of Fame",
        "Exclusive webinar with market experts",
        "Portfolio review session"
      ],
      backgroundColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      highlight: "Early Bird Registration Open",
      requirements: "Minimum 50 predictions to qualify",
      progress: 12,
      progressText: "12% of spots filled"
    },
    {
      id: 3,
      title: "Beginner's Trading Bootcamp",
      type: "ongoing",
      description: "Perfect for newcomers - learn while you earn with guided trading challenges!",
      startDate: "2024-02-20",
      endDate: "2024-03-20",
      participants: 750,
      prize: "$10,000",
      prizeBreakdown: [
        { position: "1st", reward: "$3,000 + Mentorship" },
        { position: "2nd", reward: "$2,000 + Course Access" },
        { position: "3rd", reward: "$1,500" },
        { position: "4-20th", reward: "$500 each" },
        { position: "All Participants", reward: "2% Cashback" }
      ],
      cashbackPercentage: 2,
      difficulty: "Beginner",
      icon: <Users className="text-green-500" size={24} />,
      entryFee: 25,
      rewards: [
        "Step-by-step educational modules",
        "2% cashback on learning trades",
        "Weekly mentorship sessions",
        "Beginner-friendly trading tools",
        "Community support forum access"
      ],
      backgroundColor: "bg-gradient-to-br from-green-50 to-green-100",
      highlight: "Best for New Traders",
      requirements: "No minimum trade requirement",
      progress: 85,
      progressText: "85% of spots filled"
    },
    {
      id: 4,
      title: "NFT Trading Challenge",
      type: "upcoming",
      description: "Trade NFTs and win exclusive digital collectibles in this limited-time event!",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      participants: 0,
      prize: "Exclusive NFTs + $15,000",
      prizeBreakdown: [
        { position: "1st", reward: "Blue-Chip NFT + $5,000" },
        { position: "2nd", reward: "Rare NFT + $3,000" },
        { position: "3rd", reward: "Limited NFT + $2,000" },
        { position: "4-10th", reward: "Special Edition NFT" },
        { position: "All Participants", reward: "4% Cashback" }
      ],
      cashbackPercentage: 4,
      difficulty: "Advanced",
      icon: <Gift className="text-purple-500" size={24} />,
      entryFee: 75,
      rewards: [
        "Rare NFT collectibles for winners",
        "4% cashback on NFT trades",
        "Community recognition badges",
        "Early access to NFT drops",
        "Exclusive NFT analytics tools"
      ],
      backgroundColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      highlight: "Limited Edition NFTs",
      requirements: "Minimum 10 NFT trades",
      progress: 22,
      progressText: "22% of spots filled"
    },
    {
      id: 5,
      title: "Options Trading Showdown",
      type: "ongoing",
      description: "Master options strategies and compete for the highest returns in this intense challenge!",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      participants: 420,
      prize: "$30,000",
      prizeBreakdown: [
        { position: "1st", reward: "$12,000 + VIP Status" },
        { position: "2nd", reward: "$8,000" },
        { position: "3rd", reward: "$5,000" },
        { position: "4-5th", reward: "$2,500 each" },
        { position: "Top 20%", reward: "3.5% Cashback" }
      ],
      cashbackPercentage: 3.5,
      difficulty: "Expert",
      icon: <BarChart2 className="text-red-500" size={24} />,
      entryFee: 200,
      rewards: [
        "Advanced options trading tools",
        "3.5% cashback on options trades",
        "Exclusive options strategy guides",
        "Risk management consultation",
        "Performance analytics dashboard"
      ],
      backgroundColor: "bg-gradient-to-br from-red-50 to-red-100",
      highlight: "High Stakes Challenge",
      requirements: "Minimum 15 options trades",
      progress: 42,
      progressText: "42% of spots filled"
    },
    {
      id: 6,
      title: "DeFi Yield Farming Race",
      type: "upcoming",
      description: "Compete to generate the highest yields in decentralized finance protocols!",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      participants: 0,
      prize: "$20,000 + Crypto Rewards",
      prizeBreakdown: [
        { position: "1st", reward: "$8,000 + 5 ETH" },
        { position: "2nd", reward: "$5,000 + 3 ETH" },
        { position: "3rd", reward: "$3,000 + 1 ETH" },
        { position: "4-10th", reward: "$1,000 each" },
        { position: "All Participants", reward: "4.5% Cashback" }
      ],
      cashbackPercentage: 4.5,
      difficulty: "Advanced",
      icon: <Coins className="text-amber-500" size={24} />,
      entryFee: 125,
      rewards: [
        "Exclusive DeFi strategy guides",
        "4.5% cashback on all DeFi transactions",
        "Early access to new protocols",
        "Smart contract audit reports",
        "Yield optimization tools"
      ],
      backgroundColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      highlight: "Hot New Event",
      requirements: "Minimum $1,000 TVL in protocols",
      progress: 8,
      progressText: "8% of spots filled"
    }
  ];

  const filteredEvents = events.filter(event => event.type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mt-16">
              DreamNifty Trading Events
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Compete in thrilling trading challenges, master new strategies, and win life-changing rewards! 
              Our events cater to all skill levels with prizes worth over $250,000 annually.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Prize Pool</p>
              <p className="text-xl font-bold">$250,000+</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Users className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Traders</p>
              <p className="text-xl font-bold">2,420+</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Bitcoin className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Events Completed</p>
              <p className="text-xl font-bold">48</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <TrendingUp className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. ROI</p>
              <p className="text-xl font-bold">27.5%</p>
            </div>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full shadow-sm p-1 flex space-x-2 border border-gray-200">
            {['ongoing', 'upcoming'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full transition-colors duration-200 flex items-center ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'ongoing' && <Zap className="mr-2" size={18} />}
                {tab === 'upcoming' && <Calendar className="mr-2" size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className={`rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${event.backgroundColor} border border-gray-200`}
            >
              {/* Highlight Badge */}
              {event.highlight && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-xs flex items-center">
                  <Zap className="mr-1 text-yellow-500" size={14} />
                  {event.highlight}
                </div>
              )}
              
              <div className="p-5">
                {/* Event Header */}
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-xs mr-4">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Shield className="text-gray-400 mr-1" size={14} />
                      <span className="text-xs text-gray-500">{event.requirements}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-5">{event.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{event.progressText}</span>
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${event.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Starts</p>
                      <p className="text-sm font-medium">{event.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Ends</p>
                      <p className="text-sm font-medium">{event.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="text-sm font-medium">{event.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-gray-500" size={18} />
                    <div>
                      <p className="text-xs text-gray-500">Entry Fee</p>
                      <p className="text-sm font-medium">${event.entryFee}</p>
                    </div>
                  </div>
                </div>
                
                {/* Prize Pool Section */}
                <div className="bg-white/80 p-4 rounded-lg mb-5 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Medal className="mr-2 text-yellow-500" size={18} />
                      Total Prize Pool
                    </span>
                    <span className="font-bold text-blue-600">{event.prize}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600 flex items-center">
                      <BadgeCheck className="mr-2 text-green-500" size={18} />
                      Cashback Offer
                    </span>
                    <span className="font-bold text-green-600">
                      {event.cashbackPercentage}%
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleEventExpand(event.id)}
                    className="w-full text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center"
                  >
                    {expandedEvent === event.id ? (
                      <>
                        <span>Hide prize breakdown</span>
                        <ChevronUp className="ml-1" size={16} />
                      </>
                    ) : (
                      <>
                        <span>View prize breakdown</span>
                        <ChevronDown className="ml-1" size={16} />
                      </>
                    )}
                  </button>
                  
                  {/* Expanded Prize Breakdown */}
                  {expandedEvent === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-xs font-semibold text-gray-500 mb-2">PRIZE DISTRIBUTION</h4>
                      <ul className="space-y-3">
                        {event.prizeBreakdown.map((item, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.position}</span>
                            <span className="text-sm text-gray-700">{item.reward}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Rewards List */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Zap className="mr-2 text-yellow-500" size={16} />
                    EVENT REWARDS
                  </h4>
                  <ul className="space-y-3">
                    {event.rewards.map((reward, index) => (
                      <li 
                        key={index} 
                        className="flex items-start text-sm text-gray-600"
                      >
                        <div className="mt-0.5 mr-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Participate Button */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group font-medium shadow-sm">
                  <span>Join Event Now</span>
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="text-gray-400" size={36} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No {activeTab} events at the moment
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We're preparing exciting new challenges for you. Check back soon or explore our learning resources while you wait.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Notify Me About New Events
            </button>
          </div>
        )}

        {/* Testimonials Section */}
        {filteredEvents.length > 0 && (
          <div className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">What Our Traders Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John D.</h4>
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"Won $8,500 in the Options Challenge! The competition pushed me to refine my strategies and the rewards were incredible."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah M.</h4>
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"As a beginner, the Bootcamp was perfect. I learned so much and still won $1,200! The community support was amazing."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Raj K.</h4>
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"The cashback alone makes these events worth it. I've earned over $2,300 in cashback rewards this year!"</p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                How do I participate in an event?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Simply click the "Join Event Now" button on any event card, complete the registration process, and pay the entry fee if applicable. You'll receive immediate access to the event dashboard.
              </p>
            </div>
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                Are there any requirements to join?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Most events require a minimum account balance or trading volume. Beginner events often have no requirements, while advanced competitions may require verification of trading experience.
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-medium flex items-center">
                <Info className="text-blue-500 mr-3" size={20} />
                How are winners determined?
              </h3>
              <p className="mt-2 text-gray-600 pl-8">
                Winners are ranked based on event-specific metrics (ROI, accuracy, profit, etc.). All judging criteria are clearly outlined in each event's rules, and standings are updated in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;