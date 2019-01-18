import React from 'react';
import Svg, { Circle, Path, Text } from 'react-native-svg';

const Progress = ({ current, count, width, height }) => {
    let xCur = 18;
    if (current < 10) {
        xCur += 10;
    }
    let xCnt = 50;
    if (count < 10) {
        xCnt += 10;
    }
    return count ? (
        <Svg viewBox="0 0 100 100" width={width} height={height} style={{ marginRight: 16 }}>
            <Circle cx={50} cy={50} r={50} />
            <Path strokeWidth={4} stroke="#fff" d="M70 30L30 70" />
            <Text x={xCur} y={40} fontSize={30} fontWeight="bold" fill="#fff">
                {current + 1}
            </Text>
            <Text x={xCnt} y={78} fontSize={30} fontWeight="bold" fill="#fff">
                {count}
            </Text>
        </Svg>
    ) : null;
};

Progress.defaultProps = {
    count: 0,
    current: 0,
    width: 50,
    height: 50
};

export default Progress;
