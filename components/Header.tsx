import { DockIcon, Home } from 'lucide-react';
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
            <LinkButton href="/custom-form">
              <DockIcon /> Forms
            </LinkButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
