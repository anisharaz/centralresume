import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { DeleteTagButton } from "./delete-tag-button";
import { Tag } from "lucide-react";
import CreateNewTag from "./create-new-tag";

export default async function TagsSettingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const tags = await prisma.resumeTags.findMany({
    where: {
      userId: session?.session.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto md:py-6 py-4 px-2 md:px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tags Settings</h1>
        <p className="text-muted-foreground">
          Manage your resume tags to organize your different profiles.
        </p>
      </div>
      <CreateNewTag existingTags={tags} />
      <div className=" flex flex-col max-w-4xl gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="p-4 flex border justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <Tag />
              <div>{tag.resumeTagName}</div>
            </div>
            <DeleteTagButton tagId="" tagName="" />
          </div>
        ))}
      </div>
    </div>
  );
}
