import React from "react";
import './Modal.css';

const Modal = (props) => {

    console.log(props)

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => {props.closeModal(false)}}>X</button>
                </div>
                <div className="modalTitle">
                    <h1>Czy na pewno chcesz usunąć post?</h1>
                </div>
                <div className="modalBody">
                    <p>Może zamiast tego napiszesz kolejny post?</p>
                </div>
                <div className="modalFooter">
                    <button onClick={() => {props.closeModal(false)}}>Anuluj</button>
                    <button onClick={() => {props.deletePost(props.postId)}}>Usuń post</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;