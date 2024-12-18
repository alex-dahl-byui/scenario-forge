import { FormEvent, useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { NPCsContext } from "@/NPCs/hooks/npcs.tsx";

export const NPCsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addNPC, updateNPC, getNPC } = useContext(NPCsContext);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [originalNPCId, setOriginalNPCId] = useState("");

  useEffect(() => {
    if (id) {
      const originalNPC = getNPC(id);

      setName(originalNPC?.name ?? "");
      setDescription(originalNPC?.description ?? "");
      setOriginalNPCId(originalNPC?.id ?? "");
    }
  }, [getNPC, id]);

  console.log(description);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    debugger;
    if (id) {
      updateNPC(originalNPCId, {
        name,
        description,
      });
    } else {
      addNPC({ name, description });
    }

    navigate(`/npcs`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between space-x-2">
          <Input
            className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            required
          />

          <Button variant="secondary" type="submit">
            Save
          </Button>
        </div>

        <div className="relative group space-y-2">
          <Textarea
            placeholder={`Description`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            spellCheck="true"
            className="w-full"
            required
          />
        </div>
      </div>
    </form>
  );
};
