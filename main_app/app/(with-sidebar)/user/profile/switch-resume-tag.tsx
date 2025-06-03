"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function SwitchCurrentResumeTag({
  resumeProfileTagName,
  tagSelected,
}: {
  resumeProfileTagName?: { resumeTagName: string }[];
  tagSelected: string | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-2 px-2">
      <Label htmlFor="profile" className="text-md font-bold">
        Select Tag to view
      </Label>
      <div className="flex items-center gap-2">
        <Select
          defaultValue={tagSelected}
          onValueChange={async (value) => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setLoading(false);
            router.replace(`/user/profile?resumeProfile=${value}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="resume tag" />
          </SelectTrigger>
          <SelectContent id="profile">
            <SelectGroup>
              <SelectLabel>Select Resume Tag</SelectLabel>
              {resumeProfileTagName?.map((profile) => (
                <SelectItem
                  key={profile.resumeTagName}
                  value={profile.resumeTagName}
                >
                  {profile.resumeTagName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {loading && (
          <div>
            <Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SwitchCurrentResumeTag;
