import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { History } from './pages/History';
import { Timeline } from './pages/Timeline';
import { FlipbookArchive } from './pages/FlipbookArchive';
import { Contact } from './pages/Contact';
import { Reader } from './pages/Reader';
export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/flipbook" element={<FlipbookArchive />} />
        <Route path="/flipbook/read" element={<Reader />} />
        <Route path="/flipbook/read/:section" element={<Reader />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>);

}