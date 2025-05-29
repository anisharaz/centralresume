import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeDataType } from "@/lib/types";
type PersonalDetails = ResumeDataType["personal_details"];

function ProfileDetailSectionView({
  children,
  data,
}: {
  children: React.ReactNode;
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
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <CardTitle className="text-4xl flex gap-5">
                <div>{data.name}</div>
                <div>{children}</div>
              </CardTitle>
              {data.tag_line && data.tag_line.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tag_line.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag.text}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{data.email}</span>
                </a>
              </Button>
              {data.phone && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{data.phone}</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {data.summary && data.summary.length > 0 && (
              <div className="lg:col-span-3 space-y-4">
                <h2 className="text-xl font-semibold">About</h2>
                <div className="space-y-3">
                  {data.summary.map((item, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div
              className={`space-y-4 ${
                data.summary && data.summary.length > 0
                  ? "lg:col-span-1"
                  : "lg:col-span-4"
              }`}
            >
              <div className="space-y-3">
                {data.date_of_birth && (
                  <Card>
                    <CardContent className="">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Date of Birth
                          </p>
                          <p className="font-medium">
                            {formatDate(data.date_of_birth)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {data.address && (
                  <Card>
                    <CardContent className="">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Address
                          </p>
                          <div className="font-medium">
                            <p>{data.address.address_line}</p>
                            <p>
                              {data.address.city}, {data.address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {data.social_links && data.social_links.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Social Links</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {data.social_links.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-auto p-3"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs truncate">{link.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileDetailSectionView;
