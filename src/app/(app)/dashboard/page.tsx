'use client'
import MessageCard from '@/components/MessageCard';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Message } from '@/models/User';
import { acceptMsgSchema } from '@/schemas/acceptMsgSchema';
import { ApiResponse } from '@/type/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LucideRefreshCcw, RefreshCcwIcon } from 'lucide-react';

const Dashboard = () => {
    const [messages, setmessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAcceptLoading, setisAcceptLoading] = useState(false);
    const [isCheck, setisCheck] = useState(false);
    const [isRefresh, setisRefresh] = useState(false);

    const { data } = useSession();


    const handelDeleteMessage = (messageid: string) => {
        
        setmessages(messages.filter((msg: Message) => {
            return msg._id !== messageid
        }))
        console.log(messages);
        
    }

    const form = useForm({
        resolver: zodResolver(acceptMsgSchema)
    });
    const { register, watch, setValue } = form;
    const acceptMessages = watch('acceptMessage');


    let fetchMessageAccept = useCallback(async () => {

        const response = await axios.get('/api/accept-messages');
        setIsLoading(true);
        setisAcceptLoading(true)
        if (response.data.success) {
            setValue('acceptMessage', response.data.isacceptingMessages)
        }
    }, [setValue, setIsLoading, setisAcceptLoading])

    let fetchMessages = useCallback(async () => {
        const response = await axios.get('/api/get-messasges');
        setIsLoading(true);
        if (response.data.success) {
            setmessages(response.data.message)

        }
        else {
            toast({
                title: response.data.message
            })
        }
    }, [setmessages, setIsLoading])


    useEffect(() => {
        fetchMessageAccept();
        fetchMessages();
        setTimeout(() => {
            setisRefresh(false)
        }, 500);
    }, [setValue, fetchMessageAccept, fetchMessages,isRefresh]);


    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>('/api/accept-messages', { acceptMessage: !acceptMessages });
            setValue('acceptMessage', !acceptMessages)
            toast({
                title: "Accept Message Status Updated Successfully!"
            })
        } catch (error) {
            toast({
                title: "Fail to change"
            })
        }

    }

    let refresh = ()=>{
        setisRefresh(true);
    }
    if (!data) {
        return (
            <>You are not logged in</>
        )
    }

    return (
        <div className='min-h-screen px-20'>

            <h1 className='mx-auto text-center w-[45%] text-3xl font-bold py-10'>Organize and Read Your Anonymous Messages Easily</h1>
            <div className='py-4 px-2 rounded-lg bg-gray-50 flex items-center justify-between'>
                <Link href={`${window.location.protocol}//${window.location.host}/u/${data.user.username}`} target='_blank' >{`${window.location.protocol}//${window.location.host}/u/${data.user.username}`} </Link>
                <button className='hover:opacity-70 shadow-lg px-2 py-1 rounded-md text-white font-semibold bg-blue-700'>Copy</button>
            </div>
            <div className='py-5 border-b-2 flex items-center gap-5'>
                <Switch
                    {...register('acceptMessage')}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                />
                <span className=''>
                    Accept Message: 
                    {
                        acceptMessages ?  "On" : "Off"
                    }
                </span>
            </div>

                <div className='pt-10'>
                    <div className='border border-cyan-300 bg-gray-50 w-fit px-3 py-2 shadow-md rounded-md' ><LucideRefreshCcw className={`${isRefresh ? 'animate-spin opacity-40': 'animate-none'}`} onClick={refresh}/></div>
                </div>
            <div className='grid grid-cols-2 gap-10 py-10'>
                {
                    messages.length > 0 ? (
                        messages.map((msg, i) => {
                            return (
                                <div key={i}>
                                    <MessageCard message={msg} onMessageDelete={handelDeleteMessage} />
                                </div>
                            )
                        })
                    ) :
                        <>
                            <h1 className='font-semibold text-2xl'>No Messages</h1></>
                }
            </div>
        </div>
    );
}

export default Dashboard;