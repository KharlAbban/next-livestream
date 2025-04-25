import { createViewerToken } from "@/lib/livekit_ingress_server_actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [identity, setIdentity] = useState<string>("");

  useEffect(() => {
    const createTokenForViewer = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken || "");

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const decodedName = decodedToken.name;
        const decodedIdentity = decodedToken.sub;

        if (decodedIdentity) {
          setIdentity(decodedIdentity);
        }

        if (decodedName) {
          setName(decodedName);
        }
      } catch (error: any) {
        console.error("Error creating token for viewer:", error);
        toast.error("Error creating token for viewer", {
          description: error.message,
          icon: "⚠️",
          duration: 3000,
        });
      }
    };

    createTokenForViewer();
  }, [hostIdentity]);

  return { token, name, identity };
};
