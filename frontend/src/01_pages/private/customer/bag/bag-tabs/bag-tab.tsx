import useCartItemsStore from '@/05_stores/cart-item-store';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import useFancybox from '@/hooks/fancybox/use-fancybox';

const BagTab = () => {
  const [fancyboxRef] = useFancybox();

  const { cartItems } = useCartItemsStore();

  return (
    <div className="flex flex-col gap-3" ref={fancyboxRef}>
      {cartItems.map(item => (
        <div key={item.id}>
          <div className="p-layout flex items-center rounded-sm border">
            <div className="flex flex-1 gap-2">
              <div className="flex items-start">
                {/* Image */}
                <FancyboxViewer
                  baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                  filePath=""
                  data-fancybox={item.id}
                  data-caption={item.name}
                >
                  <div className="outline-primary border-card relative flex aspect-square size-full w-16 items-center overflow-hidden rounded-sm border-1 outline-2 select-none">
                    <ReactImage
                      className="pointer-events-none size-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                </FancyboxViewer>

                {/* Details */}
                <div className="ml-3 flex flex-col gap-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-muted-foreground text-xs">${item.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BagTab;
