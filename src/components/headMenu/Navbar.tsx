import React, {Component, useCallback, useState} from 'react';
import styles from './Navbar.module.css';
import {FaSearch} from "react-icons/fa";
import {GoTasklist} from "react-icons/go";

function Navbar() {

    const [modalOpen, setModalOpen] = useState(false);

    const handlerOver = useCallback((event : any) => {
        setModalOpen(true);
    }, [modalOpen]);

    return (
        // <div className={styles.navbar}>
        //     <div className={styles.pageName}>
        //         <i className={styles.navbarLogo}></i>
        //         <a id="logo" title="Ayenohwa Cosmos">
        //             <span>AyeonHwa</span>
        //         </a>
        //     </div>
        //     <nav id="menu-bar-wrap-top-nav" className={styles.leftMenuName}>
        //         <li id="menu-item-1" className="menu-item">
        //             <a title="Introduce" onMouseOver={handlerOver}>Introduce</a>
        //             <ul id="sub-menu-item-1" className={styles.subMenuItem_1}>
        //                 <li id="sub-menu-item-1-title">
        //                     <div className="sub-menu-item-1-title-name">
        //                         My Projects
        //                     </div>
        //                 </li>
        //             </ul>
        //         </li>
        //         <li id="menu-item-2" className="menu-item">
        //             <a title="Solutions">English</a>
        //             <ul id="sub-menu-item-2" className={styles.subMenuItem}>
        //                 <li id="sub-menu-item-1-title">
        //                     <div className="sub-menu-item-2-title-name">
        //                         My Projects
        //                     </div>
        //                 </li>
        //             </ul>
        //         </li>
        //         <li id="menu-item-3" className="menu-item">
        //             <a title="Solutions">Drama</a>
        //             <ul id="sub-menu-item-1" className={styles.subMenuItem}>
        //                 <li id="sub-menu-item-1-title">
        //                     <div className="sub-menu-item-3-title-name">
        //                         My Projects
        //                     </div>
        //                 </li>
        //             </ul>
        //         </li>
        //         <li id="menu-item-4" className="menu-item">
        //             <a title="Solutions">K-pop</a>
        //             <div id="sub-menu-item-1" className={styles.subMenuItem}>
        //                 <li id="sub-menu-item-1-title">
        //                     <div className="sub-menu-item-3-title-name">
        //                         My Projects
        //                     </div>
        //                 </li>
        //             </div>
        //         </li>
        //     </nav>
        //     <div className={styles.rightMenuName}>
        //         <FaSearch className="searchIcon" />
        //         <li id="menu-item-5" className="menu-item">
        //             <a title="Solutions">Contact-Me</a>
        //
        //         </li>
        //         <span>||</span>
        //         <li id="menu-item-7" className="menu-item">
        //             <a title="Solutions">Login</a>
        //         </li>
        //         <GoTasklist />
        //     </div>
        //
        // </div>
        <span>TEST</span>
    )

}

export default Navbar;