import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
  Text,
} from '@chakra-ui/react';

const OrderDetailEach = ({ order }) => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (order && order.order_details) {
      setOrderDetails(order.order_details);
    }
  }, [order]);

  return (
    <div>
      <Box
        p={'20px'}
        w={'805px'}
        h={'416px'}
        border={'1px'}
        borderColor={'gray.200'}
        borderRadius={'10px'}
        mt={'10px'}
      >
        <Heading
          fontSize={'14px'}
          lineHeight={'14px'}
          fontWeight={'500'}
          fontFamily={'dm-sans'}
          mb={'10px'}
          color={'#5D6679'}
        >
          ORDER DETAILS
        </Heading>

        <TableContainer
          boxShadow="rgba(0, 0, 0, 0.1) 0px 5px 15px"
          overflowX="hidden"
          p="20px"
          fontSize="12px"
          w="100%"
          maxW="910px"
        >
          <Table variant="simple">
            <Thead fontSize="12px">
              <Tr>
                <Th>Item ID</Th>
                <Th>Drink Name</Th>
                <Th>Customization</Th>
                <Th>Amount</Th>
                <Th>Drink Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderDetails.map((detail, index) => (
                <Tr key={detail.item_id || index}>
                  <Td>{detail.item_id}</Td>
                  <Td>{detail.drink_name}</Td>
                  <Td>{detail.customisation}</Td>
                  <Td>{detail.amount}</Td>
                  <Td>{detail.drink_status}</Td>
                  <Td>{detail.action}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrderDetailEach;
