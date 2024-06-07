import { Button, Input, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as FiIcons from "react-icons/fi";

import theme from "../../global/theme";

const InputSearch = (
  {
    onSearch,
    isLoading
  }:
    {
      onSearch: Function,
      isLoading: boolean
    }
) => {
  const { register, handleSubmit } = useForm({ defaultValues: { s: "" } });
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(values => onSearch(values.s))}>
      <Flex>
        <Input type="search" placeholder={t('general.search')} borderRadius={2}
          bg={theme.light} color={theme.dark} _placeholder={{ textTransform: "capitalize" }}
          {...register("s")}
        />
        <Button
          type="submit" isLoading={isLoading} _hover={{ bg: theme.secondary }}
          bg={theme.primary} color={theme.light} ms={4} borderRadius={2}
        >
          <FiIcons.FiSearch size={16} />
        </Button>
      </Flex>
    </form>
  )
}

export default InputSearch