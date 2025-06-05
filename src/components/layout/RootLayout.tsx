import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SkipLink from '@/components/common/SkipLink';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header />
      <ErrorBoundary>
        <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default RootLayout;