import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { checkToken } from "../services/jwtServices.js";

export const authenticate = async (req, res, next) => {
  const getToken = req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];
  
  const id = checkToken(getToken);

  if (!id) {
    throw HttpError(401, "Unauthorized")
  };

  const currentUser = await User.findById(id);

  if (!currentUser) {
    throw HttpError(401, "Unauthorized")
  };

  if (currentUser && currentUser.token === getToken) {

    req.user = currentUser;
    next();
  } else {
    
    res.status(401).json({
      message: 'Unauthorized'
    });
  };
};