"use client";

import Image from "next/image";

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <Image
        src="/unavailable_video_dark_theme.png"
        alt=""
        width={300}
        height={280}
      />
      <h1 className="text-3xl">Oops!</h1>
      <h1 className="text-2xl">This course isn&apos;t available</h1>
    </div>
  );
};

export default CourseNotFound;
