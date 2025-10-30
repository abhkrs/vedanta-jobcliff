'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePreloader } from './PreloaderContext';

export default function PreloaderLink({ href, children, className, ...props }) {
  const router = useRouter();
  const { startLoading } = usePreloader();

  const handleClick = (e) => {
    e.preventDefault();
    startLoading();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
