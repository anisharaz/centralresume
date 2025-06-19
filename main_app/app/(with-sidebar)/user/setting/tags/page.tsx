import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { VisibilityToggle } from "./visibility-toggle";
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
        <div>
          In a publicly searchable profile, only the details with public tag
          will be shown.
        </div>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="p-4 flex flex-col md:flex-row gap-4 md:gap-2 border justify-between items-center rounded-lg"
          >
            <div className="flex gap-3 items-center">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div className="font-medium">{tag.resumeTagName}</div>
            </div>
            <div className="flex items-center gap-4">
              <VisibilityToggle
                tagId={tag.id}
                currentVisibility={tag.visibility}
              />
            </div>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No tags yet</p>
            <p className="text-sm">
              Create your first tag to organize your resume profiles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
