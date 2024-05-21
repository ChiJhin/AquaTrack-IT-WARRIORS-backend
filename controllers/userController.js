import path from "path";
import { promises as fs } from "fs";
import {
  loginDataService,
  logoutUserDataService,
  regenerateTokenDataService,
  registerDataService,
  safeUserCloneDataService,
  updateUserUserDataService,
} from "../services/userServices.js";
import { resizeImg } from "../services/imgServices.js";

export const register = async (req, res) => {
  const { email, name, password } = req.body;
  const newUser = await registerDataService(email, name, password);

  newUser.toObject();
  res.status(201).json({
    user: safeUserCloneDataService(newUser),
    token: newUser.token,
    refreshToken: newUser.refreshToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginDataService(email, password);
  res.status(200).json({
    user: safeUserCloneDataService(user),
    token: user.token,
    refreshToken: user.refreshToken,
  });
};

export const logout = async (req, res) => {
  await logoutUserDataService(req.user);
  res.status(204).json();
};

export const current = async (req, res) => {
  res.json(safeUserCloneDataService(req.user));
};

/*export const updateUser = async (req, res, next) => {
  let editedUser = {};
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
    editedUser = await updateUserUserDataService(req.user, {
      ...req.body,
      avatarURL,
    });
  } else {
    editedUser = await updateUserUserDataService(req.user, req.body);
  }

  res.status(200).json(editedUser);
};*/

export const updateUser = async (req, res, next) => {
  let editedUser = {};

  if (req.file) {
    const avatarURL = await resizeImg(req.file);
    editedUser = await updateUserUserDataService(req.user, {
      ...req.body,
      avatarURL,
    });
  } else {
    editedUser = await updateUserUserDataService(req.user, req.body);
  }

  res.status(200).json(safeUserCloneDataService(editedUser));
};

export const refreshTokens = async (req, res) => {
  const { token, refreshToken } = await regenerateTokenDataService(req.user);
  res.status(200).json({ token, refreshToken });
};
