import { useState, useEffect } from "react";

const useCurrentRoute = () => {
  const [curRoute, setCurRoute] = useState<string | null>(null);

  useEffect(() => {
    // Read from localStorage after the component has mounted
    const storedRoute = localStorage.getItem("currentRoute") || "New Project";
    setCurRoute(storedRoute);
  }, []);

  const updateRoute = (newRoute: string) => {
    localStorage.setItem("currentRoute", newRoute);
    setCurRoute(newRoute);
  };

  return { curRoute, setCurRoute: updateRoute };
};

export default useCurrentRoute;
