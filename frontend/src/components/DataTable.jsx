import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DataTable = ({ data }) => {

  return (
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
            <Th w="5%" py={1}>S.NO.</Th>
            <Th w="10%" py={1}>DATE</Th>
            <Th w="20%" py={1}>MACHINE <br /> NAME</Th>
            <Th w="10%" py={1}>ORDER <br /> ID</Th>
            <Th w="15%" py={1}>CUSTOMER <br /> NAME</Th>
            <Th w="15%" py={1}>CONTACT <br /> NUMBER</Th>
            <Th w="10%" py={1}>TOTAL <br /> AMOUNT</Th>
            <Th w="15%" py={1}>STATUS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order, index) => (
            <Tr key={order.order_id || index}>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {index + 1}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.date.split(" ")[0]} <br /> {order.date.split(" ")[1]}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.machine_name.split(" ")[0]} {order.machine_name.split(" ")[1]} <br />
                  {order.machine_name.split(" ")[2]} {order.machine_name.split(" ")[3]}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.order_id}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.customer_info.name}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.customer_info.contact_number}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.order_summary.total_amount.toFixed(2)}
                </Link>
              </Td>
              <Td py={1}>
                <Link to={`/order/${order.order_id}`}>
                  {order.order_summary.status}
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
