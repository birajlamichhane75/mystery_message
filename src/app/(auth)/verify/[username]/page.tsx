"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";



const Verify = () => {
    const router = useRouter();
    let params = useParams()
    const form = useForm({
        resolver: zodResolver(verifySchema),
    });

    const submitHandler = async (data: any) => {
        const response = await axios.post('/api/verify-code', {
            username: params.username, otp: data.verifyCode
        })
        if (response.data.success) {
            toast({
                title: "Verification Success!",
                description: response.data.message
            })
            router.push('/sign-in')
        }
        else {
            toast({
                title: "Verification Fail",
                description: response.data.message,
            })
        }




    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-[40%] px-10 py-10 border-1 shadow-md bg-white">
                <h1 className="font-bold text-3xl text-center">Enter your verification Code</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8 py-8">
                        <FormField
                            control={form.control}
                            name="verifyCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Verification code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Verify</Button>
                    </form>
                </Form>

            </div>

        </div>
    );
}

export default Verify;