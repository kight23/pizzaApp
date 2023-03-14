import { useState } from 'react';
import qs from 'qs';
import { api } from '../../hooks/useApi';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket } from '../../context/userSlice';


const payBasketApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const basketFoods = useSelector(
    selector => selector.user.basketFood,
  );
  const user = useSelector(
    selector => selector.user.user,
  );

  const payClearBasket = async navigateOrder => {
    // console.log('payClearBasket', navigateOrder)
    setLoading(true);
    try {
      dispatch(clearBasket({ user: user }));
      setData(basketFoods);
      setLoading(false);
      navigateOrder();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { loading, error, payClearBasket };
};

export default payBasketApi;
