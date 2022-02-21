import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { CheckoutOrderSummary } from '../../components/checkout';
import ArrowRightIcon from '../../icons/ArrowRight';
import LockIcon from '../../icons/Lock';
import ProductList from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { checkout } from '../../slices/cart';
import { useNavigate } from 'react-router';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart = {} } = useSelector((state) => state.cart);
  const [products, setProducts] = useState(Object.keys(cart).map((el) => cart[el]));

  const handleCheckout = () => {
    dispatch(checkout());
    setTimeout(() => navigate('/'), 1000);
  };

  useEffect(() => {
    setProducts(Object.keys(cart).map((el) => cart[el]));
  }, [cart]);

  const handleProductQuantityChange = (event, productId) => {
    setProducts((prevProducts) => prevProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: event.target.value
        };
      }

      return product;
    }));
  };

  const subtotal = products
    .reduce((accumulator, product) => accumulator + product.price * product.cartQty, 0);
  const shippingTax = 10;
  const total = subtotal + shippingTax;

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box>
            <Grid
              container
              spacing={6}
            >
              <Grid
                item
                lg={8}
                md={7}
                xs={12}
              >
                <ProductList products={products} />
              </Grid>
              <Grid
                item
                lg={4}
                md={5}
                xs={12}
              >
                {products?.length ? (
                  <CheckoutOrderSummary
                    onQuantityChange={handleProductQuantityChange}
                    products={products}
                    shippingTax={shippingTax}
                    subtotal={subtotal}
                    total={total}
                  >
                    <Box sx={{ mt: 6, textAlign: 'right' }}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <LockIcon
                          fontWeight="small"
                          sx={{ color: 'text.secondary' }}
                        />
                        <Typography
                          color="textPrimary"
                          sx={{ ml: 2 }}
                          variant="subtitle2"
                        >
                          Secure Checkout
                        </Typography>
                      </Box>
                      <Button
                        color="primary"
                        endIcon={<ArrowRightIcon fontSize="small" />}
                        size="large"
                        onClick={handleCheckout}
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="contained"
                      >
                        Complete order
                      </Button>
                    </Box>
                  </CheckoutOrderSummary>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Checkout;
