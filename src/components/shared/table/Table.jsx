import React from 'react';

import {
  Table as ChakraTable,
  TableContainer,
} from '@chakra-ui/react';

import { TableWrapper } from './TableStyle';

const Table = (props) => {
  return (
    <TableWrapper>
      <TableContainer>
        <ChakraTable>
          {props.children}
        </ChakraTable>
      </TableContainer>
    </TableWrapper>
  );
}

export default Table