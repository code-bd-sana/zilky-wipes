export type DashboardCustomerStatus =
  | "Active"
  | "Canceled subscription"
  | "Paused indefinetely"
  | "Skipped next Delivery";

export type DashboardOrderHistoryEntry = {
  id: string;
  date: string;
  time: string;
  label: string;
  amount: string;
  isPending?: boolean;
};

export type DashboardCustomerReview = {
  id: string;
  customerId: string;
  date: string;
  time: string;
  text: string;
  rating: number;
  starLabel: string;
  isPending?: boolean;
};

export type DashboardCustomerRecord = {
  id: string;
  name: string;
  email: string;
  order: string;
  frequency: string;
  status: DashboardCustomerStatus;
  joined: string;
  phone: string;
  customerSince: string;
  lifetimeValue: string;
  subscriptionType: string;
  items: string;
  orderHistory: DashboardOrderHistoryEntry[];
  reviews: DashboardCustomerReview[];
};

export type DashboardFeedbackRow = {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  starLabel: string;
  feedback: string;
};

type DashboardCustomerSeed = {
  id: string;
  name: string;
  email: string;
  order: string;
  frequency: string;
  status: DashboardCustomerStatus;
  joined: string;
};

type FeedbackSeed = {
  starLabel: string;
  rating: number;
  feedback: string;
};

const CUSTOMER_SEEDS: DashboardCustomerSeed[] = [
  {
    id: "1",
    name: "John Doe",
    email: "janedoe@yahoo.com",
    order: "Starter Kit - One time",
    frequency: "Every 1 Month",
    status: "Active",
    joined: "01/08/2026",
  },
  {
    id: "2",
    name: "Jessica Rodriguez",
    email: "johndoe@gmail.com",
    order: "Family - Subscription",
    frequency: "Every 1 Month",
    status: "Canceled subscription",
    joined: "02/08/2026",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "laurawhite@aol.com",
    order: "Refill - One time",
    frequency: "Every 3 Months",
    status: "Paused indefinetely",
    joined: "03/08/2026",
  },
  {
    id: "4",
    name: "Chris Martinez",
    email: "alexsmith@hotmail.com",
    order: "Family - Subscription",
    frequency: "Every 10 Months",
    status: "Skipped next Delivery",
    joined: "04/08/2026",
  },
  {
    id: "5",
    name: "Matthew King",
    email: "emilyjohnson@gmail.com",
    order: "Refill - One time",
    frequency: "Every 5 Months",
    status: "Active",
    joined: "05/08/2026",
  },
  {
    id: "6",
    name: "Daniel Lee",
    email: "sarahwilliams@icloud.com",
    order: "Refill - One time",
    frequency: "Every 6 Months",
    status: "Paused indefinetely",
    joined: "06/08/2026",
  },
  {
    id: "7",
    name: "David Wilson",
    email: "michaelbrown@outlook.com",
    order: "Refill - One time",
    frequency: "Every 4 Months",
    status: "Skipped next Delivery",
    joined: "07/08/2026",
  },
  {
    id: "8",
    name: "Samantha Hernandez",
    email: "davidjones@live.com",
    order: "Family - Subscription",
    frequency: "Every 7 Months",
    status: "Paused indefinetely",
    joined: "08/08/2026",
  },
  {
    id: "9",
    name: "Laura Garcia",
    email: "robertgarcia@gmail.com",
    order: "Refill - One time",
    frequency: "Every 9 Months",
    status: "Skipped next Delivery",
    joined: "09/08/2026",
  },
  {
    id: "10",
    name: "Sarah Davis",
    email: "marylopez@yahoo.com",
    order: "Refill - One time",
    frequency: "Every 2 Months",
    status: "Active",
    joined: "10/08/2026",
  },
  {
    id: "11",
    name: "Jane Smith",
    email: "williammartinez@outlook.com",
    order: "Refill - One time",
    frequency: "Every 11 Months",
    status: "Paused indefinetely",
    joined: "11/08/2026",
  },
  {
    id: "12",
    name: "Emily Johnson",
    email: "isabellahernandez@gmail.com",
    order: "Refill - One time",
    frequency: "Every 1 Month",
    status: "Active",
    joined: "12/08/2026",
  },
  {
    id: "13",
    name: "John Doe",
    email: "charleswilson@icloud.com",
    order: "Family - Subscription",
    frequency: "Every 8 Months",
    status: "Paused indefinetely",
    joined: "13/08/2026",
  },
];

