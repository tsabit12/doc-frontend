import React from 'react';
import { GradientLayout, HeaderLayout } from '../components';
import { Menu as MenuIcon } from '../../icons';
import PropTypes from 'prop-types';

const HomeScreen = ({ navigation }) => {

    return(
        <GradientLayout>
            <HeaderLayout 
                title='Home'
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