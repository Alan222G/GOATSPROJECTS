import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Calculator } from "@/components/Calculator";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b132b] text-navy-50 font-sans selection:bg-gold-500/30 selection:text-gold-400">
      {/* Navigation */}
      <Navbar scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero scrollToSection={scrollToSection} />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Tax & Health Calculator Widget */}
        <Calculator />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Form & Office Details */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
