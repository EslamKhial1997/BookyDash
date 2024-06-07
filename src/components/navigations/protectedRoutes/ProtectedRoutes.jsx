import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Progress, Spinner } from "@chakra-ui/react";

import Sidebar from '../../layout/sidebar/Sidebar';
import Navbar from '../../layout/navbar/Navbar';

import { verifyUser } from '../../../store/auth/authSlice';

import { AppWrapper } from './Style';
import theme from "../../global/theme";

const ProtectedRoutes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebar = useSelector(state => state.sidebar);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(verifyUser())
      .unwrap()
      .then(_ => {
        setLoaded(true);
      }).catch(_ => {
        navigate("/login");
      });
  }, [dispatch, navigate]);

  return loaded ? (
    <AppWrapper>
      <Sidebar />
      <Box className={`content-wrapper ${sidebar.isNotOpened ? 'active' : ''}`}>
        <Box className="content">
          <Navbar />
          <Box className="app-content">
            <Suspense fallback={(
              <Box>
                <Progress colorScheme="orange" isIndeterminate size="xs" />
                <Flex alignItems="center" justifyContent="center" h="80vh" bg={theme.light} borderRadius={2}>
                  <Spinner color={theme.primary} size="md" me={2} />
                </Flex>
              </Box>
            )}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </AppWrapper>
  ) : (
    <Flex
      alignItems="center" justifyContent="center"
      h="100vh" bg={theme.light}
    >
      <Box textAlign="center" color={theme.dark}>
        <Spinner size="xl" me={2} mb={4} />
        <Box>{t("general.loading")}</Box>
      </Box>
    </Flex>
  );
};

export default ProtectedRoutes;
