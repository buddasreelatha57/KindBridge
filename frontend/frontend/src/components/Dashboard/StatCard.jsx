import "./StatCard.css";

function StatCard({
    title,
    value,
    icon,
    growth
}) {

    return (

        <div className="stat-card">

            <div className="stat-icon">

                {icon}

            </div>

            <div className="stat-details">

                <h3>{value}</h3>

                <p>{title}</p>

                <span className="growth">

                    ↑ {growth}

                </span>

            </div>

        </div>

    );

}

export default StatCard;