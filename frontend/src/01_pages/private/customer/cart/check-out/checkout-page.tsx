import useCartItemsStore from '@/05_stores/cart-item-store';
import PaymentButton from '@/components/button/payment-button';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import PageHeader from '@/components/typography/page-header';
import { Card, CardBody, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useFancybox from '@/hooks/fancybox/use-fancybox';

const CheckoutPage = () => {
  const [fancyboxRef] = useFancybox();

  const { selectedCartItem } = useCartItemsStore();

  if (!selectedCartItem) {
    return null;
  }

  return (
    <div ref={fancyboxRef}>
      <PageHeader className="mb-3">Checkout</PageHeader>

      <Card>
        <CardBody>
          <CardTitle className="mb-2">Order Details</CardTitle>

          <div className="mb-layout flex flex-1 gap-2">
            <div className="flex items-start">
              {/* Image */}
              <FancyboxViewer
                baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                filePath=""
                data-fancybox={selectedCartItem?.id}
                data-caption={selectedCartItem?.name}
              >
                <div className="outline-primary border-card relative flex aspect-square size-full w-16 items-center overflow-hidden rounded-sm border-1 outline-2 select-none">
                  <ReactImage
                    className="pointer-events-none size-full object-cover"
                    src={selectedCartItem?.image}
                    alt={selectedCartItem?.name}
                  />
                </div>
              </FancyboxViewer>

              {/* Details */}
              <div className="ml-3 flex flex-col gap-1">
                <p className="text-sm font-semibold">
                  {selectedCartItem?.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  €{selectedCartItem?.price}
                </p>
              </div>
            </div>
          </div>

          <CardTitle className="mb-2">Voucher</CardTitle>
          <div className="mb-layout">
            <Input placeholder="Enter voucher code" />
          </div>

          <CardTitle className="mb-2">Payment</CardTitle>
          <div className="mb-layout ml-auto sm:max-w-md">
            <table className="w-full text-sm">
              <tbody className="divide-border divide-y">
                <tr className="py-2">
                  <td className="py-3">Order Subtotal</td>
                  <td className="text-muted-foreground py-3 text-right font-medium">
                    €{selectedCartItem?.price}
                  </td>
                </tr>

                <tr>
                  <td className="py-3">Shipping Subtotal</td>
                  <td className="text-muted-foreground py-3 text-right font-medium">
                    €0.00
                  </td>
                </tr>

                <tr>
                  <td className="py-3">Voucher Discount</td>
                  <td className="text-muted-foreground py-3 text-right font-medium">
                    -€0.00
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold">Total Payment</td>
                  <td className="pt-4 pb-2 text-right text-lg font-semibold">
                    €{selectedCartItem?.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <PaymentButton
            endpoint="/tasks/create-payment-intent"
            orderDetails={{
              amount: selectedCartItem?.price * 100,
              description: 'Order #12345',
            }}
            label="Place order"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckoutPage;
