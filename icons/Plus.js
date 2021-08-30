import React from 'react';
import Svg, { Path } from "react-native-svg";

export default function Plus(){
    return(
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M12 12H4M12 20V12V20ZM12 12V4V12ZM12 12H20H12Z" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </Svg>
    )
}