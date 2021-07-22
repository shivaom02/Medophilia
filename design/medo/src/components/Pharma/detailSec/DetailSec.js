import React from "react";
import "./Details.css";
import img from "../../assets/banner.svg";
import {ReactComponent as Cart} from "../../assets/shopping-cart.svg";

const DetailsSec=()=>{
    return(
    <div className="DetailsSec">
        <div className="doctor">
            <img  src={img}/>
            <div className="content">
                    <p>Dr Namita Das</p>
                    <p>Xyz Hospital</p>
                    <p>Detail 1</p>
            </div>
        </div>
        <div className="precription_validation">
              <div>
              Valid Prescription
              </div>
        </div>
        <div className="user">
             <img src={img} />
             <div className="content">
                        <p>Dr Namita Das</p>
                        <p>Xyz Hospital</p>
                        <p>Detail 1</p>
                </div>
            <div className="icon">
            <Cart id="cart"/>
            </div>
        </div>
        <nav className="sections">
            <div>Medicine</div>
            <div>Tests</div>
            <div>Clinical Notes</div>
        </nav>
    </div>)
}

export default DetailsSec;