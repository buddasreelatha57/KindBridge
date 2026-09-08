import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Protected Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EducationSupports from "./pages/EducationSupports";
import Donate from "./pages/Donate";
import SuccessStoriesPage from "./pages/SuccessStories";
import ContactPage from "./pages/Contact";

// User Pages
import Dashboard from "./pages/Dashboard";
import MyDonations from "./pages/MyDonations";
import Profile from "./pages/Profile";

// User Layout
import DashboardLayout from "./components/DashboardLayout";

// Admin Layout
import AdminLayout from "./components/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageCampaigns from "./pages/ManageCampaigns";
import AddCampaign from "./pages/AddCampaign";
import AdminDonations from "./pages/AdminDonations";
import AdminUsers from "./pages/AdminUsers";
import Reports from "./pages/Reports";
import AdminProfile from "./pages/AdminProfile";
import EditCampaign from "./pages/EditCampaign";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/supports" element={<EducationSupports />} />
        <Route path="/support" element={<EducationSupports />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/donate/:id" element={<Donate />} />
        <Route path="/my-donations" element={
          <ProtectedRoute>
            <MyDonations />
          </ProtectedRoute>
        } />

       
        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="supports"
            element={<EducationSupports />}
          />

          <Route
            path="my-donations"
            element={<MyDonations />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="donate/:id"
            element={<Donate />}
          />
        </Route>

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route
            path="campaigns"
            element={<ManageCampaigns />}
          />

          <Route
            path="add-campaign"
            element={<AddCampaign />}
          />

          <Route
            path="donations"
            element={<AdminDonations />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />


          <Route
            path="profile"
            element={<AdminProfile />}
          />
        </Route>

        <Route
 path="/admin/campaigns/edit/:id"
 element={<EditCampaign />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;