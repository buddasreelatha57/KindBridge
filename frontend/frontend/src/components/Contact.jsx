import { useState } from "react";
import api from "../services/api";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    setError("");

    try {
      await api.post("/contact", form);
      setStatus("Message sent successfully. Thank you for reaching out!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Unable to send message. Please try again later.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section">

      <div className="cta-box">
        <h2>Ready to Make a Difference?</h2>

        <p>
          Every contribution helps provide education opportunities for
          deserving students. Join us in creating brighter futures.
        </p>

        <button>Donate Now</button>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Contact Us</h2>

          <p>
            We'd love to hear from you. Whether you have questions,
            suggestions, or want to partner with KindBridge, feel free
            to reach out.
          </p>

          <div className="info">
            <h4>Email</h4>
            <p>support@kindbridge.org</p>
          </div>

          <div className="info">
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="info">
            <h4>Location</h4>
            <p>Hyderabad, Telangana, India</p>
          </div>

        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />

          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="success-message">{status}</p>}
          {error && <p className="error-message">{error}</p>}

        </form>

      </div>

    </section>
  );
}

export default Contact;