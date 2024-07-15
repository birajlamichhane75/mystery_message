"use client"

import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCompletion } from 'ai/react';

const AnonomosMsg = ({ params }: { params: { username: string } }) => {
   
    const [content, setcontent] = useState('');
    const [isSending, setIsSending] = useState(false);

    const sendMessage = async () => {
        try {
            setIsSending(true)
            const response = await axios.post('/api/send-messages', {
                username: params.username, content: content
            })
            if (response.data.success) {
                toast({
                    title: response.data.message
                })
            }
            else {
                toast({
                    title: response.data.message,
                    variant: "destructive"
                })
            }

        } catch (error) {
            toast({
                title: "Error sending message",
                variant: "destructive"
            })
        }
        finally {
            setIsSending(false)
        }


    }


    return (
        <>
            <div className='py-10 px-20 w-full text-center'>
                <div className='flex flex-col gap-10 items-center justify-center'>
                    <div>
                        <h1 className='text-3xl font-bold'>Public Profile Link</h1>
                    </div>

                    <div className='w-[60%] flex flex-col gap-2'>
                        <p className='text-left'>{`Send Anomymous message to @${params.username}`}</p>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setcontent(e.target.value)
                            }} placeholder="write your anonymous message here" name="msg" className='px-4 py-2 border-2 border-black h-20 w-full outline-2 rounded-lg'></textarea>
                        <button onClick={sendMessage} className='mx-auto w-fit my-10 shadow-lg px-10 py-2 rounded-md text-white font-semibold bg-green-700'>{isSending ? <Loader2 className="animate-spin" /> : "Send"}</button>
                    </div>

                    {/* <div>
                        <SuggestMessage />
                    </div> */}

                </div>
            </div>
        </>
    );
}

export default AnonomosMsg;