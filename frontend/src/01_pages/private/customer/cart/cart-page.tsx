import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { UserCart } from '@/04_types/user/user-cart';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import useUserCartStore from '@/05_stores/user/user-cart-store';
import DataTable from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import DataTableGridSkeleton from '@/components/skeleton/data-table-grid-skeleton';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import LoginToContinueShopping from '../_components/login-to-continue-shopping-component';
import DeleteUserCartDialog from './_dialogs/delete-task-dialog';

const CartPage = () => {
  const navigate = useNavigate();
  const [fancyboxRef] = useFancybox();

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<UserCart>({
    endpoint: '/user-carts',
    defaultSort: 'created_at',
  });
  const { user } = useAuthUserStore();
  const { setSelectedUserCart } = useUserCartStore();

  const [openDeleteUserCartDialog, setOpenDeleteUserCartDialog] =
    useState(false);

  return (
    <div>
      <PageHeader className="mb-3">Shopping Cart</PageHeader>

      <Card>
        <CardBody className="flex flex-col gap-3" ref={fancyboxRef}>
          {!user ? (
            <LoginToContinueShopping />
          ) : (
            <DataTable
              pagination={tasksPagination}
              defaultView="grid"
              gridSkeleton={
                <DataTableGridSkeleton count={tasksPagination.limit} />
              }
            >
              {/* Render rows only if data is present */}
              {tasksPagination.data?.records ? (
                <div className="grid gap-2">
                  {tasksPagination.data.records.map(item => (
                    <div key={item.id}>
                      <div className="p-layout flex items-center rounded-sm border">
                        <div className="flex flex-1 gap-2">
                          <div className="flex items-start">
                            {/* Image */}
                            <FancyboxViewer
                              baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                              filePath=""
                              data-fancybox={item.id}
                              data-caption={item.label}
                            >
                              <div className="outline-primary border-card relative flex aspect-square size-full w-16 items-center overflow-hidden rounded-sm border-1 outline-2 select-none">
                                <ReactImage
                                  className="pointer-events-none size-full object-cover"
                                  src={item.image}
                                  alt={item.label}
                                />
                              </div>
                            </FancyboxViewer>

                            {/* Details */}
                            <div className="ml-3 flex flex-col gap-1">
                              <p className="text-sm font-semibold">
                                {item.label}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                ${item.amount}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex basis-[150px] flex-col gap-1">
                          <Button
                            className="w-full"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setOpenDeleteUserCartDialog(true);
                              setSelectedUserCart(item);
                            }}
                          >
                            Remove
                          </Button>
                          <Button
                            className="w-full"
                            size="sm"
                            onClick={() => {
                              navigate('/cart/checkout');
                              setSelectedUserCart(item);
                            }}
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </DataTable>
          )}
        </CardBody>
      </Card>

      <DeleteUserCartDialog
        open={openDeleteUserCartDialog}
        setOpen={setOpenDeleteUserCartDialog}
        refetch={tasksPagination.refetch}
      />
    </div>
  );
};

export default CartPage;
