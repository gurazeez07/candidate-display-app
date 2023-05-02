import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import './App.css';
import CandidateDetails from './CandidateDetails'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';

const App = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCandidateDetails, setShowCandidateDetails] = useState(false);

  const deptPrograms = [  
    'ANE-Anes Adult Cardiothoracic',
    'ANE-Critical Care Medicine',
    'ANE- Anesthesiology',
    'ANE-Endoscopic Spine Non-ACGME',
    'ANE-CTCC Fellowship Non-ACGME (ABA)',
    'ANE-Pain Medicine',
    'ANE-Pediatric Anesthesiology',
    'ANE-RAPPM Non-ACGME',
    'CHFM- Family Medicine',
    'CHFM-Sports Medicine',
    'DERM-Dermatology',
    'DERM-Dermatopathology',
    'DERM-Interdisciplinary Dermatitis Non-ACGME',
    'DERM-MSDO (Micrographic Surgery and Oncology)',
    'EM-Administrative Fellowship Non-ACGME',
    'EM-CCM Non-ACGME',
    'EM-Emergency Medicine',
    'EM-EMS',
    'EM-Pediatrics',
    'EM-Global Health Non-ACGME',
    'EM-Ultrasound Non-ACGME (EUFAC)',
    'ENT-Advanced Otology (Non-ACGME)',
    'ENT-Otolaryngology',
    'MED-Advanced Endoscopy Non-ACGME (ASGE)',
    'MED-Cardiovascular',
    'MED-Clinical Cardiac Electrophysiology',
    'MED-Endocrinology',
    'MED-Gastroenterology',
    'MED-Geriatric Medicine',
    'MED-Heart Failure/Transplant',
    'MED-Hematology/Oncology',
    'MED-Infectious Disease',
    'MED-Internal Medicine',
    'MED-Interventional Pulmonary Non-ACGME (AIPPD)',
    'MED-Nephrology',
    'MED-Pulmonary & Critical Care',
    'MED-Rheumatology',
    'MED-Sleep Medicine',
    'MED-Transplant Hepatology',
    'MED-Transplant Nephrology Non-ACGME',
    'NEURO-Critical Care',
    'NEURO-Behavioral Neurology Non-ACGME (UCNS)',
    'NEURO-Epilepsy Fellowship',
    'NEURO-Movement Non-ACGME',
    'NEURO-Headache Non-ACGME (UCNS)',
    'NEURO-Neuromuscular Medicine',
    'NEURO-Sports NeuroTrauma Non-ACGME',
    'NEURO-MS and Neuroimmunology Non-ACGME',
    'NEURO-Neurology',
    'NEURO-Sports NeuroTrauma Non-ACGME',
    'NEURO-Vascular/Stroke',
    'NS-Neurological Surgery',
    'OBGYN-Obstetrics & Gynecology',
    'OBGYN-Maternal-Fetal Medicine',
    'OPTH- Ophthalmology',
    'OPTH-Cornea Fellowship Non-ACGME (AUPO)',
    'OPTH-Neuro-Ophthalmology Fellowship Non-ACGME',
    'ORTHO-Hand Surgery',
    'ORTHO-Musculoskeletal Oncology',
    'ORTHO-Orthopaedic Surgery',
    'ORTHO-Reconstruction Non-ACGME',
    'ORTHO-Shoulder/Elbow Fellowship Non-ACGME',
    'ORTHO-Trauma Fellowship Non-ACGME',
    'PATH-Gastrointestinal Path Non-ACGME',
    'PATH-Cytopathology',
    'PATH-Hematopathology',
    'PATH-Neuropathology',
    'PATH-Pathology',
    'PATH-Surgical Path Non-ACGME',
    'PEDS-Child Neurology',
    'PEDS-Pediatric Cardiology',
    'PEDS-Pediatric Critical Care',
    'PEDS-Pediatric Gastroenterology',
    'PEDS-Pediatric Hematology/Oncology',
    'PEDS-Pediatric Neonatal-Perinatal',
    'PEDS-Pediatric Pulmonary',
    'PEDS-Pediatrics',
    'PEDS-Advanced Cardiac Imaging Non-ACGME',
    'PEDS-Cardiac Critical Care Non-ACGME',
    'PEDS-Pediatric Endocrinology',
    'PEDS-Pediatric Nephrology',
    'PEDS-Rheumatology',
    'PM&R-Physical Medicine and Rehabilitation',
    'PSYCH-Addiction Medicine',
    'PSYCH-Addiction Medicine Non-ACGME',
    'PSYCH-Child & Adolescent Psychiatry',
    'PSYCH-Geriatric Psychiatry',
    'PSYCH-Psychiatry',
    'RAD-Body Imaging Non-ACGME',
    'RAD-Interventional Radiology/Independent Residency',
    'RAD-Musculoskeletal Radiology Non-ACGME',
    'RAD-Neuroradiology',
    'RADONC-Radiation Oncology',
    'RAD-Physics Non-ACGME',
    'RAD-Radiology',
    'SURG-Burn Surgery Program Non-ACGME',
    'SURG-Integrated Plastics',
    'SURG-Integrated Thoracic Surgery',
    'SURG-Plastic Surgery',
    'SURG-Surgery',
    'SURG-Surgical Critical Care',
    'SURG-Vascular Surgery',
    'SURG-Acute Care Surgery Non-ACGME',
    'SURG-CV Hospitalist Non-ACGME',
    'SURG-PA Residency Non-ACGME',
    'SURG-Pediatric Surgery',
    'SURG-Thoracic Surgery',
    'URO-Endourology Non-ACGME',
    'URO-Urology'
   // ... Add all other DEPT-Programs here
 ];

 const genders = ['Male', 'Female', 'Non-Binary',''];

 const raceEthnicities = [
   'White',
   'Hispanic or Latino',
   'Black or African American',
   'Asian',
   'Asian/White',
   'Asian/White',
   'Black or African American/Hispanic or Latino',
   'American Indian or Alaskan Native/White',
   'Black or African American/White',
   'Hispanic or Latino/White',
   'Asian/Hispanic or Latino',
   'Black or African American/Hispanic or Latino',
   'American Indian or Alaskan Native/White',
   'Black or African American/White',
   'Hispanic or Latino/White',
   'Asian/Hispanic or Latino',
   '',
   // ... Add all other race/ethnicities here
  ];
  
  
 const credentialList = [
   'D.O.',   
   'M.D.',
   'M.D., M.S.',
   'M.D., M.B.A.',
   'MBBS',
   'M.D., Ph.D.',
   'PhD',
   'M.D., M.P.H.',
 ];


 const status = ['Incoming Fellow', 'Incoming Resident','Fellowship','Residnecy'];

 const startYear = ['13','14','15','16','17','18','19','20','21','22','23','24'];

  const [data, setData] = useState([]);
  {/*const [gender, setGender] = useState('');
    const [raceEthnicity, setRaceEthnicity] = useState('');
   const [credentials, setCredentials] = useState('');*/}
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = [50];

  const fetchData = async () => {
    const response1 = fetch('data.csv')
      .then((response) => response.text())
      .then((text) => Papa.parse(text, { header: true, skipEmptyLines: true }))
      .then((result) => result.data);
  
    const response2 = fetch('DATACurrent.csv')
      .then((response) => response.text())
      .then((text) => Papa.parse(text, { header: true, skipEmptyLines: true }))
      .then((result) => result.data);
  
    const [data1, data2] = await Promise.all([response1, response2]);
  
    setData([...data1, ...data2].map((d) => ({
      deptProgram: d['DEPT-Program '].trim(),
      startDate: d['Start Date'],
      endDate: d['End Date'],
      status: d['Status'],
      fullName: d['Full Name'],
      credentials: d['Credential(s)'],
      birthDate: d['Birth Date'],
      gender: d['Gender'].trim(),
      raceEthnicity: d["Person's Race/Ethnicity"],
      medicalSchool: d['Medical School'],
    })));
  };  

    useEffect(() => {
      fetchData();
    }, []);    

    const [selectedDeptPrograms, setSelectedDeptPrograms] = useState([]);

    const handleDeptProgramSelect = (option) => {
      setSelectedDeptPrograms((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };
   
    const [selectedgender, setSelectedgender] = useState([]);
    const handlegenderSelect = (option) => {
      setSelectedgender((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };

    const [selectedraceEthnicity, setSelectedraceEthnicity] = useState([]);
    const handleraceEthnicitySelect = (option) => {
      setSelectedraceEthnicity((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };

    const [selectedcredentials, setSelectedcredentials] = useState([]);
    const handlecredentialsSelect = (option) => {
      setSelectedcredentials((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };

    const [selectedstatus, setSelectedstatus] = useState([]);
    const handlestatusSelect = (option) => {
      setSelectedstatus((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    };
    
    const [selectedStartYears, setSelectedStartYears] = useState([]);
     const handleStartYearSelect = (option) => {
       setSelectedStartYears((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
       );
      };

      const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

      const [searchTerm, setSearchTerm] = useState('');
      const filteredData = useMemo(() => {
        return data.filter((d) => {
          const searchMatch = searchTerm
          ? d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.deptProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.medicalSchool.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
          return (
            searchMatch &&
            (selectedDeptPrograms.length === 0 || selectedDeptPrograms.includes(d.deptProgram)) &&
            (selectedgender.length === 0 || selectedgender.includes(d.gender)) &&
            (selectedraceEthnicity.length === 0 || selectedraceEthnicity.includes(d.raceEthnicity)) &&
            (selectedcredentials.length === 0 || selectedcredentials.includes(d.credentials)) &&
            (selectedstatus.length === 0 || selectedstatus.includes(d.status))&&
            (selectedStartYears.length === 0 || selectedStartYears.includes(d.startDate.slice(-2)))
            );
          });
        }, [data, searchTerm,selectedDeptPrograms, selectedgender, selectedraceEthnicity, selectedcredentials, selectedstatus, selectedStartYears]);
       
        const clearSelectedDeptPrograms = () => {
          setSelectedDeptPrograms([]);
        };
        
       
        const clearSelectedGender = () => {
          setSelectedgender([]);
        };
        
        const clearSelectedRaceEthnicity = () => {
          setSelectedraceEthnicity([]);
        };
        
        const clearSelectedCredentials = () => {
          setSelectedcredentials([]);
        };
        
        const clearSelectedStatus = () => {
          setSelectedstatus([]);
        };
        
        const clearSelectedStartYears = () => {
          setSelectedStartYears([]);
        };
        

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredData.slice(start, end);
    }, [currentPage, itemsPerPage, filteredData]);
    
    const handleCandidateClick = (candidate) => {
      setSelectedCandidate(candidate);
      setShowCandidateDetails(true);
    };


  return (
    <Router>
    <div className="App">
      <div className="header">Current and Incoming Housestaff</div>
        {/* Dropdown menus */}
<div className="dropdown-container">
  {/* DEPT-Program dropdown */}
  <input
  className="search-input"
  type="text"
  placeholder="Search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
 />
  <CustomDropdown
    title="Select DEPT-Program"
    options={deptPrograms}
    selectedOptions={selectedDeptPrograms}
    onSelect={handleDeptProgramSelect}
    onClear={clearSelectedDeptPrograms}
  />

  {/* Gender dropdown */}
  <CustomDropdown
    title="Select Gender"
    options={genders}
    selectedOptions={selectedgender}
    onSelect={handlegenderSelect}
    onClear={clearSelectedGender}
  />

  {/* Race/Ethnicity dropdown */}
  <CustomDropdown
    title="Select Race/Ethnicity"
    options={raceEthnicities}
    selectedOptions={selectedraceEthnicity}
    onSelect={handleraceEthnicitySelect}
    onClear={clearSelectedRaceEthnicity}
  />

  {/* Credentials dropdown */}
  <CustomDropdown
    title="Select Credentials"
    options={credentialList}
    selectedOptions={selectedcredentials}
    onSelect={handlecredentialsSelect}
    onClear={clearSelectedCredentials}
  />

  {/* Status dropdown */}
  <CustomDropdown
    title="Select Status"
    options={status}
    selectedOptions={selectedstatus}
    onSelect={handlestatusSelect}
    onClear={clearSelectedStatus}
  />

   
<CustomDropdown
  title="Select Year"
  options={startYear}
  selectedOptions={selectedStartYears}
  onSelect={handleStartYearSelect}
  onClear={clearSelectedStartYears}
/>

</div>
  <button className="Add Candidate" style={{ position: 'absolute', top: 10, right: 10 }}>
Add Candidate
</button>
  <Routes>
        <Route
          path="/"
          element={
            <>
    {/* Display pagination controls */}
  <div className="pagination-controls">
    <button
      onClick={() => handlePageChange(1)}
      disabled={currentPage === 1}
    >
      First
    </button>
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
    <button
      onClick={() => handlePageChange(totalPages)}
      disabled={currentPage === totalPages}
    >
      Last
    </button>
  </div>

  {/* Display paginated data */}
  <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dept-Program</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Credentials</th>
            {/*<th>Birth Date</th>*/}
            <th>Gender</th>
            <th>Race/Ethnicity</th>
            <th>Medical School</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((d, index) => (
              <tr key={index}>
              <td>
               <Link to={`/candidate/${d.fullName}`} onClick={() => handleCandidateClick(d)}>
                  {d.fullName}
               </Link>
              </td>
              <td>{d.deptProgram}</td>
              <td>{d.startDate}</td>
              <td>{d.endDate}</td>
              <td>{d.status}</td>
              <td>{d.credentials}</td>
              {/*<td>{d.birthDate}</td>*/}
              <td>{d.gender}</td>
              <td>{d.raceEthnicity}</td>
              <td>{d.medicalSchool}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
          }
        />

      
        {/* Define candidate details route */}
        <Route
            path="/candidate/:fullName"
            element={<CandidateDetails candidate={selectedCandidate} />}
          />
        </Routes>
      <div className="footer"> '© 2023 UF Health All Rights Reserved.'</div>
      </div>
    </Router>
  );
};

export default App;
