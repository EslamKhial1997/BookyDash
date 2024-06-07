import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Alert,
  AlertIcon,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import * as FiIcons from "react-icons/fi";

import theme from "@/components/global/theme";
import {  updateHeaderImage } from "@/store/header/headerSlice";
import { useParams } from "react-router-dom";

const UpdateModalImage = ({ data, onClose }) => {
  const params = useParams();
  const { t } = useTranslation();
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  console.log(data);
  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius={2} paddingBlock={4} bg={theme.dark}>
        <form
          onSubmit={handleSubmit((values) => {
            dispatch(updateHeaderImage({ data: values, id: params }))
              .unwrap()
              .then((res) => {
                // onClose();
                // window.location.reload();
              })
              .catch((e) => {
                console.log(e);
                // onClose();
                // window.location.reload();
              });
          })}
        >
          <ModalHeader color="orange" textTransform="uppercase" fontSize={22}>
            {t("general.update")}
          </ModalHeader>
          <ModalBody>
            {categories.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{categories.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
              <FormControl>
                <FormLabel
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="white"
                >
                  {t(data)}
                </FormLabel>
                <Input
                type="file"
                  bg={theme.body}
                  color={theme.dark}
                  border="none"
                  borderRadius={2}
                  placeholder={t(data)}
                  _placeholder={{ textTransform: "capitalize" }}
                  {...register(data, {
                    required: `${t("validation.required")}`,
                  })}
                />
                {errors.name?.message && (
                  <Text color="red.600" marginTop={2}>
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                rightIcon={<FiIcons.FiSave />}
                color="white"
                bg="green"
                paddingInline={4}
                paddingBlock={2}
                height="auto"
                textTransform="capitalize"
                isLoading={categories.isLoading}
                _hover={{ background: "green" }}
              >
                {t("general.save")}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                rightIcon={<FiIcons.FiMinimize2 />}
                color="white"
                bg="red.600"
                paddingInline={4}
                paddingBlock={2}
                height="auto"
                textTransform="capitalize"
                marginInlineStart={4}
                isLoading={categories.isLoading}
                _hover={{ background: "red.600" }}
              >
                {t("general.close")}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModalImage;
