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
import Pagination from '../components/Pagination';
import db from '../../db.json';
import Filter from '../components/Filter';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setData(db || []);
    setFilteredData(db || []); // 
  }, []);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const searchFilteredData = data.filter(order =>
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_info.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_info.contact_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.machine_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(searchFilteredData);
  }, [searchQuery, data]);

  const applyFilter = (filteredData) => {
    setFilteredData(filteredData);
    setCurrentPage(1); 
  };

  return (
    <div>
      <Flex justifyContent="space-between" p="4" align="center">
        <InputGroup w={{ base: 'full', md: 'auto' }} display={{ base: 'none', md: 'flex' }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search by Order ID, Customer Name, or Number"
            variant="filled"
            type='search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Box display="flex" gap={5}>
          <HiOutlineDocumentChartBar size="36px" />
          <VscGithubProject size="36px" />
        </Box>
      </Flex>
      <Flex gap={2}>
        <DataTable data={currentItems} />
        <Filter data={data} applyFilter={applyFilter} />
      </Flex>

      <Flex justifyContent="space-between" mt={3} p={4}>
        <Text>
          Showing {(indexOfFirstItem + 1)}-{(indexOfLastItem > filteredData.length ? filteredData.length : indexOfLastItem)} of {filteredData.length} entries
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
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </Flex>
    </div>
  );
};

export default Dashboard;
