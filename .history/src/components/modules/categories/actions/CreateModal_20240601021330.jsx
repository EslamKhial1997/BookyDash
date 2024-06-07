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
} from '@chakra-ui/react';

import * as FiIcons from 'react-icons/fi';

import { createCategory } from '@/store/categories/categoriesSlice';

import theme from '@/components/global/theme';

const CreateModal = ({ onClose }) => {
  const { t } = useTranslation();
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
const Submit = (ele)=>{
  handleSubmit(values => {
    dispatch(createCategory(values))
      .unwrap()
      .then((res) => {
        onClose();
      })
      .catch(e => console.log(e))
  })
}
  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius={2} paddingBlock={4} bg={theme.dark}>
        <form onSubmit={}>
          <ModalHeader color="orange" textTransform="uppercase" fontSize={22}>
            {t('general.create')}
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
                <FormLabel fontWeight="bold" textTransform="capitalize" color="white">
                  {t('Title')}
                </FormLabel>
                <Input type="text" bg={theme.body} color={theme.dark} border="none" borderRadius={2}
                  placeholder={t('Title')} _placeholder={{ textTransform: 'capitalize' }}
                  {...register("title", {
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
                isLoading={categories.isLoading}
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
                isLoading={categories.isLoading}
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