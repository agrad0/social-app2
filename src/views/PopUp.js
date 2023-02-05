import React from "react";
import LoginForm from "../components/LoginForm";
import '../components/Modal.css'

const PopUp = ({setShowPopUp}) => {

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button onClick={() => setShowPopUp(false)}>X</button>
                    </div>
                    <div className="modalTitle">
                        <h1>Already have an account?</h1>
                    </div>
                    <div className="modalBody">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp;