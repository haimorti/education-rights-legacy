/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Accessibility from './pages/Accessibility';
import Application from './pages/Application';
import Benefits from './pages/Benefits';
import Contact from './pages/Contact';
import Eligibility from './pages/Eligibility';
import Equipment from './pages/Equipment';
import Faq from './pages/Faq';
import Home from './pages/Home';
import Housing from './pages/Housing';
import RehabAllowance from './pages/RehabAllowance';
import Transport from './pages/Transport';
import Tuition from './pages/Tuition';
import Tutoring from './pages/Tutoring';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Accessibility": Accessibility,
    "Application": Application,
    "Benefits": Benefits,
    "Contact": Contact,
    "Eligibility": Eligibility,
    "Equipment": Equipment,
    "Faq": Faq,
    "Home": Home,
    "Housing": Housing,
    "RehabAllowance": RehabAllowance,
    "Transport": Transport,
    "Tuition": Tuition,
    "Tutoring": Tutoring,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};