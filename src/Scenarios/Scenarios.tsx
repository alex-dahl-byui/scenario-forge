import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useContext } from "react";
import { ScenariosContext } from "@/Scenarios/hooks/scenarios.tsx";

export const Scenarios = () => {
  const { scenarios } = useContext(ScenariosContext);

  const location = useLocation();
  const isChildRoute =
    location.pathname.startsWith("/scenarios/") &&
    location.pathname !== "/scenarios/";

  return (
    <div
      className={`max-w-5xl mx-auto ${
        isChildRoute ? "grid grid-cols-2 gap-4" : "space-y-4"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 pb-2">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            Scenarios
          </h2>
          <Link to="/scenarios/new">
            <Button variant="default">Create</Button>
          </Link>
        </div>

        {scenarios.map((scenario, index) => (
          <Link to={`/scenarios/${scenario?.id}`} key={index}>
            <Card>
              <CardHeader>
                <CardTitle>{scenario.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {scenario.children[0]}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {isChildRoute && (
        <div className="space-y-4">
          <Outlet />
        </div>
      )}
    </div>
  );
};
