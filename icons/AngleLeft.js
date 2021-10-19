import React from 'react';
import Svg, { Path } from "react-native-svg";
import PropTypes from 'prop-types';

export default function AngleLeft({ color }){
    return(
        <Svg width="21" height="42" viewBox="0 0 21 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M2.60037 19.6055L13.7566 8.44923C14.5277 7.67814 15.7746 7.67814 16.5375 8.44923L18.3914 10.3031C19.1625 11.0742 19.1625 12.3211 18.3914 13.084L10.4918 21L18.3996 28.9078C19.1707 29.6789 19.1707 30.9258 18.3996 31.6887L16.5457 33.5508C15.7746 34.3219 14.5277 34.3219 13.7648 33.5508L2.60857 22.3945C1.82928 21.6235 1.82928 20.3766 2.60037 19.6055Z" fill={color}/>
        </Svg>

    )
}

AngleLeft.defaultProps = {
    color: 'white'
}

AngleLeft.propTypes = {
    color: PropTypes.string,
}