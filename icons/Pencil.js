import React from 'react';
import Svg, { Path } from "react-native-svg";

export default function Pencil(){
    return(
        <Svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 25H23.75C24.0815 25 24.3995 25.1317 24.6339 25.3661C24.8683 25.6005 25 25.9185 25 26.25C25 26.5815 24.8683 26.8995 24.6339 27.1339C24.3995 27.3683 24.0815 27.5 23.75 27.5H6.25C5.91848 27.5 5.60054 27.3683 5.36612 27.1339C5.1317 26.8995 5 26.5815 5 26.25C5 25.9185 5.1317 25.6005 5.36612 25.3661C5.60054 25.1317 5.91848 25 6.25 25ZM5 18.75L17.5 6.25L21.25 10L8.75 22.5H5V18.75ZM18.75 5L21.25 2.5L25 6.25L22.4988 8.75125L18.75 5Z" fill="white"/>
        </Svg>
    )
}