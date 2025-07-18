import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

interface LinkButtonProps extends React.ComponentProps<typeof Link>, VariantProps<typeof buttonVariants> {}

function LinkButton({ className = '', variant, size, ...props }: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={buttonVariants({ variant, size, className })}
      prefetch={false}
    />
  );
}

export default LinkButton;
