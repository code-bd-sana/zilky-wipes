import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TooltipEntry = {
  color?: string;
  name?: string;
  value?: number | string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-[#E5E7EB] rounded-[6px] p-3 shadow-lg'>
        <p className='text-sm font-semibold text-[#0A0A0A] mb-2'>{label}</p>
        {payload.map((entry, index: number) => {
          const entryName = entry.name ?? "";
          const entryValue = entry.value ?? 0;
          const formattedValue =
            typeof entryValue === "number"
              ? entryValue.toLocaleString()
              : entryValue;

          return (
            <div key={index} className='flex items-center gap-2 text-xs mb-1'>
              <div
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: entry.color }}
              />
              <span className='text-[#4A5565]'>{entryName}:</span>
              <span className='font-medium text-[#0A0A0A]'>
                {entryName === "Revenue"
                  ? `$${formattedValue}`
                  : formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPerformance() {
  // Sample data for each day with Revenue, Clicks, and Orders
  const data = [
    { date: "Dec 1", revenue: 5450, clicks: 3450, orders: 128 },
    { date: "Dec 2", revenue: 5890, clicks: 4230, orders: 156 },
    { date: "Dec 3", revenue: 3230, clicks: 3890, orders: 142 },
    { date: "Dec 4", revenue: 7760, clicks: 5120, orders: 189 },
    { date: "Dec 5", revenue: 2540, clicks: 4780, orders: 167 },
    { date: "Dec 6", revenue: 9820, clicks: 5340, orders: 201 },
    { date: "Dec 7", revenue: 4650, clicks: 4920, orders: 178 },
    { date: "Dec 8", revenue: 5340, clicks: 5670, orders: 215 },
    { date: "Dec 9", revenue: 9420, clicks: 5230, orders: 196 },
    { date: "Dec 10", revenue: 2560, clicks: 5980, orders: 228 },
    { date: "Dec 11", revenue: 4780, clicks: 5560, orders: 209 },
    { date: "Dec 12", revenue: 3450, clicks: 6120, orders: 237 },
    // { date: "Dec 13", revenue: 21890, clicks: 5840, orders: 221 },
    // { date: "Dec 14", revenue: 24560, clicks: 6450, orders: 248 },
    // { date: "Dec 15", revenue: 22940, clicks: 6090, orders: 232 },
    // { date: "Dec 16", revenue: 25670, clicks: 6780, orders: 259 },
    // { date: "Dec 17", revenue: 23890, clicks: 6340, orders: 241 },
    // { date: "Dec 18", revenue: 26780, clicks: 7010, orders: 271 },
    // { date: "Dec 19", revenue: 24950, clicks: 6650, orders: 252 },
    // { date: "Dec 20", revenue: 27890, clicks: 7320, orders: 282 },
    // { date: "Dec 21", revenue: 26120, clicks: 6980, orders: 264 },
    // { date: "Dec 22", revenue: 28940, clicks: 7560, orders: 293 },
    // { date: "Dec 23", revenue: 27230, clicks: 7240, orders: 275 },
    // { date: "Dec 24", revenue: 30120, clicks: 7890, orders: 305 },
    // { date: "Dec 25", revenue: 28560, clicks: 7650, orders: 289 },
    // { date: "Dec 26", revenue: 31580, clicks: 8230, orders: 319 },
    // { date: "Dec 27", revenue: 29870, clicks: 7980, orders: 302 },
    // { date: "Dec 28", revenue: 32940, clicks: 8560, orders: 333 },
    // { date: "Dec 29", revenue: 31250, clicks: 8320, orders: 316 },
    // { date: "Dec 30", revenue: 34210, clicks: 8890, orders: 346 },
    // { date: "Dec 31", revenue: 35890, clicks: 9240, orders: 363 },
  ];

  const campaignData = [
    {
      title: "Summer Sale",
      subTitle: "1,234 clicks",
      value: "$276.86",
      revenue: "CTR: 8.5%",
    },
    {
      title: "Black Friday",
      subTitle: "982 clicks",
      value: "$243.12",
      revenue: "CTR: 7.2%",
    },
    {
      title: "New Year",
      subTitle: "856 clicks",
      value: "$198.45",
      revenue: "CTR: 6.8%",
    },
  ];
  // // Format Y-axis values
  // const formatYAxis = (value: number) => {
  //   if (value >= 1000) {
  //     return `$${(value / 1000).toFixed(0)}k`;
  //   }
  //   return `$${value}`;
  // };

  return (
    <section className='mt-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Chart Section */}
        <div className='lg:col-span-6 border border-[#E5E7EB] bg-white p-4 rounded-[6px]'>
          <div className='mb-4 flex flex-col md:flex-row justify-between items-center'>
            <h3 className='text-2xl text-[#262626] mb-2 text-start'>
              Performance Overview
            </h3>
            {/* Custom Legend */}
            <div className='flex gap-4'>
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: "#51A2FF" }}
                />
                <span className='text-sm text-[#4A5565]'>Revenue</span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: "#05DF72" }}
                />
                <span className='text-sm text-[#4A5565]'>Clicks</span>
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: "#C27AFF" }}
                />
                <span className='text-sm text-[#4A5565]'>Orders</span>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
                barCategoryGap='20%'>
                <CartesianGrid strokeDasharray='3 3' stroke='#E5E7EB' />
                <XAxis
                  dataKey='date'
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  textAnchor='end'
                  height={60}
                />
                {/* <YAxis
                  yAxisId='left'
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={formatYAxis}
                /> */}
                {/* <YAxis
                  yAxisId='right'
                  orientation='right'
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                /> */}
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend
                  verticalAlign='top'
                  align='right'
                  wrapperStyle={{ paddingBottom: "1em" }}
                  formatter={(value) => (
                    <span className='text-sm text-[#4A5565]'>{value}</span>
                  )}
                /> */}
                <Bar
                  yAxisId='left'
                  dataKey='revenue'
                  name='Revenue'
                  fill='#51A2FF'
                  radius={[14, 14, 0, 0]}
                />
                <Bar
                  yAxisId='left'
                  dataKey='clicks'
                  name='Clicks'
                  fill='#05DF72'
                  radius={[14, 14, 0, 0]}
                />
                <Bar
                  yAxisId='right'
                  dataKey='orders'
                  name='Orders'
                  fill='#C27AFF'
                  radius={[14, 14, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card Section */}
        <div className='lg:col-span-6 border border-[#E5E7EB] bg-white p-4 rounded-[6px]'>
          <div className='mb-4'>
            <h3 className='text-2xl text-[#262626] mb-2 text-start'>
              Top Performing Campaign
            </h3>
          </div>
          {campaignData.map((card, index) => (
            <div
              key={index}
              className='mb-4 p-4 border border-[#E5E7EB] bg-[#F9FAFB] rounded-[6px]'>
              <div className='flex justify-between  items-center'>
                <div>
                  <h4 className='text-md text-[#262626]'>{card.title}</h4>
                  <p className='text-sm text-[#979191]'>{card.subTitle}</p>
                </div>
                <div>
                  <p className='text-md text-[#262626]'>{card.value}</p>
                  <p className='text-sm text-[#979191]'>{card.revenue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
