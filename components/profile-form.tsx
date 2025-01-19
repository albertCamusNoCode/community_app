'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import Image from 'next/image'
import { updateProfile, deleteAccount } from '@/app/actions/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
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
} from '@/components/ui/alert-dialog'

interface User {
  id: string
  email: string
  username: string
  avatarUrl: string
}

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)
  const [updateState, updateAction, isUpdatePending] = useActionState(updateProfile)
  const [deleteState, deleteAction, isDeletePending] = useActionState(deleteAccount)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteAccount = async () => {
    const result = await deleteAction()
    if (result.success) {
      toast({ title: 'Account Deleted', description: result.message })
      router.push('/')
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateAction} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              )}
            </div>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button type="button" variant="outline">
                  Change Profile Picture
                </Button>
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" defaultValue={user.username} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" />
          </div>

          <Button type="submit" className="w-full" disabled={isUpdatePending}>
            {isUpdatePending ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>

        {updateState && (
          <p className={`mt-4 text-center ${updateState.success ? 'text-green-600' : 'text-red-600'}`}>
            {updateState.message}
          </p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-center py-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeletePending}>
                {isDeletePending ? 'Deleting...' : 'Delete Account'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

