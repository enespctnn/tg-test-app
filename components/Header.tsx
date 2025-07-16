import { Home } from 'lucide-react';
import LinkButton from '@/components/LinkButton';

function Header() {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-center gap-2">
          <li>
            <LinkButton href="/">
              <Home /> Home
            </LinkButton>
          </li>
          <li>
            <LinkButton href="/custom-form">Custom Form</LinkButton>
          </li>

          <li>
            <LinkButton href="/react-hook-form">React Hook Form</LinkButton>
          </li>

          <li>
            <LinkButton href="/react-hook-form-with-yup">React Hook Form With Yup</LinkButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
