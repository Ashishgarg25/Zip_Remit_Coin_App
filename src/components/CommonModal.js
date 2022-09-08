/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import Button from './Button';

const CommonModal = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => {
          props.setIsVisible(!props.isModalVisible);
        }}>
        <View style={{flex: 1}} />
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.checkWrapper,
                {
                  backgroundColor: props.confirm
                    ? Colors.LIGHT_ORANGE
                    : Colors.LIGHT_BLUE,
                },
              ]}>
              <View
                style={[
                  props.confirm ? styles.warnContainer : styles.checkContainer,
                  {
                    backgroundColor: props.confirm
                      ? 'transparent'
                      : Colors.BLUE,
                  },
                ]}>
                {props.icon}
              </View>
            </View>
          </View>

          <Text style={styles.label}>{props.text}</Text>
          {props.buttonVisible && (
            <View style={{marginTop: 24}}>
              <Button
                text={props.buttonText}
                danger={true}
                onPress={() =>
                  props.confirm ? props.onPress() : props.setIsVisible(false)
                }
              />
              {props?.cancel && (
                <View style={{marginTop: 8}}>
                  <Button
                    text={'Cancel'}
                    outline
                    onPress={() => props.setIsVisible(false)}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 24,
    paddingBottom: 48,
    elevation: 6,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: -8},
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    opacity: 0.6,
  },
  checkContainer: {
    width: 48,
    height: 48,
    borderRadius: 64,
    padding: 16,
  },
  warnContainer: {
    borderRadius: 64,
    padding: 16,
  },
  checkWrapper: {
    width: 88,
    height: 88,
    borderRadius: 88,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
    textAlign: 'center',
  },
});
