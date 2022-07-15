import React, { useEffect, useState } from "react";
import "./Allnews.css";
import './Policies.css';
import News from "./News";
function Policies(props) {
    const [newsData, setNewsData] = useState([]);
    const policiesData = [
      {
        "Domain": "India",
        "Headline": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
        "Date": {
           "Time": "9 May"
        },
        "Summarized_News": " Hon’ble Prime Minister announced Pradhan Mantri Jan Dhan Yojana as the National Mission on Financial Inclusion in his Independence Day address on 15th August 2014, to ensure comprehensive financial inclusion of all the households in the country by providing universal access to banking facilities with at least one basic bank account to every household, financial literacy, access to credit, insurance and pension facility. Under this, a person not having a savings account can open an account without the requirement of any minimum balance and, in case they self-certify that they do not have any of the officially valid documents required for opening a savings account, they may open a small account.",
        "Image_Url": "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/jan-dhan-yojna-inner-new.jpg",
        "Source": "The Times of India"
     },
     {
       "Domain": "India",
       "Headline": " Atal Pension Yojana (APY)",
       "Date": {
          "Time": "24 Feb"
       },
       "Summarized_News": "APY was launched on 9th May, 2015 by the Prime Minister. APY is open to all saving bank/post office saving bank account holders in the age group of 18 to 40 years and the contributions differ, based on pension amount chosen.  Subscribers would receive the guaranteed minimum monthly pension of Rs. 1,000 or Rs. 2,000 or Rs. 3,000 or Rs. 4,000 or Rs. 5,000 at the age of 60 years. Under APY, the monthly pension would be available to the subscriber, and after him to his spouse and after their death, the pension corpus, as accumulated at age 60 of the subscriber, would be returned to the nominee of the subscriber. The minimum pension would be guaranteed by the Government,Alternatively, if the returns on investment are higher, the subscribers would get enhanced pensionary benefits.",
       "Image_Url": "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Atal_Pension_Yojana.png/220px-Atal_Pension_Yojana.png",
       "Source": "news lodge"
    },
    {
      "Domain": "India",
      "Headline": "Ayushman Sahakar Scheme",
      "Date": {
         "Time": "March 12"
      },
      "Summarized_News": "  Launched under the Ministry of Agriculture and Farmers Welfare, the National Cooperative Development Corporation (NCDC) on October 19, 2020, Ayushman Sahakar is a unique scheme to assist cooperatives to play an important role in the creation of healthcare infrastructure in the country.The COVID pandemic has brought into focus the requirement of adequate facilities in the healthcare sector. Thus, under this scheme, NCDC would extend term loans to prospective cooperatives to the tune of Rs.10,000 crore in the coming years.",
      "Image_Url": "https://www.sanskritiias.com/uploaded_files/images/ayushman-sahakar-scheme.jpg",
      "Source": "indian express"
    },
    ]
  return (
  <div className="policyContainer">
  <div className="policiesContainer">
    {policiesData.map((ele)=>{
      return <News title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={ele.Summarized_News} image={ele.Image_Url}/>
    })}
    </div>
    </div>
  );
}

export default Policies