import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import * as FcIcons from "react-icons/fc";
import { Button, Flex, SimpleGrid, Tooltip } from '@chakra-ui/react';

import { toggleSidebar } from '../../../store/sidebar/sidebarSlice';
import { logout } from '../../../store/auth/authSlice';

import { NavbarWrapper } from './NavbarStyle';

import theme from '../../global/theme';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

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
        p={0} borderRadius={2}
        width="auto" color={theme.dark}
        _hover={{ bg: "none" }} _focus={{ outline: "none" }}
        marginInlineEnd={4} onClick={() => dispatch(toggleSidebar())}
      >
        <FcIcons.FcList size={25} />
      />
      

        {/* end side */}
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