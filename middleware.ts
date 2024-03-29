import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  function isRoutePublic(route: string) {
    // Check if the route matches any of the patterns in publicRoutes
    return publicRoutes.some((pattern) => {
      // If the pattern ends with '/*', treat it as a wildcard match
      if (pattern.endsWith("/*")) {
        const prefix = pattern.slice(0, -2); // Remove '/*' from the pattern
        // Check if the route starts with the prefix
        return route.startsWith(prefix);
      } else {
        // Otherwise, treat it as an exact match
        return route === pattern;
      }
    });
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = isRoutePublic(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      // Adding nextUrl as the second parameter will make the path absolute
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedin && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
