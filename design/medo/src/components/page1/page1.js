import React from "react";
import banner from "../assets/banner.svg";
import "./page1.css"
const Registration=()=>{
    return(
    <div className="registration">
        <div className="imgbox">
            <img src={banner}/>
        </div>
        <form >
            <input className="input_first" placeholder="Username / Email" />
            <input className="input_first" placeholder="User password"/>
            <div className="controls">
                <div className="checking">
                    <input type="checkbox" id="checkit" />
                    <label for="checkit" >Remember me</label>
                </div>
                <button>
                    Sign In
                </button>
            </div>
            <div className="dividor">
                <div className="border_div">

                </div>
                <div className="div_or">
                    <h5>Or</h5>
                </div>
                <div className="border_div">

                </div>
            </div>
            <div className="options">
                <button>
                    Login using Google
                </button>
            </div>
        </form>

    </div>)
}

export default Registration;