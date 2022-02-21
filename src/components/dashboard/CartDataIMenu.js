import {
  Badge,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import BellIcon from '../../icons/ShoppingCart';

import ShoppingCartIcon from '../../icons/ShoppingCart';

const CartDataMenu = () => {
  const { cart = {} } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const totalQty = Object.keys(cart).map((el) => cart[el].cartQty).reduce((acc, next) => acc + next, 0);

  return (
    <>
      <Tooltip title="Go To Cart">
        <IconButton
          color="inherit"
          onClick={() => navigate('/checkout')}
        >
          <Badge
            color="error"
            badgeContent={totalQty}
          >
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CartDataMenu;
