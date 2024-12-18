import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useConfirm } from "@/components/utils/ConfirmContext.tsx";
import { NPCsContext } from "@/NPCs/hooks/npcs.tsx";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

export const NPCsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getNPC, deleteNPC } = useContext(NPCsContext);
  const confirm = useConfirm();

  const npc = getNPC(id ?? "");

  const handleDelete = async () => {
    confirm(
      "Are your sure you want to delete this NPC? This action can not be undone!",
      (result) => {
        if (result) {
          deleteNPC(npc);
          navigate("/npcs");
        }
      },
    );
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {npc?.name}
          </h3>
          <div className="flex items-center gap-2">
            <Link to={`/npcs/${npc?.id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{npc?.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {npc?.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};
