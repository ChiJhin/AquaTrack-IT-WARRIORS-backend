import path from "path";
import { promises as fs } from "fs";
import {
  loginDataService,
  logoutUserDataService,
  regenerateTokenDataService,
  registerDataService,
  updateUserUserDataService,
} from "../services/userServices.js";
import { error } from "console";

export const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const newUser = await registerDataService(email, name, password);

  res.status(201).json({
    email: newUser.email,
    token: newUser.token,
    refreshToken: newUser.refreshToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginDataService(email, password);
  res.status(200).json({
    email,
    token: user.token,
    refreshToken: user.refreshToken,
  });
};

export const logout = async (req, res) => {
  await logoutUserDataService(req.user);
  res.status(204).json();
};

export const current = async (req, res) => {
  const {
    _id,
    email,
    name,
    gender,
    weight,
    dailyActivityTime,
    dailyWaterNorm,
    avatarURL,
  } = req.user;
  res.json({
    _id,
    email,
    name,
    gender,
    weight,
    dailyActivityTime,
    dailyWaterNorm,
    avatarURL,
  });
};

export const updateUser = async (req, res, next) => {
  if (req.file) {
    const storeImage = path.join(process.cwd(), "public", "avatars");
    const { path: temporaryName, originalname } = req.file;
    const newFilePath = path.join(storeImage, originalname);
    try {
      await fs.rename(temporaryName, newFilePath);
    } catch (err) {
      await fs.unlink(temporaryName);
      next(err);
    }
    const avatarURL = path.join("/avatars", originalname);
    await updateUserUserDataService(req.user, { ...req.body, avatarURL });
  } else await updateUserUserDataService(req.user, req.body);

  res
    .status(200)
    .json({ message: "User information has been updated successfully" });
};

export const refreshTokens = async (req, res) => {
  const { token, refreshToken } = await regenerateTokenDataService(req.user);
  res.status(200).json({ token, refreshToken });
};
