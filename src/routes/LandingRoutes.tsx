
import React from "react";
import { RouteObject } from "react-router-dom";

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
import RealEstateLandingPage from "@/pages/landing/RealEstateLandingPage";
import PricingPage from "@/pages/plans/PricingPage";

// Demo Page
import DemoPage from "@/pages/demo/DemoPage";
import RealEstateDemoPage from "@/pages/demo/RealEstateDemoPage";

const LandingRoutes = (): RouteObject[] => {
  return [
    {
      path: "/landing",
      element: <LandingPage />
    },
    {
      path: "/landing/segments",
      element: <LandingSegmentsPage />
    },
    {
      path: "/landing/beauty",
      element: <BeautyLandingPage />
    },
    {
      path: "/landing/food",
      element: <FoodLandingPage />
    },
    {
      path: "/landing/freelancer",
      element: <FreelancerLandingPage />
    },
    {
      path: "/landing/ecommerce",
      element: <EcommerceLandingPage />
    },
    {
      path: "/landing/content-creator",
      element: <ContentCreatorLandingPage />
    },
    {
      path: "/landing/education",
      element: <EducationLandingPage />
    },
    {
      path: "/landing/hr",
      element: <HRLandingPage />
    },
    {
      path: "/landing/accounting",
      element: <AccountingLandingPage />
    },
    {
      path: "/landing/realestate",
      element: <RealEstateLandingPage />
    },
    {
      path: "/landing/pricing",
      element: <PricingPage />
    },
    {
      path: "/demo",
      element: <DemoPage />
    },
    {
      path: "/demo/:segment",
      element: <DemoPage />
    },
    {
      path: "/demo/realestate",
      element: <RealEstateDemoPage />
    }
  ];
};

export default LandingRoutes;
