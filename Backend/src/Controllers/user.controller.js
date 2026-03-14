import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, confPassword, fullName } = req.body;

  if (
    [fullName, password, confPassword, userName, email].some(
      (field) => field.trim() == "",
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }

  if (password !== confPassword) {
    throw new ApiError(400, "passwrod and confirm password should be same");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "user with same email or username already exist");
  }

  const avatarLocalPath = req.file?.avatar?.path;
  let avatar;
  if (avatarLocalPath) {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(500, "error occured while uploading the avatar ");
    }
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName: fullName.trim(),
    email,
    avatar: avatar?.url,
    password,
  });

  const createdUser = await User.findById(user._id).select("-refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regestering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});


export {
    registerUser
}
