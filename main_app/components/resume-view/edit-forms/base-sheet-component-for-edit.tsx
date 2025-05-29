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
      <SheetContent className="sm:max-w-screen h-screen overflow-scroll">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default BaseSheetComponentForEdit;
