import React from "react";
import service from "../config/service";
import { Book, LogoutIcon, People } from "../icons";
import { GET_MENU, SEARCH_MENU } from "../types";

const getIcon = (route) => {
    switch(route){
        case "Users":
            return <People />
        default:
            return <Book />
    }
}

const convertMenu = (arr) => {
    const list = [];
    arr.forEach(row => {
        list.push({ ...row, icon: getIcon(row.route) })
    });

    return [...list, { id: '00', title: 'Logout', icon: <LogoutIcon /> } ];
}

export const searchMenu = (param) => dispatch => dispatch({
    type: SEARCH_MENU,
    param
})

export const getmenu = (param) => dispatch => 
    service.referensi.menu(param)
        .then(({ menu }) => dispatch({
            type: GET_MENU,
            menu: convertMenu(menu)
        }))