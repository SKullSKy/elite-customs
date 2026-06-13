import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { store } from './services/store'
import AdminLayout   from './components/AdminLayout'
import AdminLogin    from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminListings from './pages/AdminListings'
import AdminRental   from './pages/AdminRental'
import AdminPrices   from './pages/AdminPrices'
import AdminSettings from './pages/AdminSettings'

function RequireAuth() {
  return store.getAuth() ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route index                element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard"     element={<AdminDashboard />} />
          <Route path="listings"      element={<AdminListings />} />
          <Route path="rental"        element={<AdminRental />} />
          <Route path="prices"        element={<AdminPrices />} />
          <Route path="settings"      element={<AdminSettings />} />
          <Route path="*"             element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
