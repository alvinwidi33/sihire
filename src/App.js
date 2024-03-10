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
import ManageUser from './pages/manage-user';
import AddUser from './pages/add-user';
import MyProfile from './pages/my-profile';
import AddJobApplication from './pages/add-job-application';
import JobApplicationDetail from './pages/job-application-detail';
import Applicants from './pages/applicants';
import DetailJobInternal from './pages/detail-job-internal';
import Register from './pages/register';
import Login from './pages/login';
import JobListGA from './pages/job-list-ga';
import JobListOther from './pages/job-list-other';
import DetailJobApplicant from './pages/detail-job-applicant';
import JobListApplicant from './pages/job-list-applicant';
import DetailJobGA from './pages/detail-job-ga';
import AddJobPosting from './pages/add-job-posting';
import EditJobPosting from './pages/edit-job-posting';
import MyJobApplication from './pages/my-job-application';
import ChangePassword from './pages/change-password';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/services" element={<Services />} />
        <Route path="/our-projects" element={<OurProjects />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/add-job-application/:id' element={<AddJobApplication />} />
        <Route path='/job-application-detail/:id' element={<JobApplicationDetail />} />
        <Route path='/applicants' element={<Applicants />} />
        <Route path='/job-list-applicant/' element={<JobListApplicant />} />
        <Route path='/job-list-applicant/:id' element={<DetailJobApplicant />} />
        <Route path='/job-list-ga' element={<JobListGA />} />
        <Route path='/job-list-ga/:id' element={<DetailJobGA />} />
        <Route path='/job-list-other' element={<JobListOther/>}/>
        <Route path='/job-list-other/:id' element={<DetailJobInternal />} />
        <Route path='/applicants' element={<Applicants />} />
        <Route path='/add-job-posting' element={<AddJobPosting/>}/>
        <Route path='/job-list-ga/:id/edit' element={<EditJobPosting/>}/>
        <Route path='/my-job-application/:applicant' element={<MyJobApplication/>}/>
        <Route path='/change-password' element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;