'use client';

import { usePathname } from 'next/navigation';

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grow flex flex-col items-center">
      <div className="bg-stone-300 px-10 py-8 rounded-xl outline-black shadow-lg shadow-stone-300 space-y-8 text-stone-700 max-w-full w-md">
        <h1 className="capitalize text-3xl">{pathname.replace('/', '').replace(/-/g, ' ')}</h1>
        {children}
      </div>
    </div>
  );
}

export default Layout;
