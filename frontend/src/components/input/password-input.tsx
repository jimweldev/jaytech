import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const PasswordInput = ({ ...props }) => {
  const [isTypePassword, setIsTypePassword] = useState(true);

  return (
    <div className="relative">
      <Input
        className={cn('pr-10', props.className)} // ensure space for icon
        {...props}
        type={isTypePassword ? 'password' : 'text'}
      />
      <button
        type="button"
        onClick={() => setIsTypePassword(!isTypePassword)}
        className={cn(
          'text-ring absolute top-1/2 -translate-y-1/2',
          props.inputSize === 'sm' && 'right-3 text-xs',
          props.inputSize === 'lg' && 'right-2.5',
          (props.inputSize === 'default' || props.inputSize === undefined) &&
            'right-2.5 text-sm',
        )}
        tabIndex={-1}
      >
        {isTypePassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
