import { useState } from 'react';
import qs from 'qs';
import { api } from '../../hooks/useApi';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket } from '../../context/userSlice';

const addBasketApi = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [deliveryPrice, setDeliveryprice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(deliveryPrice + subTotal);
  const [subTotal, setSubTotal] = useState();
  const dispatch = useDispatch();

  const user = useSelector(
    selector => selector.user.user,
  );

  const addBagProductApi = async (product, goBasket) => {
    setLoading(true);
    // console.log('product', product)
    try {
      const params = {
        user: user,
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        count: product.count,
        image_two: '',
        image_three: '',
        sale_state: '',
      };
      dispatch(addBasket({ product: params }));
      //goBasket();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { data, loading, error, addBagProductApi };
};

export default addBasketApi;
