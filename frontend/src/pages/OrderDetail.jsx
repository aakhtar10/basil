// OrderDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import db from '../../db.json';
import { Box, Flex, Heading,Text } from '@chakra-ui/react';
import OrderDetailEach from '../components/OrderDetailEach';

const OrderDetail = () => {
  const { id } = useParams();
  const order = db.find(o => o.order_id === id);

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
   <>
   <Flex w={'100%'} h={'100vh'} justifyContent={'space-between'} alignItems={"flex-start"}>
    <Box w={"395px"} h={"550px"} border={'1px'} borderColor={'gray.200'} p={'20px'} mt={'10px'} borderRadius={'10px'}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading fontSize={'20px'} fontWeight={'bold'} mb={'10px'} color={'#377DFF'}>{order.order_id}</Heading>

<Text border={'1px'} borderColor={'gray.200'} p={'5px 15px 5px 15px'} borderRadius={'10px'} color={'#377DFF'}> {order.order_summary.status}</Text>
        </Flex>

        <Heading fontSize={'12px'} fontWeight={'semibold'} mt={'20px'} color={"gray.500"} >BASIC INFORMATION</Heading>

        <Flex alignItems={'center'} justifyContent={'space-between'} mt={'20px'}>
            <Box>
            <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Date and Time</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'}  >{order.date}</Text>
            </Box>
          <Box>
          <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Machine</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'} >{order.machine_name}</Text>
          </Box> 
        </Flex>
  
        <Heading fontSize={'12px'} fontWeight={'semibold'} mt={'20px'} color={"gray.500"} > ORDER SUMMARY</Heading>

        <Flex alignItems={'center'} justifyContent={'space-between'} mt={'20px'}>
            <Box>
            <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Paymnet ID</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'}  >{order.date}</Text>
            </Box>
          <Box>
          <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Total Amount</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'} >{`₹${order.order_summary.total_amount}`}</Text>
          </Box> 
        </Flex>

        <Heading fontSize={'12px'} fontWeight={'semibold'} mt={'20px'} color={"gray.500"} > CUSTOMER INFORMATION</Heading>

        <Flex alignItems={'center'} justifyContent={'space-between'} mt={'20px'}>
            <Box>
            <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Name</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'}  >{order.customer_info.name}</Text>
            </Box>
          <Box>
          <Text fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Contact Number</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'} >{`₹${order.customer_info.contact_number}`}</Text>
          </Box> 
         
        </Flex>
        <Box>
          <Text mt={'20px'} fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Email</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'} >{order.customer_info.email}</Text>
          </Box>

          <Heading fontSize={'12px'} fontWeight={'semibold'} mt={'20px'} color={"gray.500"} > REFUND INFORMATION</Heading>

          <Box>
          <Text mt={'20px'} fontSize={'12px'} fontWeight={'semibold'} color={"gray.500"} >Refund Transaction ID</Text>
            <Text fontSize={'12px'} fontWeight={'semibold'} mt={'5px'} >{order.order_summary.refund_info.refund_transaction_id===''?'NA':order.order_summary.refund_info.refund_transaction_id}</Text>
          </Box>
    </Box>
    <OrderDetailEach order={order}/>
   </Flex>
   </>
  );
};

export default OrderDetail;
