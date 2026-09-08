import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./FAQ.css";

const faqs = [
    {
        question: "How can I donate?",
        answer: "Choose an education support campaign, click Donate Now, enter the amount, and complete your donation securely."
    },
    {
        question: "Is my donation secure?",
        answer: "Yes. All donations are processed through secure encrypted payment gateways."
    },
    {
        question: "Who receives the donations?",
        answer: "Verified students, schools, and educational initiatives receive the donated funds."
    },
    {
        question: "Can I track my donations?",
        answer: "Yes. After logging in, visit the My Donations page to view your complete donation history."
    },
    {
        question: "Can I become a volunteer?",
        answer: "Yes. You can contact us through the Contact section to participate in our educational initiatives."
    }
];

function FAQ() {

    const [active, setActive] = useState(null);

    return (
        <section className="faq-section" id="faq">

            <h2>Frequently Asked Questions</h2>

            <p>
                Find answers to the most common questions about KindBridge.
            </p>

            {faqs.map((faq, index) => (

                <div className="faq-item" key={index}>

                    <button
                        className="faq-question"
                        onClick={() =>
                            setActive(active === index ? null : index)
                        }
                    >
                        {faq.question}

                        {active === index ? <FaMinus /> : <FaPlus />}
                    </button>

                    {active === index && (

                        <div className="faq-answer">

                            {faq.answer}

                        </div>

                    )}

                </div>

            ))}

        </section>
    );
}

export default FAQ;