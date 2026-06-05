import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SplashScreen from './components/SplashScreen'

const WashingPrices   = lazy(() => import('./components/WashingPrices'))
const DetailingPrices = lazy(() => import('./components/DetailingPrices'))
const ContactSection  = lazy(() => import('./components/ContactSection'))

export default function App() {
  return (
    <>
      <SplashScreen />
      <div className="bg-ec-black min-h-screen">
        <Nav />
        <Hero />
        <Suspense fallback={null}>
          <WashingPrices />
          <DetailingPrices />
          <ContactSection />
        </Suspense>
      </div>
    </>
  )
}
