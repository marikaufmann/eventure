import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./layouts/Layout";
import { Toaster } from "./components/ui/toaster";
import Terms from "./pages/TermsPage";
import Privacy from "./pages/PrivacyPage";
import Categories from "./pages/CategoriesPage";
import Category from "./pages/CategoryPage";
import Locations from "./pages/LocationsPage";
import LocationPage from "./pages/LocationPage";
import ExpandedEventsPage from "./pages/ExpandedEventsPage";
import ManageEvents from "./pages/ManageEventsPage";
import CreateEvent from "./pages/CreateEventPage";
import Profile from "./pages/ProfilePage";
import SavedEvents from "./pages/SavedEventsPage";
import OnlineEvents from "./pages/OnlineEventsPage";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route
            path="/categories/:category/:subcategory"
            element={<ExpandedEventsPage />}
          />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:country" element={<LocationPage />} />
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
