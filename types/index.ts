import { Prisma } from '@prisma/client';

export interface JobProps {
  job: {
    id: string;
    userId: string;
    company: string;
    logo: string;
    logoBackground: string;
    position: string;
    contract: string;
    location: string;
    website: string;
    apply: string;
    description: string;
    requirements: Prisma.JsonValue & {
      content: string;
      items: string[];
    };
    role: Prisma.JsonValue & {
      content: string;
      items: string[];
    };
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
