import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';

const CheckoutOrderSummary = (props) => {
  const { products, shippingTax, subtotal, total, children, ...other } = props;

  return (
    <Card
      variant="outlined"
      sx={{ p: 3 }}
      {...other}
    >
      <Typography
        color="textPrimary"
        variant="h6"
      >
        Order Summary
      </Typography>
      <List sx={{ mt: 2 }}>
        {products.map((product) => (
          <ListItem
            disableGutters
            key={product.id}
          >
            <ListItemAvatar sx={{ pr: 2 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  height: 100,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  width: 100,
                  '& img': {
                    width: '100%',
                    height: 'auto'
                  }
                }}
              >
                <img
                  alt={product.name}
                  src={product.image}
                />
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  sx={{ fontWeight: 'fontWeightBold' }}
                  variant="subtitle2"
                >
                  {product.name}
                </Typography>
              )}
              secondary={(
                <Typography
                  color="textSecondary"
                  sx={{ mt: 1 }}
                  variant="body1"
                >
                  $
                  {numeral(product.price).format('00.00')}
                </Typography>
              )}
            />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Subtotal
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          $
          {numeral(subtotal).format('00.00')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Shipping Tax
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          $
          {numeral(shippingTax).format('00.00')}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Total
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          $
          {numeral(total).format('00.00')}
        </Typography>
      </Box>
      {children}
    </Card>
  );
};

CheckoutOrderSummary.propTypes = {
  products: PropTypes.array,
  shippingTax: PropTypes.number,
  subtotal: PropTypes.number,
  total: PropTypes.number,
  children: PropTypes.any,
};

export default CheckoutOrderSummary;
