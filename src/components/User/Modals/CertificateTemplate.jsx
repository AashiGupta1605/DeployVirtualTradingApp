// CertificateTemplate.jsx
import React from 'react';

const user = JSON.parse(localStorage.getItem('user'));
const name = user?.name;
console.log(name);
// Helper function to format date (can be moved to a utils file)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) { return 'Invalid Date'; }
};

// Helper function to format date range (can be moved to a utils file)
const formatDateRange = (startDateString, endDateString) => {
    const start = formatDate(startDateString);
    const end = formatDate(endDateString);
    if (start === 'N/A' || start === 'Invalid Date' || end === 'N/A' || end === 'Invalid Date') {
        if (start !== 'N/A' && start !== 'Invalid Date') return start;
        if (end !== 'N/A' && end !== 'Invalid Date') return end;
        return 'N/A';
    }
    if (start === end) return start;
    return `${start} - ${end}`;
};


// Certificate Template Component receives data via props
const CertificateTemplate = ({ certificateData }) => {
  if (!certificateData) return null; // Don't render if no data

  const {
    certificateId,
    registrationDate, // This is the Issue Date
    user,             // Assuming user object has name: user.name
    event             // Assuming event object has title, startDate, endDate, description
  } = certificateData;

  const userName = name || 'Recipient Name';
  const eventName = event?.title || 'Event Name';
  const eventStartDate = event?.startDate;
  const eventEndDate = event?.endDate;
  const eventDescription = event?.description || 'Description of the event or achievement goes here.';
  const verificationCode = certificateId?.split('-').pop() || 'N/A'; // Example: Extract last part

  return (
    // This div is what html2canvas will capture. Style it precisely.
    // Use a unique ID for targeting
    <div
      id={`certificate-render-${certificateId}`} // Unique ID per certificate instance
      className="w-full bg-white shadow-lg" // Base styles, match modal's template
      style={{
        border: '10px solid #c0a062', // Example border color
        fontFamily: 'serif', // Use web safe fonts or ensure fonts are loaded
        padding: '0', // Reset padding, children handle it
        width: '1024px', // Fixed width often helps html2canvas consistency
        // aspectRatio: '297 / 210', // Optional: Maintain aspect ratio if design depends on it
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: '#1E40AF', padding: '20px 30px', textAlign: 'center', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <div style={{ width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '30px', color: '#1E40AF' }}>🏆</span> {/* Placeholder icon */}
          </div>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Certificate of Completion</h1>
        <p style={{ opacity: 0.9, marginTop: '8px', fontSize: '14px' }}>This certificate is proudly presented to</p>
      </div>

      {/* Body */}
      <div style={{ padding: '30px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}> {/* Changed to row */}
          {/* Left Side */}
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1F2937', marginBottom: '20px', textAlign: 'left' }}> {/* Align left */}
              {userName}
            </h2>
            <div style={{ color: '#374151', marginBottom: '25px', textAlign: 'left', fontSize: '15px', lineHeight: '1.6' }}> {/* Align left */}
              <p style={{ marginBottom: '15px' }}>
                has successfully completed the <span style={{ fontWeight: '600' }}>{eventName}</span> on {formatDate(eventEndDate)}.
              </p>
              <p style={{ fontStyle: 'italic', color: '#4B5563' }}>
                {eventDescription}
              </p>
            </div>
            <div style={{ borderTop: '1px solid #D1D5DB', paddingTop: '15px', marginTop: '25px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <p style={{ color: '#6B7280' }}>Certificate ID</p>
                  <p style={{ fontWeight: '500', wordBreak: 'break-all' }}>{certificateId || 'N/A'}</p>
                </div>
                <div style={{ textAlign: 'right' }}> {/* Align right */}
                  <p style={{ color: '#6B7280' }}>Event Dates</p>
                  <p style={{ fontWeight: '500' }}>
                    {formatDateRange(eventStartDate, eventEndDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div style={{ width: '200px', borderLeft: '1px solid #D1D5DB', paddingLeft: '30px', paddingTop: '10px', flexShrink: 0 }}> {/* Adjusted styles */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Issued On</p>
                <p style={{ fontWeight: '500', fontSize: '13px' }}>
                  {formatDate(registrationDate)}
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Verification Code</p>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>{verificationCode}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', color: '#2563EB' }}>✔️</span> {/* Checkmark */}
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#6B7280' }}>Verified Certificate</p>
            </div>
          </div>
        </div>

        {/* Footer Signatures */}
        <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '30px', paddingTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', fontSize: '12px', color: '#4B5563' }}>
            <div>
              <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div>
              <p>Authorized Signature</p>
            </div>
            <div>
              <div style={{ height: '1px', width: '120px', backgroundColor: '#9CA3AF', margin: '0 auto 8px auto' }}></div>
              <p>Event Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;