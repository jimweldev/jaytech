import { useNavigate } from 'react-router';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import useCartItemsStore from '@/05_stores/cart-item-store';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import LoginToContinueShopping from '../_components/login-to-continue-shopping-component';

const CartPage = () => {
  const navigate = useNavigate();
  const [fancyboxRef] = useFancybox();

  const { cartItems, removeCartItem, setSelectedCartItem } =
    useCartItemsStore();
  const { user } = useAuthUserStore();

  return (
    <div>
      <PageHeader className="mb-3">Shopping Cart</PageHeader>

      <Card>
        <CardBody className="flex flex-col gap-3" ref={fancyboxRef}>
          {!user ? (
            <LoginToContinueShopping />
          ) : (
            cartItems.map(item => (
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
                        <p className="text-muted-foreground text-xs">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex basis-[100px] flex-col gap-2">
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </Button>
                    <Button
                      className="w-full"
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setSelectedCartItem(item);
                        navigate('/cart/checkout');
                      }}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CartPage;
