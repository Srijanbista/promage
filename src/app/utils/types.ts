import { User, Project, Role } from "@prisma/client";

type ProjectWithManager = Project & {
  manager: Partial<User>;
};
export type { User, Project, ProjectWithManager, Role };
