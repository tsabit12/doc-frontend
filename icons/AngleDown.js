import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import PropTypes from 'prop-types';

export default function AngleDown({ size='large', color='#ADADAD' }){
    const iconsize = { width: 25, height: 40 }
    if(size === 'small'){
        iconsize.width  = 15;
        iconsize.height = 30; 
    }


    return(
        <Svg width={iconsize.width} height={iconsize.height} viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0)">
                <Path d="M11.1718 27.5234L0.546829 16.8984C-0.187546 16.1641 -0.187546 14.9766 0.546829 14.25L2.31245 12.4844C3.04683 11.75 4.23433 11.75 4.96089 12.4844L12.4921 20.0156L20.0234 12.4844C20.7578 11.75 21.9453 11.75 22.6718 12.4844L24.4375 14.25C25.1718 14.9844 25.1718 16.1719 24.4375 16.8984L13.8125 27.5234C13.0937 28.2578 11.9062 28.2578 11.1718 27.5234Z" fill={color}/>
            </G>
            <Defs>
            <ClipPath id="clip0">
                <Rect width="25" height="40" fill="white"/>
            </ClipPath>
            </Defs>
        </Svg>
    )
}

AngleDown.propTypes = {
    size: PropTypes.string,       
    color: PropTypes.string,
}