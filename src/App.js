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
import JobApplicationDetailGA from './pages/job-application-detail-ga';
import UpdateStatusPage from './pages/update-status-ga';
import AddInterview from './pages/add-interview';
import ProtectedRoute from './routing/ProtectedRoute';
import EditRoleUser from './pages/edit-role-user';
import GetListInterviewGA from './pages/get-list-interview-ga';
import DetailInterviewGA from './pages/detail-interview-ga';
import UpdateJadwalInteviewGA from './pages/update-jadwal-inteview-ga';
import OnboardingDeclined from './pages/onboarding-declined';
import JobApplicationDetailDP from './pages/job-application-detail-dp';
import AddOnboarding from './pages/add-onboarding';
import UpdateOnboarding from './pages/update-onboarding';
import AddDataDiri from './pages/add-data-diri';
import GetListOnboardingInternal from './pages/get-list-onboarding-internal';
import OnboardingDetailGA from './pages/onboarding-detail-ga';
import DeclineInterview from './pages/decline-interview';
import ApplicantDetail from './pages/applicant-detail';

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-user" element={<ProtectedRoute child={<ManageUser />} />} />
          <Route path="/add-user" element={<ProtectedRoute child={<AddUser />} />} />
          <Route path="/my-profile" element={<ProtectedRoute child={<MyProfile />} />} />
          <Route path='/add-job-application/:id' element={<ProtectedRoute child={<AddJobApplication />} />} />
          <Route path='/job-application-detail/:id' element={<ProtectedRoute child={<JobApplicationDetail />} />} />
          <Route path='/applicants' element={<ProtectedRoute child={<Applicants />} />} />
          <Route path='/job-list-applicant/' element={<ProtectedRoute child={<JobListApplicant />} />} />
          <Route path='/job-list-applicant/:id' element={<ProtectedRoute child={<DetailJobApplicant />} />} />
          <Route path='/job-list-ga' element={<ProtectedRoute child={<JobListGA />} />} />
          <Route path='/job-list-ga/:id' element={<ProtectedRoute child={<DetailJobGA />} />} />
          <Route path='/job-list-other' element={<ProtectedRoute child={<JobListOther />} />} />
          <Route path='/job-list-other/:id' element={<ProtectedRoute child={<DetailJobInternal />} />} />
          <Route path='/add-job-posting' element={<ProtectedRoute child={<AddJobPosting />} />} />
          <Route path='/job-list-ga/:id/edit' element={<ProtectedRoute child={<EditJobPosting />} />} />
          <Route path='/my-job-application/' element={<ProtectedRoute child={<MyJobApplication />} />} />
          <Route path='/change-password' element={<ProtectedRoute child={<ChangePassword />} />} />
          <Route path='/job-application-detail-ga/:id' element={<ProtectedRoute child={<JobApplicationDetailGA />} />} />
          <Route path='/job-application-detail-ga/:id/update-status' element={<ProtectedRoute child={<UpdateStatusPage />} />} />
          <Route path="/create-interview" element={<ProtectedRoute child={<AddInterview/>}/>}/>
          <Route path="/get-list-interview-ga" element={<ProtectedRoute child={<GetListInterviewGA/>}/>}/>
          <Route path="/get-list-interview-ga/:id" element={<ProtectedRoute child={<DetailInterviewGA/>}/>}/>
          <Route path="/get-list-interview-ga/:id/update" element={<ProtectedRoute child={<UpdateJadwalInteviewGA/>}/>}/>
          <Route path="/edit-user-role/:id" element={<ProtectedRoute child={<EditRoleUser />} />} />
          <Route path="/onboarding-declined/:applicant" element={<ProtectedRoute child={<OnboardingDeclined />} />} />
          <Route path="/create-onboarding" element={<AddOnboarding/>}/>
          <Route path="/get-list-onboarding-ga/:id/update" element={<UpdateOnboarding/>}/>
          <Route path='/job-application-detail-dp/:id' element={<ProtectedRoute child={<JobApplicationDetailDP />} />} />
          <Route path="/create-datadiri/:id" element={<AddDataDiri/>}/>
          <Route path="/get-list-onboarding-internal" element={<GetListOnboardingInternal/>}/>
          <Route path="/onboarding-detail-ga/:id" element={<ProtectedRoute child={<OnboardingDetailGA />} />} />
          <Route path="/decline-interview/:id" element={<ProtectedRoute child={<DeclineInterview />} />} />
          <Route path='/applicant-detail/:applicant' element={<ProtectedRoute child={<ApplicantDetail />} />} />
      </Routes>
    </Router>
  );
}

export default App;
