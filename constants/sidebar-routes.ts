import {
  BarChart3,
  Compass,
  Home,
  Settings,
  Tv,
  Tv2,
  User,
} from "lucide-react";

export const mainRoutes = [
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
    label: "Courses",
    href: "/courses",
    icon: Tv2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Account",
    href: "/account",
    icon: User,
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
