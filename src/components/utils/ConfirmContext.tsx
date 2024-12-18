import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

type ConfirmContextType = (
  confirmMessage: string,
  onConfirm: (result: boolean) => void,
) => void;

const ConfirmContext = createContext<ConfirmContextType>(() => {});

export const ConfirmDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [callback, setCallback] = useState<(result: boolean) => void>(() => {});

  const confirmFunction = useCallback(
    (confirmMessage: string, onConfirm: (result: boolean) => void) => {
      setMessage(confirmMessage);
      setIsOpen(true);
      setCallback(() => onConfirm);
    },
    [],
  );

  const handleConfirm = () => {
    callback(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    callback(false);
    setIsOpen(false);
  };

  return (
    <ConfirmContext.Provider value={confirmFunction}>
      {children}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p className="leading-7 [&:not(:first-child)]:mt-6">{message}</p>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="default" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
