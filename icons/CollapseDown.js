import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path } from "react-native-svg";
import { Rect } from 'react-native-svg';

export default function CollapseDown(){
    return(
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12.5" cy="12.5" r="12.5" fill="#FA6A01"/>
            <G clip-path="url(#clip0)">
                <Path d="M12.4687 16.0094L8.21873 11.7594C7.92498 11.4656 7.92498 10.9906 8.21873 10.7L8.92498 9.99375C9.21873 9.7 9.69373 9.7 9.98435 9.99375L12.9969 13.0063L16.0093 9.99375C16.3031 9.7 16.7781 9.7 17.0687 9.99375L17.775 10.7C18.0687 10.9937 18.0687 11.4688 17.775 11.7594L13.525 16.0094C13.2375 16.3031 12.7625 16.3031 12.4687 16.0094Z" fill="white"/>
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Rect width="10" height="16" fill="white" transform="translate(8 5)"/>
                </ClipPath>
            </Defs>
        </Svg>
    )
}