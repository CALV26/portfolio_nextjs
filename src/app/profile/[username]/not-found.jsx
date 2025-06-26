import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="py-20">
          <div className="text-center space-y-5">
            {/* LARGE 404 TEXT */}
            <p className="text-6xl font-black text-primary font-mono">404</p>

            {/* MESSAGE */}
            <div className="space-y-2">
              <h1 className="text-1xl font-semibold tracking-tight">User not found</h1>
              <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">
                  <HomeIcon className="mr-2 size-4" />
                  Back to Home
                </Link>
              </Button>

              {/* <Button variant="outline" asChild>
                <Link href="/" className="flex pr-6 items-center ">
                  <ArrowLeftIcon className="size-4" />
                  <span>Home</span>
                </Link>
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}