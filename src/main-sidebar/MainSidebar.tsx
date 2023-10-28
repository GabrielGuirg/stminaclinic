import React, { useState } from 'react';
import { generalStore } from '../stores/generalStore';
import { Sidebar } from 'primereact/sidebar';



function MainSidebar() {
    const sideBars = generalStore((state: any )=> state.sideBars);
    const sideBarOpen = generalStore((state: any )=> state.sideBarOpen);
    const sideBarLength = generalStore((state: any )=> state.sideBarLength);
    const popSideBar = generalStore((state: any )=> state.popSideBar);
    
    console.log(sideBarLength, sideBarOpen);

    return (
        <Sidebar visible={sideBarOpen && sideBarLength > 0} onHide={() => popSideBar()}>
            {sideBars[sideBarLength-1]}
        </Sidebar>
    );
};


export default MainSidebar;