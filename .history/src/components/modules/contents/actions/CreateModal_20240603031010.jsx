import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

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
  Select,
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';
import Search from "@/components/shared/search/Search";

import { createChallenge } from '@/store/challenges/challengesSlice';

import theme from '@/components/global/theme';
import { getCategories } from "@/store/categories/categoriesSlice";
import { createContent } from "@/store/content/contentSlice";
import { useParams } from "react-router-dom";

const CreateModal = ({ onClose }) => {
  const { t } = useTranslation();
  const challenges = useSelector(state => state.challenges);
  
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

 

  const [categoriesPage, setCategoriesPage] = useState(1);
  const [categoriesSearch, setCategoriesSearch] = useState("");

  useEffect(() => {
    dispatch(getCategories({ page: categoriesPage, search: categoriesSearch }));
  }, [dispatch, categoriesPage, categoriesSearch]);
const params = useParams()
  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius={2} paddingBlock={4} bg={theme.dark}>
        <form onSubmit={handleSubmit(values => {
          dispatch(createContent({id:params.id , }))
            .unwrap()
            .then((res) => {
              window.location.reload();
              onClose();
            })
            .catch(e =>{
              window.location.reload();
            })
        })}>
          <ModalHeader color="orange" textTransform="uppercase" fontSize={22}>
            {t('general.create')}
          </ModalHeader>
          <ModalBody>
            {challenges.error && (
              <Alert status="error" variant="left-accent" marginBottom={8}>
                <AlertIcon />
                <Text>{challenges.error}</Text>
              </Alert>
            )}

            <Stack spacing={6}>
              

              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('Title')}
                </FormLabel>
                <Input type="text" bg={theme.body} color={theme.dark} border="none" borderRadius={2}
                  placeholder={t('title')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.name?.message &&
                  <Text color="red.600" marginTop={2}>{errors.name.message}</Text>}
              </FormControl>
            
              <FormControl>
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('Image')}
                </FormLabel>
                <Input type="file" bg={theme.body} color={theme.dark} border="none" borderRadius={2}
               
                  {...register("image", {
                    required: `${t('validation.required')}`
                  })}
                />
                {errors.name?.message &&
                  <Text color="red.600" marginTop={2}>{errors.name.message}</Text>}
              </FormControl>

            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                rightIcon={<FiIcons.FiSave />}
                color="white" bg="green" paddingInline={4}
                paddingBlock={2} height="auto" textTransform="capitalize"
                isLoading={challenges.isLoading}
                _hover={{ background: 'green' }}
              >
                {t('general.save')}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                rightIcon={<FiIcons.FiMinimize2 />}
                color="white" bg="red.600" paddingInline={4}
                paddingBlock={2} height="auto" textTransform="capitalize"
                marginInlineStart={4}
                isLoading={challenges.isLoading}
                _hover={{ background: 'red.600' }}
              >
                {t('general.close')}
              </Button>
            </Flex>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateModal