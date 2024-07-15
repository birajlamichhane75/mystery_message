
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { Message } from '@/models/User';
import { ApiResponse } from '@/type/apiResponse';
import { X } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"
import { useState } from 'react';


type MessageCardType = {
    message: Message,
    onMessageDelete: (messageid: string) => void,
}

const MessageCard = ({ message, onMessageDelete }: MessageCardType) => {
    let msgDate = new Date(message.createdAt);
    const format1 = msgDate.toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    
    
    
    
    const handelDelete = async () => {
        onMessageDelete(message._id as string);

        let response = await axios.delete<ApiResponse>(`/api/delete-message/${message?._id}`)
       
            toast({
                title: "Message Deelted Success",
                description: response.data.message
            })

    }
    return (
        <>

            <Card>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='px-3 py-3 text-right'>
                            <button className='bg-red-400 w-fit rounded-md shadow-md'><X className='text-white font-bold text-xs' /></button>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your 
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handelDelete} >Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className='flex items-center px-5'>
                    <CardTitle>{message.content}</CardTitle>
                </div>
                <CardFooter className='pt-5'>
                    <p className='text-xs'>{format1}</p>
                </CardFooter>
            </Card>
        </>

    );
}

export default MessageCard;