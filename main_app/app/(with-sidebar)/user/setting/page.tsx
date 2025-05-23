import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserSettings() {
  const oauthClients = [
    { id: 1, name: "Example Website", badges: ["#general", "#devop"] },
    // { id: 2, name: "Naukri.com", badges: ["#general", "#SRE"] },
    // { id: 3, name: "remote.com", badges: ["#general", "#SE"] },
  ];

  return (
    <div className="container mx-auto w-full ">
      <div className="flex justify-between items-center">
        <div className="text-lg underline underline-offset-4 font-semibold">
          Website with your resume access (this page is under development)
        </div>
      </div>
      <Separator className="my-4" />

      <div className="space-y-4">
        {oauthClients.map((client) => (
          <div
            key={client.id}
            className={cn(
              "p-4 border rounded-md shadow-sm",
              "hover:shadow-md transition-shadow flex justify-between items-center"
            )}
          >
            <div className="flex justify-center items-center space-x-4">
              <div className="relative h-10 w-10 ">
                {/* // TODO: show oauth client logo */}
                <Image src={"/globe.svg"} fill alt="" className="p-2" />
              </div>
              <div className="text-base font-medium mb-2">{client.name}</div>
            </div>
            <div className="flex space-x-2">
              {client.badges.map((badge, index) => (
                <Badge key={index} variant="default">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSettings;
