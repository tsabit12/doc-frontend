const intialState = [
    {title: 'NASIONAL', value: '00'},
    {title: 'REGIONAL MEDAN', value: '1'},
    {title: 'REGIONAL JAKARTA', value: '2'},
    {title: 'REGIONAL BANDUNG', value: '3'},
    {title: 'REGIONAL SEMARANG', value: '4'},
    {title: 'REGIONAL SURABAYA', value: '5'},
    {title: 'REGIONAL MAKASAR', value: '6'}
]

export default function region(state=intialState, action={}){
    switch (action.type) {
        default:
            return state
    }
}