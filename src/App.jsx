import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SplashScreen from './components/SplashScreen'
import ServicesSection from './components/ServicesSection'
import SocialStrip from './components/SocialStrip'

const SalesSection    = lazy(() => import('./components/SalesSection'))
const RentalSection   = lazy(() => import('./components/RentalSection'))
const ContactSection  = lazy(() => import('./components/ContactSection'))
const WashingPage     = lazy(() => import('./pages/WashingPage'))
const DetailingPage   = lazy(() => import('./pages/DetailingPage'))
const PolishingPage   = lazy(() => import('./pages/PolishingPage'))
const ListingPage     = lazy(() => import('./pages/ListingPage'))
const AdminApp        = lazy(() => import('./admin/AdminApp'))

function MainPage() {
  return (
    <>
      <SplashScreen />
      <div className="bg-ec-black min-h-screen">
        <Nav />
        <Hero />
        <Suspense fallback={null}>
          <ServicesSection />
          <SocialStrip />
          <SalesSection />
          <RentalSection />
          <ContactSection />
        </Suspense>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mazgasana"     element={<Suspense fallback={null}><WashingPage /></Suspense>} />
      <Route path="/detailing"     element={<Suspense fallback={null}><DetailingPage /></Suspense>} />
      <Route path="/pulesana"      element={<Suspense fallback={null}><PolishingPage /></Suspense>} />
      <Route path="/pardosana/:id" element={<Suspense fallback={null}><ListingPage /></Suspense>} />
      <Route path="/admin/*"       element={<Suspense fallback={null}><AdminApp /></Suspense>} />
    </Routes>
  )
}
