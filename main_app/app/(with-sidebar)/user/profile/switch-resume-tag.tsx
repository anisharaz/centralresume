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
import { Loader2, CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function HelpIcon() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger className="md:block hidden">
          <CircleHelp className="text-green-400 hover:text-blue-500" />
        </TooltipTrigger>
        <TooltipContent className="max-w-[200px] text-justify">
          Tags are label given to detail on your resume. Based on the selected
          tag the below details will be shown.
        </TooltipContent>
      </Tooltip>
      <Popover>
        <PopoverTrigger className="max-md:block hidden">
          <CircleHelp className="text-green-400 hover:text-blue-500" />
        </PopoverTrigger>
        <PopoverContent>
          Tags are label given to detail on your resume. Based on the selected
          tag the below details will be shown.
        </PopoverContent>
      </Popover>
    </>
  );
}

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
      <Label htmlFor="profile" className="md:text-2xl text-lg font-bold italic">
        Select the tag details to show
        <HelpIcon />
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
