"use client";

import CountUp from "react-countup";

export const Milestone = () => {
  return (
    <div className="space-y-10 mt-20 md:mt-28 p-4">
      <div className="lg:text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">
          Transform your digital presence with advanced skills tailored for
          exponential growth in today&apos;s dynamic landscape.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex flex-col md:items-center justify-center gap-2 rounded-md p-4 py-8 md:py-16 bg-gradient-to-tr from-white to-primary bg-clip-text text-transparent border">
          <p className="font-bold text-3xl">
            <CountUp end={2000} duration={2} />+
          </p>
          <p className="text-2xl">Enrolled Students</p>
        </div>
        <div className="flex flex-col md:items-center justify-center gap-2 rounded-md p-4 py-8 md:py-16 bg-gradient-to-tr from-white to-primary bg-clip-text text-transparent border">
          <p className="font-bold text-3xl">Daily</p>
          <p className="text-2xl">Live Training</p>
        </div>
        <div className="flex flex-col md:items-center justify-center gap-2 rounded-md p-4 py-8 md:py-16 bg-gradient-to-tr from-white to-primary bg-clip-text text-transparent border">
          <p className="font-bold text-3xl">
            <CountUp end={10} duration={2} />+
          </p>
          <p className="text-2xl">Video Courses</p>
        </div>
        <div className="flex flex-col md:items-center justify-center gap-2 rounded-md p-4 py-8 md:py-16 bg-gradient-to-tr from-white to-primary bg-clip-text text-transparent border">
          <p className="font-bold text-3xl">
            <CountUp end={300000} duration={2} /> K
          </p>
          <p className="text-2xl">Community Earnings</p>
        </div>
      </div>
    </div>
  );
};
