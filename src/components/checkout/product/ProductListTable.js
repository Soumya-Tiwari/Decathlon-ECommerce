import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ImageIcon from '../../../icons/Image';
import Scrollbar from '../../Scrollbar';
import { useDispatch } from 'react-redux';
import { deletePerProduct, dncrementPerProductCartQty, incrementPerProductCartQty } from '../../../slices/cart';
import toast from 'react-hot-toast';

const applyPagination = (products, page, limit) => products
  .slice(page * limit, page * limit + limit);

const ProductListTable = (props) => {
  const dispatch = useDispatch();
  const { products, ...other } = props;
  const [copyProducts, setCopyProducts] = useState(products);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setCopyProducts(products);
  }, [products]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleIncrementProduct = (id, name) => {
    dispatch(incrementPerProductCartQty(id, name));
  };

  const handleDecrementProduct = (id, name) => {
    dispatch(dncrementPerProductCartQty(id, name));
  };

  const handleProductDelete = (id) => {
    try {
      dispatch(deletePerProduct(id));
      toast.success('Proudct is successfully delete and cart is updated');
    } catch (err) {
      toast.error('Error deleting the product');
    }
  };

  // Usually query is done on backend with indexing solutions
  const paginatedProducts = applyPagination(copyProducts, page, limit);

  return (
    <Card {...other}>
      <Scrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => {
                const isProductSelected = copyProducts.includes(product.id);

                return (
                  <TableRow
                    hover
                    key={product.id}
                    selected={isProductSelected}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        {product.image
                          ? (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                display: 'flex',
                                height: 100,
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: 100,
                                '& img': {
                                  height: 'auto',
                                  width: '100%'
                                }
                              }}
                            >
                              <img
                                alt="Product"
                                src={product.image}
                              />
                            </Box>
                          )
                          : (
                            <Box
                              sx={{
                                alignItems: 'center',
                                backgroundColor: 'background.default',
                                display: 'flex',
                                height: 100,
                                justifyContent: 'center',
                                width: 100
                              }}
                            >
                              <ImageIcon fontSize="small" />
                            </Box>
                          )}
                        <Link
                          color="textPrimary"
                          component={RouterLink}
                          to="#"
                          underline="none"
                          sx={{ ml: 2 }}
                          variant="subtitle2"
                        >
                          {product.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 4
                    }}
                    >
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: '30px'
                        }}
                        onClick={() => handleDecrementProduct(product.id, product.name)}
                      >
                        -
                      </Typography>
                      <TextField
                        autoFocus
                        margin="normal"
                        name="quantity"
                        disabled
                        onBlur={() => { }}
                        onChange={() => { }}
                        type="text"
                        variant="outlined"
                        value={product?.cartQty}
                        sx={{
                          width: '60px',
                          ml: 2,
                          mr: 2,
                          '& input': {
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }
                        }}
                      />
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: '30px'
                        }}
                        onClick={() => handleIncrementProduct(product.id, product.id)}
                      >
                        +
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Delete onClick={() => handleProductDelete(product.id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={copyProducts.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Scrollbar>
    </Card>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductListTable;
