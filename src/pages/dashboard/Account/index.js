import { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import {
  AccountGeneralSettings,
} from '../../../components/dashboard/account';

const tabs = [
  { label: 'General', value: 'general' }
];

const Account = () => {
  const [currentTab, setCurrentTab] = useState('general');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">
            Account Details
          </Typography>
          <hr />
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'general' && <AccountGeneralSettings />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
