import "./DashboardCards.css";

function DashboardCards(){

    const cards=[

        {
            title:"Users",
            value:245
        },

        {
            title:"Donations",
            value:"₹4.5L"
        },

        {
            title:"Education Supports",
            value:18
        },

        {
            title:"Success Stories",
            value:12
        }

    ];

    return(

        <div className="cards">

            {

                cards.map((card,index)=>(

                    <div className="card" key={index}>

                        <h3>{card.title}</h3>

                        <h1>{card.value}</h1>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardCards;