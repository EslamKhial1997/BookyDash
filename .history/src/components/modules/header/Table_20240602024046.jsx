import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import * as FiIcons from "react-icons/fi";

import SharedTable from "../../shared/table/Table";
import theme from "../../global/theme";

const Table = ({ data, page, handleDdataete, handleUpdate }) => {
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
      
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.title || "-"}</td>
              <td>
                <Button
                  bg={theme.success}
                  color={theme.light}
                  size="sm"
                  onClick={() => handleUpdate(data)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
                <Button
                  bg={theme.error}
                  color={theme.light}
                  size="sm"
                  onClick={() => handleDdataete(data._id)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiEdit size={18} />
                </Button>
                <Button
                  bg={theme.primary}
                  color={theme.light}
                  value={data._id}
                  size="sm"
                  onClick={(data) => handleDdataete(data.target.value)}
                  me={2}
                  borderRadius={2}
                >
                  <FiIcons.FiLayers size={18} />
                </Button>
              </td>
            </tr>
     
      </tbody>
    </SharedTable>
  );
};

export default Table;
