import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Noto_Sans } from 'next/font/google';
import { useRouter } from 'next/router';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
});

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <main className={notoSans.className}>
        {router.pathname === '/auth' ? null : <Sidebar />}
        <div>{children}</div>
      </main>
    </>
  );
}
