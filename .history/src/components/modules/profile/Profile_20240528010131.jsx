import {
  Box,
  Heading,
  Flex,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";
import * as FcIcons from "react-icons/fc";
import React from "react";
import { useTranslation } from "react-i18next";
import theme from "../../global/theme";

import Breadcrumbs from "../../shared/breadcrumbs/Breadcrumbs";

import { ProfileWrapper } from "./ProfileStyle";

const Profiles = () => {
  const { t } = useTranslation();

  return (
    <ProfileWrapper>
      <Breadcrumbs
        currentPage={t("pages.users.profile")}
        pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]}
      />
      <Flex flexWrap="wrap" width="100%">
        <Stack
          width={{ base: "100%", md: "30%" }}
          mb={4}
          pe={{ base: 0, md: 4 }}
        >
          <Box borderRadius={2} p={4} bg={theme.light} boxShadow={theme.shadow}>
            <Heading
              fontSize="1.1rem"
              color={theme.dark}
              textTransform="capitalize"
              fontWeight="normal"
              mb={4}
            >
              personal info
            </Heading>

            <Stack spacing={1}>
              <ChakraLink
                as={NavLink}
                end
                to="/profile"
                width="100%"
                display="block"
                paddingBlock={2}
                textTransform="capitalize"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <FcIcons.FcBusinessman />
                    <Box as="span" ms={2} fontSize=".9rem">
                      personal information
                    </Box>
                  </Flex>
                  <FcIcons.FcPrevious size={14} />
                </Flex>
              </ChakraLink>

              {/* <ChakraLink
                as={NavLink} to="/profile/change_password" width="100%" display="block"
                paddingBlock={2} textTransform="capitalize"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <FcIcons.FcPrivacy />
                    <Box as="span" ms={2} fontSize=".9rem">
                      change password
                    </Box>
                  </Flex>
                  <FcIcons.FcPrevious size={14} />
                </Flex>
              </ChakraLink>

              <ChakraLink
                as={NavLink} to="/profile/notifications" width="100%" display="block"
                paddingBlock={2} textTransform="capitalize"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <FcIcons.FcSpeaker />
                    <Box as="span" ms={2} fontSize=".9rem">
                      notifications
                    </Box>
                  </Flex>
                  <FcIcons.FcPrevious size={14} />
                </Flex>
              </ChakraLink>

              <ChakraLink
                as={NavLink} to="/profile/settings" width="100%" display="block"
                paddingBlock={2} textTransform="capitalize"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <FcIcons.FcSettings />
                    <Box as="span" ms={2} fontSize=".9rem">
                      settings
                    </Box>
                  </Flex>
                  <FcIcons.FcPrevious size={14} />
                </Flex>
              </ChakraLink> */}
            </Stack>
          </Box>
        </Stack>
        <Box
          borderRadius={2}
          p={4}
          bg={theme.light}
          boxShadow={theme.shadow}
          width={{ base: "100%", md: "70%" }}
          mb={4}
        >
          <Outlet />
        </Box>
      </Flex>
    </ProfileWrapper>
  );
};

export default Profiles;
