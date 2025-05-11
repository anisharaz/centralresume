import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  title: string;
  data: any;
};

// Helper to format keys like "start_date" → "Start Date"
const formatKey = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const isPrimitive = (value: any) => typeof value !== "object" || value === null;

function ResumeSectionCard({ title, data }: Props) {
  if (!data) return null;
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-3 ml-2">
          {value.map((item, index) => (
            <div key={index} className="border-l-2 border-muted pl-4 space-y-1">
              {isPrimitive(item) ? (
                <div className="text-sm text-muted-foreground">
                  {String(item)}
                </div>
              ) : (
                renderObject(item)
              )}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return renderObject(value);
    } else {
      return <p className="text-sm text-muted-foreground">{String(value)}</p>;
    }
  };

  const renderObject = (obj: Record<string, any>) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {Object.entries(obj).map(([key, value], i) => (
          <div key={i}>
            <h4 className="text-sm font-medium text-foreground">
              {formatKey(key)}
            </h4>
            <div>{renderValue(value)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title.toUpperCase()}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">{renderValue(data)}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ResumeSectionCard;
