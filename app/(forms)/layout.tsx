'use client';

import { usePathname } from 'next/navigation';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grow flex flex-col items-center">
      <div className="bg-gradient-to-b  from-gray-100 to-gray-300 backdrop-blur-sm px-10 py-8 rounded-xl outline-black shadow space-y-8">
        <h1 className="capitalize text-3xl">{pathname.replace('/', '').replace(/-/g, ' ')}</h1>
        {children}
      </div>
    </div>
  );
}

export default Layout;
