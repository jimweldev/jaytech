import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ProductModel } from '@/04_types/product/product-model';
import useProductModelStore from '@/05_stores/product/product-model-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateModelDialog from './_dialogs/create-model-dialog';
import DeleteModelDialog from './_dialogs/delete-model-dialog';
import UpdateModelDialog from './_dialogs/update-model-dialog';

type AddProductModelType = {
  product?: ProductModel;
};

const AddProductModel = ({ product }: AddProductModelType) => {
  // Store
  const { setSelectedProductModel } = useProductModelStore();

  // Dialog
  const [updateProductDialogOpen, setUpdateProductDialogOpen] = useState(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<ProductModel>({
    endpoint: '/models',
    defaultSort: 'id',
    params: "product_id=" + product?.id,
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Model', column: 'name' },
    { label: 'Description', column: 'description' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setCreateProductDialogOpen(true)}>
      Add Model
    </Button>
  );

  return (
    <>
      <div className="col-span-12">
        {/* Card */}
        <Card>
          <CardHeader size="compact">
            <CardTitle>Models</CardTitle>
          </CardHeader>
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
                    <TableCell>
                      {getDateTimezone(product.created_at)}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button variant="info" size="icon-xs" onClick={() => {
                            setSelectedProductModel(product);
                            setUpdateProductDialogOpen(true);
                          }}>
                            <FaPenToSquare />
                          </Button>
                        </Tooltip>

                        {/* Delete button */}
                        <Tooltip content="Delete">
                          <Button
                            variant="destructive"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedProductModel(product);
                              setDeleteProductDialogOpen(true);
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
      </div>

      <DeleteModelDialog
        open={deleteProductDialogOpen}
        setOpen={setDeleteProductDialogOpen}
        refetch={tasksPagination.refetch}
      />

      <CreateModelDialog
        open={createProductDialogOpen}
        setOpen={setCreateProductDialogOpen}
        refetch={tasksPagination.refetch}
        product={product}
      />

      <UpdateModelDialog
        open={updateProductDialogOpen}
        setOpen={setUpdateProductDialogOpen}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default AddProductModel;
