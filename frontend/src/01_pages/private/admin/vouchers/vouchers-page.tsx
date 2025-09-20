import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ProductVouchers } from '@/04_types/product/product-vouchers';
import useProductVoucherStore from '@/05_stores/product/product-voucher-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateVoucherDialog from './_dialogs/create-voucher-dialog';
import DeleteVoucherDialog from './_dialogs/delete-voucher-dialog';
import UpdateVoucherDialog from './_dialogs/update-voucher-dialog';

const VouchersPage = () => {
  // Store
  const { setSelectedProductVoucher } = useProductVoucherStore();

  // Dialog
  const [updateVoucherDialogOpen, setUpdateVoucherDialogOpen] = useState(false);
  const [deleteVoucherDialogOpen, setDeleteVoucherDialogOpen] = useState(false);
  const [createVoucherDialogOpen, setCreateVoucherDialogOpen] = useState(false);

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<ProductVouchers>({
    endpoint: '/vouchers',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Code', column: 'code' },
    { label: 'Amount', column: 'amount' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setCreateVoucherDialogOpen(true)}>
      Add Voucher
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Vouchers</PageHeader>

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
              ? tasksPagination.data.records.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>{task.code}</TableCell>
                    <TableCell>{task.amount}</TableCell>
                    <TableCell>
                      {getDateTimezone(task.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedProductVoucher(task);
                              setUpdateVoucherDialogOpen(true);
                            }}
                          >
                            <FaPenToSquare />
                          </Button>
                        </Tooltip>

                        {/* Delete button */}
                        <Tooltip content="Delete">
                          <Button
                            variant="destructive"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedProductVoucher(task);
                              setDeleteVoucherDialogOpen(true);
                            }}
                          >
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
      </Card>

      <CreateVoucherDialog
        open={createVoucherDialogOpen}
        setOpen={() => setCreateVoucherDialogOpen(false)}
        refetch={tasksPagination.refetch}
      />

      <UpdateVoucherDialog
        open={updateVoucherDialogOpen}
        setOpen={() => setUpdateVoucherDialogOpen(false)}
        refetch={tasksPagination.refetch}
      />

      <DeleteVoucherDialog
        open={deleteVoucherDialogOpen}
        setOpen={() => setDeleteVoucherDialogOpen(false)}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default VouchersPage;
