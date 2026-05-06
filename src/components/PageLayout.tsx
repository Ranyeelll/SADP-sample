import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
export function PageLayout({ children }: {children: React.ReactNode;}) {
  return (
    <div className="parchment-bg min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
      <Footer />
    </div>);

}