import { USER_ROLE } from "@prisma/client";
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
  Wrench,
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
    label: "Manage",
    href: "/dashboard/manage",
    icon: Wrench,
    accessLevel: USER_ROLE.ADMIN,
  },
  {
    label: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
    accessLevel: USER_ROLE.USER,
  },
  {
    label: "Channels",
    href: "/dashboard/channels",
    icon: Tv,
    accessLevel: USER_ROLE.CREATOR,
  },
];
