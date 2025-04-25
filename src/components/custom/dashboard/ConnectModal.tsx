"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createIngress } from "@/lib/livekit_ingress_server_actions";
import { AlertTriangle } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(0); // RTMP IngressInput Type
const WHIP = String(1); // WHIP IngressInput Type

type IngressType = typeof RTMP | typeof WHIP;

export default function ConnectModal() {
  const closeDialogRef = useRef<HTMLButtonElement | null>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();

  const handleGenerateIngress = () => {
    startTransition(async () => {
      try {
        const newIngress = await createIngress(parseInt(ingressType));

        if (newIngress.error) {
          toast.error("Error generating ingress!", {
            description: newIngress.error,
            duration: 5000,
            icon: "⚠️",
          });
        } else {
          toast.success("Ingress generated successfully!", {
            duration: 5000,
            icon: "✅",
          });

          closeDialogRef.current?.click();
        }
      } catch (error: any) {
        console.error("Error generating ingress:", error.message);
        toast.error("Error generating ingress!", {
          description: error.message,
          duration: 5000,
          icon: "⚠️",
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Stream Connection</DialogTitle>
          <DialogDescription>Select Ingress Type</DialogDescription>
        </DialogHeader>

        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <Alert variant="destructive" className="bg-red-100">
          <AlertTriangle />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            THIS ACTION WILL RESET ALL ACTIVE STREAMS USING THE CURRENT
            CONNECTION
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between mt-4">
          <DialogClose asChild>
            <Button ref={closeDialogRef} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={handleGenerateIngress}
            className="bg-green-600 hover:bg-green-500 text-black"
          >
            {isPending ? "Generating..." : "Generate Key 🔑"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
