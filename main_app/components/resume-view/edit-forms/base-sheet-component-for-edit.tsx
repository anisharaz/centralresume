import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";

function BaseSheetComponentForEdit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Edit className="text-amber-500 cursor-pointer hover:scale-125" />
      </SheetTrigger>
      <SheetContent className="sm:max-w-screen">
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
          <SheetDescription>
            Edit and save the changes
          </SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default BaseSheetComponentForEdit;
