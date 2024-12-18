import React, { useEffect } from "react";
import { Scenario } from "../types.ts";
import { useCallback, useState } from "react";

interface ScenariosContextType {
  scenarios: Scenario[];
  getScenario: (id: string) => Scenario | undefined;
  deleteScenario: (scenario?: Scenario) => void;
  addScenario: (newScenario: Scenario) => void;
  updateScenario: (originalScenarioId: string, newScenario: Scenario) => void;
}

export const ScenariosContext = React.createContext<ScenariosContextType>({
  scenarios: [],
  getScenario: () => undefined,
  deleteScenario: () => null,
  addScenario: () => null,
  updateScenario: () => null,
});

interface ScenarioContextProviderProps {
  children: React.ReactNode;
}
export const ScenarioContextProvider = ({
  children,
}: ScenarioContextProviderProps) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const getScenarios = useCallback(async () => {
    try {
      const scenarioRes = await fetch("http://localhost:3000/scenarios");
      const sc = await scenarioRes.json();
      setScenarios(sc);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getScenarios();
  }, [getScenarios]);

  const getScenario = useCallback(
    (id: string) => scenarios.find((sc) => sc.id === id),
    [scenarios],
  );

  const deleteScenario = useCallback(
    async (scenario?: Scenario) => {
      if (!scenario) {
        return;
      }
      try {
        await fetch(`http://localhost:3000/scenarios/${scenario.id}`, {
          method: "DELETE",
        });

        getScenarios();
      } catch (e) {
        console.error(e);
      }
    },
    [getScenarios],
  );

  const addScenario = useCallback(async (newScenario: Scenario) => {
    try {
      await fetch("http://localhost:3000/scenarios", {
        method: "POST",
        body: JSON.stringify(newScenario),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateScenario = useCallback(
    async (originalScenarioId: string, newScenario: Scenario) => {
      if (!originalScenarioId || !newScenario) {
        return;
      }

      try {
        await fetch(`http://localhost:3000/scenarios/${originalScenarioId}`, {
          method: "PUT",
          body: JSON.stringify(newScenario),
          headers: {
            "Content-Type": "application/json",
          },
        });

        getScenarios();
      } catch (e) {
        console.error(e);
      }
    },
    [getScenarios],
  );

  return (
    <ScenariosContext.Provider
      value={{
        scenarios,
        getScenario,
        deleteScenario,
        addScenario,
        updateScenario,
      }}
    >
      {children}
    </ScenariosContext.Provider>
  );
};
