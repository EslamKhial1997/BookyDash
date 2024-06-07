import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import * as FiIcons from "react-icons/fi";

import {
  Flex,
  Button,
  Text,
  SimpleGrid,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";

import NoData from "@/components/shared/noData/NoData";
import InputSearch from "@/components/shared/inputSearch/InputSearch";
import Pagination from "@/components/shared/pagination/Pagination";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";

import CreateModal from "./actions/CreateModal";
import UpdateModal from "./actions/UpdateModal";
import DeleteModal from "./actions/DeleteModal";

import theme from "@/components/global/theme";
import { getheader } from "@/store/header/headerSlice";
import { useParams } from "react-router-dom";
import SharedTable from "../../shared/table/Table";
const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.headers.data);
  console.log(header);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const params = useParams();

  useEffect(() => {
    dispatch(getheader(params.id));
  }, [dispatch, page, search, params.id]);

  return (
    <>
      <Breadcrumbs
        currentPage={t("pages.categories.categories")}
        pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]}
      />

      {header.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{header.error}</Text>
        </Alert>
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        justifyContent="space-between"
        bg={theme.light}
        paddingInline={4}
        boxShadow={theme.shadow}
        mb={6}
        borderRadius={2}
        alignItems="center"
      >
        <Flex marginBlock={3}>
          <Button
            bg={theme.success}
            textTransform="capitalize"
            fontWeight="bold"
            fontSize={15}
            borderRadius={2}
            color={theme.light}
            _hover={{ bg: theme.success }}
            onClick={() => setShowCreateCategory(true)}
          >
            <Box me={2}>
              <FiIcons.FiPlusSquare />
            </Box>
            {t("general.create")}
          </Button>
        </Flex>

        <Flex marginBlock={3} justifyContent="flex-end">
          <InputSearch
            isLoading={header.isLoading}
            onSearch={(s) => setSearch(s)}
          />
        </Flex>
      </SimpleGrid>

      <SharedTable>
        <thead>
          <tr>
            <th>{t("Title")}</th>
            <th>{t("SubTitle")}</th>
            <th>{t("Image")}</th>
            <th>{t("Logo")}</th>
          </tr>
        </thead>
        <tbody>
          <tr key={header._id}>
            <td>{header.title || "-"}</td>
            <td>{header.subtitle || "-"}</td>
            <td>
              <img
                src={header.image || "-"}
                style={{ width: "50px", margin: "auto" }}
              />
            </td>
            <td>
              <img
                src={header.logo || "-"}
                style={{ width: "50px", margin: "auto" }}
              />
            </td>
          </tr>
        </tbody>
      </SharedTable>

      <Pagination
        page={page}
        itemsCount={header.itemsCount}
        onChange={(page) => setPage(page)}
      />

      {showCreateCategory && (
        <CreateModal onClose={() => setShowCreateCategory(false)} />
      )}
      {showUpdateCategory && (
        <UpdateModal
          data={showUpdateCategory}
          onClose={() => setShowUpdateCategory(false)}
        />
      )}
      {showDeleteCategory && (
        <DeleteModal
          data={showDeleteCategory}
          onClose={() => setShowDeleteCategory(false)}
        />
      )}
    </>
  );
};

export default Header;
