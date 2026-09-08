import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import EducationSupport from "../components/EducationSupport";
import HowItWorks from "../components/HowItWorks";
import SuccessStories from "../components/SuccessStories";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
    <Navbar />

    <section id="home">
        <Hero />
    </section>

    <section id="about">
        <Statistics />
    </section>

    <section id="supports">
        <EducationSupport />
    </section>

    <section id="how">
        <HowItWorks />
    </section>

    <section id="stories">
        <SuccessStories />
    </section>

    <section id="faq">
        <FAQ />
    </section>

    <section id="testimonials">
        <Testimonials />
    </section>

    <section id="contact">
        <Contact />
    </section>

    <Footer />
</>
  );
}

export default Home;