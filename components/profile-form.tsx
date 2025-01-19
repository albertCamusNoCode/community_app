"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import Image from "next/image";
import { updateProfile, deleteAccount } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/actions/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
}

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [updateState, updateAction, isUpdatePending] =
    useActionState(updateProfile);
  const [deleteState, deleteAction, isDeletePending] =
    useActionState(deleteAccount);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAction();
    if (result.success) {
      toast({ title: "Account Deleted", description: result.message });
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" data-oid="jouazx9">
      <CardHeader data-oid="xy29ixp">
        <CardTitle data-oid="jtv:smc">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent data-oid="wq-qon_">
        <form action={updateAction} className="space-y-6" data-oid="t89tc0_">
          <div
            className="flex flex-col items-center space-y-4"
            data-oid="8-oqdgt"
          >
            <div className="relative w-32 h-32" data-oid="hupv6iv">
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
                data-oid="zft286p"
              />
            </div>
            <div data-oid="e_6ibgf">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
                data-oid="-4t7zzc"
              />

              <Label
                htmlFor="avatar-upload"
                className="cursor-pointer"
                data-oid="0mypykv"
              >
                <Button type="button" variant="outline" data-oid="o:_3nfc">
                  Change Profile Picture
                </Button>
              </Label>
            </div>
          </div>

          <div className="space-y-2" data-oid="296ndsv">
            <Label htmlFor="email" data-oid="n_psg1x">
              Email
            </Label>
            <Input id="email" value={user.email} disabled data-oid="bweknwv" />
          </div>

          <div className="space-y-2" data-oid=":llz-8c">
            <Label htmlFor="username" data-oid="sh4ooaa">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              defaultValue={user.username}
              data-oid="y0smntj"
            />
          </div>

          <div className="space-y-2" data-oid="s32-tt4">
            <Label htmlFor="password" data-oid="sl1hy74">
              New Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              data-oid="hmxfg93"
            />
          </div>

          <div className="space-y-2" data-oid="mgm3qqi">
            <Label htmlFor="confirmPassword" data-oid="7ee.i0w">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              data-oid="h9nch--"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdatePending}
            data-oid="i17yvlt"
          >
            {isUpdatePending ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        {updateState && (
          <p
            className={`mt-4 text-center ${updateState.success ? "text-green-600" : "text-red-600"}`}
            data-oid="th8by02"
          >
            {updateState.message}
          </p>
        )}
      </CardContent>
      <Separator data-oid="cpdc0y_" />
      <CardFooter className="flex justify-center py-6" data-oid="08aeqk4">
        <AlertDialog data-oid="moj:xq-">
          <AlertDialogTrigger asChild data-oid="5mvy:2g">
            <Button variant="destructive" data-oid="c21yov_">
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent data-oid="w7b3v09">
            <AlertDialogHeader data-oid="8p1jo80">
              <AlertDialogTitle data-oid="nk4hnvi">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription data-oid="tnac69m">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter data-oid="0:s22jw">
              <AlertDialogCancel data-oid="b2hsh51">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeletePending}
                data-oid="dh2nfuc"
              >
                {isDeletePending ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
