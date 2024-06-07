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
import Table from "./Table";
import CreateModal from "./actions/CreateModal";
import UpdateModal from "./actions/UpdateModal";
import DeleteModal from "./actions/DeleteModal";

import { getCategories } from "@/store/categories/categoriesSlice";

import theme from "@/components/global/theme";
import { getheader } from "@/store/header/headerSlice";
import { useParams } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.categories);
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

    
        <Table
          data={header.data}
          page={page}
          handleUpdate={(el) => setShowUpdateCategory(el)}
          handleDelete={(el) => setShowDeleteCategory(el)}
        />
    

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
