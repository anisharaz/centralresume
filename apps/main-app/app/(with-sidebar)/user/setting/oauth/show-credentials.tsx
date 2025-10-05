"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Key, Copy, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ShowCredentials({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  const [showSecret, setShowSecret] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Key className="h-3 w-3" />
          Credentials
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl">
              OAuth Client Credentials
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Use these credentials to authenticate your application with the
            OAuth server.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Security Warning */}
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Keep these credentials secure
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Never expose your client secret in client-side code or
                    public repositories. Store it securely on your server.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client ID */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Client ID
              </label>
              <Badge variant="secondary" className="text-xs">
                Safe to expose
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-3 py-2 rounded-md text-sm font-mono break-all">
                {clientId}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(clientId, "Client ID")}
                className="shrink-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this to identify your application in OAuth requests.
            </p>
          </div>

          {/* Client Secret */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Client Secret
              </label>
              <Badge variant="destructive" className="text-xs">
                Keep private
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-3 py-2 rounded-md text-sm font-mono break-all">
                {showSecret ? clientSecret : "•".repeat(40)}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSecret(!showSecret)}
                className="shrink-0"
              >
                {showSecret ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(clientSecret, "Client Secret")}
                className="shrink-0"
                disabled={!showSecret}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this to authenticate your application when exchanging
              authorization codes for access tokens.
            </p>
          </div>

          {/* Usage Example */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Example Usage
            </label>
            <div className="bg-slate-950 dark:bg-slate-900 rounded-md p-4 text-xs font-mono text-slate-100 overflow-x-auto">
              <div className="space-y-1">
                <div>
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-yellow-300">clientId</span> ={" "}
                  <span className="text-green-300">
                    &apos;{clientId.substring(0, 8)}...&apos;
                  </span>
                  ;
                </div>
                <div>
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-yellow-300">clientSecret</span> ={" "}
                  <span className="text-green-300">
                    &apos;your_secret_here&apos;
                  </span>
                </div>
                <div className="mt-2 text-gray-400">Use in your OAuth flow</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              copyToClipboard(
                `Client ID: ${clientId}\nClient Secret: ${clientSecret}`,
                "All credentials"
              );
            }}
            className="flex items-center gap-2"
          >
            <Copy className="h-3 w-3" />
            Copy Both
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowCredentials;
