
// import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDetails from './components/JobDetails'
import Companies from './components/Admin/Companies'
import CreateCompany from './components/Admin/CreateCompany'
import CreateCompanyDetail from './components/Admin/CreateCompanyDetail'
import AdminJobs from './components/Admin/AdminJobs'
import CreateJob from './components/Admin/CreateJob'
import AdminApplicants from './components/Admin/AdminApplicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/job/description/:id',
    element: <JobDetails />
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CreateCompanyDetail /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><CreateJob /></ProtectedRoute>
  },
  {
    path: '/admin/job/:id/applicants',
    element: <ProtectedRoute><AdminApplicants /></ProtectedRoute>
  }

])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
