import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import * as FiIcons from "react-icons/fi";

import SharedTable from "../../shared/table/Table";
import theme from "../../global/theme";
import { NavLink } from "react-router-dom";

const Table = ({ data, page, handleDelete, handleUpdate }) => {
  const { t } = useTranslation();
console.log(data);
  return (
   
  );
};

export default Table;
