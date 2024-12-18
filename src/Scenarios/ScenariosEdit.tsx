import { FormEvent, useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScenariosContext } from "@/Scenarios/hooks/scenarios.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "@/components/utils/ConfirmContext.tsx";

export const ScenariosEdit = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { id } = useParams();

  const { addScenario, updateScenario, getScenario } =
    useContext(ScenariosContext);

  const [scenarioText, setScenarioText] = useState([""]);
  const [scenarioName, setScenarioName] = useState("");
  const [originalScenarioId, setOriginalScenarioId] = useState("");

  useEffect(() => {
    if (id) {
      const originalScenario = getScenario(id);

      setScenarioName(originalScenario?.name ?? "");
      setScenarioText(originalScenario?.children ?? [""]);
      setOriginalScenarioId(originalScenario?.id ?? "");
    }
  }, [getScenario, id]);

  const handleSectionChange = (newText: string, position: number) => {
    setScenarioText((prevState) => {
      const newState = structuredClone(prevState);
      newState[position] = newText;
      return newState;
    });
  };

  const handlesAddSection = () => {
    setScenarioText((prevState) => {
      return [...prevState, ""];
    });
  };

  const handleDelete = (sectionToDelete: number) => {
    confirm(
      "Are you sure you want to delete this section? This action can not be undone!",
      (result) => {
        if (sectionToDelete > -1 && result) {
          setScenarioText((prevState) => {
            const newState = structuredClone(prevState);
            newState.splice(sectionToDelete, 1);
            return newState;
          });
        }
      },
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (id) {
      updateScenario(originalScenarioId, {
        name: scenarioName,
        children: scenarioText,
      });
    } else {
      addScenario({ name: scenarioName, children: scenarioText });
    }

    navigate(`/scenarios`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between space-x-2">
          <Input
            className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
            value={scenarioName}
            onChange={(event) => setScenarioName(event.target.value)}
            placeholder="Name"
            required
          />

          <Button variant="secondary" type="submit">
            Save
          </Button>
        </div>
        {scenarioText.map((section, index) => (
          <div className="relative group space-y-2" key={index}>
            <Textarea
              placeholder={`Section ${index + 1}`}
              value={section}
              onChange={(event) =>
                handleSectionChange(event.target.value, index)
              }
              spellCheck="true"
              className="w-full"
              required
            />
            <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

        <Button type="button" variant="default" onClick={handlesAddSection}>
          Add Section
        </Button>
      </div>
    </form>
  );
};
