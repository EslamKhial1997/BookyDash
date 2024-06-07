import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import * as FiIcons from "react-icons/fi";
import theme from "../../global/theme";

const NoData = () => {
  const { t } = useTranslation();
  return (
    <Box textAlign="center" bg={theme.light} boxShadow={theme.shadow}
      borderRadius={2} paddingBlock={6} paddingInline={4}
    >
      <FiIcons.FiSmile size={40} style={{ margin: "auto", color: theme.text }} />
      <Text fontSize={18} textTransform="capitalize" color="gray.300" fontWeight="bold" mt={2}>
        {t("general.no_data")}
      </Text>
    </Box>
  )
}

export default NoData