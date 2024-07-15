
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const page = () => {
  return (
    <>
      <div className='min-h-screen px-15 py-12'>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-center py-5 w-[70%]">
            <h1 className="font-bold text-3xl py-5">Explore a World of Anonymous Messaging Adventure</h1>
            <p className="text-lg">Welcome to Mystery Messenger, your platform for anonymous communication. Share secrets, ask questions, and connect freely without revealing your identity.</p>
          </div>

          <div>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardHeader className="text-center">
                          <p>header</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                          <span className="text-2xl font-semibold">This is Content</span>
                        </CardContent>
                        <CardFooter>
                          <p className="text-xs">2024-6-5:9:45am</p>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;