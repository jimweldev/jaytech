import {
  FaCircleDot,
  FaDollarSign,
  FaFileArrowUp,
  FaKeyboard,
  FaList,
  FaQuoteRight,
  FaRectangleList,
  FaRegKeyboard,
  FaSquareCheck,
  FaTableCellsLarge,
  FaTableList,
} from 'react-icons/fa6';
import { Outlet } from 'react-router';
import { type SidebarGroup } from '@/03_templates/main-template/_components/sidebar/app-sidebar';
import MainTemplate from '@/03_templates/main-template/main-template';

const ExamplesLayout = () => {
  const sidebarGroups: SidebarGroup[] = [
    {
      sidebarLabel: 'Forms',
      sidebarItems: [
        {
          title: 'Input',
          url: '/examples/forms',
          icon: FaKeyboard,
          end: true,
        },
        {
          title: 'Textarea',
          url: '/examples/forms/textarea',
          icon: FaRegKeyboard,
        },
        {
          title: 'Checkbox',
          url: '/examples/forms/checkbox',
          icon: FaSquareCheck,
        },
        {
          title: 'Radio Group',
          url: '/examples/forms/radio-group',
          icon: FaCircleDot,
        },
        {
          title: 'React Dropzone',
          url: '/examples/forms/react-dropzone',
          icon: FaFileArrowUp,
        },
        {
          title: 'React Quill',
          url: '/examples/forms/react-quill',
          icon: FaQuoteRight,
        },
        {
          title: 'Global Dropdown',
          url: '/examples/forms/global-dropdown',
          icon: FaRectangleList,
        },
      ],
    },
    {
      sidebarLabel: 'Data Table',
      sidebarItems: [
        {
          title: 'List',
          url: '/examples/data-table',
          icon: FaList,
          end: true,
        },
        {
          title: 'Grid',
          url: '/examples/data-table/grid',
          icon: FaTableCellsLarge,
        },
        {
          title: 'List/Grid',
          url: '/examples/data-table/list-grid',
          icon: FaTableList,
        },
      ],
    },
    {
      sidebarLabel: 'Payment',
      sidebarItems: [
        {
          title: 'Payment',
          url: '/examples/payment',
          icon: FaDollarSign,
          end: true,
        },
      ],
    },
  ];

  return (
    <MainTemplate sidebarGroups={sidebarGroups}>
      <Outlet />
    </MainTemplate>
  );
};

export default ExamplesLayout;