const FEEDBACK_BY_CUSTOMER_ID: Record<string, FeedbackSeed> = {
  "1": {
    starLabel: "Highly Recommended",
    rating: 5,
    feedback: "I never realized how much I needed this.",
  },
  "2": {
    starLabel: "Would Recommend",
    rating: 5,
    feedback: "I didn't know I could feel this clean.",
  },
  "3": {
    starLabel: "4 Star",
    rating: 4,
    feedback: "It's like a weight has been lifted off my shoulders.",
  },
  "4": {
    starLabel: "Neutral Review",
    rating: 3,
    feedback: "It's amazing how good clean can feel.",
  },
  "5": {
    starLabel: "Not Recommended",
    rating: 2,
    feedback: "Every inch of me feels renewed.",
  },
  "6": {
    starLabel: "5 Star",
    rating: 5,
    feedback: "I didn't know cleanliness could bring such happiness.",
  },
  "7": {
    starLabel: "2 Star",
    rating: 2,
    feedback: "I can finally breathe easy.",
  },
  "8": {
    starLabel: "3 Star",
    rating: 3,
    feedback: "This clarity is truly refreshing.",
  },
  "9": {
    starLabel: "Very Satisfied",
    rating: 5,
    feedback: "It's a whole new level of comfort.",
  },
  "10": {
    starLabel: "1 Star",
    rating: 1,
    feedback: "This is the freshest I've felt in years.",
  },
  "11": {
    starLabel: "Somewhat Satisfied",
    rating: 3,
    feedback: "This experience has changed my perspective on self-care.",
  },
  "12": {
    starLabel: "Dissatisfied",
    rating: 2,
    feedback: "I've rediscovered the joy of being clean.",
  },
  "13": {
    starLabel: "Very Dissatisfied",
    rating: 1,
    feedback: "Feeling revitalized and ready to take on the day.",
  },
};

function getSubscriptionType(order: string) {
  if (order.includes("Starter")) {
    return "Starter Kit";
  }

  if (order.includes("Family") || order.includes("Familly")) {
    return "Family";
  }

  return "Refill";
}

function buildOrderHistory(
  customerId: string,
  subscriptionType: string,
): DashboardOrderHistoryEntry[] {
  return [
    {
      id: `${customerId}-order-1`,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      label: `Bought ${subscriptionType}`,
      amount: "$12.00",
    },
    {
      id: `${customerId}-order-2`,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      label: `Bought ${subscriptionType}`,
      amount: "$12.00",
    },
    {
      id: `${customerId}-order-3`,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      label: `Bought ${subscriptionType}`,
      amount: "$12.00",
    },
    {
      id: `${customerId}-order-4`,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      label: `Bought ${subscriptionType}`,
      amount: "$12.00",
    },
    {
      id: `${customerId}-order-5`,
      date: "Expected today by 8:00 PM",
      time: "",
      label: `Bought ${subscriptionType}`,
      amount: "$12.00",
      isPending: true,
    },
  ];
}

function buildCustomerReviews(
  customerId: string,
  seed: FeedbackSeed,
): DashboardCustomerReview[] {
  return [
    {
      id: `${customerId}-review-1`,
      customerId,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      text: seed.feedback,
      rating: seed.rating,
      starLabel: seed.starLabel,
    },
    {
      id: `${customerId}-review-2`,
      customerId,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      text: "Comfort level has been consistently great.",
      rating: seed.rating,
      starLabel: seed.starLabel,
    },
    {
      id: `${customerId}-review-3`,
      customerId,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      text: "I noticed a difference from the first week.",
      rating: seed.rating,
      starLabel: seed.starLabel,
    },
    {
      id: `${customerId}-review-4`,
      customerId,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      text: "Will keep this as part of my routine.",
      rating: seed.rating,
      starLabel: seed.starLabel,
    },
    {
      id: `${customerId}-review-5`,
      customerId,
      date: "Feb 01, 2026",
      time: "08:14 AM",
      text: seed.feedback,
      rating: seed.rating,
      starLabel: seed.starLabel,
      isPending: true,
    },
  ];
}

export const dashboardCustomers: DashboardCustomerRecord[] = CUSTOMER_SEEDS.map(
  (customer) => {
    const subscriptionType = getSubscriptionType(customer.order);
    const feedbackSeed = FEEDBACK_BY_CUSTOMER_ID[customer.id];

    return {
      ...customer,
      phone: `+1 111 222 ${customer.id.padStart(4, "0")}`,
      customerSince: customer.joined,
      lifetimeValue: `$${(900 + Number(customer.id) * 73.5).toFixed(2)}`,
      subscriptionType,
      items: customer.order,
      orderHistory: buildOrderHistory(customer.id, subscriptionType),
      reviews: buildCustomerReviews(customer.id, feedbackSeed),
    };
  },
);

export const dashboardFeedbackRows: DashboardFeedbackRow[] =
  dashboardCustomers.map((customer) => {
    const latestReview = customer.reviews[0];

    return {
      id: `${customer.id}-feedback`,
      customerId: customer.id,
      customerName: customer.name,
      date: customer.joined,
      starLabel: latestReview.starLabel,
      feedback: latestReview.text,
    };
  });
