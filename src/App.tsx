import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import AddItemForm from "./components/AddItemForm";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails.tsx";

function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/containers">Containers</Link></li>
          <li><Link to="/add-item">Add Item</Link></li>
          <li><Link to="/items">Items</Link></li>
        </ul>
      </nav>

      <Layout>
        <Routes>
          {/* Явно указать маршрут для главной страницы */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/add-item" element={<AddItemForm />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetails />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;



