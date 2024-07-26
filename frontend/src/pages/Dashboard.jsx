import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { VscGithubProject } from "react-icons/vsc";
import DataTable from '../components/DataTable';


const Dashboard = () => {
  return (
    <div>
        <Flex justifyContent="space-between" p="4" align={"center"}>
        <InputGroup w={{ base: 'full', md: 'auto' }} display={{ base: 'none', md: 'flex' }}>
  <InputLeftElement pointerEvents="none">
    <FiSearch color="gray.300" />
  </InputLeftElement>
  <Input placeholder="Search" variant="filled" type='search' />
</InputGroup> 
<Box display={"flex"} gap={5}>
<HiOutlineDocumentChartBar p={10} size={"36px"} />
<VscGithubProject p={10} size={"36px"} />
</Box>
        </Flex>

        <DataTable/>
       
    </div>
  )
}

export default Dashboard