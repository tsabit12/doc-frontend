import React from 'react';
import Svg, { Path } from "react-native-svg";
import PropTypes from 'prop-types'

export default function Eyeopen({ color }){
    return(
        <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16.4062 12.5C16.4062 13.536 15.9947 14.5296 15.2621 15.2621C14.5296 15.9947 13.536 16.4062 12.5 16.4062C11.464 16.4062 10.4704 15.9947 9.73786 15.2621C9.0053 14.5296 8.59375 13.536 8.59375 12.5C8.59375 11.464 9.0053 10.4704 9.73786 9.73786C10.4704 9.0053 11.464 8.59375 12.5 8.59375C13.536 8.59375 14.5296 9.0053 15.2621 9.73786C15.9947 10.4704 16.4062 11.464 16.4062 12.5V12.5Z" fill={color}/>
            <Path d="M0 12.5C0 12.5 4.6875 3.90625 12.5 3.90625C20.3125 3.90625 25 12.5 25 12.5C25 12.5 20.3125 21.0938 12.5 21.0938C4.6875 21.0938 0 12.5 0 12.5ZM12.5 17.9688C13.9504 17.9688 15.3414 17.3926 16.367 16.367C17.3926 15.3414 17.9688 13.9504 17.9688 12.5C17.9688 11.0496 17.3926 9.6586 16.367 8.63301C15.3414 7.60742 13.9504 7.03125 12.5 7.03125C11.0496 7.03125 9.6586 7.60742 8.63301 8.63301C7.60742 9.6586 7.03125 11.0496 7.03125 12.5C7.03125 13.9504 7.60742 15.3414 8.63301 16.367C9.6586 17.3926 11.0496 17.9687 12.5 17.9688V17.9688Z" fill={color} />
        </Svg>
    )
}

Eyeopen.defaultProps = {
    color: '#574F4F'
}

Eyeopen.propTypes = {
    color: PropTypes.string,
}