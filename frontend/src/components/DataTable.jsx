import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import db from '../../db.json'; // Ensure the path to db.json is correct

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db); // Assuming db is the array of orders
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.NO.</Th>
            <Th>DATE</Th>
            <Th>ORDER ID</Th>
            <Th>CUSTOMER NAME</Th>
            <Th>CONTACT NUMBER</Th>
            <Th>TOTAL AMOUNT</Th>
            <Th>STATUS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order, index) => (
            <Tr key={order.order_id}>
              <Td>{index + 1}</Td>
              <Td>{order.date}</Td>
              <Td>{order.order_id}</Td>
              <Td>{order.customer_info.name}</Td>
              <Td>{order.customer_info.contact_number}</Td>
              <Td>{order.order_summary.total_amount.toFixed(2)}</Td>
              <Td>{order.order_summary.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
