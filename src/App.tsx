import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Timeline } from './pages/Timeline';
import { FlipbookArchive } from './pages/FlipbookArchive';
import { Contact } from './pages/Contact';
import { Reader } from './pages/Reader';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/flipbook" element={<FlipbookArchive />} />
        <Route path="/flipbook/read" element={<Reader />} />
        <Route path="/flipbook/read/:section" element={<Reader />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>);

}