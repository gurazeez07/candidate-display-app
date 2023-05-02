import React from 'react';
import './CandidateDetails.css';

const CandidateDetails = (props) => {
const { candidate } = props;
if (!candidate) return null;
return (
<div className="candidate-details" style={{ backgroundColor: '#fff' }}>
<div className="profile-header" style={{ position: 'relative' }}>

<img
       className="profile-pic"
       src="https://via.placeholder.com/150x150.png?text=Profile+Pic"
       alt="Profile Pic"
     />
<button className="Add Information" style={{ position: 'absolute', top: 10, right: 10 }}>
Add Information
</button>
</div>
<div className="profile-details" style={{ padding: 20 }}>
<h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 10 }}>
{candidate.fullName}
</h2>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>
Dept-Program: {candidate.deptProgram}
</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>Start Date: {candidate.startDate}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>End Date: {candidate.endDate}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>Status: {candidate.status}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>Credentials: {candidate.credentials}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>Birth Date: {candidate.birthDate}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>Gender: {candidate.gender}</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>
Race/Ethnicity: {candidate.raceEthnicity}
</p>
<p style={{ fontSize: '1rem', marginBottom: 8 }}>
Medical School: {candidate.medicalSchool}
</p>
</div>
</div>
);
};

export default CandidateDetails;