import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
} from 'react-native';
import React,{ useState } from 'react';
import {colors} from '../../themes/Colors';
import {units} from '../../themes/Units';
import {routes} from '../../navigation/routes';
import Loading from '../components/Loading';
import FoodCard from '../components/FoodCard';
import { foodData } from '../../database/FoodList';

const Food = ({navigation}) => {
  const [data,setData] = useState(foodData);
  const loading=false;
  const error='';
  // console.log('data', data)

  const onClickNavigateDetail = title => {
    navigation.navigate(routes.DETAILFOOD, {name: title});
  };

  const onClickFoodCard = id => {
    navigation.navigate(routes.DETAILFOOD, { id });
  };

  const renderFoodCard = ({item}) => (
    <FoodCard
      onPress={() => onClickFoodCard(item.id)}
      item={item}
    />
  );

  const listHeader = () => {
    return (
      <View style={styles.topContainer}>
        <View style={styles.tileContainer}>
          <Text style={styles.title}>All{'\n'}Food</Text>
          <Text style={styles.resultText}>{data.length} results</Text>
        </View>
        <Image
          source={require('../../assets/images/pizzaRes.png')}
          style={styles.image}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <FlatList
        data={data}
        renderItem={renderFoodCard}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  title: {
    fontSize: 33,
    fontWeight: '700',
    color: colors.ORANGE,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: units.width / 38,
  },
  image: {
    alignSelf: 'flex-end',
  },
  tileContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: units.width / 14,
  },
  resultText: {
    fontSize: 18,
    color: colors.GRAY,
    marginTop: units.height / 40,
  },
});
