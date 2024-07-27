import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  Image,
  TableContainer,
  Select,
  Icon,
  HStack,
  useDisclosure
} from '@chakra-ui/react';
import { CheckCircleIcon, TimeIcon, RepeatIcon, NotAllowedIcon } from '@chakra-ui/icons';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import db from '../../db.json';
import Pagination from './Pagination';

const Filter = ({ applyFilter }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const statuses = [
    { label: "Successful", icon: CheckCircleIcon },
    { label: "Pending", icon: TimeIcon },
    { label: "Sent", icon: RepeatIcon },
    { label: "Failure", icon: NotAllowedIcon },
    { label: "Refund Initiated", icon: RepeatIcon },
    { label: "Refund Completed", icon: CheckCircleIcon }
  ];

  useEffect(() => {
    setData(db || []);
    setFilteredData(db || []);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  
  const filterData = () => {
    const filtered = data.filter(order => {
      const matchesSearch =
        order.machine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_info.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(order.order_summary.status);

      const orderDate = new Date(order.date);
      const matchesDateRange =
        orderDate >= state[0].startDate && orderDate <= state[0].endDate;

      return matchesSearch && matchesStatus && matchesDateRange;
    });

    setFilteredData(filtered);
    applyFilter(filtered); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(s => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleApplyFilters = () => {
    filterData();
    onClose();
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Box boxShadow={"lg"} h={"427px"} w={"320px"}>
        <Heading size="100px" fontWeight="semibold" color="gray.600" mt="10" ml="10" align="center">FILTERS</Heading>
        <Button onClick={onOpen} border={"1px"} borderColor={"#ADB5BD"} mt="10" ml="10" bg={"white"} color={"gray.600"}>
          Select Filters
        </Button>
      </Box>

      {/* Modal */}
      <Modal size={"4xl"} scrollBehavior={"outside"} onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>FILTER</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Input
              borderRadius={12}
              type='search'
              placeholder='Search'
              border={"1px"}
              borderColor={"#ADB5BD"}
              h={"40px"}
              w={"800px"}
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <Box mt={"20px"} h={"860px"} w={"800px"} borderRadius={"24px"} padding={"32px 0px 32px 0px"} border={"1px"} borderColor={"#ADB5BD"}>
              <Flex justifyContent={"space-between"} padding={"0px 16px 0px 16px"}>
                <Text ml={"16px"} fontWeight={"semibold"} color={"gray.600"}>Machines </Text>
                <Text ml={"16px"} fontWeight={"semibold"} color={"gray.600"}>Clear All</Text>
              </Flex>
              <Input
                mt={"16px"}
                borderRadius={12}
                type='search'
                placeholder='Search'
                border={"1px"}
                borderColor={"#ADB5BD"}
                ml={"16px"}
                gap={"16px"}
                h={"36px"}
                w={"673px"}
              />

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
                      <Th><input type='checkbox' /></Th>
                      <Th>MACHINE NAME</Th>
                      <Th>ADDRESS</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentItems.map((order, index) => (
                      <Tr key={order.order_id || index}>
                        <Td><input type='checkbox' /></Td>
                        <Td display={"flex"} gap={2} py={1}>
                          <Image
                            borderRadius={"48%"}
                            w={"50px"}
                            src={"https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?cs=srgb&dl=pexels-apasaric-2872755.jpg&fm=jpg"}
                          />
                          {order.machine_name}
                        </Td>
                        <Td>{order.customer_info.address}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex justifyContent="space-between" mt={3} p={4}>
                <Text>
                  Showing {(indexOfFirstItem + 1)}-{(indexOfLastItem > filteredData.length ? filteredData.length : indexOfLastItem)} of {filteredData.length} entries
                </Text>
                <Flex alignItems="center" gap={2}>
                  <Text mr={2} flexShrink={0}>Rows per page</Text>
                  <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </Select>
                </Flex>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </Flex>
            </Box>

            <Box mt={"20px"} ml={"16px"} display={"flex"} flexDirection={"column"} alignItems={"start"} w={"800px"}>
              <Text fontWeight={"semibold"} color={"gray.600"} mt={"20px"} mb={"20px"}>Status</Text>
              <HStack spacing={4} align="stretch">
                {statuses.map((status, index) => (
                  <Box
                    key={index}
                    display="flex"
                    gap={5}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    alignItems="start"
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    width="100%"
                    bg={selectedStatus.includes(status.label) ? "blue.100" : "white"}
                    cursor="pointer"
                    onClick={() => handleStatusChange(status.label)}
                  >
                    <Icon as={status.icon} boxSize={6} mr={4} />
                    <Text>{status.label}</Text>
                  </Box>
                ))}
              </HStack>
            </Box>

            <Box mt={"20px"} ml={"16px"} display={"flex"} flexDirection={"column"} alignItems={"start"} w={"800px"}>
              <Text fontWeight={"semibold"} color={"gray.600"} mt={"20px"} mb={"20px"}>Date Range</Text>
              <Box padding={4}>
                <DateRangePicker
                  onChange={item => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter padding={4} justifyContent={"space-between"}>
            <Button
              variant='ghost'
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus([]);
                setState([
                  {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 7),
                    key: 'selection'
                  }
                ]);
                setFilteredData(data); // Reset filter to original data
              }}
            >
              Clear All
            </Button>
            <Button w={"120px"} h={"40px"} colorScheme='blue' mr={3} onClick={handleApplyFilters}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Filter;
