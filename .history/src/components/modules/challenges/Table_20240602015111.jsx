import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
import * as FiIcons from "react-icons/fi";

import SharedTable from '../../shared/table/Table';
import theme from "../../global/theme";

const Table = ({ data, page, handleDelete, handleUpdate }) => {
  const { t } = useTranslation();

  return (
    <SharedTable>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('Title')}</th>
          <th>{t('SubTitle')}</th>
          <th>{t('Image')}</th>
          <th>{t('Logo')}</th>
          <th>{t('general.action')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map(el => (
          el===undefined ? "":()
         
        ))}
      </tbody>
    </SharedTable>
  )
}

export default Table