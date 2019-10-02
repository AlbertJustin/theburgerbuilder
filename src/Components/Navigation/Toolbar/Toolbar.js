import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../UI/Logo/Logo";
import Navigationitems from "../../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle click={props.clicked} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <Navigationitems isUserAuth={props.isUserAuth} />
        </nav>
    </header>
);

export default Toolbar;
