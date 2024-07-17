import { User, Project, Role } from "@prisma/client";

type ProjectWithManager = Project & {
  manager: User;
};
export type { User, Project, ProjectWithManager, Role };
