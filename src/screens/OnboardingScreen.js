/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

let slides = [
  {
    id: '1',
    image: require('../assets/images/image1.png'),
    title: 'Send Money',
    subtitle:
      'Most affordable send money transfers. \n Pay Less. Send More. Save More.',
  },
  {
    id: '2',
    image: require('../assets/images/image2.png'),
    title: 'A Fresh Way to Send',
    subtitle:
      'Welcome to the possible future. Start sending more today. Serving you 24/7.',
  },
  {
    id: '3',
    image: require('../assets/images/image3.png'),
    title: 'Connecting Communities',
    subtitle:
      'One transaction at each time using low fees and fast transfers. Money matters and so as you.',
  },
];

const Slide = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 390,
      }}>
      <Image
        source={item?.image}
        style={{
          height: '50%',
          width: '60%',
          resizeMode: 'contain',
          marginTop: 64,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const ref = React.useRef();
  const navigation = useNavigation();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <LinearGradient colors={['#303549', '#DBA84E']} style={styles.container}>
      <SafeAreaView>
        <View style={{height: 650}}>
          <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{height: height * 0.75}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={slides}
            pagingEnabled
            renderItem={({item}) => <Slide item={item} />}
          />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Auth');
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              lineHeight: 27.2,
              color: Colors.BROWN,
              fontFamily: Fonts.SORA_BOLD,
            }}>
            GET STARTED
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
      </SafeAreaView>
      <Image
        source={require('../assets/images/Pattern.png')}
        style={styles.launchImage}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: Fonts.SORA_REGULAR,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: Fonts.SORA_SEMI_BOLD,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 5,
    width: 5,
    backgroundColor: COLORS.white,
    marginHorizontal: 3,
    borderRadius: 16,
    marginBottom: 24,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  launchImage: {
    marginTop: 29,
    position: 'absolute',
    width: '100%',
    bottom: 5,
    zIndex: -1,
  },
});
export default OnboardingScreen;
