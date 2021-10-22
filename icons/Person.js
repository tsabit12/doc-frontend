import React from 'react';
import Svg, { Path } from "react-native-svg";

export default function Person(){
    return(
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
               <Path d="M4.6875 21.875C4.6875 21.875 3.125 21.875 3.125 20.3125C3.125 18.75 4.6875 14.0625 12.5 14.0625C20.3125 14.0625 21.875 18.75 21.875 20.3125C21.875 21.875 20.3125 21.875 20.3125 21.875H4.6875ZM12.5 12.5C13.7432 12.5 14.9355 12.0061 15.8146 11.1271C16.6936 10.248 17.1875 9.0557 17.1875 7.8125C17.1875 6.5693 16.6936 5.37701 15.8146 4.49794C14.9355 3.61886 13.7432 3.125 12.5 3.125C11.2568 3.125 10.0645 3.61886 9.18544 4.49794C8.30636 5.37701 7.8125 6.5693 7.8125 7.8125C7.8125 9.0557 8.30636 10.248 9.18544 11.1271C10.0645 12.0061 11.2568 12.5 12.5 12.5V12.5Z" fill="#696969"/>
          </Svg>     
    )
}