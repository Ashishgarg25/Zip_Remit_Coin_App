/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import Button from '../Button';
import Fonts from '../../utils/Fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, submitKyc} from '../../store/slice/standardKycSlice';

const KycStep3 = () => {
  const dispatch = useDispatch();
  const standardKycDetails = useSelector(state => state.standardKyc.data);

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const launchImagePicker = async (type, cameraType) => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200,
      cameraType: cameraType,
    };

    let result;

    if (type === 'upload') {
      launchImageLibrary(options);
      result = await launchImageLibrary(options);
    } else {
      launchCamera(options);
      result = await launchCamera(options);
    }

    console.log('RESULT ============>', result);
    if (result.assets[0].fileSize > 2000000) {
      console.log('Exceed 2mb');
    } else {
      if (cameraType === 'front') {
        setFrontImage({
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
        });
      } else {
        setBackImage({
          fileName: result.assets[0].fileName,
          type: result.assets[0].type,
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
        });
      }
    }
  };

  const completeStandardKyc = () => {
    console.log('ALL VALUES ARE ===========>', standardKycDetails);
    const data = {
      standardKycDetails,
      frontImage: frontImage,
      backImage: backImage,
    };
    dispatch(submitKyc(data));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Upload Documents</Text>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Upload Front of the Document</Text>
            <TouchableOpacity
              style={styles.upload}
              onPress={() => launchImagePicker('upload', 'front')}>
              <View style={styles.imageContainer}>
                {frontImage !== null ? (
                  <Image
                    source={{uri: frontImage.uri}}
                    resizeMode="cover"
                    style={{width: 360, height: 170, borderRadius: 8}}
                  />
                ) : (
                  <Text
                    style={[
                      styles.label,
                      {color: Colors.PRIMARY, paddingTop: 0},
                    ]}>
                    Upload or Capture
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 8}}>
            <Text style={styles.label}>Upload Back of the Document</Text>
            <TouchableOpacity
              style={styles.upload}
              onPress={() => launchImagePicker('upload', 'back')}>
              <View style={styles.imageContainer}>
                {backImage !== null ? (
                  <Image
                    source={{uri: backImage.uri}}
                    resizeMode="cover"
                    style={{width: 360, height: 170, borderRadius: 8}}
                  />
                ) : (
                  <Text
                    style={[
                      styles.label,
                      {color: Colors.PRIMARY, paddingTop: 0},
                    ]}>
                    Upload or Capture
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 16,
            }}>
            <Text style={[styles.label, {color: Colors.RED}]}>PLEASE NOTE</Text>
            <Text style={styles.label}>
              Use your phone to take a coloured picture of your original
              Identity Document. Ensure the address and other details are
              clearly visible.
              <Text style={{fontWeight: '400'}}>(Good Quality)</Text>{' '}
            </Text>
            <Text style={[styles.label, {fontWeight: '400'}]}>
              • Do not take a picture of a photocopy or printout of your
              Identity Document. Photocopies or scanned images will not be
              accepted.
            </Text>
            <Text style={[styles.label, {fontWeight: '400'}]}>
              • Do not crop edges of the document.
            </Text>
          </View>
          <View
            style={{
              marginTop: 32,
              marginBottom: 168,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Button
              text={'Back'}
              width={'45%'}
              onPress={() => dispatch(decrement())}
              outline
            />
            <Button
              disabled={!frontImage || !backImage}
              text={'Finish'}
              width={'45%'}
              onPress={() => completeStandardKyc()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KycStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  label: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  heading: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.4,
    color: Colors.BLACK,
    paddingTop: 16,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    height: 55,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
  },
  checkboxText: {
    fontWeight: '400',
    fontFamily: Fonts.SORA_REGULAR,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  paymentMethodText: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.PRIMARY,
    paddingLeft: 8,
  },
  title: {
    fontWeight: '600',
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontSize: 18,
    lineHeight: 28.8,
    color: Colors.PRIMARY,
    paddingTop: 24,
  },
  upload: {
    height: 170,
    backgroundColor: Colors.LIGHT_GREEN,
    borderWidth: 2,
    borderColor: Colors.GREEN,
    borderStyle: 'dotted',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
});
