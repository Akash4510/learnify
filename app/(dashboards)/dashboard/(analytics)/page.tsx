import { getCurrentUserOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";
import { DataCard } from "@/components/dashboard/data-card";
import { UserAvatar } from "@/components/user-avatar";

const getUserAnalytics = async () => {
  const user = await getCurrentUserOrRedirect();

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  const purchases = await db.coursePurchase.findMany({
    where: {
      course: {
        channel: {
          creatorId: user.id,
        },
      },
    },
    include: {
      course: true,
    },
  });

  // const groupedEarnings = groupByCourse(purchases);
  const groupedEarnings = {
    testCourse: 3000,
    anotherCourse: 5000,
    hello: 3900,
    anotherHello: 5400,
    amazingCourse: 6900,
    lastOne: 4000,
  };
  const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
    name: courseTitle,
    total,
  }));

  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSales = purchases.length;

  return {
    user: dbUser,
    data,
    totalRevenue,
    totalSales,
  };
};

const AnalyticsPage = async () => {
  const { user, data, totalRevenue, totalSales } = await getUserAnalytics();

  return (
    <div className="space-y-7">
      {/* <div className="flex items-center justify-center">
        <Logo full showFullInMobile />
      </div> */}

      {/* <Heading
        title="Analytics"
        subtitle="View all your analytics and earnings here"
      /> */}

      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        <div className="p-10 rounded-lg bg-accent aspect-square flex flex-col items-center justify-center gap-8 lg:w-[25%]">
          <UserAvatar url={user.image || "/images/hero.jpg"} />

          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
          <DataCard
            label="Today's Earning"
            value={totalRevenue}
            shouldFormat
            className="bg-sky-700"
          />
          <DataCard
            label="Last Week Earning"
            value={totalRevenue}
            shouldFormat
            className="bg-cyan-800"
          />
          <DataCard
            label="Last Month Earning"
            value={totalRevenue}
            shouldFormat
            className="bg-secondary"
          />
          <DataCard
            label="Total Earning"
            value={totalRevenue}
            shouldFormat
            className="bg-primary/70"
          />
        </div>

        {/* <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold">Today&apos;s Earning</h2>
            <p className="text-3xl font-bold">₹ {totalRevenue}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Last Week Earning</h2>
            <p className="text-3xl font-bold">₹ {totalRevenue}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Last Month Earning</h2>
            <p className="text-3xl font-bold">₹ {totalRevenue}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Earning</h2>
            <p className="text-3xl font-bold">₹ {totalRevenue}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AnalyticsPage;
