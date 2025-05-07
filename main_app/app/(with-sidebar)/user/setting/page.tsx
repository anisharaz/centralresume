import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserSettings() {
  const oauthClients = [
    { id: 1, name: "WellFound", badges: ["#general", "#devop"] },
    { id: 2, name: "Naukri.com", badges: ["#general", "#SRE"] },
    { id: 3, name: "remote.com", badges: ["#general", "#SE"] },
  ];

  return (
    <div className="container mx-auto w-full p-2">
      <div className="text-lg font-semibold mb-4">Websites With your resume access</div>
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
