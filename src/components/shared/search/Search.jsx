import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuList, Button, Box, Input, FormControl, Text, MenuItem, Flex } from '@chakra-ui/react';
import * as FaIcons from "react-icons/fa";

import Pagination from '../pagination/Pagination';

import { SearchWrapper } from './SearchStyle';
import theme from '../../global/theme';
// import { governorates } from '../../../utilities/places';

const Search = ({
  allowSearch = true,
  allowPagination = true,
  page,
  size = 10,
  data = [],
  itemsCount,
  handleChangePage,
  handleChangeQuery,
  handleSelected,
  prop,
  subProp,
  currentElement,
  bg = theme.body,
  color = theme.dark,
  borderRadius = 2,
  textAlign = "start"
}) => {
  const { t } = useTranslation();

  const inputSearchRef = useRef();

  return (
    <SearchWrapper>
      <Menu matchWidth={true} closeOnSelect={true}>
        <MenuButton
          as={Button} width="100%" borderRadius={borderRadius} textAlign={textAlign}
          _hover={{ bg: bg }} bg={bg}
        >
          <Text as="span" color={color}>
            <span>{(currentElement && currentElement[prop]) || t('general.select')}</span>
          </Text>
        </MenuButton>
        <MenuList
          maxH="200px" overflowY="auto" maxW="270px" padding={4} zIndex={684} bg={theme.body}
          borderRadius={2}
        >
          <React.Fragment>

            {allowSearch && (
              <Flex>
                <FormControl>
                  <Input ref={inputSearchRef}
                    placeholder={t('general.search')}
                    marginBottom={4}
                  />
                </FormControl>
                <Button
                  type="button" bg={theme.primary} color={theme.light}
                  ms={2} borderRadius={2}
                  onClick={() => {
                    handleChangeQuery(inputSearchRef.current.value);
                  }}
                >
                  <FaIcons.FaSearch />
                </Button>
              </Flex>
            )}

            {/* remove selection */}
            {currentElement?.id && (
              <MenuItem
                borderRadius={2} mb={3} bg="red !important" w="100%"
                _hover={{ bg: "red.600" }} color={theme.light}
                onClick={() => handleSelected("")}
              >
                {t('general.clear')}
              </MenuItem>
            )}

            {/* display data */}
            {data.map(el => (
              <MenuItem key={el.id} bg="#eee" justifyContent="flex-start" w="100%" mb={2} whiteSpace="wrap"
                h="auto" minH="40px" paddingBlock={2}
                disabled={String(currentElement?.id) === (subProp ? String(el[subProp]['id']) : String(el['id']))} borderRadius={2}
                onClick={() => {
                  handleSelected(el);
                }}
              >
                {subProp ? el[subProp][prop] : el[prop]}
              </MenuItem>
            ))}

            {allowPagination && (
              data.length > 0 && (
                <Pagination
                  page={page}
                  itemsCount={itemsCount ?? 0}
                  size={size}
                  onChange={(page) => handleChangePage(page)}
                />
              )
            )}
          </React.Fragment>

          {/* handle empty data */}
          {data.length === 0 && (
            <Box
              textTransform="capitalize" p={4} textAlign="center"
              fontWeight="bold" color={theme.dark}
            >
              {t('general.no_data')}
            </Box>
          )}
        </MenuList>
      </Menu>
    </SearchWrapper>
  )
}

export default memo(Search)