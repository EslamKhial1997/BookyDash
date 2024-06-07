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
import SharedTable from "../../shared/table/Table";
import CreateModal from "./actions/CreateModal";
import UpdateModal from "./actions/UpdateModal";
import DeleteModal from "./actions/DeleteModal";



import theme from "@/components/global/theme";
import { getContent } from "@/store/content/contentSlice";

const Contents = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.contents.data);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showCreateContent, setShowCreateContent] = useState(false);
  const [showUpdateContent, setShowUpdateContent] = useState(false);
  const [showDeleteContent, setShowDeleteContent] = useState(false);

  useEffect(() => {
    dispatch(getContent({ page, search }));
  }, [dispatch, page, search]);

  return (
    <>
      <Breadcrumbs
        currentPage={t("pages.content.content")}
        pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]}
      />

      {content.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{content.error}</Text>
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
            onClick={() => setShowCreateChallenge(true)}
          >
            <Box me={2}>
              <FiIcons.FiPlusSquare />
            </Box>
            {t("general.create")}
          </Button>
        </Flex>

        <Flex marginBlock={3} justifyContent="flex-end">
          <InputSearch
            isLoading={content.isLoading}
            onSearch={(s) => setSearch(s)}
          />
        </Flex>
      </SimpleGrid>

      {content.length > 0 ? (
        <SharedTable>
        <thead>
          <tr>
            <th>#</th>
            <th>
              {t("Title")}{" "}
              <Button
                bg={theme.success}
                color={theme.light}
                size="sm"
                me={2}
                onClick={() => handleUpdate(params.id)}
                borderRadius={2}
              >
                <FiIcons.FiEdit size={18} />
              </Button>
            </th>
            <th>
              {t("Image")}{" "}
              <Button
                bg={theme.success}
                color={theme.light}
                size="sm"
                me={2}
                onClick={() => handleUpdate(params.id)}
                borderRadius={2}
              >
                <FiIcons.FiEdit size={18} />
              </Button>
            </th>
            <th>{t("general.action")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) =>
            el === undefined ? (
              ""
            ) : (
              <tr key={el._id}>
                <td>{el._id}</td>
                <td>{el.title || "-"}</td>
  
                <td>
                  <img
                    src={el.image || "-"}
                    style={{ width: "50px", margin: "auto" }}
                  />
                </td>
  
                <td>
                  {" "}
                  <Button
                    bg={theme.error}
                    color={theme.light}
                    size="sm"
                    onClick={() => handleDelete(el)}
                    me={2}
                    borderRadius={2}
                  >
                    <FiIcons.FiEdit size={18} />
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </SharedTable>
      ) : (
        <NoData />
      )}

      <Pagination
        page={page}
        itemsCount={content.itemsCount}
        onChange={(page) => setPage(page)}
      />

      {showCreateChallenge && (
        <CreateModal onClose={() => setShowCreateChallenge(false)} />
      )}
      {showUpdateChallenge && (
        <UpdateModal
          data={showUpdateChallenge}
          onClose={() => setShowUpdateChallenge(false)}
        />
      )}
      {showDeleteChallenge && (
        <DeleteModal
          data={showDeleteChallenge}
          onClose={() => setShowDeleteChallenge(false)}
        />
      )}
    </>
  );
};

export default Contents;
