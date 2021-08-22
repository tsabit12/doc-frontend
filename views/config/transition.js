import { CardStyleInterpolators } from '@react-navigation/stack';

export const horizontal = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export const vertical = {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
}