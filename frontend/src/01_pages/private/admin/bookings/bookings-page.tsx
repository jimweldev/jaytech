import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ProductBooking } from '@/04_types/product/product-booking';
import useProductBookingStore from '@/05_stores/user/product-booking-store';
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
import CreateBookingDialog from './_dialogs/create-booking-dialog';
import DeleteBookingDialog from './_dialogs/delete-booking-dialog';
import UpdateBookingDialog from './_dialogs/update-booking-dialog';

const BookingsPage = () => {
  const [openCreateBookingDialog, setOpenCreateBookingDialog] = useState(false);
  const [openUpdateBookingDialog, setOpenUpdateBookingDialog] = useState(false);
  const [openDeleteBookingDialog, setOpenDeleteBookingDialog] = useState(false);

  const { setSelectedProductBooking } = useProductBookingStore();

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<ProductBooking>({
    endpoint: '/bookings',
    defaultSort: 'created_at',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Customer', column: 'customer_id' },
    { label: 'Contact Number', column: 'contact_number' },
    { label: 'Address', column: 'address' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setOpenCreateBookingDialog(true)}>
      Add Booking
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Bookings</PageHeader>

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
                    <TableCell>
                      {product.customer?.first_name}{' '}
                      {product.customer?.last_name}
                    </TableCell>
                    <TableCell>{product.contact_number}</TableCell>
                    <TableCell>{product.address}</TableCell>
                    <TableCell>
                      {getDateTimezone(product.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedProductBooking(product);
                              setOpenUpdateBookingDialog(true);
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
                              setSelectedProductBooking(product);
                              setOpenDeleteBookingDialog(true);
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

      {/* Create Booking Dialog */}
      <CreateBookingDialog
        open={openCreateBookingDialog}
        setOpen={() => setOpenCreateBookingDialog(false)}
      />

      {/* Update Booking Dialog */}
      <UpdateBookingDialog
        open={openUpdateBookingDialog}
        setOpen={() => setOpenUpdateBookingDialog(false)}
      />

      {/* Delete Booking Dialog */}
      <DeleteBookingDialog
        open={openDeleteBookingDialog}
        setOpen={() => setOpenDeleteBookingDialog(false)}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default BookingsPage;
