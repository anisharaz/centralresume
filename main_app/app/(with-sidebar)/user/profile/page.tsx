"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { FormValues } from "@/components/getting-started-form";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="container mx-auto w-full">
      {/* Banner and Profile Section */}
      <div className="relative">
        <div className="h-48 w-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center">
          <div className="font-bold md:text-5xl text-3xl text-center text-slate-800 dark:text-slate-200 italic ">
            Time to lift up..
          </div>
        </div>
        <div className="absolute -bottom-16 left-8">
          <div className="h-32 w-32 rounded-xl bg-neutral-600 border-4 border-white dark:border-slate-800 shadow-lg">
            <Image src={"/globe.svg"} fill alt="" className="p-2" />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8 px-8">
        <h1 className="text-2xl font-bold">Anish Araz</h1>
        <p className="text-lg text-muted-foreground mt-1">Devops engineer</p>

        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>India</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-2">
          {/* About Section */}

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Good Good</p>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          {/* Education Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>

          {/* Skills Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
