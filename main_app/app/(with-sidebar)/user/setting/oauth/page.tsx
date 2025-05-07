import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateOauthClientForm from "./CreateOauthClientForm";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { headers } from "next/headers";
import ShowCredentials from "./show-credentials";

async function OauthClientSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const oauthClients = await prisma.oauthClient.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="container mx-auto w-full">
      <div className="flex justify-between items-center mb-4 border-b-2 pb-2">
        <div className="text-lg font-semibold">Oauth Clients</div>
        <CreateOauthClientForm />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {oauthClients.length == 0
          ? <div className="text-lg font-bold">No clients</div>
          : oauthClients.map((client) => (
              <Card key={client.clientId} className="shadow-md">
                <CardHeader>
                  <CardTitle>{client.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{client.description}</div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Edit</Button>
                  <ShowCredentials clientId={client.clientId} clientSecret={client.clientSecret}/>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}

export default OauthClientSettings;
