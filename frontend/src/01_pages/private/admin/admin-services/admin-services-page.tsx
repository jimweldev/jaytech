import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { Services } from '@/04_types/services';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServicesDialog from './_dialogs/create-services-dialog';
import UpdateVoucherDialog from './_dialogs/update-services-dialog';
import useServicesStore from '@/05_stores/services-store';
import DeleteVoucherDialog from './_dialogs/delete-services-dialog';

const AdminServicesPage = () => {

  const { setSelectedServices } = useServicesStore();

  // Dialog
  const [updateServicesDialogOpen, setUpdateServicesDialogOpen] = useState(false);
  const [deleteServicesDialogOpen, setDeleteServicesDialogOpen] =
    useState(false);
  const [createServicesDialogOpen, setCreateServicesDialogOpen] =
    useState(false);

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<Services>({
    endpoint: '/services',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Name', column: 'name' },
    { label: 'Description', column: 'description' },
    { label: 'Type', column: 'type' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setCreateServicesDialogOpen(true)}>
      Add Services
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Services</PageHeader>

      {/* Card */}
      <Card>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={tasksPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {tasksPagination.data?.records
              ? tasksPagination.data.records.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>
                    {getDateTimezone(product.created_at, 'date_time')}
                  </TableCell>
                  <TableCell>
                    <InputGroup size="sm">
                      {/* Update button */}
                      <Tooltip content="Update">
                        <Button variant="info" size="icon-xs" onClick={() => { setUpdateServicesDialogOpen(true); setSelectedServices(product) }}>
                          <FaPenToSquare />
                        </Button>
                      </Tooltip>

                      {/* Delete button */}
                      <Tooltip content="Delete">
                        <Button variant="destructive" size="icon-xs" onClick={() => { setDeleteServicesDialogOpen(true); setSelectedServices(product) }}>
                          <FaTrash />
                        </Button>
                      </Tooltip>
                    </InputGroup>
                  </TableCell>
                </TableRow>
              ))
              : null}
          </DataTable>
        </CardBody>
      </Card >

      <CreateServicesDialog
        open={createServicesDialogOpen}
        setOpen={setCreateServicesDialogOpen}
        refetch={tasksPagination.refetch}
      />

      <UpdateVoucherDialog
        open={updateServicesDialogOpen}
        setOpen={setUpdateServicesDialogOpen}
        refetch={tasksPagination.refetch}
      />

      <DeleteVoucherDialog
        open={deleteServicesDialogOpen}
        setOpen={setDeleteServicesDialogOpen}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default AdminServicesPage;
