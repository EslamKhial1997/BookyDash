import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import * as FiIcons from "react-icons/fi";

import {

  Button,
  Text,

  Alert,
  AlertIcon,
 
} from "@chakra-ui/react";


import Pagination from "@/components/shared/pagination/Pagination";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";

import UpdateModal from "./actions/UpdateModal";

import theme from "@/components/global/theme";
import { getheader } from "@/store/header/headerSlice";
import { useParams } from "react-router-dom";
import SharedTable from "../../shared/table/Table";
import UpdateModalImage from "./actions/UpdateModalImage";
import UpdateModalLogo from "./actions/UpdateModalLogo";
const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const header = useSelector((state) => state.headers);
  const [page, setPage] = useState(1);

  const [value, setValue] = useState(null);

  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [showUpdateImage, setShowUpdateImage] = useState(false);
  const [showUpdateLogo, setShowUpdateLogo] = useState(false);

  const params = useParams();
  const handleUpdate = (target) => {
    setShowUpdateCategory(true);
    setValue(target);
  };
  const handleUpdateImage = (target) => {
    setShowUpdateImage(true);
    setValue(target);
  };
  const handleUpdateLogo = (target) => {
    setShowUpdateLogo(true);
    setValue(target);
  };
  useEffect(() => {
    dispatch(getheader(params.id));
  }, [dispatch, page, params.id]);
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

      <SharedTable>
        <thead>
          <tr>
            <th>
              {t("Title")}{" "}
              <Button
                bg={theme.success}
                color={theme.light}
                size="sm"
                me={2}
                borderRadius={2}
                onClick={() => handleUpdate("title")}
              >
                <FiIcons.FiEdit size={18} />
              </Button>
            </th>
            <th>
              {t("SubTitle")}{" "}
              <Button
                bg={theme.success}
                color={theme.light}
                size="sm"
                me={2}
                borderRadius={2}
                onClick={() => handleUpdate("subtitle")}
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
                borderRadius={2}
                onClick={() => handleUpdateImage("image")}
              >
                <FiIcons.FiEdit size={18} />
              </Button>
            </th>
            <th>
              {t("Logo")}{" "}
              <Button
                bg={theme.success}
                color={theme.light}
                size="sm"
                me={2}
                borderRadius={2}
                onClick={() => handleUpdateLogo("logo")}
              >
                <FiIcons.FiEdit size={18} />
              </Button>
            </th>
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

      {showUpdateCategory && (
        <UpdateModal
          data={value}
          onClose={() => setShowUpdateCategory(false)}
        />
      )}
      {showUpdateImage && (
        <UpdateModalImage
          data={value}
          onClose={() => setShowUpdateImage(false)}
        />
      )}
      {showUpdateLogo && (
        <UpdateModalLogo
          data={value}
          onClose={() => setShowUpdateLogo(false)}
        />
      )}
    </>
  );
};

export default Header;
