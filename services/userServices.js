import { User } from "../models/userModel.js"
import HttpError from '../helpers/HttpError.js'

export const registerDataService = async (email, password) => {
    if ((await User.findOne({ email: email })) !== null) {
        throw HttpError(409, "Email in use");
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const avatarURL = gravatar.url(email);
    
      return await mongooseUserModel.create({
        password: hashedPassword,
        email: email,
        avatarURL //verificationToken = nanoid() // Additional task
      });
}
export const loginDataService = async (email, password) => {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser)
      throw HttpError(401, "Email or password is wrong");
  
    const isPasswordMatching = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatching)
      throw HttpError(401, "Email or password is wrong");
  
    const payload = { id: foundUser._id };
    const secret = process.env.SECRET_WORD;
    const generatedToken = jwt.sign(payload, secret);
  
    await User.findByIdAndUpdate(
        foundUser.id, {token: generatedToken});
    return generatedToken;
}


export const logoutUserDataService = async (userId) => {
    await User.findByIdAndUpdate(
        { _id: userId},
        { token: null }
      );
}

export const updateUserUserDataService = async (userId, params) => {
    const foundUser = User.findById(userId);
    if (!foundUser)
        throw HttpError(401, 'User not found');
    return await User.findByIdAndUpdate(userId, params, { new: true });
}