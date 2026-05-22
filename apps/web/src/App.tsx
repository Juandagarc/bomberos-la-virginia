import { useAnimations } from './hooks/useAnimations';
import { Curtain } from './components/Curtain';
import { StatusBar } from './components/StatusBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Stats } from './components/Stats';
import { HoseDivider } from './components/HoseDivider';
import { Cronica, Operaciones, Tripulacion, Instagram, Unete, Footer } from './components/Sections';

export default function App() {
  useAnimations();

  return (
    <>
      <Curtain />
      <StatusBar />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <HoseDivider />
      <Cronica />
      <Operaciones />
      <Tripulacion />
      <Instagram />
      <Unete />
      <Footer />
    </>
  );
}
