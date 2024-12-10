import { Heading } from "@/components/heading";
import { getCurrentUserOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";
import { DataCard } from "@/components/dashboard/data-card";
import { DataChart } from "@/components/dashboard/data-chart";

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
    data,
    totalRevenue,
    totalSales,
  };
};

const AnalyticsPage = async () => {
  const { data, totalRevenue, totalSales } = await getUserAnalytics();

  return (
    <div className="space-y-7">
      <Heading
        title="Analytics"
        subtitle="View all your analytics and earnings here"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />

        <DataChart data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
