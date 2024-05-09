import { loginDataService, logoutUserDataService, registerDataService, updateUserUserDataService } from "../services/userServices.js";

export const register = async (req, res, next) => {
    const { email, name, password } = req.body;
    const newUser = await registerDataService(email, name, password)

    res.status(201).json({
      user: { email: newUser.email },
    });
  };

export const login = async (req, res) => {
    const { email, password } = req.body;
    const generatedToken = await loginDataService(email, password);
    res.status(200).json({
        token: generatedToken,
        user: { email: email },
      });
};

export const logout = async (req, res) => {
    await logoutUserDataService(req.user._id)
    res.status(204).json();
};

export const current = async (req, res) => {
    const { _id, email, name, gender, weight, dailyActivityTime, dailyWaterNorm, avatarURL } = req.user;
    res.json({ _id, email, name, gender, weight, dailyActivityTime, dailyWaterNorm, avatarURL });
};

export const updateUser = async (req, res) => {
    const userId = req.user._id;
    const updatedObject = await updateUserUserDataService(userId, req.body);
    res.json(updatedObject)
};