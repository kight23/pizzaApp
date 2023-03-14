import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import OptionsIcon from '../../assets/svgs/options.svg';
import MenuCard from '../components/MenuCard';
import { colors } from '../../themes/Colors';
import { units } from '../../themes/Units';
import SearchInput from '../components/SearchInput';
import FoodCard from '../components/FoodCard';
import { categoryData } from '../../database/CategoryList';
import PopularFoodCard from '../components/PopularFoodCard';
import { routes } from '../../navigation/routes';
import { useDispatch } from 'react-redux';
import { logOutAccount } from '../../context/userSlice';
import HomeLoading from '../components/HomeLoading';
import { silderData } from '../../database/SliderList';
import SilderCard from '../components/SilderCard';
import { foodData } from '../../database/FoodList';
import FoodCategoryCard from '../components/FoodCategoryCard';

const Home = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState();
  const [foods, setFoods] = useState(foodData);
  const [selectedFoodItem, setSelectedFoodItem] = useState(foodData[0].id);
  const dispatch = useDispatch();
  const loading=false;
  const error='';
  const foodPopular = foods.filter((item) => item.rate > 4);
  const foodTopWeek = foods.filter((item) => item.sale_state > 1);
  
  const selectCategoryClick = (name,id) => {
    // console.log('name', name);
    if(selectedItem === id)
    {
      setSelectedItem();
    }
    else
    {
      setSelectedItem(id);
      setFoods(foodData.filter((item) => item.category === name));
    }
    
  };

  const onClickMenu = () => {
    dispatch(logOutAccount());
  };

  const onClickFoodCard = id => {
    console.log('id food', id)
    setSelectedFoodItem(id);
    navigation.navigate(routes.DETAILFOOD, { id });
  };

  const renderSilderCategory = ({ item }) => (
    <SilderCard
      item={item}
      selectedItem={selectedItem}
    />
  );

  const renderFoodCategory = ({ item }) => (
    <FoodCategoryCard
      item={item}
      onPress={() => selectCategoryClick(item.title, item.id)}
      selectedItem={selectedItem}
    />
  );

  const renderFood = ({ item }) => (
    <PopularFoodCard onPress={() => onClickFoodCard(item.id)} item={item} />
  );

  const onClickNavigateDetail = title => {
    navigation.navigate(routes.RESTAURANTDETAIL, { name: title });
  };

  const onClickViewAll = () => {
    navigation.jumpTo(routes.FOOD);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <HomeLoading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
        <View style={styles.topbar}>
            <MenuCard onPress={onClickMenu} />
            <View style={styles.image}>
              <Image
                source={require('../../assets/images/user.png')}
                style={styles.image}
              />
            </View>
          </View>
          <View>
            <Text style={styles.title}>What would you like to order</Text>
            <View style={styles.searchContainer}>
              <View style={{ flex: 1 }}>
                <SearchInput />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={silderData}
                renderItem={renderSilderCategory}
                horizontal
                style={styles.silder}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View
              style={[styles.cardContainer, { marginTop: units.height / 33 }]}>
              <Text style={styles.cardTitle}>Categories</Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                data={categoryData}
                renderItem={renderFoodCategory}
                horizontal
                style={styles.list}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {selectedItem ? (
                <View style={{ flex: 1 }}>
                <FlatList
                  data={foods}
                  renderItem={renderFood}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  style={{ marginTop: units.height / 34 }}
                />
              </View>
              
            ) : (
            <><View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>Popular Now</Text>
                  <TouchableOpacity onPress={onClickViewAll}>
                    <Text style={styles.viewButton}>View All {'>'} </Text>
                  </TouchableOpacity>
                </View><View style={{ flex: 1 }}>
                    <FlatList
                      data={foodPopular}
                      renderItem={renderFood}
                      keyExtractor={(_, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      numColumns={2}
                      style={{ marginTop: units.height / 34 }} />
                  </View><View
                    style={[styles.cardContainer, { marginTop: units.height / 33 }]}>
                    <Text style={styles.cardTitle}>Top of the week</Text>
                    <TouchableOpacity onPress={onClickViewAll}>
                      <Text style={styles.viewButton}>View All {'>'} </Text>
                    </TouchableOpacity>
                  </View><View style={{ flex: 1 }}>
                    <FlatList
                      data={foodTopWeek}
                      renderItem={renderFood}
                      keyExtractor={(_, index) => index.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.listContainer} />
                  </View></>)
            }
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    borderRadius: 12,
    shadowColor: 'yellow',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal: units.width / 14,
    marginTop: units.height / 30,
    marginBottom: units.height / 101,
  },
  title: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.DARK,
    marginTop: units.height / 30,
  },
  optionsContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 14,
    paddingHorizontal: units.width / 23,
    paddingVertical: units.height / 50,
    shadowColor: colors.DARK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: units.width / 21,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: units.height / 45,
  },
  silder: {
    backgroundColor: colors.WHITE,
    marginTop: units.height / 40,
  },
  list: {
    backgroundColor: colors.WHITE,
    marginTop: units.height / 40,
  },
  cardContainer: {
    marginTop: units.height / 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.DARK,
  },
  viewButton: {
    color: colors.ORANGE,
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: units.height / 50,
  },
});
