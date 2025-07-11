import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

function LinkButton({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`${buttonVariants()} ${className}`}
    />
  );
}

export default LinkButton;
