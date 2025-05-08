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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-col items-center space-y-4 pb-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-1 text-center">
        <CardTitle className="text-xl text-red-600 dark:text-red-400">
          {errorDefinition.errorType}
        </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-6 pt-2">
        <div className="rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950 p-4">
        <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          Error Code:
        </h3>
        <p className="text-sm font-mono bg-white dark:bg-gray-700 p-2 rounded border border-red-100 dark:border-red-800">
          {errorDefinition.error}
        </p>

        <h3 className="mb-2 mt-4 font-semibold text-gray-800 dark:text-gray-200">
          Description:
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {errorDefinition.errorDescription}
        </p>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
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
