import * as FiIcons from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { SimpleGrid } from "@chakra-ui/react";

import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import Card from "./components/Card";

import theme from "@/components/global/theme";


const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs currentPage={t("pages.dashboard.dashboard")} pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Card
          title={t("pages.dashboard.users")}
          count={1}
          icon={<FiIcons.FiUser color={theme.primary} size={30} />}
        />

        <Card
          title={t("pages.dashboard.categories")}
          count={10}
          icon={<FiIcons.FiCast color={theme.primary} size={30} />}
        />

        <Card
          title={t("pages.dashboard.challenges")}
          count={20}
          icon={<FiIcons.FiInfo color={theme.primary} size={30} />}
        />
      </SimpleGrid>
    </>
  )
}

export default Dashboard