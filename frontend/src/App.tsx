import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
import ExpandedEvents from "./pages/ExpandedEvents";
import ManageEvents from "./pages/ManageEvents";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import SavedEvents from "./pages/SavedEvents";
import OnlineEvents from "./pages/OnlineEvents";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route
            path="/categories/:category/:subcategory"
            element={<ExpandedEvents />}
          />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:country" element={<Location />} />
          <Route path="/online" element={<OnlineEvents />} />

          <Route path="/organize/create-event" element={<CreateEvent />} />
          <Route path="/organize/manage-events" element={<ManageEvents />} />

          <Route path="/account" element={<Profile />} />
          <Route path="/saved-events" element={<SavedEvents />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </ScrollToTop>
  );
}

export default App;
