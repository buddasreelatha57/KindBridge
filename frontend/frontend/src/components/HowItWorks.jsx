import "./HowItWorks.css";
import {
  FaSearch,
  FaHandHoldingHeart,
  FaCreditCard,
  FaGraduationCap,
} from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="how-section">

      <h2>How KindBridge Works</h2>

      <p className="how-subtitle">
        Supporting education is simple. Follow these four easy steps to make a
        meaningful difference.
      </p>

      <div className="how-container">

        <div className="how-card">
          <div className="icon">
            <FaSearch />
          </div>
          <h3>Browse Campaigns</h3>
          <p>
            Explore verified education support campaigns, scholarships, and
            book assistance initiatives.
          </p>
        </div>

        <div className="how-card">
          <div className="icon">
            <FaHandHoldingHeart />
          </div>
          <h3>Choose a Cause</h3>
          <p>
            Select the campaign that you want to support and see its funding
            progress.
          </p>
        </div>

        <div className="how-card">
          <div className="icon">
            <FaCreditCard />
          </div>
          <h3>Donate Securely</h3>
          <p>
            Make your contribution safely through our secure online payment
            system.
          </p>
        </div>

        <div className="how-card">
          <div className="icon">
            <FaGraduationCap />
          </div>
          <h3>Transform Lives</h3>
          <p>
            Your donation helps students continue their education and achieve
            their dreams.
          </p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;