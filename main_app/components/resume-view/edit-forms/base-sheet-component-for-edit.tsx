import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";

interface BaseSheetComponentForEditProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function BaseSheetComponentForEdit({
  children,
  title = "Edit",
  description = "Edit and save the changes",
}: BaseSheetComponentForEditProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Edit className="text-amber-500 cursor-pointer hover:scale-125" />
      </SheetTrigger>
      <SheetContent className="sm:max-w-screen max-sm:w-[100vw] h-[100%] flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export default BaseSheetComponentForEdit;
