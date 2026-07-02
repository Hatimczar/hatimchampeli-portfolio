import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FocusAreas from "@/components/sections/FocusAreas";
import Experience from "@/components/sections/Experience";
import Ventures from "@/components/sections/Ventures";
import Results from "@/components/sections/Results";
import Certifications from "@/components/sections/Certifications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <FocusAreas />
        <Experience />
        <Ventures />
        <Results />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
