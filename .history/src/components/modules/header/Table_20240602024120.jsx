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
            
            </tr>
     
      </tbody>
    </SharedTable>
  );
};

export default Table;
