import { loginDataService, logoutUserDataService, regenerateTokenDataService, registerDataService, updateUserUserDataService } from "../services/userServices.js";

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
        user: { email },
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
    const updatedObject = await updateUserUserDataService(req.user._id, req.body);
    res.json(updatedObject)
};

export const regenerateToken = async (req, res) => {
    const generatedToken = await regenerateTokenDataService(req.user._id);
    res.status(200).json({
        token: generatedToken,
        user: { email: req.user.email },
      });
};