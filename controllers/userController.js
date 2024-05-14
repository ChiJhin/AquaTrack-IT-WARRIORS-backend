import {
  loginDataService,
  logoutUserDataService,
  regenerateTokenDataService,
  registerDataService,
  updateUserUserDataService,
} from "../services/userServices.js";

export const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const newUser = await registerDataService(email, name, password);

  res.status(201).json({
    email: newUser.email,
    authToken: newUser.authToken,
    refreshToken: newUser.refreshToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginDataService(email, password);
  res.status(200).json({
    email,
    authToken: user.authToken,
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

export const updateUser = async (req, res) => {
  res.json(await updateUserUserDataService(req.user, req.body));
};

export const refreshTokens = async (req, res) => {
  const { authToken, refreshToken } = await regenerateTokenDataService(
    req.user
  );
  res.status(200).json({ authToken, refreshToken });
};
