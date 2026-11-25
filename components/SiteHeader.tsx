'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home', isActive: (path: string) => path === '/' },
  { href: '/prompts', label: 'Browse prompts', isActive: (path: string) => path === '/prompts' || (/^\/prompts\/[^/]+$/.test(path) && !['saved', 'add', 'edit'].includes(path.split('/')[2])) },
  { href: '/prompts/saved', label: 'Collections', isActive: (path: string) => path === '/prompts/saved' },
  { href: '/prompts/add', label: 'Add prompt', isActive: (path: string) => path === '/prompts/add' || path.startsWith('/prompts/edit/') },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:px-10">
        <Link href="/" className="rounded-lg text-xl font-bold tracking-tight text-blue-950 transition hover:text-blue-700 sm:text-2xl">
          AI Prompt Marketplace
        </Link>
        <nav aria-label="Main navigation" className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto">
          {links.map((link) => {
            const active = link.isActive(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors sm:px-5 ${active ? 'bg-blue-950 text-white shadow-sm' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-950'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
