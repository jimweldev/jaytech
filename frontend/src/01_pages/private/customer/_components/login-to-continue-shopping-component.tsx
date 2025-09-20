import { FaBasketShopping } from 'react-icons/fa6';

const LoginToContinueShopping = () => {
  return (
    <div className="text-muted-foreground p-layout flex flex-col items-center">
      <div className="p-layout">
        <FaBasketShopping className="size-12" />
      </div>
      <h4 className="text-center text-sm">Login to continue shopping</h4>
    </div>
  );
};

export default LoginToContinueShopping;
