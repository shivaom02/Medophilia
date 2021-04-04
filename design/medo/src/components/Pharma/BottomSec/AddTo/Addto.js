import React from "react";
import "./Addto.css"


const AddTo=()=>{
    return(
    <div className="addto">
        <div className="msg">
            <p>Medicine XYZ</p>
            <p>To be taken <span>1 Times</span> A Day</p>
            <p>Detail PPYY</p>
        </div>
        <div className="main">
            <div className="Prescribed">
                <div className="num">20</div>
                <div className="Title">Prescribed</div>
            </div>
            <div className="Remain">
                <div className="num">20</div>
                <div className="Title">Remain</div>
            </div>
            <div className="Bought">
                <div className="dash">____</div>
                <div className="Title">Remain</div>
            </div>
        </div>
        <div className="tot">
            <h4>Sub Total: 120</h4>
            <h4>Total: 120</h4>
        </div>
        <div className="control">
            <button>confirm Add to cart</button>
            <p>Go Back</p>
        </div>
    </div>)
}


export default AddTo;