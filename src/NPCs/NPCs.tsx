import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useContext } from "react";
import { NPCsContext } from "@/NPCs/hooks/npcs.tsx";

export const NPCs = () => {
  const { npcs } = useContext(NPCsContext);

  const location = useLocation();
  const isChildRoute =
    location.pathname.startsWith("/npcs/") && location.pathname !== "/npcs/";

  return (
    <div
      className={`max-w-5xl mx-auto ${
        isChildRoute ? "grid grid-cols-2 gap-4" : "space-y-4"
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 pb-2">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            NPCs
          </h2>
          <Link to="/npcs/new">
            <Button variant="default">Add</Button>
          </Link>
        </div>

        {npcs.map((npc, index) => (
          <Link to={`/npcs/${npc?.id}`} key={index}>
            <Card>
              <CardHeader>
                <CardTitle>{npc.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {npc.description}
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
