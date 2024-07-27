import { Box, Button } from '@chakra-ui/react';
import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleFirstPage = () => onPageChange(1);
    const handlePreviousPage = () => onPageChange(Math.max(1, currentPage - 1));
    const handleNextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));
    const handleLastPage = () => onPageChange(totalPages);
  return (
    <div>
<Box>
      <Button onClick={handleFirstPage}>&laquo;</Button>
      <Button onClick={handlePreviousPage}>&lsaquo;</Button>
      <span>{currentPage}</span>
      <Button onClick={handleNextPage}>&rsaquo;</Button>
      <Button onClick={handleLastPage}>&raquo;</Button>
    </Box>
    </div>
  )
}

export default Pagination