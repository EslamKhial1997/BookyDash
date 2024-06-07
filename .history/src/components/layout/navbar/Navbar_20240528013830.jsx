import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as FcIcons from "react-icons/fc";
import {
  Button,
  Flex,
  SimpleGrid,
  Tooltip,
  Box,
  useColorModeValue,
  HStack,
  Stack,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { toggleSidebar } from "../../../store/sidebar/sidebarSlice";
import { logout } from "../../../store/auth/authSlice";

import { NavbarWrapper } from "./NavbarStyle";

import theme from "../../global/theme";

const Links = [{
  title:"Home",
  href:"/"
},
{
  title:"Category",
  href:"/"
},
{
  title:"Home",
  href:"/"
},
{
  title:"Home",
  href:"/"
},

];
function NavLink({ children }) {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Link>
  );
}
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen);
  return (
    <NavbarWrapper className={`${sidebar.isNotOpened ? "active" : ""}`}>
      <Flex alignItems="center" justifyContent="space-between">
        {/* start side */}
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>

        <SimpleGrid spacing={3} display="flex">
          <Tooltip label={t("layout.navbar.toggle_lang")}>
            <Button
              type="button"
              color={theme.dark}
              size="sm"
              borderRadius={2}
              _focus={{ outline: "none" }}
              onClick={() =>
                i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
            >
              <FcIcons.FcGlobe size={20} />
            </Button>
          </Tooltip>

          <Tooltip label={t("layout.navbar.profile")}>
            <Button
              type="button"
              color={theme.dark}
              size="sm"
              borderRadius={2}
              _focus={{ outline: "none" }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <FcIcons.FcBusinessman size={20} />
            </Button>
          </Tooltip>

          <Tooltip label={t("layout.navbar.logout")}>
            <Button
              type="button"
              color={theme.dark}
              size="sm"
              borderRadius={2}
              _focus={{ outline: "none" }}
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              <FcIcons.FcImport size={20} />
            </Button>
          </Tooltip>
        </SimpleGrid>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </NavbarWrapper>
  );
};

export default Navbar;
