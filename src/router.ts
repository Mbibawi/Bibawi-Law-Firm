let currentRoute: Route = { path: "/", view: "home" };
const listeners: ((route: Route) => void)[] = [];

export const getRoute = () => currentRoute;

export const navigate = (path: string) => {
  window.location.hash = path;
  updateRoute();
};

export const updateRoute = () => {
  const path = window.location.hash.replace("#", "") || "/";
  let view = "home";
  let params: Record<string, string> = {};

  if (path === "/") {
    view = "home";
  } else if (path.startsWith("/post/")) {
    view = "post";
    params = { id: path.replace("/post/", "") };
  } else if (path === "/search") {
    view = "search";
  }

  currentRoute = { path, view, params };
  listeners.forEach((l) => l(currentRoute));
};

export const onRouteLinkClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const anchor = target.closest("a");
  if (anchor && anchor.getAttribute("href")?.startsWith("/")) {
    e.preventDefault();
    navigate(anchor.getAttribute("href")!);
  }
};

export const subscribeToRoute = (listener: (route: Route) => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};

window.addEventListener("hashchange", updateRoute);
window.addEventListener("click", onRouteLinkClick);
