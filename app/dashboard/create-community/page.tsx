"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/app/actions/use-toast";

export default function CreateCommunity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessType, setAccessType] = useState("open");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual community creation logic
    toast({
      title: "Community created",
      description: "Your new community has been created successfully!",
    });
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-oid="8_usttq">
      <h1 className="text-3xl font-bold text-center" data-oid="et3e97a">
        Create a New Community
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4" data-oid="j0_idzo">
        <div className="space-y-2" data-oid="4spv-m4">
          <Label htmlFor="name" data-oid="xz0xtz0">
            Community Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-oid="ajmn40t"
          />
        </div>
        <div className="space-y-2" data-oid="th4lk6f">
          <Label htmlFor="description" data-oid="cqear9t">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            data-oid="6e:p_13"
          />
        </div>
        <div className="space-y-2" data-oid="0ynuobi">
          <Label htmlFor="accessType" data-oid=".o7-4-7">
            Access Type
          </Label>
          <Select
            value={accessType}
            onValueChange={setAccessType}
            data-oid="6da4c9u"
          >
            <SelectTrigger data-oid="hx712u2">
              <SelectValue
                placeholder="Select access type"
                data-oid="w.7aw7s"
              />
            </SelectTrigger>
            <SelectContent data-oid="xy9l-iz">
              <SelectItem value="open" data-oid="g7.bz__">
                Open
              </SelectItem>
              <SelectItem value="invite" data-oid="olr-m3.">
                Invite Only
              </SelectItem>
              <SelectItem value="subscription" data-oid="fz3ton_">
                Subscription
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" data-oid="tiokx0g">
          Create Community
        </Button>
      </form>
    </div>
  );
}
