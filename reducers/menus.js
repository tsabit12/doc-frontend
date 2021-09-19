import { SEARCH_MENU } from "../types";

const initialState = {
    param: '',
    data: [
        { id: '1', title: 'Produksi Kiriman', subtitle: 'Pengawasan Produksi Kiriman', route: 'ProduksiKiriman'},
        { id: '5', title: 'Pengawasan Kiriman', subtitle: 'Jatuh tempo, Ontime SWP, Over SLA, Menginap', route: 'JatuhTempo'},
        // { id: '3', title: 'Kiriman Menginap', subtitle: 'Pengendalian Kiriman Potensi Menginap', route: 'Irregulaity' },
        { id: '4', title: 'Kiriman Terbuka', subtitle: 'Pengendalian Kiriman Terbuka', route: 'ProduksiKiriman'},
        { id: '6', title: 'Kiriman Irregularitas', subtitle: 'Pengendalian kiriman irregularitas', route: 'Irregulaity'}
    ]
}

export default function menus(state=initialState, action={}){
    switch (action.type) {
        case SEARCH_MENU:
            return { ...state, param: action.param }
        default:
            return state;
    }
}