import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Box, Flex,
  Accordion, AccordionItem, Avatar, Divider
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { toggleSidebar } from '@/store/sidebar/sidebarSlice';

import { SidebarOverlay, SidebarWrapper } from './SidebarStyle';

import theme from '@/components/global/theme';

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar);
  const auth = useSelector(state => state.auth);

  const closeSidebar = () => {
    dispatch(toggleSidebar());
  }

  return (
    <>
      {sidebar.isNotOpened && (
        <SidebarOverlay as={Box}
          className="sidebar-overlay" position="fixed" top="0" right="0" w="100%" h="100vh" bg="rgba(0, 0, 0, .5)" zIndex="99"
          role="button" onClick={() => dispatch(toggleSidebar())}
        />
      )}
      <SidebarWrapper className={sidebar.isNotOpened ? 'active' : ''}>
        <Flex justifyContent="center">
          <Box color={theme.light} textAlign="center">
            <Avatar
              src="http://admin.pixelstrap.com/viho/assets/images/dashboard/1.png"
              size="lg"
              border="5px solid #ccc"
            />
            <Box textTransform="capitalize" fontSize="17px" color={theme.light}>
              {auth.user.name}
            </Box>
            <Box
              textTransform="capitalize" fontSize="11px"
              color={theme.primary}
            >
              {auth.user.name}
            </Box>
          </Box>
        </Flex>

        <Divider marginBlock={4} borderColor={theme.border} />

        <Box className="sidebar-links">
          <Accordion allowToggle={true} border="none">
            <AccordionItem border="none">
              <NavLink to="/" end onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiHome /></span>
                  <span className="text">{t('layout.sidebar.dashboard')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="categories" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiSend /></span>
                  <span className="text">{t('layout.sidebar.categories')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="challenges" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiCrosshair /></span>
                  <span className="text">{t('layout.sidebar.challenges')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>

            <AccordionItem border="none">
              <NavLink to="settings" onClick={closeSidebar} className="chakra-accordion__button">
                <Flex alignItems="center">
                  <span className="icon"><FiIcons.FiSettings /></span>
                  <span className="text">{t('layout.sidebar.settings')}</span>
                </Flex>
              </NavLink>
            </AccordionItem>
          </Accordion>
        </Box>
      </SidebarWrapper>
    </>
  )
}

export default Sidebar