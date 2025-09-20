import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { Product } from '@/04_types/product/product';
import useProductStore from '@/05_stores/product/product-store';
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
import CreateProductDialog from './_dialogs/create-product-dialog';
import DeleteProductDialog from './_dialogs/delete-product-dialog';
import UpdateProductDialog from './_dialogs/update-product-dialog';

const ProductsPage = () => {
  // Store
  const { setSelectedProduct } = useProductStore();

  // Dialog
  const [updateProductDialogOpen, setUpdateProductDialogOpen] = useState(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<Product>({
    endpoint: '/products',
    defaultSort: 'category,brand',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Category', column: 'category,brand' },
    { label: 'Name', column: 'name' },
    { label: 'Brand', column: 'brand' },
    { label: 'Description', column: 'description' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setCreateProductDialogOpen(true)}>
      Add Product
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Products</PageHeader>

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
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.description}</TableCell>
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
                              setSelectedProduct(product);
                              setUpdateProductDialogOpen(true);
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
                              setSelectedProduct(product);
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

      {/* Update Product Dialog */}
      <UpdateProductDialog
        open={updateProductDialogOpen}
        setOpen={() => {
          setUpdateProductDialogOpen(false);
        }}
        refetch={tasksPagination.refetch}
      />

      {/* Delete Product Dialog */}
      <DeleteProductDialog
        open={deleteProductDialogOpen}
        setOpen={() => {
          setDeleteProductDialogOpen(false);
        }}
        refetch={tasksPagination.refetch}
      />

      {/* Create Product Dialog */}
      <CreateProductDialog
        open={createProductDialogOpen}
        setOpen={() => {
          setCreateProductDialogOpen(false);
        }}
        refetch={tasksPagination.refetch}
      />
    </>
  );
};

export default ProductsPage;
