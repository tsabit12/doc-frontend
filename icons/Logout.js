import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export default function Logout(){
    return(        
          <Svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <G clip-path="url(#clip0)">
                    <Path d="M21.4949 5.56678L28 11.8361L21.4949 18.0584V13.8866H11.7609V9.73849H21.4949V5.56678ZM17.5825 17.6341L20.0808 20.156C17.6296 22.45 14.9742 23.5971 12.1145 23.5971C8.70483 23.5971 5.83333 22.4697 3.5 20.2149C1.16667 17.9601 0 15.1437 0 11.7654C0 9.64422 0.534231 7.68013 1.60269 5.87317C2.67116 4.06622 4.11279 2.64029 5.92761 1.5954C7.74242 0.550507 9.71044 0.0280609 11.8316 0.0280609C14.7228 0.0280609 17.4646 1.1908 20.0572 3.51627L17.5825 6.01459C15.7912 4.38047 13.8822 3.56341 11.8552 3.56341C9.51403 3.56341 7.53816 4.38047 5.92761 6.01459C4.31706 7.64871 3.51178 9.64422 3.51178 12.0011C3.51178 14.2009 4.34063 16.0943 5.99832 17.6812C7.656 19.2682 9.60045 20.0617 11.8316 20.0617C13.89 20.0617 15.807 19.2525 17.5825 17.6341Z" fill="white"/>
               </G>
               <Defs>
                    <ClipPath id="clip0">
                         <Rect width="28" height="23.569" fill="white"/>
                    </ClipPath>
               </Defs>
          </Svg>
    )
} 