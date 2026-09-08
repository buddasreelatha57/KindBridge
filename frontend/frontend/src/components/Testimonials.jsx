import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {

  const testimonials = [

    {
      id:1,
      name:"Anil Kumar",
      role:"Donor",
      rating:5,
      image:"https://randomuser.me/api/portraits/men/32.jpg",
      review:"KindBridge makes supporting education simple and transparent. I can clearly see where my donation goes."
    },

    {
      id:2,
      name:"Lakshmi Devi",
      role:"Scholarship Recipient",
      rating:5,
      image:"https://randomuser.me/api/portraits/women/45.jpg",
      review:"The scholarship helped me complete my degree without financial stress. I am truly grateful."
    },

    {
      id:3,
      name:"Ramesh Patel",
      role:"Donor",
      rating:5,
      image:"https://randomuser.me/api/portraits/men/54.jpg",
      review:"I appreciate the regular updates and success stories. It gives confidence that every contribution matters."
    }

  ];

  return (

    <section className="testimonials">

      <h2>What People Say</h2>

      <p>
        Hear from our generous donors and the students whose lives have been transformed.
      </p>

      <div className="testimonial-grid">

        {testimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            testimonial={item}
          />
        ))}

      </div>

    </section>
  );
}

export default Testimonials;