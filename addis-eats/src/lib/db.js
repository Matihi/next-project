/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
import { dateCount } from "@/services/date";
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description:
      "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

if (!global.mockOrders) {
  global.mockOrders = [];
}

// In-memory orders store
export const mockOrders = global.mockOrders;

if (!global.users) {
  global.users = [
    {
      id: "34786aed-686c-4165-8ddf-53c863e827ba",
      name: "Abeje",
      phone: "+251911002299",
      password: "$2b$10$9fa6oyVbTjFVBB/9iWmPXevqmsq4jJ4V/so7LBv0HY8lONQaNxet.",
      role: "customer",
      createdAt: new Date("2026-10-30T00:47:45.900Z"),
    },
    {
      id: "4cf7a8c6-56a5-48c2-bf05-c552fa871588",
      name: "Abebe",
      phone: "+251911223344",
      password: "$2b$10$TnPux459Eou0ag/.cHy0EeO/Of0Yq9ZKWYaZ9BaGgR/qpzDr4VXpq",
      role: "admin",
      createdAt: new Date("2026-10-30T00:50:21.699Z"),
    },
    {
      id: "f68b54e4-1563-4126-a7fc-126affd2bf14",
      name: "Lemlem",
      phone: "+251988776655",
      password: "$2b$10$BsT0uxYEclki/cYqJmdSdO.GVQEDW8LqYy5IGnv8c80nKrEh6.qTS",
      role: "customer",
      createdAt: new Date("2026-10-30T00:52:55.049Z"),
    },
  ];
}

export const users = global.users;

if (!global.sessionArray) {
  global.sessionArray = [
    {
      sessionId: "87272b7b-7a27-4608-b585-20203e84c371",
      userId: "34786aed-686c-4165-8ddf-53c863e827ba",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      sessionId: "fb8b1bc8-7b2b-4bf4-b051-0133474feb9e",
      userId: "4cf7a8c6-56a5-48c2-bf05-c552fa871588",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      sessionId: "0d20dcb1-68f2-4570-b90b-364617adb8a4",
      userId: "f68b54e4-1563-4126-a7fc-126affd2bf14",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  ];
}

export const sessionArray = global.sessionArray;

export const findSession = async (id) => {
  const session = sessionArray.find((session) => session.sessionId === id);
  return session || null;
};

export const deleteSessionFromDb = async (id) => {
  const filteredSessions = sessionArray.filter(
    (session) => session.sessionId !== id,
  );

  sessionArray.splice(0, sessionArray.length, ...filteredSessions);
};

// Mock authenticated user session
const mockSessionUser = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**
 * Create a new order in memory
 */
export async function createOrder(data, userId) {
  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  console.log(mockOrders);
  return newOrder;
}

/**
 * Retrieve a specific order by ID
 */
export async function getOrder(id) {
  const order = mockOrders.find((o) => o.id === id && o.status !== "CANCELLED");
  return order || null;
}

/**
 * Mark an order as cancelled
 */
export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  const updatedOrders = mockOrders.map((order) => {
    return order.id === id ? { ...order, status: "CANCELLED" } : order;
  });

  mockOrders.splice(0, mockOrders.length, ...updatedOrders);

  return order;
}

/**
 * Read current authenticated user session
 */
export async function getSession() {
  return mockSessionUser;
}
