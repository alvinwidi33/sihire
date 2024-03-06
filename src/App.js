import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import OurTeam from './pages/our-team';
import Services from './pages/services';
import ContactUs from './pages/contact-us';
import OurProjects from './pages/our-projects';
import Careers from './pages/careers';
import AddJobApplication from './pages/add-job-application';
import JobApplicationDetail from './pages/job-application-detail';
import JobPosting from './pages/job-posting';
import Applicants from './pages/applicants';

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/services" element={<Services />} />
        <Route path="/our-projects" element={<OurProjects />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path='/add-job-application' element={<AddJobApplication />} />
        <Route path='/job-application-detail' element={<JobApplicationDetail />} />
        <Route path='/job-posting-ga' element={<JobPosting />} />
        <Route path='/applicants' element={<Applicants />} />
      </Routes>
    </Router>
  );
}

export default App;