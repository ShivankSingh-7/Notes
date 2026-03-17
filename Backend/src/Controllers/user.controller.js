import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";


const cookieOptions = {
  httpOnly: true,
  secure: true,        // 🔥 force true (don’t rely on NODE_ENV here)
  sameSite: "None",    // 🔥 REQUIRED for Vercel ↔ Render
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};


const generateAccessAndRefershToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token",
    );
  }
};

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
    throw new ApiError(409, "user with same email already exist");
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

  const { accessToken, refreshToken } = await generateAccessAndRefershToken(
    user._id,
  );
  const createdUser = await User.findById(user._id).select("-refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regestering the user");
  }


  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "email and password required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credential");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefershToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select("-refreshToken");


  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );


  return res
    .status(201)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(201, {}, "User Logged Out Successfully"));
});

export { registerUser, loginUser, logoutUser };
