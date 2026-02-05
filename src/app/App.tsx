import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { Yacht } from './components/Yacht';
import { Experience } from './components/Experience';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60 tracking-widest text-sm">Loading Experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Collection />
        <Yacht onNavigate={handleNavigate} />
        <Experience />
        <Reservation />
      </main>
      <Footer />
    </div>
  );
}
