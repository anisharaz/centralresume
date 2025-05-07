"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ShowCredentials({ clientId, clientSecret }: { clientId: string; clientSecret: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">
          Show credentials
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keep it safe !!</DialogTitle>
          <DialogDescription>
            <div>
              <strong>Client ID:</strong>{" "}
              <span className="text-amber-100">{clientId}</span>
            </div>
            <div>
              <strong>Client Secret:</strong>{" "}
              <span className="text-amber-100">{clientSecret}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ShowCredentials;
