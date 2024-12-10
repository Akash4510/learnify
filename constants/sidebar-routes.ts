import {
  BarChart3,
  Compass,
  Home,
  IndianRupee,
  Info,
  LucideIcon,
  Mail,
  Settings,
  Tv,
  User,
  Wrench,
} from "lucide-react";

type NavRoute = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainRoutes: NavRoute[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
];

export const dashboardRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Courses",
    href: "/dashboard/my-courses",
    icon: Tv,
  },
  {
    label: "Affiliate",
    href: "/dashboard/affiliate",
    icon: IndianRupee,
  },

  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Account",
    href: "/dashboard/account",
    icon: User,
  },
];

export const creatorDashboardRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/creator-dashboard",
    icon: BarChart3,
  },
  {
    label: "Channels",
    href: "/creator-dashboard/channels",
    icon: Tv,
  },
];

export const adminDashboarRoutes: NavRoute[] = [
  {
    label: "Analytics",
    href: "/admin-dashboard",
    icon: BarChart3,
  },
  {
    label: "Creator access requests",
    href: "/admin-dashboard/creator-access-requests",
    icon: Wrench,
  },
];
