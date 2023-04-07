import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {units} from '../../themes/Units';
import {colors} from '../../themes/Colors';
import IconTimes from '../../assets/svgs/times.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BasketCard = ({item, onIncrease, onDecrease}) => {
  const [quantity, setQuantity] = useState(item.count);
  const {name, price, image} = item;

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onIncrease(newQuantity, price); // Gọi hàm được truyền từ component Basket để cập nhật lại giá trị của SubTotal
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onDecrease(quantity - 1,price);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        borderRadius={20}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity>
            <IconTimes />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
          {(parseFloat(item.price) * quantity).toFixed(2)} $
          </Text>
          
          <View style={styles.countContainer}>
            <TouchableOpacity onPress={handleDecrease}>
              <Icon
                name="minus-circle-outline"
                color={colors.ORANGE}
                size={30}
              />
            </TouchableOpacity>

            <Text style={styles.countText}>{quantity}</Text>

            <TouchableOpacity onPress={handleIncrease}>
              <Icon name="plus-circle" size={30} color={colors.ORANGE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BasketCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: units.width / 47,
    paddingVertical: units.height / 81,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.LIGHTGREY,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    marginHorizontal: units.width / 17,
    marginVertical: units.height / 150,
  },
  title: {
    fontSize: 16,
    color: colors.DARK,
    fontWeight: '600',
  },
  bodyContainer: {
    marginLeft: units.width / 17,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    marginTop: units.height / 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.DARK,
    marginHorizontal: units.width / 41,
  },
  image: {
    // minHeight: units.height / 10,
    // minWidth: units.width / 4.5,
    height: units.height / 10,
    width: units.width / 4.2,
    alignSelf: 'center',
  },
});
