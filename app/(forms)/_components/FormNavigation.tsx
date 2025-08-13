'use client';

import { usePathname } from 'next/navigation';
import LinkButton from '@/components/LinkButton';

function FormNavigation() {
  const pathname = usePathname();
  return (
    <ul className="flex gap-2">
      <li>
        <LinkButton
          href="/custom-form"
          variant={pathname === '/custom-form' ? 'default' : 'secondary'}
        >
          Custom Form
        </LinkButton>
      </li>

      <li>
        <LinkButton
          href="/react-hook-form"
          variant={pathname === '/react-hook-form' ? 'default' : 'secondary'}
        >
          React Hook Form
        </LinkButton>
      </li>

      <li>
        <LinkButton
          href="/react-hook-form-with-yup"
          variant={pathname === '/react-hook-form-with-yup' ? 'default' : 'secondary'}
        >
          React Hook Form With Yup
        </LinkButton>
      </li>
    </ul>
  );
}

export default FormNavigation;
