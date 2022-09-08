/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import Stepper from 'react-native-stepper-ui';
import Colors from '../utils/Colors';
import {useSelector} from 'react-redux';

const ProgressStepper = ({navigation, content}) => {
  const {value} = useSelector(state => state.standardKyc);

  return (
    <View style={{flex: 1}}>
      <Stepper
        wrapperStyle={{padding: 16}}
        stepStyle={{marginBottom: 16}}
        lineStyle={{marginBottom: 16}}
        stepTextStyle={{color: Colors.WHITE}}
        active={value}
        content={content}
        showButton={false}
      />
    </View>
  );
};

export default ProgressStepper;
