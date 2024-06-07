import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import * as FiIcons from "react-icons/fi";

import SharedTable from "../../shared/table/Table";
import theme from "../../global/theme";
import { NavLink } from "react-router-dom";

const Table = ({ data, page, handleDelete, handleUpdate }) => {
  const { t } = useTranslation();

  return (
    <SharedTable>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("Title")}</th>
          <th>{t("SubTitle")}</th>
          <th>{t("Image")}</th>
          <th>{t("Logo")}</th>
          <th>{t("general.action")}</th>
        </tr>
      </thead>
      <tbody>
        
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.title || "-"}</td>
              <td>{data.subtitle || "-"}</td>
              <td>
                <img
                  src={data.image || "-"}
                  style={{ width: "50px", margin: "auto" }}
                />
              </td>
              <td>
                <img
                  src={data.logo || "-"}
                  style={{ width: "50px", margin: "auto" }}
                />
              </td>

              <td>
               
                  {" "}
                  <Button
                    bg={theme.success}
                    color={theme.light}
                    size="sm"
                    me={2}
                    borderRadius={2}
                  >
                    <FiIcons.FiEdit size={18} />
                  </Button>
               
                <Button
                  bg={theme.error}
                  color={theme.light}
                  size="sm"
                  
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
              </td>
            </tr>
        
      </tbody>
    </SharedTable>
  );
};

export default Table;
