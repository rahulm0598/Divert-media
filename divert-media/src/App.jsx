import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Reel from './components/Reel'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <div style={{ height: 100, background: '#fff' }} />
      <Services />
      <Reel />
      <Gallery />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
