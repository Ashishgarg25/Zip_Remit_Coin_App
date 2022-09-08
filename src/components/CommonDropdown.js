/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import DropdownIcon from './icons/DropdownIcon';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import AddIcon from './icons/AddIcon';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CommonDropdown = ({
  onChange,
  value,
  title,
  placeholder,
  customStyles,
  content,
  disabled,
  hasMultiData,
  setValue,
  hasCountries,
  hasPeers,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const items =
    content !== undefined
      ? content
      : ['Value 1', 'Value 2', 'Value 3', 'Value 4'];

  //   const handleChange = text => {
  //     const lowerCaseText = text.toLowerCase();
  //     if (lowerCaseText !== '' && lowerCaseText.length > 2) {
  //       console.log(lowerCaseText);
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //       setIsExpanded(true);
  //       setFilterText(
  //         filterText.filter(item => item.toLowerCase().match(lowerCaseText)),
  //       );
  //     } else {
  //       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //       setIsExpanded(false);
  //       setFilterText(['Value 1', 'Value 2', 'Value 3', 'Value 4']);
  //     }
  //   };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            {
              fontFamily: Fonts.SORA_SEMI_BOLD,
              fontWeight: '500',
              backgroundColor: disabled ? Colors.LIGHT_BLUE : Colors.WHITE,
              borderTopLeftRadius: customStyles?.borderTopLeftRadius,
              borderBottomLeftRadius: customStyles?.borderBottomLeftRadius,
              marginTop: customStyles?.marginTop,
              borderLeftWidth: customStyles?.borderLeftWidth,
            },
            styles.input,
          ]}
          caretHidden
          value={value}
          placeholder={placeholder}
          onPressIn={() => {
            if (!disabled) {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setIsExpanded(!isExpanded);
            }
          }}
          editable={disabled}
        />
        <View
          style={[
            styles.iconContainer,
            {marginTop: customStyles?.iconMarginTop},
          ]}>
          {/* <TouchableOpacity
              onPress={() => resetValue(true)}
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 8,
                borderRadius: 16,
              }}>
              <CloseIcon color={Colors.WHITE} width={8} height={8} />
            </TouchableOpacity> */}

          <DropdownIcon color={Colors.GREY} />
        </View>
      </View>
      {isExpanded && (
        <View style={{height: hasMultiData ? 300 : 'auto'}}>
          <ScrollView contentContainerStyle={styles.dropdownContainer}>
            {hasMultiData && !hasCountries && !hasPeers && (
              <TouchableOpacity
                style={[styles.dropdownItem, {borderBottomWidth: 1}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.LIGHT_BLUE,
                      padding: 8,
                      marginRight: 10,
                      borderRadius: 12,
                    }}>
                    <AddIcon width={18} height={18} color={Colors.BLUE} />
                  </View>
                  <View>
                    <Text style={styles.dropdownItemText}>
                      Create new beneficiary
                    </Text>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        {
                          fontSize: 12,
                          color: Colors.BLUE,
                          letterSpacing: 0.4,
                        },
                      ]}>
                      Add Beneficiary
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dropdownItem,
                  {borderBottomWidth: idx === items.length - 1 ? 0 : 1},
                ]}
                onPress={() => {
                  if (!hasMultiData) {
                    onChange(item);
                  } else if (hasMultiData && hasCountries) {
                    setValue('country', item?.name);
                    setValue('region', item?.region);
                  } else if (hasMultiData && hasPeers) {
                    setValue('peer_name', item?.name);
                    setValue('peer_id', item?.id);
                    setValue('peer_currency', item?.currency?.toUpperCase());
                  } else {
                    setValue('beneficiary_name', item?.name);
                    setValue('beneficiary_id', item?.id);
                    setValue('beneficiary_currency', item?.currency);
                  }

                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setIsExpanded(false);
                }}>
                {!hasMultiData ? (
                  <Text style={styles.dropdownItemText}>{item}</Text>
                ) : item?.region ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingLeft: 6,
                    }}>
                    {item?.flags.split('.')[1] !== undefined ? (
                      <Image
                        source={{uri: item?.flags}}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 32,
                          marginTop: -4,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          backgroundColor: Colors.GREEN,
                          width: 32,
                          height: 32,
                          borderRadius: 32,
                          paddingLeft: 7,
                          paddingTop: 5,
                        }}>
                        <Text
                          style={[
                            styles.dropdownItemText,
                            {
                              fontSize: 12,
                              color: Colors.PRIMARY,
                              fontWeight: '600',
                            },
                          ]}>
                          {item?.flags}
                        </Text>
                      </View>
                    )}
                    <View style={{marginLeft: 16}}>
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'middle'}
                        style={[
                          styles.dropdownItemText,
                          {
                            fontSize: 12,
                            color: Colors.SECONDARY_GREY,
                            letterSpacing: 0.4,
                          },
                        ]}>
                        {item?.region}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'middle'}
                      style={[
                        styles.dropdownItemText,
                        {
                          fontSize: 12,
                          color: Colors.SECONDARY_GREY,
                          letterSpacing: 0.4,
                        },
                      ]}>
                      {`${item.address}, ${item.city}, ${item.state}, ${item.zip}`}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '100%',
    color: Colors.PRIMARY,
  },
  iconContainer: {marginLeft: -48},
  dropdownContainer: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    paddingVertical: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Colors.PRIMARY,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: {width: -2, height: 2},
  },
  dropdownItem: {
    paddingVertical: 12,
    width: '100%',
    borderBottomColor: Colors.LIGHT_GREY,
  },
  dropdownItemText: {
    fontFamily: Fonts.SORA_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.LIGHT_BLACK,
  },
});
