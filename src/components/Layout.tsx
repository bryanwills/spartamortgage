import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <header className="py-6 px-4 bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold gradient-text">Sparta Mortgage</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {children}
      </main>
      <footer className="py-4 px-4 bg-white dark:bg-gray-900 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sparta Mortgage. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
