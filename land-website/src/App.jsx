import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyShowcase from './components/PropertyShowcase';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VideoUploader from './components/VideoUploader';
import './App.css';

function App() {
  const showUploader = new URLSearchParams(window.location.search).get('upload') === 'true';

  return (
    <div className="app">
      {showUploader ? (
        <VideoUploader />
      ) : (
        <>
          <Navbar />
          <Hero />
          <PropertyShowcase />
          <Features />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
