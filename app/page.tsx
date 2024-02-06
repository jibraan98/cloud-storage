import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. <br />
              <br />
              Storing everything for you and your business needs. All in one place.            
            </h1>

            <p>
            Collaborate seamlessly and deliver work faster from anywhere with Dropbox. Securely store your content, edit PDFs, share videos, sign documents and track file engagement—without leaving Dropbox.
            </p>

            <Link href="/dashboard" className="flex cursor-pointer bg-blue-500 p-5 w-fit">
              Try it for free!
              <ArrowRight className="ml-10"/>
            </Link>
        </div>

        <div className="bg-[#1E19190] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
