import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../utils/Colors';
import CommonHeader from '../components/CommonHeader';
import Fonts from '../utils/Fonts';
import AddModal from '../components/AddModal';
import {useNavigation} from '@react-navigation/native';
import AddIcon from '../components/icons/AddIcon';
import PaymentCard from '../components/PaymentCard';
import {useDispatch, useSelector} from 'react-redux';
import {getBeneficiary} from '../store/slice/beneficiarySlice';

const BeneficiaryInformation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.userDetails);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const handleModal = isVisible => {
    setIsAddModalVisible(isVisible);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    const response = await dispatch(getBeneficiary({auth: loginData?.token}));
    console.log('PAYLOAD =====>', response.payload);
    setBeneficiaries(response.payload.data);
  };

  const initials = (firstname, lastname) => {
    const inital = firstname.charAt(0) + lastname.charAt(0);
    return inital.toUpperCase();
  };

  const beneficiaryListing = ({item}) => {
    return (
      <View key={item.beneficiary_id}>
        <PaymentCard
          image={initials(item.firstname, item.lastname)}
          name={`${item.firstname} ${item.lastname}`}
          time={`${item.address}, ${item.city}, ${
            item.state.charAt(0) + item.state.charAt(1).toUpperCase()
          }, ${item.country}`}
          bgColor={Colors.LIGHT_BLUE}
          showIcon
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Beneficiary Information'} navigation={navigation} />
      <SafeAreaView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>All Beneficiaries</Text>
          <TextInput style={styles.input} placeholder="Search Beneficiary" />
          <FlatList
            data={beneficiaries}
            keyExtractor={item => item.beneficiary_id}
            renderItem={item => beneficiaryListing(item)}
          />
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsAddModalVisible(true)}>
        <AddIcon color={Colors.GREEN} />
      </TouchableOpacity>

      <AddModal
        isAddModalVisible={isAddModalVisible}
        handleModal={handleModal}
        navigation={navigation}
      />
    </View>
  );
};

export default BeneficiaryInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  wrapper: {
    margin: 16,
  },
  input: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GREY,
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.SORA_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 25.6,
    color: Colors.BLACK,
    marginVertical: 16,
  },
  table: {
    width: '100%',
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: Colors.GREY,
  },
  tableHeaderText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.SECONDARY_GREY,
    paddingHorizontal: 24,
  },
  tableBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  tableRow: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
  },
  tableBodyText: {
    fontFamily: Fonts.SORA_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.BLACK,
    paddingHorizontal: 24,
  },
  iconContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 32,
    position: 'absolute',
    bottom: 64,
    right: 24,
  },
});
