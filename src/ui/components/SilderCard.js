import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';

const SilderCard = ({selectedItem, onPress, item}) => {
  const bgColor = selectedItem === item.id ? colors.ORANGE : colors.WHITE;
  const txtColor = selectedItem === item.id ? colors.WHITE : colors.DARK;

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <Image source={item.image} style={styles.imageContainer} />
    </TouchableOpacity>
  );
};

export default SilderCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    paddingHorizontal: units.width / 75,
    borderWidth:0,
  },
  title: {
    fontSize: 11,
    fontWeight: '500',
    // marginTop: units.height / 74,
  },
  imageContainer: {
    borderRadius: 24,
    resizeMode: 'contain',
    marginTop: units.height / 170,
    minHeight: units.height / 14,
    minWidth: units.width / 7,
    height: units.height / 5,
    width: units.width / 2,
  },
});
