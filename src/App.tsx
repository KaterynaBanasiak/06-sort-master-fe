import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./layouts/Layout";
import Containers from "./pages/Containers";
import CreateContainerForm from "./components/CreateContainerForm";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/containers">Containers</Link></li>
          <li><Link to="/container-form">Create Container</Link></li>
          <li><Link to="/add-item">Add Item</Link></li>
        </ul>
      </nav>

      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/container-form" element={<CreateContainerForm />} />
          <Route path="/add-item" element={<AddItemForm />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;


