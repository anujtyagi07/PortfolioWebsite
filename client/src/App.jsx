import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './pages/ProtectedRoute'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminSkills from './pages/admin/AdminSkills'
import AdminExperience from './pages/admin/AdminExperience'
import AdminEducation from './pages/admin/AdminEducation'
import AdminSettings from './pages/admin/AdminSettings'
import AdminResume from './pages/admin/AdminResume'
import AdminBlog from './pages/admin/AdminBlog'

const protect = (el) => <ProtectedRoute>{el}</ProtectedRoute>

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={protect(<AdminDashboard />)} />
              <Route path="/admin/projects" element={protect(<AdminProjects />)} />
              <Route path="/admin/skills" element={protect(<AdminSkills />)} />
              <Route path="/admin/experience" element={protect(<AdminExperience />)} />
              <Route path="/admin/education" element={protect(<AdminEducation />)} />
              <Route path="/admin/settings" element={protect(<AdminSettings />)} />
              <Route path="/admin/resume" element={protect(<AdminResume />)} />
              <Route path="/admin/blog" element={protect(<AdminBlog />)} />
            </Routes>
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
