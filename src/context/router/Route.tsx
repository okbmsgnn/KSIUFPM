import { useRouter } from './useRouter';

interface RouteProps {
  children: JSX.Element;
  route: string;
  exact?: boolean;
}

const routeMatches = (
  route: string,
  location: string,
  exact: boolean
) => {
  if (exact) return route === location;

  return route.startsWith(location);
};

export const Route = ({
  exact = true,
  route,
  children,
}: RouteProps) => {
  const router = useRouter();

  return routeMatches(route, router.location, exact)
    ? children
    : null;
};
