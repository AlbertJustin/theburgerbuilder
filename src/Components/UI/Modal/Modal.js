import React from "react";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxillary from "../../../HOC/Auxillary";

const Modal = (props) => {
    return (
        <Auxillary>
            <Backdrop show={props.show} closeModal={props.closeModal}/>
            <div className={styles.Modal} 
                style={
                    {transform: props.show ? 'translateY(0)' : 'translateY(-100vh',
                    opacity: props.show ? 1 : 0}
                    }>
                {props.children}
            </div>
        </Auxillary>
    );
}

export default Modal;