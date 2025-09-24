import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ---------- Card ----------
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground rounded-md shadow-xs',
        className,
      )}
      {...props}
    />
  );
}

// ---------- CardHeader with variants ----------
const cardHeaderVariants = cva('p-layout border-b', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    size: {
      default: 'p-4',
      compact: 'p-0',
      spacious: 'p-6',
    },
  },
  defaultVariants: {
    align: 'left',
    size: 'default',
  },
});

interface CardHeaderProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardHeaderVariants> {}

function CardHeader({ className, align, size, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants({ align, size }), className)}
      {...props}
    />
  );
}

// ---------- Other subcomponents ----------
function CardBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-body"
      className={cn('p-layout', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-muted-foreground text-sm font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-xs', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('p-layout border-t', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription };
