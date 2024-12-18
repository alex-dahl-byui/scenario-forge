import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { Scenarios } from "@/Scenarios/Scenarios.tsx";
import { NPCs } from "@/NPCs/NPCs.tsx";
import { ScenariosEdit } from "@/Scenarios/ScenariosEdit.tsx";
import { ScenariosDetail } from "@/Scenarios/ScenariosDetail.tsx";
import { ScenarioContextProvider } from "@/Scenarios/hooks/scenarios.tsx";
import { ConfirmDialogProvider } from "@/components/utils/ConfirmContext.tsx";
import { NPCsEdit } from "@/NPCs/NPCsEdit.tsx";
import { NPCsDetail } from "@/NPCs/NPCsDetail.tsx";
import { NPCContextProvider } from "@/NPCs/hooks/npcs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Scenarios />,
  },
  {
    path: "/scenarios",
    element: <Scenarios />,
    children: [
      { path: "/scenarios/new", element: <ScenariosEdit /> },
      { path: "/scenarios:id", element: <ScenariosDetail /> },
      { path: "/scenarios:id/edit", element: <ScenariosEdit /> },
    ],
  },
  {
    path: "/npcs",
    element: <NPCs />,
    children: [
      { path: "/npcs/new", element: <NPCsEdit /> },
      { path: "/npcs:id", element: <NPCsDetail /> },
      { path: "/npcs:id/edit", element: <NPCsEdit /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ConfirmDialogProvider>
        <ScenarioContextProvider>
          <NPCContextProvider>
            <Header />
            <RouterProvider router={router} />
          </NPCContextProvider>
        </ScenarioContextProvider>
      </ConfirmDialogProvider>
    </>
  );
}

export default App;
