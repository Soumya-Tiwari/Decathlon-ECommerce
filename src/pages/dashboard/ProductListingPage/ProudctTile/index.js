/* eslint-disable react/prop-types */
import { Box, Button, Container, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const ProductTile = ({
  product = {},
  handleAddToCart
}) => (
  <Box>
    {product.isAvailable ? null : (
      <Box sx={{ position: 'absolute', height: '510px', width: 350, background: product.isAvailable ? 'inherit' : 'black', zIndex: 999, opacity: 0.5, borderRadius: 2 }}>
        <Box sx={{ color: 'background.default', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
          Product Not Available
        </Box>
      </Box>
    )}
    <Box
      sx={{
        position: 'relative',
        padding: 1,
        mb: 4,
        flex: '1 1 160px',
        border: product?.isAvailable ? '1px solid #ccc' : 'none',
        flexGrow: 2,
        display: 'flex',
        justifyContent: 'space-around',
        '&:hover': {
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
          borderRadius: '8px',
          '& button': {
            display: 'block',
            transition: 'translate .15s ease-in',
          },
          '& img': {
            transform: 'scale(1.1)',
            transition: 'all .15s ease-in-out',
          }
        }
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
          display: 'inline-block',
        }}
      >
        <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
          <Box
            alt="Under development"
            component="img"
            src={product.image || ''}
            sx={{
              width: '280px',
              height: '300px',
              borderRadius: '10px'
            }}
          />
          <Typography variant="h6" sx={{ pt: 2 }}>
            {product.name}
          </Typography>

          <Typography variant="span" sx={{ fontWeight: 'bold' }}>
            {product.currency}
            {' '}
            {product.price}
          </Typography>

          <Typography component="section" sx={{ fontWeight: 'bold' }}>
            In Stock :
            {' '}
            {product.isAvailable ? 'Yes' : 'No'}
          </Typography>

          <Typography component="section" sx={{ pb: 2 }}>
            Material :
            {' '}
            {product.attributes && product.attributes[0]}
          </Typography>

          {product.isAvailable && (
            <Button
              onClick={() => handleAddToCart(product.id)}
              sx={{
                background: '#EAAE2C',
                color: '#fff',
                fs: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '16px 40px',
                fontWeight: '800',
                transition: 'all .15s ease-in',
                position: 'absolute',
                transform: 'translate(50px, 10px)',
                display: 'block',
                '&:hover': {
                  background: 'white',
                  color: 'black',
                  border: '1px solid black'
                }
              }}
            >
              Add To Cart
            </Button>
          )}
        </Container>
      </Box>
    </Box>
  </Box>
);

const ProductsWrapper = ({
  products = [],
  handleAddToCart = () => {}
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', pt: 2 }}>
    {products.map((product) => (
      <ProductTile
        product={product}
        handleAddToCart={handleAddToCart}
      />
    ))}
  </Box>
);

ProductsWrapper.propTypes = {
  products: PropTypes.array,
  handleAddToCart: PropTypes.func
};

export default ProductsWrapper;
