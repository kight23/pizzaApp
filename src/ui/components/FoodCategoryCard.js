import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';

const FoodCategoryCard = ({selectedItem, onPress, item}) => {
  const bgColor = selectedItem === item.id ? colors.ORANGE : colors.DARRWHITE;
  const txtColor = selectedItem === item.id ? colors.WHITE : colors.DARK;

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <Image source={item.image} style={styles.imageContainer} />
      <Text style={[styles.title, {color: txtColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default FoodCategoryCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: units.height / 100,
    paddingTop: units.height / 100,
    alignSelf: 'baseline',
    paddingHorizontal: units.width / 75,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: units.width / 50,
    marginVertical: units.height / 81,
    flexDirection: 'row',
  },
  title: {
    fontSize: 11,
    fontWeight: '500',
    alignSelf:'center'
  },
  imageContainer: {
    borderRadius: 100,
    // marginTop: units.height / 162,
    // minHeight: units.height / 14,
    // minWidth: units.width / 7,
    marginRight: units.width / 50,
    height: units.height / 20,
    width: units.width / 10,
  },
});
