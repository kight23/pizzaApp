import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from '../../themes/Colors';
import { units } from '../../themes/Units';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PopularFoodCard = ({ onPress, item }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={item.image}
          style={styles.image}
          borderRadius={24}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price} $</Text>
            {/* <TouchableOpacity>
              <Icon name="plus-circle" size={28} color={colors.WHITE} />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PopularFoodCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
    marginVertical: units.height / 101,
    marginHorizontal: units.width / 47,
    flex: 1,
  },
  image: {
    height: units.height / 6,
    width: units.width / 3,
    alignSelf: 'center',
    marginVertical: units.height / 162,
  },
  title: {
    color: colors.DARK,
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
  },
  titleContainer: {
    marginHorizontal: units.width / 31,
    marginBottom: units.width / 67,
    alignSelf: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.DARK,
  },
  priceContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginTop: units.height / 101,
    justifyContent: 'space-between',
  },
});
