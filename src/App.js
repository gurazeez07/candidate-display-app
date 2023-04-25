import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import './App.css';

const App = () => {
  
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
    'ENT-Head & Neck Reconstructive Non-ACGME (AHNS)',
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

 const genders = ['Male', 'Female'];

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

 const statuses = ['Incoming Fellow', 'Incoming Resident','Fellowship','Residnecy'];

  const [data, setData] = useState([]);
  const [deptProgram, setDeptProgram] = useState('');
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');
  const [credentials, setCredentials] = useState('');
  const [status, setStatus] = useState('');
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

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const filteredData = useMemo(() => {
      return data.filter((d) => {
        return (
          (deptProgram === "" || (d.deptProgram.indexOf(deptProgram) !== -1)) &&
          (gender === "" || d.gender.indexOf(gender) !== -1) &&
          (raceEthnicity === "" || d.raceEthnicity.indexOf(raceEthnicity) !== -1) &&
          (credentials === "" || d.credentials.indexOf(credentials) !== -1) &&
          (status === "" || d.status.indexOf(status) !== -1)
        );
      });
    }, [data, deptProgram, gender, raceEthnicity, credentials, status]);   
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredData.slice(start, end);
    }, [filteredData, currentPage]);
  
  return (
    <div className="App">
      <div className="header">Current and Incoming Housestaff</div>
      {/* Dropdown menus */}
      <select
        value={deptProgram}
        onChange={(e) => setDeptProgram(e.target.value)}
      >
        <option value="">Select DEPT-Program</option>
        {deptPrograms.map((program, index) => (
          <option key={index} value={program}>
            {program}
          </option>
        ))}
      </select>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        {genders.map((g, index) => (
          <option key={index} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select value={raceEthnicity}     onChange={(e) => setRaceEthnicity(e.target.value)}
  >
    <option value="">Select Race/Ethnicity</option>
    {raceEthnicities.map((race, index) => (
      <option key={index} value={race}>
        {race}
      </option>
    ))}
  </select>

  <select
    value={credentials}
    onChange={(e) => setCredentials(e.target.value)}
  >
    <option value="">Select Credential(s)</option>
    {credentialList.map((credential, index) => (
      <option key={index} value={credential}>
        {credential}
      </option>
    ))}
  </select>

  <select value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="">Select Status</option>
    {statuses.map((s, index) => (
      <option key={index} value={s}>
        {s}
      </option>
    ))}
  </select>

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
            <th>Birth Date</th>
            <th>Gender</th>
            <th>Race/Ethnicity</th>
            <th>Medical School</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((d, index) => (
            <tr key={index}>
              <td>{d.fullName}</td>
              <td>{d.deptProgram}</td>
              <td>{d.startDate}</td>
              <td>{d.endDate}</td>
              <td>{d.status}</td>
              <td>{d.credentials}</td>
              <td>{d.birthDate}</td>
              <td>{d.gender}</td>
              <td>{d.raceEthnicity}</td>
              <td>{d.medicalSchool}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer"> '© 2023 UF Health All Rights Reserved.'</div>
    </div>
  );
};
export default App;

