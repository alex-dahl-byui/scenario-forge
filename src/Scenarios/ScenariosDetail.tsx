import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ScenariosContext } from "@/Scenarios/hooks/scenarios.tsx";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button.tsx";
import { useConfirm } from "@/components/utils/ConfirmContext.tsx";

export const ScenariosDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getScenario, deleteScenario } = useContext(ScenariosContext);
  const confirm = useConfirm();

  const scenario = getScenario(id ?? "");

  const handleDelete = async () => {
    confirm(
      "Are your sure you want to delete this scenario? This action can not be undone!",
      (result) => {
        if (result) {
          deleteScenario(scenario);
          navigate("/scenarios");
        }
      },
    );
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {scenario?.name}
          </h3>
          <div className="flex items-center gap-2">
            <Link to={`/scenarios/${scenario?.id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {scenario?.children.map((child, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>Act {index + 1}</AccordionTrigger>
              <AccordionContent>{child}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};
