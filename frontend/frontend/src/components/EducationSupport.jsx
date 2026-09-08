import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EducationSupport.css";
import EducationCard from "./EducationCard";
import LoginRequiredModal from "./LoginRequiredModal"; // create this component

function EducationSupport() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const supports = [
    {
      id: 1,
      title: "School Fees",
      description: "Support school students with annual tuition fees.",
      requiredAmount: 100000,
      collectedAmount: 45000,
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700",
    },
    {
      id: 2,
      title: "College Fees",
      description: "Help deserving students continue higher education.",
      requiredAmount: 200000,
      collectedAmount: 90000,
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700",
    },
    {
      id: 3,
      title: "Books & Study Materials",
      description: "Provide books and learning resources.",
      requiredAmount: 50000,
      collectedAmount: 21000,
      imageUrl:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=700",
    },
  ];

  const handleDonate = (id) => {

    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true);
      return;
    }

    navigate(`/donate/${id}`);
  };

  return (
    <section className="education-section">

      <h2>Education Support Campaigns</h2>

      <div className="education-grid">

        {supports.map((support) => (
          <EducationCard
            key={support.id}
            support={support}
            onDonate={handleDonate}
          />
        ))}

      </div>

      <LoginRequiredModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
      />

    </section>
  );
}

export default EducationSupport;