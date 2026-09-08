import "./TestimonialCard.css";
import { FaStar } from "react-icons/fa";

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">

      <img
        src={testimonial.image}
        alt={testimonial.name}
      />

      <div className="testimonial-content">

        <h3>{testimonial.name}</h3>

        <span>{testimonial.role}</span>

        <div className="stars">
          {[...Array(testimonial.rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <p>"{testimonial.review}"</p>

      </div>

    </div>
  );
}

export default TestimonialCard;