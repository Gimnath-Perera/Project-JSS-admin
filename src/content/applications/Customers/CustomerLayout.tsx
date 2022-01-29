import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { Card } from '@mui/material';
import CustomerTable from './CustomerTable';

import { fetchCustomerList } from '../../../store/actions/customer.actions';

function RecentOrders() {
  const dispatch = useDispatch();
  const customerList = useSelector(
    ({ customer }: RootStateOrAny) => customer.list
  );
  useEffect(() => {
    dispatch(fetchCustomerList());
  }, []);

  return (
    <>
      {customerList?.length > 0 ? (
        <Card>
          <CustomerTable customers={customerList} />
        </Card>
      ) : (
        <Box
          sx={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={64} disableShrink thickness={3} />
        </Box>
      )}
    </>
  );
}

export default RecentOrders;
