"use client"
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signUpSchema } from '@/schemas/signUpSchema';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [usernameMsg, setusernameMsg] = useState('');
    const [isCheckingUsername, setisCheckingUsername] = useState(false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const debounced = useDebounceCallback(setUsername, 500)
    let router = useRouter();

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    useEffect(() => {
        const checkUsername = async () => {
            try {
                setisCheckingUsername(true)
                setusernameMsg('')
                let response = await axios.get(`/api/checkUsername?username=${username}`);
                console.log(username);
                setusernameMsg(response?.data.message)

            } catch (error) {
                console.log("Error in fetching data", error)
            }
            finally {
                setisCheckingUsername(false)
            }

        }

        checkUsername();
    }, [username]);

    const handelSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            setisSubmitting(true);
            const response = await axios.post('/api/sign-up', data);
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: response.data.message
                })
                router.replace(`/verify/${username}`)
                setisSubmitting(false)
            }
            else {
                toast({
                    title: "Failed",
                    description: response.data.message,


                })
                setisSubmitting(false)
            }

        } catch (error) {
            console.log("Could not submit,Please try again", error);
            toast({
                title: "Fail",
                description: "Sign-Up fail",
                variant: 'destructive'

            })
            setisSubmitting(false)

        }
    }

    return (
        <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
            <div className='w-[30%] border-2 shadow-md bg-white py-10 rounded-md' >
                <h1 className='text-center font-bold text-3xl'>Mystery Message<br /> Sign Up</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-5 p-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debounced(e.target.value)
                                                // setUsername(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2 className='animate-spin' />}
                                    <p className='text-green-500'>{username && usernameMsg}</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email"
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
                            <Button className='w-[50%]' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className='animate-spin' /> : "Sign Up"}
                            </Button>
                        </div>

                    </form>
                    <div className='text-center pt-5'>
                        <p>Already have an account? <Link className='text-blue-700' href='/sign-in'>Login</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;