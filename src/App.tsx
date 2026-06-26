import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Calculator } from "@/components/Calculator";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/LoginModal";
import { ClientDashboard } from "@/components/ClientDashboard";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Performance-optimized global event listener for tracking mouse cursor over glow-card elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".glow-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-navy-50 font-sans selection:bg-gold-500/30 selection:text-gold-400">
      {/* Navigation (Sticky) */}
      <Navbar
        scrollToSection={scrollToSection}
        onOpenLogin={() => setIsLoginOpen(true)}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        onLogout={() => {
          setIsAuthenticated(false);
          setUserEmail("");
        }}
      />

      {/* Main Content Conditional Render */}
      {isAuthenticated ? (
        <ClientDashboard
          userEmail={userEmail}
          onLogout={() => {
            setIsAuthenticated(false);
            setUserEmail("");
          }}
        />
      ) : (
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
      )}

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Login Modal Overlay */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => {
          setIsAuthenticated(true);
          setUserEmail(email);
        }}
      />
    </div>
  );
}
