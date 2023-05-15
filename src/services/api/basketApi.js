import { useEffect, useState } from 'react';
import { api } from '../../hooks/useApi';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { getBasket, increaseFoodBasket, removeBasket } from '../../context/userSlice';

const basketApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryPrice, setDeliveryprice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(deliveryPrice + subTotal);
  const [subTotal, setSubTotal] = useState();
  const dispatch = useDispatch();
  const basketFoods = useSelector(
    selector => selector.user.basketFood,
  );
  const user = useSelector(
    selector => selector.user.user,
  );
  const getBasketDataApi = async () => {
    try {
      setData(basketFoods.filter(item => item.user === user));
      calculateTotalPrice(basketFoods);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const removeFoodBasket = id => {
    try {
      //setData(basketFoods.filter(item => item.id !== id));
      dispatch(removeBasket({ id: id }));
      calculateTotalPrice(basketFoods);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    // console.log('basketFoods1', basketFoods);
  };

  const increaseFoodCount = id => {
    try {
      dispatch(increaseFoodBasket({ id: id, user: user }));
      calculateTotalPrice(basketFoods);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const calculateTotalPrice = basketData => {
    if (basketData.length != 0) {
      let total = 0;
      basketData.forEach(item => {
        total += parseFloat(item.price) * item.count;
      });
      setSubTotal(total.toFixed(2));
      setTotalPrice((total + 5.99).toFixed(2));
      setDeliveryprice(5.99);
    } else {
      setSubTotal(0);
      setDeliveryprice(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    setTotalPrice((parseFloat(subTotal) + deliveryPrice).toFixed(2));
  }, [subTotal, deliveryPrice]);

  return {
    data,
    loading,
    error,
    getBasketDataApi,
    totalPrice,
    subTotal,
    deliveryPrice,
    removeFoodBasket,
    increaseFoodCount,
  };
};

export default basketApi;
