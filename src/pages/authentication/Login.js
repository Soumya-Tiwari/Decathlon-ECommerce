import { Box, Card, CardContent, Container, Typography } from '@material-ui/core';
import {
  LoginJWT
} from '../../components/authentication/login';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { platform } = useAuth();

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ py: '80px' }}
        >
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Log in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Log in to experimental e-commerce platoform.
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                {platform === 'JWT' && <LoginJWT />}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
