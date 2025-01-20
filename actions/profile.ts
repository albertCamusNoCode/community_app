'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getUser } from './auth'
import type { ProfileActionState } from '@/app/dashboard/profile/types'

interface ProfileUpdateData {
  name?: string
  avatar_url?: string
}

export async function updateProfile(
  prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    const supabase = await createClient()
    const user = await getUser()
    
    if (!user) {
      return {
        success: false,
        message: 'Not authenticated'
      }
    }

    const name = formData.get('name') as string
    const avatar_url = formData.get('avatar_url') as string

    const { error } = await supabase
      .from('profiles')
      .update({
        name,
        avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (error) {
      throw error
    }

    revalidatePath('/dashboard/profile')
    return {
      success: true,
      message: 'Profile updated successfully'
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update profile'
    }
  }
}

export async function deleteAccount(): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()
    const user = await getUser()
    
    if (!user) {
      return {
        success: false,
        message: 'Not authenticated'
      }
    }

    // Delete profile first (due to foreign key constraints)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      throw profileError
    }

    // Delete auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(user.id)

    if (authError) {
      throw authError
    }

    revalidatePath('/dashboard/profile')
    return {
      success: true,
      message: 'Account deleted successfully'
    }
  } catch (error) {
    console.error('Account deletion error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete account'
    }
  }
}
