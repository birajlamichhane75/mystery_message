"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import * as z from 'zod'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignIn = () => {
  // const [isSubmitting, setisSubmitting] = useState(false);
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  let submitHandler = async (data: any) => {
    try {
      let result = await signIn("credentials", { redirect: false, identifier: data.identifier, password: data.password })
      

      if (result?.ok) {
        toast({
          title: "Login Success!",
          description: "Welcome to Mystery Message!"
        })
        router.push('/dashboard')
      }
      else {
        toast({
          title: "Login Fail",
          description: "Incorrect email or password",
          variant: "destructive"
        })
      }


    } catch (error) {
      toast({
        title: "Login Fail",
        description: "Error in Login, Try again"
      })
    }
  }

  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='w-[30%] border-2 shadow-md bg-white py-10 rounded-md' >
        <h1 className='text-center font-bold text-3xl'>Mystery Message<br /> Sign In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5 p-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='text-center'>
              <Button type="submit" className='w-[50%]'>
                Sign In
              </Button>
            </div>
          </form>
          <div className='text-center pt-5'>
            <p>Don&apos;t have an account? <Link className='text-blue-700' href='/sign-up'>Register</Link></p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;