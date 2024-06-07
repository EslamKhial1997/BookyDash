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
          <th>{t("Title Header")}</th>
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
                <Button
                  bg={theme.success}
                  color={theme.light}
                  size="sm"
                  onClick={() => handleUpdate(el)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
                <Button
                  bg={theme.error}
                  color={theme.light}
                  size="sm"
                  onClick={() => handleDelete(el._id)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
                <NavLink to={`categories/${el._id}`}>
                <Button
                  bg={theme.primary}
                  color={theme.light}
                  value={el._id}
                  size="sm"
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiLayers size={18} />
                </Button>
                </NavLink>
              </td>
            </tr>
          )
        )}
      </tbody>
    </SharedTable>
  );
};

export default Table;
