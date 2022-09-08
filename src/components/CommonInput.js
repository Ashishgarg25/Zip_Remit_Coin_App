/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';
import CommonDropdown from './CommonDropdown';

const CommonInput = ({
  control,
  errors,
  label,
  secureTextEntry,
  placeholder,
  rules,
  name,
  isDropdown,
  labelStyle,
  prefilledValue,
  prefill,
  isNumeric,
  content,
  hasMultiData,
  hasCountries,
  setValue,
  hasPeers,
  note,
}) => {
  return (
    <View>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <View>
              <Text style={labelStyle ? labelStyle : styles.label}>
                {label}
              </Text>
            </View>
            {isDropdown ? (
              <CommonDropdown
                onChange={onChange}
                setValue={setValue}
                value={
                  prefill ? prefill : prefilledValue ? prefilledValue : value
                }
                placeholder={placeholder}
                customStyles={{marginTop: -20, iconMarginTop: -28}}
                content={content ? content : ['Canada', 'America', 'India']}
                disabled={prefilledValue}
                hasMultiData={hasMultiData}
                hasCountries={hasCountries}
                hasPeers={hasPeers}
              />
            ) : (
              <TextInput
                style={[
                  styles.input,
                  {
                    fontFamily: Fonts.SORA_SEMI_BOLD,
                    fontWeight: '500',
                    backgroundColor: errors
                      ? Colors.LIGHT_RED
                      : prefilledValue
                      ? Colors.LIGHT_BLUE
                      : Colors.WHITE,
                    borderColor: errors ? Colors.RED : Colors.GREY,
                    borderLeftWidth: errors ? 8 : 1,
                  },
                ]}
                autoComplete={true}
                returnKeyType="next"
                onBlur={onBlur}
                onChangeText={onChange}
                editable={!prefilledValue}
                value={
                  prefill ? prefill : prefilledValue ? prefilledValue : value
                }
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                keyboardType={isNumeric ? 'number-pad' : 'default'}
              />
            )}
          </View>
        )}
        name={name}
      />
      {errors ? (
        <Text
          style={{
            color: errors ? Colors.RED : Colors.PRIMARY,
            fontFamily: Fonts.SORA_MEDIUM,
            fontSize: 12,
          }}>
          {errors.message}
        </Text>
      ) : (
        note && (
          <Text
            style={[
              styles.label,
              {fontSize: 11, color: Colors.ORANGE, marginTop: 0},
            ]}>
            {note}
          </Text>
        )
      )}
    </View>
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 16,
    marginVertical: 8,
    color: Colors.PRIMARY,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 8,
    marginBottom: 0,
    fontFamily: Fonts.SORA_REGULAR,
    color: Colors.LIGHT_BLACK,
  },
});
