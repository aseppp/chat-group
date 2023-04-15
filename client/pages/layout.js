import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Noto_Sans } from 'next/font/google';
import { getToken } from '@/utils';
import { useEffect } from 'react';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function Layout({ children }) {
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      router.push('/auth');
    }
  }, [token]);

  return (
    <>
      <main className={notoSans.className}>
        {router.pathname === '/auth' ? null : <Sidebar />}
        <div>{children}</div>
      </main>
    </>
  );
}
