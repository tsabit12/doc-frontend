import React from 'react';
import { GradientLayout, HeaderLayout } from '../components';
import { Menu as MenuIcon } from '../../icons';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import defaultstyles from '../config/styles';

const HomeScreen = ({ navigation }) => {

    return(
        <GradientLayout>
            <HeaderLayout 
                title={<Text style={{ ...defaultstyles.headertitle }}>Home</Text>}
                withicon={true}
                onPressIcon={() => navigation.navigate('Menu')}
                icon={<MenuIcon />}
            />
        </GradientLayout>
    )
}


HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default HomeScreen;