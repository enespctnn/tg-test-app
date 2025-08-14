import QueryClientWrapper from '@/lib/store/QueryClient';

function Layout({ children }: { children: React.ReactNode }) {
  return <QueryClientWrapper>{children}</QueryClientWrapper>;
}

export default Layout;
