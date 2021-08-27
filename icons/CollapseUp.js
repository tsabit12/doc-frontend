import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path } from "react-native-svg";
import { Rect } from 'react-native-svg';

export default function CollapseUp(){
    return(
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12.5" cy="12.5" r="12.5" fill="#FA6A01"/>
            <G clip-path="url(#clip0)">
                <Path d="M13.5312 9.99061L17.7812 14.2406C18.075 14.5344 18.075 15.0094 17.7812 15.3L17.075 16.0062C16.7812 16.3 16.3062 16.3 16.0156 16.0062L13 12.9969L9.98748 16.0094C9.69373 16.3031 9.21873 16.3031 8.9281 16.0094L8.21873 15.3031C7.92498 15.0094 7.92498 14.5344 8.21873 14.2437L12.4687 9.99374C12.7625 9.69686 13.2375 9.69686 13.5312 9.99061Z" fill="white"/>
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Rect width="10" height="16" fill="white" transform="translate(8 5)"/>
                </ClipPath>
            </Defs>
        </Svg>
    )
}