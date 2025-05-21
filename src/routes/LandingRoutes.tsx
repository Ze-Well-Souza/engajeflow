
import React from "react";
import { Route } from "react-router-dom";
import RouteGroup from "./RouteGroup";

// Landing Pages
import LandingPage from "@/pages/landing/LandingPage";
import LandingSegmentsPage from "@/pages/landing/LandingSegmentsPage";
import BeautyLandingPage from "@/pages/landing/BeautyLandingPage";
import FoodLandingPage from "@/pages/landing/FoodLandingPage";
import FreelancerLandingPage from "@/pages/landing/FreelancerLandingPage";
import EcommerceLandingPage from "@/pages/landing/EcommerceLandingPage";
import ContentCreatorLandingPage from "@/pages/landing/ContentCreatorLandingPage";
import EducationLandingPage from "@/pages/landing/EducationLandingPage";
import HRLandingPage from "@/pages/landing/HRLandingPage";
import AccountingLandingPage from "@/pages/landing/AccountingLandingPage";
import PricingPage from "@/pages/plans/PricingPage";

const LandingRoutes: React.FC = () => {
  return (
    <RouteGroup>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/landing/segments" element={<LandingSegmentsPage />} />
      <Route path="/landing/beauty" element={<BeautyLandingPage />} />
      <Route path="/landing/food" element={<FoodLandingPage />} />
      <Route path="/landing/freelancer" element={<FreelancerLandingPage />} />
      <Route path="/landing/ecommerce" element={<EcommerceLandingPage />} />
      <Route path="/landing/content-creator" element={<ContentCreatorLandingPage />} />
      <Route path="/landing/education" element={<EducationLandingPage />} />
      <Route path="/landing/hr" element={<HRLandingPage />} />
      <Route path="/landing/accounting" element={<AccountingLandingPage />} />
      <Route path="/landing/pricing" element={<PricingPage />} />
    </RouteGroup>
  );
};

export default LandingRoutes;
