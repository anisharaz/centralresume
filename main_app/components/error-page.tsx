import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  errorDefinition,
}: {
  errorDefinition: {
    error: string;
    errorType: string;
    errorDescription: string;
  };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-1 text-center">
            <CardTitle className="text-xl text-red-600">
              {errorDefinition.errorType}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-6 pt-2">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold">Error Code:</h3>
            <p className="text-sm font-mono bg-white p-2 rounded border border-red-100">
              {errorDefinition.error}
            </p>

            <h3 className="mb-2 mt-4 font-semibold">Description:</h3>
            <p className="text-sm">{errorDefinition.errorDescription}</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              This error occurred during the authentication process. You can try
              again or contact support if the issue persists.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4"></CardFooter>
      </Card>
    </div>
  );
}
