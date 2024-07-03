import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Divider,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import * as FiIcons from "react-icons/fi";

import theme from "../../global/theme";

import { login } from "../../../store/auth/authSlice";

import { AuthWarpper } from "./AuthStyle";

import authBg from "../../../assets/images/auth-bg.gif";

const Login = () => {
  const { t } = useTranslation();
  const toast = useToast({ position: "top", duration: 2000, status: "error" });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <AuthWarpper>
      <Flex
        background={`url(${authBg}) no-repeat`}
        backgroundSize="cover"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg={theme.light} padding={8} className="auth-box" borderRadius={2}>
          <Box textAlign="center" pt={4}>
            <Heading
              color={theme.dark}
              fontSize={22}
              textTransform="capitalize"
              mb={2}
            >
              {t("pages.auth.welcome_1")}
            </Heading>

            <Text
              color={theme.gary1}
              fontSize={16}
              textTransform="capitalize"
              mb={4}
            >
              {t("pages.auth.login_hint")}
            </Text>
          </Box>

          <Divider borderColor={theme.border} marginBlock={6} />

          <form
            onSubmit={handleSubmit((values) => {
              dispatch(login(values))
                .unwrap()
                .then((_) => {
                  navigate("/");
                })
                .catch((error) => {
                  toast({
                    description: error?.msg,
                  });
                });
            })}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel color={theme.dark} textTransform="capitalize">
                  {t("pages.auth.email")}
                </FormLabel>
                <Input
                  type="email"
                  placeholder={t("pages.auth.email")}
                  border="none"
                  color={theme.dark}
                  bg={theme.body}
                  _placeholder={{ color: theme.text }}
                  paddingInline={4}
                  {...register("email", {
                    required: `${t("validation.required")}`,
                  })}
                />
                {errors.email?.message && (
                  <Text color={theme.error}>{errors.email?.message}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color={theme.dark} textTransform="capitalize">
                  {t("pages.auth.pwd")}
                </FormLabel>
                <InputGroup>
                  <Input
                    type={isPasswordShown ? "text" : "password"}
                    placeholder={t("pages.auth.pwd")}
                    border="none"
                    color={theme.dark}
                    bg={theme.body}
                    autoComplete="false"
                    _placeholder={{ color: theme.text }}
                    paddingInline={4}
                    {...register("password", {
                      required: `${t("validation.required")}`,
                      minLength: {
                        value: 8,
                        message: `${t("validation.min_length")} 8`,
                      },
                    })}
                  />
                  <InputRightElement>
                    <Button
                      p={0}
                      bg="none"
                      color={theme.dark}
                      _hover={{ bg: "none" }}
                      type="button"
                      onClick={() => setIsPasswordShown(!isPasswordShown)}
                    >
                      {isPasswordShown ? (
                        <FiIcons.FiEyeOff />
                      ) : (
                        <FiIcons.FiEye />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.pwd?.message && (
                  <Text color={theme.error}>{errors.pwd?.message}</Text>
                )}
              </FormControl>

              <Button
                type="submit"
                textTransform="capitalize"
                bg={theme.primary}
                color={theme.light}
                borderRadius={2}
                _hover={{ bg: theme.primary }}
              >
                {t("pages.auth.login")}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </AuthWarpper>
  );
};

export default Login;
