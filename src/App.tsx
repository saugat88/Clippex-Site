import { useState } from 'react';
import type { Role } from '@/data/types';
import { roleMeta } from '@/data/nav';
import { AppShell } from '@/components/layout/AppShell';
import { Landing } from '@/pages/landing/Landing';
import { Auth } from '@/pages/auth/Auth';
import { creatorPages } from '@/pages/creator';
import { brandPages } from '@/pages/brand';
import { adminPages } from '@/pages/admin';
import { SettingsPage } from '@/pages/shared/Settings';
import { getCurrentSession, clearSession, type AuthUser } from '@/data/auth';

type View = 'landing' | 'auth' | 'app';

const pagesByRole: Record<Role, Record<string, () => JSX.Element>> = {
  creator: creatorPages,
  brand: brandPages,
  admin: adminPages,
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentSession());
  const [view, setView] = useState<View>(() => (getCurrentSession() ? 'app' : 'landing'));
  const [page, setPage] = useState(() => {
    const session = getCurrentSession();
    return session ? roleMeta[session.role].defaultPage : 'dashboard';
  });

  if (view === 'landing') {
    return (
      <Landing
        onEnter={() => {
          if (currentUser) {
            setView('app');
          } else {
            setView('auth');
          }
        }}
      />
    );
  }

  if (view === 'auth' || !currentUser) {
    return (
      <Auth
        onBack={() => setView('landing')}
        onAuth={(user) => {
          setCurrentUser(user);
          setPage(roleMeta[user.role].defaultPage);
          setView('app');
        }}
      />
    );
  }

  const role = currentUser.role;
  const isSettings = page === 'settings';
  const Page = pagesByRole[role][page] ?? pagesByRole[role].dashboard;

  const handleExit = () => {
    clearSession();
    setCurrentUser(null);
    setView('landing');
  };

  return (
    <AppShell
      user={currentUser}
      page={page}
      onNavigate={setPage}
      onExit={handleExit}
    >
      {isSettings ? (
        <SettingsPage user={currentUser} onSignOut={handleExit} />
      ) : (
        <Page />
      )}
    </AppShell>
  );
}
