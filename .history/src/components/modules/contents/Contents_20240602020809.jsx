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

import { getChallenges } from "@/store/challenges/challengesSlice";

import theme from "@/components/global/theme";

const Challenges = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const challenges = useSelector((state) => state.challenges);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showUpdateChallenge, setShowUpdateChallenge] = useState(false);
  const [showDeleteChallenge, setShowDeleteChallenge] = useState(false);

  useEffect(() => {
    dispatch(getChallenges({ page, search }));
  }, [dispatch, page, search]);

  return (
    <>
      <Breadcrumbs
        currentPage={t("pages.challenges.challenges")}
        pages={[{ name: `${t("pages.dashboard.dashboard")}`, path: "/" }]}
      />

      {challenges.error && (
        <Alert status="error" variant="left-accent" marginBottom={8}>
          <AlertIcon />
          <Text>{challenges.error}</Text>
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
            isLoading={challenges.isLoading}
            onSearch={(s) => setSearch(s)}
          />
        </Flex>
      </SimpleGrid>

      {challenges.data.length > 0 ? (
        <Table
          data={challenges.data}
          page={page}
          handleUpdate={(el) => setShowUpdateChallenge(el)}
          handleDelete={(el) => setShowDeleteChallenge(el)}
        />
      ) : (
        <NoData />
      )}

      <Pagination
        page={page}
        itemsCount={challenges.itemsCount}
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

export default Challenges;
