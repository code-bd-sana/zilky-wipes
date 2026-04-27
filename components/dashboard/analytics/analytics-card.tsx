"use client";

import {
  ChartColumn,
  DollarSign,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import AnalyticsPerformance from "./analytics-performance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsCard() {
  const cardData = [
    {
      icon: <DollarSign size={24} />,
      iconColor: "text-[#155DFC]",
      iconBg: "bg-[#EFF6FF]",
      revenue: "+8.2%",
      title: "Revenue",
      subTitle: "$552.43",
    },
    {
      icon: <Target size={24} />,
      iconColor: "text-[#00A63E]",
      iconBg: "bg-[#F0FDF4]",
      revenue: "+5.1%",
      title: "Ad Spend",
      subTitle: "$4,542.75",
    },
    {
      icon: <ChartColumn size={24} />,
      iconColor: "text-[#D08700]",
      iconBg: "bg-[#FEFCE8]",
      revenue: "+3.7%",
      title: "Clicks",
      subTitle: "2334",
    },
    {
      icon: <TrendingUp size={24} />,
      iconColor: "text-[#9810FA]",
      iconBg: "bg-[#FAF5FF]",
      revenue: "+2.9%",
      title: "CR",
      subTitle: "7.12%",
    },
  ];

  const platformCardData = [
    {
      icon: <ShoppingCart size={24} />,
      iconColor: "text-[#155DFC]",
      iconBg: "bg-[#EFF6FF]",
      revenue: "+8.2%",
      title: "Orders",
      subTitle: "245,439",
    },
    {
      icon: <ChartColumn size={24} />,
      iconColor: "text-[#9810FA]",
      iconBg: "bg-[#FAF5FF]",
      revenue: "+5.1%",
      title: "CTR",
      subTitle: "2.89%",
    },
    {
      icon: <Users size={24} />,
      iconColor: "text-[#00A63E]",
      iconBg: "bg-[#F0FDF4]",
      revenue: "+5.1%",
      title: "Customers",
      subTitle: "182,64",
    },
    {
      icon: <TrendingUp size={24} />,
      iconColor: "text-[#E60076]",
      iconBg: "bg-[#FDF2F8]",
      revenue: "+5.1%",
      title: "CR",
      subTitle: "59.19",
    },
    {
      icon: <Target size={24} />,
      iconColor: "text-[#F54900]",
      iconBg: "bg-[#FFF7ED]",
      revenue: "+5.1%",
      title: "Conversions",
      subTitle: "3,827",
    },
  ];

  // Pie chart data for Facebook & Instagram
  const pieData = [
    { name: "Facebook", value: 21404.26, color: "#3DC269", percentage: 62 },
    { name: "Instagram", value: 13118.74, color: "#9400BD", percentage: 38 },
  ];

  const totalAmount = pieData.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = `$${totalAmount.toLocaleString()} Total`;

  return (
    <section className='bg-[#F9FAFB] p-6 '>
      {/* Card Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='border border-[#E5E7EB] bg-white p-4 rounded-[6px] hover:bg-gray-50'>
            <div className='flex justify-between items-center'>
              <div
                className={`p-3 rounded-[8px] ${card.iconBg} ${card.iconColor} mb-4 inline-flex items-center justify-center`}>
                {card.icon}
              </div>
              <div>
                {card.revenue && (
                  <span className={`text-sm ml-2 text-[#00A63E]`}>
                    {card.revenue}
                  </span>
                )}
              </div>
            </div>
            <h3 className='text-sm text-[#4A5565] mb-2'>{card.title}</h3>
            <p className='text-2xl font-medium text-[#0A0A0A]'>
              {card.subTitle}
            </p>
          </div>
        ))}
      </div>

      <AnalyticsPerformance />

      {/* Platform Performance */}
      <div className='grid grid-cols-12 gap-4 mt-6 mb-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-12 lg:col-span-9'>
          {platformCardData.map((card, index) => (
            <div
              key={index}
              className='border border-[#E5E7EB] bg-white p-4 rounded-[6px] hover:bg-gray-50'>
              <div className='flex justify-between items-center'>
                <div
                  className={`p-3 rounded-[8px] ${card.iconBg} ${card.iconColor} mb-4 inline-flex items-center justify-center`}>
                  {card.icon}
                </div>
                <div>
                  {card.revenue && (
                    <span className={`text-sm ml-2 text-[#00A63E]`}>
                      {card.revenue}
                    </span>
                  )}
                </div>
              </div>
              <h3 className='text-sm text-[#4A5565] mb-2'>{card.title}</h3>
              <p className='text-2xl font-medium text-[#0A0A0A]'>
                {card.subTitle}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart Section */}
        <div className='col-span-12 lg:col-span-3 border border-[#E5E7EB] bg-white p-4 rounded-[6px] flex flex-col  justify-center'>
          <h3 className='text-2xl text-[#262626] mb-2 text-start'>
            Platform Breakdown
          </h3>
          <div className='w-full' style={{ minHeight: "200px" }}>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius='50%'
                  outerRadius='80%'
                  dataKey='value'
                  labelLine={false}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => {
                    const amount =
                      typeof value === "number" ? value : Number(value ?? 0);

                    return [`$${amount.toLocaleString()}`, "Amount"];
                  }}
                />
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='text-lg md:text-xl fill-[#0A0A0A]'>
                  {formattedTotal.split(" ").map((part, i) => (
                    <tspan key={i} x='50%' dy={i === 0 ? -5 : 20}>
                      {part}
                    </tspan>
                  ))}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Facebook & Instagram Breakdown */}
          <div className='mt-1 space-y-2'>
            {pieData.map((item, index) => (
              <div key={index} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                  <span className='text-sm text-[#4A5565] font-medium'>
                    {item.name}
                  </span>
                </div>
                <div className='text-right'>
                  <div className='text-sm font-semibold text-[#0A0A0A]'>
                    {item.percentage}%
                  </div>
                  <div className='text-xs text-[#6B7280]'>
                    $ {item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
