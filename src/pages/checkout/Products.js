import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { ProductListTable } from '../../components/checkout/product';

const ProductList = ({
  products = []
}) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 3
    }}
  >
    <Container maxWidth="xl">
      {products?.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color="primary"
            component={RouterLink}
            startIcon={<ArrowLeftIcon fontSize="small" />}
            to="/dashboard/products"
            variant="text"
          >
            Back to Products
          </Button>
          <Typography variant="h5">
            Cart Details
          </Typography>
        </Box>
      ) : null}

      {products?.length ? (
        <Box sx={{ mt: 3 }}>
          <hr />
          <ProductListTable products={products} />
        </Box>
      ) : (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <h1>The cart is empty</h1>
          <Button
            color="primary"
            component={RouterLink}
            to="/dashboard/products"
            variant="text"
          >
            Click here to Go Shopping
          </Button>
        </Box>
      )}
    </Container>
  </Box>
);

ProductList.propTypes = {
  products: PropTypes.func
};

export default ProductList;
