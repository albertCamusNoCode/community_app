"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// Commented out for now - will be used for access type feature later
/*
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
*/
import { toast } from "@/app/actions/use-toast";
import { createCommunity } from "@/app/actions/community";
// import type { AccessType } from "../types";

export function CreateForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Commented out for now - will be used for access type feature later
  // const [accessType, setAccessType] = useState<AccessType>("open");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Community name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('imageUrl', ''); // Default empty for now
      // Commented out for now - will be used for access type feature later
      // formData.append('accessType', accessType);

      const community = await createCommunity(formData);
      
      if (!community || !community.id) {
        throw new Error("Failed to create community - no community data returned");
      }

      toast({
        title: "Community created",
        description: "Your new community has been created successfully!",
      });
      
      router.push(`/dashboard/communities/${community.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        title: "Error creating community",
        description: error instanceof Error ? error.message : "Failed to create community. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Community Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter community name"
          minLength={1}
          maxLength={100}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          placeholder="Describe your community"
          maxLength={500}
        />
      </div>
      {/* Commented out for now - will be used for access type feature later
      <div className="space-y-2">
        <Label htmlFor="accessType">Access Type</Label>
        <Select
          value={accessType}
          onValueChange={(value: AccessType) => setAccessType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select access type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="invite">Invite Only</SelectItem>
            <SelectItem value="subscription">Subscription</SelectItem>
          </SelectContent>
        </Select>
      </div>
      */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Community"}
      </Button>
    </form>
  );
}
