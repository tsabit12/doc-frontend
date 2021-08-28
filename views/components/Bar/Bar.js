import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale'
import { rupiahNumber } from '../../../utils';

const Bar = ({ data }) => {
    const Labels = ({  x, y, bandwidth, data }) => {
        //const CUT_OFF = 120000;

        return data.map((value, index) => (
            <Text
                key={ index }
                //x={ value.jumlah > CUT_OFF ? x(0) + 10 : x(value.jumlah) + 10 }
                x={10}
                y={ y(index) + (bandwidth / 2) }
                fontSize={ 14 }
                fill='#525151'
                alignmentBaseline={ 'middle' }
            >
                { rupiahNumber(value.jumlah) } 
            </Text>
        ))
    }

    const contentInset = { top: 10, bottom: 10 }

    return (
        <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 4, paddingVertical: 5 }}>
            <YAxis
                data={data}
                scale={scale.scaleBand}
                yAccessor={({ index }) => index }
                contentInset={ contentInset }
                spacing={0.2}
                formatLabel={(_, index) => `${data[ index ].name}`}
                svg={{ fontSize: 9, fill: '#3A8F98' }}
                numberOfTicks={data.length}
            />
            <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={data}
                horizontal={true}
                yAccessor={({ item }) => item.jumlah}
                //svg={{ stroke: 'rgba(134, 65, 244, 0.8)' }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
                numberOfTicks={data.length}
            >
                <Grid direction={Grid.Direction.VERTICAL} />
                <Labels />
            </BarChart>
        </View>
    )
}



Bar.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Bar;