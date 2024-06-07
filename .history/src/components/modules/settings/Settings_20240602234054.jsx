import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import * as FiIcons from "react-icons/fi";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs"
import {
  Text, Button,
  useToast, FormControl, FormLabel,
  Alert, AlertIcon, Stack, Textarea,
} from "@chakra-ui/react";
import theme from "@/components/global/theme";
import { getSettings, updateSetting } from "@/store/settings/settingsSlice";
import { useEffect } from "react";

const Content = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const toast = useToast({ position: "top", duration: 5000, status: "success" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getSettings())
      .unwrap()
      .then(res => {
        console.log(res);
        reset(res)
      }).catch(e => console.log(e))
  }, [dispatch, reset]);

  return (
    <>
      <Breadcrumbs currentPage={t('pages.settings.settings')} pages={[{ name: `${t('pages.dashboard.dashboard')}`, path: '/' }]} />

      {settings.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{settings.error}</Text>
        </Alert>
      )}

      <form onSubmit={handleSubmit(values => {
        dispatch(updateSetting(values))
          .unwrap()
          .then((res) => toast({ description: res?.msg || 'record updated' }))
      })}>
        <Stack
          spacing={6} bg={theme.light}
          boxShadow={theme.shadow} borderRadius={2} p={6}
        >
          <FormControl>
            <FormLabel fontWeight="bold" textTransform="capitalize" color={theme.dark}>
              {t('pages.settings.help_page')}
            </FormLabel>
            <Textarea bg={theme.body} color={theme.dark} border="none" borderRadius={2}
              placeholder={t('pages.settings.help_page')} _placeholder={{ textTransform: 'capitalize' }}
              {...register("help_page", {
                required: `${t('validation.required')}`
              })}
            />
            {errors.help_page?.message &&
              <Text color="red.600" marginTop={2}>{errors.help_page.message}</Text>}
          </FormControl>

          <Button
            type="submit" borderRadius={2}
            rightIcon={<FiIcons.FiSave />}
            color="white" bg="green" paddingInline={4}
            paddingBlock={2} height="auto" textTransform="capitalize"
            isLoading={settings.isLoading}
            _hover={{ background: 'green' }}
          >
            {t('general.save')}
          </Button>
        </Stack>
      </form >
    </>
  )
}

export default Settings