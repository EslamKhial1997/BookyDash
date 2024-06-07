import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import * as FcIcons from "react-icons/fc";
import { Button, Flex, SimpleGrid, Tooltip , Box,
  
  Avatar,
  HStack,
  Link,
  IconButton,
 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack, } from '@chakra-ui/react';

import { toggleSidebar } from '../../../store/sidebar/sidebarSlice';
import { logout } from '../../../store/auth/authSlice';

import { NavbarWrapper } from './NavbarStyle';

import theme from '../../global/theme';


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar);

  return (
    <NavbarWrapper className={`${sidebar.isNotOpened ? 'active' : ''}`}>
      <Flex alignItems="center" justifyContent="space-between">

        {/* start side */}
        <IconButton
        size={'md'}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={'Open Menu'}
        display={{ md: 'none' }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack spacing={8} alignItems={'center'}>
        <Box>Logo</Box>
        <HStack
          as={'nav'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>
      </HStack>
       
        <SimpleGrid spacing={3} display="flex">
          <Tooltip label={t("layout.navbar.toggle_lang")}>
            <Button
              type="button" color={theme.dark} size="sm"
              borderRadius={2} _focus={{ outline: "none" }}
              onClick={() => i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")}
            >
              <FcIcons.FcGlobe size={20} />
            </Button>
          </Tooltip>

          <Tooltip label={t("layout.navbar.profile")}>
            <Button
              type="button" color={theme.dark} size="sm"
              borderRadius={2} _focus={{ outline: "none" }}
              onClick={() => { navigate("/profile") }}
            >
              <FcIcons.FcBusinessman size={20} />
            </Button>
          </Tooltip>

          <Tooltip label={t("layout.navbar.logout")}>
            <Button
              type="button" color={theme.dark} size="sm"
              borderRadius={2} _focus={{ outline: "none" }}
              onClick={() => { dispatch(logout()); navigate("/login") }}
            >
              <FcIcons.FcImport size={20} />
            </Button>
          </Tooltip>
        </SimpleGrid>

      </Flex>
    </NavbarWrapper>
  )
}

export default Navbar