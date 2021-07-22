import React from "react";
import banner from "../assets/banner.svg";
import "./page2.css"
const ScaneOr=()=>{
    return(
    <div className="registration">
        <div className="imgbox">
            <img src={banner}/>
        </div>
        <div className="title">
            <h2>Ratna Pharmacy</h2>
        </div>
        <div className="enter_options">
            <button>
                Scan New
            </button>
            <button>
                View Purchase
            </button>
            
        </div>
        <div className="buttonlogout">
            <button className="logoutnow">
                Logout
            </button>
        </div>
    </div>)
}

export default ScaneOr;