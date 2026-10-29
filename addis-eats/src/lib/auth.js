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
    id,
    ...data,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
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
