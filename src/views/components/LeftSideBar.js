import React from "react";

const LeftSideBar = () => {
    const user = {
        fullname: "Le Nguyen Khang",
    };

    const item = {
        icon: "",
        routerLink: "",
        title: "",
    };

    return ( <
        div class = "left side-menu" >
        <
        div class = "slimscroll-menu"
        id = "remove-scroll" >
        <
        div class = "topbar-left" >
        <
        a class = "logo" >
        <
        span >
        <
        img src = "../../assets/images/logo_light.png"
        alt = ""
        height = "22" >
        < /img>{" "} <
        /span>{" "} <
        i >
        <
        img src = "../../assets/images/logo_sm.png"
        alt = ""
        height = "28" >
        < /img>{" "} <
        /i>{" "} <
        /a>{" "} <
        /div> <
        div class = "user-box"
        click = "viewProfile()" >
        <
        div class = "user-img" >
        <
        img src = "../../assets/images/users/avatar-1.jpg"
        alt = "user-img"
        title = "Mat Helme"
        class = "rounded-circle img-fluid"
        style = {
            {
                height: "48px",
                width: "48px",
            }
        } >
        < /img>{" "} <
        /div>{" "} <
        h5 >
        <
        a > { user.fullname } < /a>{" "} <
        /h5>{" "} <
        /div> <
        div id = "sidebar-menu" >
        <
        ul class = "metismenu" >
        <
        li class = "menu-item" >
        <
        a routerLink = { item.routerLink } >
        <
        i class = { item.icon } > < /i> <span> {item.title} </span > { " " } <
        /a>{" "} <
        /li> <
        li class = "menu-item" >
        <
        a click = "getLabourContract()" >
        <
        i class = "menu-icon mdi mdi-content-copy" > < /i>{" "} <
        span > Hồ sơ lao động < /span>{" "} <
        /a>{" "} <
        /li>{" "} <
        /ul> <
        ul class = "metismenu" >
        <
        li class = "menu-item" >
        <
        a routerLink = { item.routerLink } >
        <
        i class = { item.icon } > < /i> <span> {item.title} </span > { " " } <
        /a>{" "} <
        /li>{" "} <
        /ul>{" "} <
        /div> <
        div class = "clearfix" > < /div>{" "} <
        /div>{" "} <
        /div>
    );
};

export default LeftSideBar;