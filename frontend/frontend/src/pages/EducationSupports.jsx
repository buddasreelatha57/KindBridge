import { useEffect, useState } from "react";
import SupportCard from "../components/SupportCard";
import { getAllSupports } from "../services/supportService";

function EducationSupports() {

    const [supports, setSupports] = useState([]);

    const loadSupports = async () => {

        try {

            const data = await getAllSupports();

            setSupports(data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        let isMounted = true;

        const fetchSupports = async () => {
            try {
                const data = await getAllSupports();
                if (isMounted) {
                    setSupports(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSupports();

        return () => {
            isMounted = false;
        };
    }, []);

    return (

        <> 
        <div
            style={{
                padding:"40px"
            }}
        >

            <h1>Education Supports</h1>

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
                    gap:"30px",
                    marginTop:"40px"
                }}
            >

                {

                    supports.map((support)=>(

                        <SupportCard
                            key={support.id}
                            support={support}
                        />

                    ))

                }

            </div>

        </div>
        </>

    );

}

export default EducationSupports;