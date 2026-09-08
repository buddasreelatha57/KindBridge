import "./EducationCard.css";

function EducationCard({ support, onDonate }) {

    const progress =
        (support.collectedAmount / support.requiredAmount) * 100;

    return (

        <div className="education-card">

            <img
                src={support.imageUrl}
                alt={support.title}
            />

            <div className="card-content">

                <h3>{support.title}</h3>

                <p>{support.description}</p>

                <div className="amounts">

                    <span>Raised</span>

                    <strong>
                        ₹{support.collectedAmount.toLocaleString()}
                    </strong>

                </div>

                <div className="amounts">

                    <span>Goal</span>

                    <strong>
                        ₹{support.requiredAmount.toLocaleString()}
                    </strong>

                </div>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    ></div>

                </div>

                <button onClick={() => onDonate(support.id)}>
                    Donate Now
                </button>

            </div>

        </div>

    );
}

export default EducationCard;