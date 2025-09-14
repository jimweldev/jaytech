import { useState } from 'react';
import {
  FaPenToSquare,
  FaRegCircleXmark,
  FaShield,
  FaTrash,
} from 'react-icons/fa6';
import { type User } from '@/04_types/user/user';
import useUserStore from '@/05_stores/user/user-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatName } from '@/lib/user/format-name';
import CreateUserDialog from './_dialogs/create-user-dialog';
import DeleteUserDialog from './_dialogs/delete-user-dialog';
import UpdateUserDialog from './_dialogs/update-user-dialog';
import UpdateUserRolesDialog from './_dialogs/update-user-roles-dialog';

const ActiveUsersTab = () => {
  // Store
  const { setSelectedUser } = useUserStore();

  const [fancyboxRef] = useFancybox();

  // Dialog States
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false);
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);
  const [openUpdateUserRolesDialog, setOpenUpdateUserRolesDialog] =
    useState(false);

  // Tanstack query hook for pagination
  const usersPagination = useTanstackPaginateQuery<User>({
    endpoint: '/users',
    defaultSort: 'first_name,last_name',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'ID', column: 'id', className: 'w-[80px]' },
    { label: 'Name', column: 'first_name,last_name' },
    { label: 'Admin' },
    { label: 'Roles' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setOpenCreateUserDialog(true)}>
      Create
    </Button>
  );

  return (
    <>
      {/* Card */}
      <Card ref={fancyboxRef}>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={usersPagination}
            columns={columns}
            actions={actions}
            listSkeleton={<Skeleton className="h-8 w-full" />}
          >
            {/* Render rows only if data is present */}
            {usersPagination.data?.records
              ? usersPagination.data.records.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0">
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath={user.avatar_path}
                            data-fancybox={`${user.id}`}
                            data-caption={formatName(user)}
                            fallback="/images/default-avatar.png"
                          >
                            <ReactImage
                              className="outline-primary border-card flex size-7 items-center justify-center overflow-hidden rounded-full border-1 outline-2"
                              src={`${import.meta.env.VITE_STORAGE_BASE_URL}${user?.avatar_path}`}
                              fallback="/images/default-avatar.png"
                            />
                          </FancyboxViewer>
                        </div>

                        <div>
                          <h6 className="text-xs font-semibold">
                            {formatName(user)}
                          </h6>
                          <p className="text-muted-foreground text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_admin ? 'default' : 'secondary'}>
                        {user.is_admin ? 'Admin' : 'User'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-1">
                        {user?.rbac_user_roles?.length === 0 ? (
                          <Badge variant="outline">
                            <FaRegCircleXmark />
                            No roles
                          </Badge>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1">
                            {user?.rbac_user_roles?.map(role => (
                              <Badge key={role.id}>
                                {role.rbac_role?.label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(user.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenUpdateUserDialog(true);
                            }}
                          >
                            <FaPenToSquare />
                          </Button>
                        </Tooltip>

                        {/* Update Roles button */}
                        <Tooltip content="Update user roles">
                          <Button
                            variant="warning"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenUpdateUserRolesDialog(true);
                            }}
                          >
                            <FaShield />
                          </Button>
                        </Tooltip>

                        {/* Delete button */}
                        <Tooltip content="Delete">
                          <Button
                            variant="destructive"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenDeleteUserDialog(true);
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

      {/* Dialogs */}
      <CreateUserDialog
        open={openCreateUserDialog}
        setOpen={setOpenCreateUserDialog}
        refetch={usersPagination.refetch}
      />
      <UpdateUserDialog
        open={openUpdateUserDialog}
        setOpen={setOpenUpdateUserDialog}
        refetch={usersPagination.refetch}
      />
      <DeleteUserDialog
        open={openDeleteUserDialog}
        setOpen={setOpenDeleteUserDialog}
        refetch={usersPagination.refetch}
      />
      <UpdateUserRolesDialog
        open={openUpdateUserRolesDialog}
        setOpen={setOpenUpdateUserRolesDialog}
        refetch={usersPagination.refetch}
      />
    </>
  );
};

export default ActiveUsersTab;
