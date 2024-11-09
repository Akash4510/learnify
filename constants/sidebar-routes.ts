import {
  BarChart3,
  Compass,
  Home,
  Info,
  Mail,
  Settings,
  Tv,
  Tv2,
  Video,
} from "lucide-react";

export const mainRoutes = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "My Courses",
    href: "/courses",
    icon: Tv2,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Compass,
  },
  // {
  //   label: "Live",
  //   href: "/live",
  //   icon: Video,
  // },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
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

export const dashboardRoutes = [
  {
    label: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Channels",
    href: "/dashboard/channels",
    icon: Tv,
  },
];
