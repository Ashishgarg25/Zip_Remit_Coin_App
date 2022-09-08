import {StyleSheet, View, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Register from './Register';
import Login from './Login';
import Toast from 'react-native-toast-message';
import ToastConfig from '../components/ToastConfig';

const Auth = props => {
  const [isRegister, setIsRegister] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    props?.route?.params !== undefined &&
      props?.route?.params?.isModalVisible !== undefined &&
      setIsModalVisible(props?.route?.params?.isModalVisible);
  }, [props?.route?.params]);

  const setRegisterState = value => {
    setIsRegister(value);
  };

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}>
          {isRegister === true ? (
            <Register
              setIsRegister={setRegisterState}
              setIsModalVisible={setIsModalVisible}
            />
          ) : (
            <Login
              setIsRegister={setRegisterState}
              setIsModalVisible={setIsModalVisible}
            />
          )}
          <Toast config={ToastConfig} />
        </Modal>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
