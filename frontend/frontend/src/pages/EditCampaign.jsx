import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import "./EditCampaign.css";


function EditCampaign() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [campaign, setCampaign] = useState({
        title: "",
        category: "",
        description: "",
        story: "",

        beneficiaryName: "",
        beneficiaryAge: "",
        location: "",
        educationLevel: "",
        institutionName: "",

        targetAmount: "",
        raisedAmount: "",

        imageUrl: "",

        deadline: "",
        status: "",
        verified: false
    });


    const [loading,setLoading] = useState(true);



    // Get campaign details

    useEffect(()=>{

        fetchCampaign();

    },[]);



    const fetchCampaign = async()=>{

        try{

            const response =
                await api.get(`/campaigns/${id}`);

            setCampaign(response.data);

            setLoading(false);

        }
        catch(error){

            console.log(error);

        }

    };




    const handleChange=(e)=>{

        const {name,value}=e.target;


        setCampaign({

            ...campaign,

            [name]:value

        });

    };




    const handleSubmit=async(e)=>{

        e.preventDefault();


        try{


            await api.put(
                `/campaigns/${id}`,
                campaign
            );


            alert(
                "Campaign updated successfully"
            );


            navigate("/admin/campaigns");


        }
        catch(error){

            console.log(error);

            alert(
                "Update failed"
            );

        }

    };



    if(loading){

        return <h3>Loading...</h3>;

    }



    return (

        <div className="edit-campaign-container">


            <h2>Edit Campaign</h2>


            <form onSubmit={handleSubmit}>


                <input
                    name="title"
                    value={campaign.title}
                    onChange={handleChange}
                    placeholder="Campaign Title"
                />



                <input
                    name="category"
                    value={campaign.category}
                    onChange={handleChange}
                    placeholder="Category"
                />



                <textarea
                    name="description"
                    value={campaign.description}
                    onChange={handleChange}
                    placeholder="Description"
                />



                <textarea
                    name="story"
                    value={campaign.story}
                    onChange={handleChange}
                    placeholder="Story"
                />



                <input
                    name="beneficiaryName"
                    value={campaign.beneficiaryName}
                    onChange={handleChange}
                    placeholder="Beneficiary Name"
                />



                <input
                    name="beneficiaryAge"
                    value={campaign.beneficiaryAge}
                    onChange={handleChange}
                    placeholder="Beneficiary Age"
                />



                <input
                    name="location"
                    value={campaign.location}
                    onChange={handleChange}
                    placeholder="Location"
                />



                <input
                    name="educationLevel"
                    value={campaign.educationLevel}
                    onChange={handleChange}
                    placeholder="Education Level"
                />



                <input
                    name="institutionName"
                    value={campaign.institutionName}
                    onChange={handleChange}
                    placeholder="Institution Name"
                />



                <input
                    type="number"
                    name="targetAmount"
                    value={campaign.targetAmount}
                    onChange={handleChange}
                    placeholder="Target Amount"
                />



                <input
                    type="number"
                    name="raisedAmount"
                    value={campaign.raisedAmount}
                    onChange={handleChange}
                    placeholder="Raised Amount"
                />



                <input
                    name="imageUrl"
                    value={campaign.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                />



                <input
                    type="date"
                    name="deadline"
                    value={campaign.deadline}
                    onChange={handleChange}
                />



                <select
                    name="status"
                    value={campaign.status}
                    onChange={handleChange}
                >

                    <option value="ACTIVE">
                        Active
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>

                    <option value="CLOSED">
                        Closed
                    </option>

                </select>



                <label>

                    <input
                        type="checkbox"
                        checked={campaign.verified}
                        onChange={(e)=>
                            setCampaign({
                                ...campaign,
                                verified:e.target.checked
                            })
                        }
                    />

                    Verified

                </label>



                <button type="submit">

                    Update Campaign

                </button>


            </form>


        </div>

    );

}


export default EditCampaign;