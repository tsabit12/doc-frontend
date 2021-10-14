import React from "react";
import { Book as BookIcon, LogoutIcon } from "../icons";
import { GET_MENU, SEARCH_MENU } from "../types";

const initialState = {
    param: '',
    data: [
        // { id: '1', title: 'Produksi Kiriman', subtitle: 'Pengawasan Produksi Kiriman', route: 'ProduksiKiriman', icon: <BookIcon /> },
        // { id: '5', title: 'Pengawasan Kiriman', subtitle: 'Jatuh tempo, Ontime SWP, Over SLA, Menginap', route: 'JatuhTempo', icon: <BookIcon /> },
        // { id: '6', title: 'Kiriman Irregularitas', subtitle: 'Pengendalian kiriman irregularitas', route: 'Irregulaity', icon: <BookIcon /> },
        { id: '7', title: 'Logout', icon: <LogoutIcon /> }
    ]
}

export default function menus(state=initialState, action={}){
    switch (action.type) {
        case SEARCH_MENU:
            return { ...state, param: action.param }
        case GET_MENU:
            return {
                ...state,
                data: action.menu
            }
        default:
            return state;
    }
}