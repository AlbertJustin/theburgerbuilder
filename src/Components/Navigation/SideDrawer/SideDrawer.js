import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import Auxillary from "../../../HOC/Auxillary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let classes = props.show ? [styles.SideDrawer, styles.Open] : [styles.SideDrawer, styles.Close];
    return (
        <Auxillary>
            <Backdrop show={props.show} closeModal={props.clicked} />
            <div className={classes.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isUserAuth={props.isUserAuth} />
                </nav>
            </div>
        </Auxillary>
    );
}

export default SideDrawer;