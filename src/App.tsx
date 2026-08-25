import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Work from '@/pages/Work';
import Novels from '@/pages/Novels';
import Amulet from '@/pages/Amulet';
import AppLab from '@/pages/AppLab';
import Journal from '@/pages/Journal';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// Nested-route pattern: Layout renders <Outlet/>, so all pages are children
// of the layout route (see react-dev.md "Layout + routing contract").
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="novels" element={<Novels />} />
        <Route path="amulet" element={<Amulet />} />
        <Route path="app-lab" element={<AppLab />} />
        <Route path="journal" element={<Journal />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
