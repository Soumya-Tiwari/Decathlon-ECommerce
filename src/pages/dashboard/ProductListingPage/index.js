import { useEffect } from 'react';
import ProductTile from './ProudctTile';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { addProduct, fetchProducts } from '../../../slices/cart';
import useMounted from '../../../hooks/useMounted';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProductList = () => {
  const dispatch = useDispatch();
  const mounted = useMounted;
  // eslint-disable-next-line no-unused-vars
  const { products } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [mounted]);

  const handleAddToCart = (id) => {
    dispatch(addProduct(id));
    toast.success((t) => (
      <span>
        Product
        {' '}
        <b>{products[id]?.name}</b>
        {' '}
        has been successfully added to the cart.
        <Button onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </Button>
      </span>
    ));
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h5">
            Miscellaneous Products
          </Typography>
        </Box>
        <hr />
        <Box sx={{ mt: 3, justifyContent: 'center' }}>
          <ProductTile
            products={products}
            handleAddToCart={handleAddToCart}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
