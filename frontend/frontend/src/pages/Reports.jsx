import { useEffect, useState } from "react";
import api from "../services/api";

import {
    FaFilePdf,
    FaUsers,
    FaRupeeSign,
    FaCalendarAlt
} from "react-icons/fa";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import "./Reports.css";


function Reports(){

    const [donations,setDonations] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchDonations();

    },[]);



    const fetchDonations = async()=>{

        try{

            const response = await api.get("/donations");


            setDonations(response.data);


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };





    const totalAmount = donations.reduce(
        (sum,item)=>sum + item.amount,
        0
    );


    return(

        <div className="reports-page">


            <div className="reports-header">


                <h1>
                    Donation Reports
                </h1>


                <p>
                    Analyze donations and download reports.
                </p>


            </div>





            <div className="report-summary">



                <div className="summary-card">

                    <FaRupeeSign/>

                    <div>

                        <span>
                            Total Donations
                        </span>

                        <h2>
                            ₹{totalAmount}
                        </h2>

                    </div>

                </div>





                <div className="summary-card">

                    <FaUsers/>

                    <div>

                        <span>
                            Total Donors
                        </span>

                        <h2>
                            {donations.length}
                        </h2>

                    </div>


                </div>





                <div className="summary-card">

                    <FaCalendarAlt/>

                    <div>

                        <span>
                            Reports
                        </span>

                        <h2>
                            2026
                        </h2>

                    </div>


                </div>



            </div>






            <div className="report-table-card">


                <div className="table-header">


                    <h2>
                        Donation History
                    </h2>



                    <button disabled={loading || donations.length===0} onClick={async () => {
                        try {
                            const doc = new jsPDF();

                            const headers = [["Donor","Campaign","Amount","Date","Status"]];

                            const data = donations.map(d => [
                                d.donorName || "",
                                d.campaignTitle || "",
                                `₹${d.amount}`,
                                d.donatedAt || "",
                                d.paymentStatus || "Success"
                            ]);

                            doc.text("Donation Report", 14, 16);

                            // plugin attaches autoTable to the jsPDF instance
                            // @ts-ignore
                            doc.autoTable({
                                startY: 22,
                                head: headers,
                                body: data,
                                styles: { fontSize: 10 }
                            });

                            doc.save('donation_report.pdf');

                        } catch (err) {
                            console.error('PDF generation failed', err);
                            alert('PDF generation failed');
                        }
                    }}>

                        <FaFilePdf/>

                        Download PDF

                    </button>


                </div>





                {
                    loading ?

                    <h3>
                        Loading reports...
                    </h3>


                    :


                    <table>


                        <thead>

                            <tr>

                                <th>
                                    Donor
                                </th>


                                <th>
                                    Campaign
                                </th>


                                <th>
                                    Amount
                                </th>


                                <th>
                                    Date
                                </th>


                                <th>
                                    Status
                                </th>


                            </tr>


                        </thead>



                        <tbody>


                        {
                            donations.map((donation)=>(


                                <tr key={donation.id}>


                                    <td>
                                        {donation.donorName}
                                    </td>


                                    <td>
                                        {donation.campaignTitle}
                                    </td>


                                    <td>
                                        ₹{donation.amount}
                                    </td>


                                    <td>
                                        {donation.date}
                                    </td>


                                    <td>

                                        <span className="success">

                                            Success

                                        </span>

                                    </td>


                                </tr>


                            ))
                        }


                        </tbody>


                    </table>


                }


            </div>


        </div>

    );

}


export default Reports;