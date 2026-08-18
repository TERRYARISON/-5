import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import Journal from '@/pages/Journal';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

// Nested-route pattern: Layout renders <Outlet/>, so all pages are children
// of the layout route (see react-dev.md "Layout + routing contract").
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="journal" element={<Journal />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
