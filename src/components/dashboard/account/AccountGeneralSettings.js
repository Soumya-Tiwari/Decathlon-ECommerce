import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import wait from '../../../utils/wait';

const AccountGeneralSettings = (props) => {
  const { user } = useAuth();

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 250,
                    width: 250
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={{
            email: user.email || '',
            name: user.name || '',
            phone: user.phone || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              canHire: Yup.bool(),
              city: Yup.string().max(255),
              country: Yup.string().max(255),
              email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              isPublic: Yup.bool(),
              name: Yup
                .string()
                .max(255)
                .required('Name is required'),
              phone: Yup.string(),
              state: Yup.string()
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              // NOTE: Make API request
              await wait(200);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              toast.success('Profile updated!');
            } catch (err) {
              console.error(err);
              toast.error('Something went wrong!');
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Profile" />
                <Divider />
                <CardContent sx={{ p: '52px' }}>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        disabled
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email
                          ? errors.email
                          : 'We will use this email to contact you'}
                        label="Email Address"
                        name="email"
                        disabled
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        disabled
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
                <Divider />
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
