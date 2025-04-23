import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

export const RELATIVE_PATHS = {
  home: "/",
  search: "/search",
  signIn: "/sign-in",
  signUp: "/sign-up",
  user: "/u",
  creatorPage: "/dashboard",
};

export const CREATOR_SIDEBAR_ROUTES = [
  {
    label: "Stream",
    href: RELATIVE_PATHS.user,
    icon: Fullscreen,
  },
  {
    label: "Keys",
    href: `${RELATIVE_PATHS.creatorPage}/keys`,
    icon: KeyRound,
  },
  {
    label: "Chat",
    href: `${RELATIVE_PATHS.creatorPage}/chat`,
    icon: MessageSquare,
  },
  {
    label: "Community",
    href: `${RELATIVE_PATHS.creatorPage}/community`,
    icon: Users,
  },
];
