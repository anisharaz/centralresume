import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
type PersonalDetails = ResumeDataType["personal_details"];

export function ProfileDetailSectionView({
  children,
  data,
}: {
  children?: React.ReactNode;
  data: PersonalDetails;
}) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-md bg-gradient-to-br from-background to-muted/10">
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Name and Title Section */}
            <div className="space-y-3 flex-1">
              <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight flex flex-col lg:flex-row lg:items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {data.name}
                </span>
                <div className="flex items-center">{children}</div>
              </CardTitle>

              {data.tag_line && data.tag_line.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {data.tag_line.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {tag.text}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information - Horizontal on larger screens */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[260px]">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start h-auto px-3 py-2 hover:bg-primary/5 border border-muted/40 bg-background/60"
              >
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                    <Mail className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-xs font-medium truncate">
                    {data.email}
                  </span>
                </a>
              </Button>

              {data.phone && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start h-auto px-3 py-2 hover:bg-primary/5 border border-muted/40 bg-background/60"
                >
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                      <Phone className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{data.phone}</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* About Section */}
            {data.summary && data.summary.length > 0 && (
              <div className="lg:col-span-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h2 className="text-lg font-semibold">About</h2>
                </div>
                <div className="space-y-2">
                  {data.summary.map((item, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed text-sm"
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Information - Compact Cards */}
            <div
              className={`space-y-2 ${
                data.summary && data.summary.length > 0
                  ? "lg:col-span-1"
                  : "lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
              }`}
            >
              {data.date_of_birth && (
                <div className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-2.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                      <Calendar className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Born
                      </p>
                      <p className="font-semibold text-xs">
                        {formatDate(data.date_of_birth)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {(data.address?.address_line ||
                data.address?.city ||
                data.address?.country) && (
                <div className="border border-muted/40 bg-background/40 backdrop-blur-sm rounded-lg p-2.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mt-0.5">
                      <MapPin className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Location
                      </p>
                      <div className="font-semibold text-xs space-y-0.5">
                        {data.address.address_line && (
                          <p>{data.address.address_line}</p>
                        )}
                        <p>
                          {[data.address.city, data.address.country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links - Inline and Compact */}
          {data.social_links && data.social_links.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  <h2 className="text-lg font-semibold">Connect</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.social_links.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-auto px-2.5 py-1.5 border-muted/40 bg-background/40 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                        <ExternalLink className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium">{link.name}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
