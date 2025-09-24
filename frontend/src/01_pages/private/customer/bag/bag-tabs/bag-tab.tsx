import { useParams } from 'react-router';
import type { ProductBooking } from '@/04_types/product/product-booking';
import DataTable from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import DataTableGridSkeleton from '@/components/skeleton/data-table-grid-skeleton';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';

const BagTab = () => {
  const [fancyboxRef] = useFancybox();
  const { bagTab } = useParams();

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<ProductBooking>({
    endpoint: '/bookings/user',
    defaultSort: 'created_at',
    params: bagTab !== 'all' ? `status=${bagTab}` : '',
  });

  return (
    <div className="flex flex-col gap-3" ref={fancyboxRef}>
      <DataTable
        pagination={tasksPagination}
        defaultView="grid"
        gridSkeleton={<DataTableGridSkeleton count={tasksPagination.limit} />}
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
                        data-caption={item.address}
                      >
                        <div className="outline-primary border-card relative flex aspect-square size-full w-16 items-center overflow-hidden rounded-sm border-1 outline-2 select-none">
                          <ReactImage
                            className="pointer-events-none size-full object-cover"
                            src={item.image}
                            alt={item.address}
                          />
                        </div>
                      </FancyboxViewer>

                      {/* Details */}
                      <div className="ml-3 flex flex-col gap-1">
                        <p className="text-sm font-semibold">{item.address}</p>
                        <p className="text-muted-foreground text-xs">
                          ${item.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </DataTable>
    </div>
  );
};

export default BagTab;
