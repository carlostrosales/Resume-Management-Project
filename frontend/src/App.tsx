import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import Navbar from "./components/navbar/Navbar.components";
import {Routes, Route} from "react-router-dom";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.components";

// Import with lazy loading
const Home = lazy(() => import("./pages/home/Home.page"));
const Companies = lazy(() => import("./pages/companies/Companies.page"));
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/jobs/Jobs.page"));


const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";
  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies">
              <Route index element={<Companies />} />
              <Route path="add" element={<AddCompany />} />
            </Route>
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              {/* <Route path="add" element={<AddJob />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
