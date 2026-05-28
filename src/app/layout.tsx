'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    href: '/dashboard/markets',
    label: 'Markets',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 12l3-4 3 2 4-6 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    href: '/dashboard/trade',
    label: 'Trade',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    href: '/dashboard/deposit',
    label: 'Deposit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    href: '/dashboard/withdraw',
    label: 'Withdraw',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 10V2M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <path d="M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    href: '/dashboard/support',
    label: 'Support',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 9V8c1.1 0 2-0.9 2-2s-.9-2-2-2-2 .9-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600&display=swap');

        :root {
          --cream: #f5f0e8;
          --cream-dark: #ede7d9;
          --cream-darker: #e0d9cc;
          --ink: #1a1512;
          --ink-mid: #3d352e;
          --ink-light: #7a6e65;
          --red: #c9170a;
          --red-dark: #9e1108;
          --red-glow: rgba(201,23,10,0.10);
          --serif: 'Playfair Display', Georgia, serif;
          --mono: 'DM Mono', monospace;
          --sans: 'Manrope', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .db-shell {
          min-height: 100vh;
          background: var(--cream);
          font-family: var(--sans);
          display: flex;
        }

        /* ── SIDEBAR ── */
        .db-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: var(--ink);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 50;
          transition: transform 0.3s ease;
        }

        .db-sidebar-logo {
          padding: 28px 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .db-logo-text {
          font-family: var(--serif);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cream);
          text-decoration: none;
          display: block;
        }
        .db-logo-text span { color: var(--red); }
        .db-logo-sub {
          font-family: var(--mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #444;
          margin-top: 4px;
        }

        .db-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }
        .db-nav-section {
          padding: 0 16px;
          margin-bottom: 4px;
        }
        .db-nav-section-label {
          font-family: var(--mono);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #333;
          padding: 8px 8px 6px;
          display: block;
        }
        .db-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: #666;
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          position: relative;
          margin-bottom: 1px;
        }
        .db-nav-item:hover { color: #c8bfb5; background: rgba(255,255,255,0.03); }
        .db-nav-item.active {
          color: var(--cream);
          background: rgba(255,255,255,0.05);
        }
        .db-nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 4px; bottom: 4px;
          width: 2px;
          background: var(--red);
        }

        .db-sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .db-signout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: #555;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.15s;
          text-align: left;
        }
        .db-signout-btn:hover { color: var(--red); }

        /* ── MAIN ── */
        .db-main {
          flex: 1;
          margin-left: 220px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ── TOPBAR ── */
        .db-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: var(--cream);
          border-bottom: 1px solid var(--cream-darker);
          padding: 0 40px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-topbar-title {
          font-family: var(--serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
        }
        .db-topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .db-topbar-badge {
          font-family: var(--mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #16a34a;
          background: rgba(22,163,74,0.08);
          border: 1px solid rgba(22,163,74,0.2);
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .db-topbar-badge::before {
          content: '';
          width: 5px; height: 5px;
          background: #16a34a;
          border-radius: 50%;
          display: inline-block;
        }
        .db-topbar-time {
          font-family: var(--mono);
          font-size: 0.62rem;
          color: var(--ink-light);
          letter-spacing: 0.08em;
        }

        /* ── PAGE CONTENT ── */
        .db-content {
          flex: 1;
          padding: 36px 40px;
          max-width: 1100px;
          width: 100%;
        }

        /* ── MOBILE TOPBAR ── */
        .db-mobile-bar {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 60;
          background: var(--ink);
          padding: 16px 20px;
          align-items: center;
          justify-content: space-between;
        }
        .db-hamburger {
          background: none;
          border: none;
          color: var(--cream);
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 768px) {
          .db-sidebar {
            transform: translateX(-100%);
          }
          .db-sidebar.open {
            transform: translateX(0);
          }
          .db-main { margin-left: 0; }
          .db-topbar { display: none; }
          .db-mobile-bar { display: flex; }
          .db-content { padding: 80px 20px 32px; }
        }
      `}</style>

      <div className="db-shell">
        {/* SIDEBAR */}
        <aside className={`db-sidebar ${mobileOpen ? 'open' : ''}`}>
          <div className="db-sidebar-logo">
            <Link href="/" className="db-logo-text">Apex<span>•</span>Markets</Link>
            <p className="db-logo-sub">Trading Terminal</p>
          </div>

          <nav className="db-nav">
            <div className="db-nav-section">
              <span className="db-nav-section-label">Main</span>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`db-nav-item ${pathname === item.href ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="db-sidebar-footer">
            <button
              className="db-signout-btn"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H2v10h3M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* MOBILE TOP BAR */}
        <div className="db-mobile-bar">
          <button className="db-hamburger" onClick={() => setMobileOpen((v) => !v)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
            </svg>
          </button>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1rem', fontWeight: 900, color: 'var(--cream)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Apex<span style={{ color: 'var(--red)' }}>•</span>Markets
          </span>
          <div style={{ width: 28 }} />
        </div>

        {/* MAIN */}
        <main className="db-main">
          <div className="db-topbar">
            <span className="db-topbar-title">
              {navItems.find((n) => n.href === pathname)?.label ?? 'Dashboard'}
            </span>
            <div className="db-topbar-right">
              <span className="db-topbar-badge">Markets Live</span>
              <span className="db-topbar-time" id="db-clock" suppressHydrationWarning>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="db-content">
            {children}
          </div>
        </main>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
              zIndex: 49, backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </div>
    </>
  );
}
