import {StyleSheet, View} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const CommonDatePicker = ({onDateChange, mode}) => {
  return (
    <View style={styles.datePickerContainer}>
      <DatePicker
        options={{
          backgroundColor: Colors.WHITE,
          textHeaderColor: Colors.ORANGE,
          textDefaultColor: Colors.PRIMARY,
          selectedTextColor: Colors.WHITE,
          mainColor: Colors.ORANGE,
          textSecondaryColor: Colors.ORANGE,
          borderColor: Colors.WHITE,
          defaultFont: Fonts.SORA_MEDIUM,
          headerFont: Fonts.SORA_SEMI_BOLD,
        }}
        current="2020-07-13"
        selected="2020-07-23"
        mode={mode ? 'monthYear' : 'calendar'}
        minuteInterval={30}
        onDateChange={!mode && onDateChange}
        onMonthYearChange={mode && onDateChange}
      />
    </View>
  );
};

export default CommonDatePicker;

const styles = StyleSheet.create({
  datePickerContainer: {
    elevation: 6,
    shadowColor: Colors.PRIMARY,
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: {width: -2, height: 2},
    marginVertical: 16,
  },
});
