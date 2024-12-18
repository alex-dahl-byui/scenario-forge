import React, { useEffect } from "react";
import { NPC } from "../types.ts";
import { useCallback, useState } from "react";

interface NPCsContextType {
  npcs: NPC[];
  getNPC: (id: string) => NPC | undefined;
  deleteNPC: (npc?: NPC) => void;
  addNPC: (newNPC: NPC) => void;
  updateNPC: (originalNPCId: string, newNPC: NPC) => void;
}

export const NPCsContext = React.createContext<NPCsContextType>({
  npcs: [],
  getNPC: () => undefined,
  deleteNPC: () => null,
  addNPC: () => null,
  updateNPC: () => null,
});

interface NPCContextProviderProps {
  children: React.ReactNode;
}
export const NPCContextProvider = ({ children }: NPCContextProviderProps) => {
  const [npcs, setNPCs] = useState<NPC[]>([]);

  const getNPCs = useCallback(async () => {
    try {
      const npcRes = await fetch("http://localhost:3000/npcs");
      const sc = await npcRes.json();
      setNPCs(sc);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getNPCs();
  }, [getNPCs]);

  const getNPC = useCallback(
    (id: string) => npcs.find((sc) => sc.id === id),
    [npcs],
  );

  const deleteNPC = useCallback(
    async (npc?: NPC) => {
      if (!npc) {
        return;
      }
      try {
        await fetch(`http://localhost:3000/npcs/${npc.id}`, {
          method: "DELETE",
        });

        getNPCs();
      } catch (e) {
        console.error(e);
      }
    },
    [getNPCs],
  );

  const addNPC = useCallback(async (newNPC: NPC) => {
    try {
      await fetch("http://localhost:3000/npcs", {
        method: "POST",
        body: JSON.stringify(newNPC),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateNPC = useCallback(
    async (originalNPCId: string, newNPC: NPC) => {
      if (!originalNPCId || !newNPC) {
        return;
      }

      try {
        await fetch(`http://localhost:3000/npcs/${originalNPCId}`, {
          method: "PUT",
          body: JSON.stringify(newNPC),
          headers: {
            "Content-Type": "application/json",
          },
        });

        getNPCs();
      } catch (e) {
        console.error(e);
      }
    },
    [getNPCs],
  );

  return (
    <NPCsContext.Provider
      value={{
        npcs,
        getNPC,
        deleteNPC,
        addNPC,
        updateNPC,
      }}
    >
      {children}
    </NPCsContext.Provider>
  );
};
