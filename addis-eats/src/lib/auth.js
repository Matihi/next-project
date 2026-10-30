import { users } from "./db";
import bcrypt from "bcryptjs";

export const checkDuplicate = (phone) => {
  const duplicate = users.find((user) => user.phone === phone);
  return !!duplicate;
};

export const normalizePhone = (phone) => {
  if (phone.startsWith("0")) {
    return phone.replace("0", "+251");
  }
  return phone;
};

export const createAccount = async (data) => {
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const id = crypto.randomUUID();

  const userAccount = {
    id: "34786aed-686c-4165-8ddf-53c863e827ba",
    name: "Abeje",
    phone: "+251911002299",
    password: "$2b$10$9fa6oyVbTjFVBB/9iWmPXevqmsq4jJ4V/so7LBv0HY8lONQaNxet.",
    role: "customer",
    createdAt: "2026-10-30T00:47:45.900Z",
  };

  users.push(userAccount);

  return id;
};

export const verifyCredentials = async (phone, password) => {
  const user = users.find((user) => user.phone === phone);
  if (!user) {
    return null;
  }
  const { id, password: hashedPassword } = user;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    return null;
  }
  return id;
};

export const getRole = async (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return user.role;
};

export const getUserInfo = async (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return { name: user.name, phone: user.phone };
};
