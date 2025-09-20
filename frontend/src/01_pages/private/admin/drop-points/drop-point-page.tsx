import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { DropPoints } from '@/04_types/dropPoints';
import useDropPointStore from '@/05_stores/drop-points-store';
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
import CreateDropPointDialog from './_dialogs/create-drop-points-dialog';
import DeleteDropPointsDialog from './_dialogs/delete-drop-points-dialog';
import UpdateDropPointsDialog from './_dialogs/update-drop-points-dialog';

const DropPointPage = () => {
  // Store
  const { setSelectedDropPoint } = useDropPointStore();

  // Dialog
  const [updateDropPointsDialogOpen, setUpdateDropPointsDialogOpen] =
    useState(false);
  const [deleteDropPointsDialogOpen, setDeleteDropPointsDialogOpen] =
    useState(false);
  const [createDropPointsDialogOpen, setCreateDropPointsDialogOpen] =
    useState(false);

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<DropPoints>({
    endpoint: '/drop-points',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Name', column: 'name' },
    { label: 'Enabled', column: 'is_active' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setCreateDropPointsDialogOpen(true)}>
      Add Drop Point
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Drop Points</PageHeader>

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
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.is_active ? 'Yes' : 'No'}</TableCell>
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
                              setSelectedDropPoint(task);
                              setUpdateDropPointsDialogOpen(true);
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
                              setSelectedDropPoint(task);
                              setDeleteDropPointsDialogOpen(true);
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

      {/* Create Drop Point Dialog */}
      <CreateDropPointDialog
        open={createDropPointsDialogOpen}
        setOpen={setCreateDropPointsDialogOpen}
        refetch={tasksPagination.refetch}
      />

      {/* Update Drop Point Dialog */}
      <UpdateDropPointsDialog
        open={updateDropPointsDialogOpen}
        setOpen={setUpdateDropPointsDialogOpen}
        refetch={tasksPagination.refetch}
      />

      {/* Delete Drop Point Dialog */}
      <DeleteDropPointsDialog
        open={deleteDropPointsDialogOpen}
        setOpen={setDeleteDropPointsDialogOpen}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default DropPointPage;
