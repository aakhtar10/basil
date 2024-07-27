import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { VscGithubProject } from "react-icons/vsc";
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination'; // Import Pagination

import db from '../../db.json'; // Assuming db.json is at this path
import Filter from '../components/Filter';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db || []);
  }, []);

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle change in page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
  };

  return (
    <div>
      <Flex justifyContent="space-between" p="4" align="center">
        <InputGroup w={{ base: 'full', md: 'auto' }} display={{ base: 'none', md: 'flex' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search" variant="filled" type='search' />
        </InputGroup>
        <Box display="flex" gap={5}>
          <HiOutlineDocumentChartBar size="36px" />
          <VscGithubProject size="36px" />
        </Box>
      </Flex>
       <Flex gap={2}>
       <DataTable data={currentItems} />
       <Filter />
       </Flex>
      

      <Flex justifyContent="space-between" mt={3} p={4}>
        <Text>
          Showing {(indexOfFirstItem + 1)}-{(indexOfLastItem > data.length ? data.length : indexOfLastItem)} of {data.length} entries
        </Text>
        <Flex alignItems="center" gap={2}>
          <Text mr={2} flexShrink={0}>Rows per page</Text>
          <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Select>
        </Flex>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </Flex>
    </div>
  );
};

export default Dashboard;
