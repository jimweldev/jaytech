import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { type Task } from '@/04_types/task';
import useTaskStore from '@/05_stores/task-store';
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

const VouchersPage = () => {
  // Store
  const { setSelectedTask } = useTaskStore();

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<Task>({
    endpoint: '/vouchers',
    defaultSort: 'category,brand',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Category', column: 'category,brand' },
    { label: 'Brand', column: 'brand' },
    { label: 'Description', column: 'description' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  return (
    <>
      <PageHeader className="mb-3">Vouchers</PageHeader>

      {/* Card */}
      <Card>
        <CardBody>
          {/* Data Table */}
          <DataTable pagination={tasksPagination} columns={columns}>
            {/* Render rows only if data is present */}
            {tasksPagination.data?.records
              ? tasksPagination.data.records.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
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
                              setSelectedTask(task);
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
                              setSelectedTask(task);
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
    </>
  );
};

export default VouchersPage;
