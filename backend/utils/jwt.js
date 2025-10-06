import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (user) => {
  const payload = {
    id: user._id || user.id,
    username: user.userName || user.username,
  };
  // console.log()

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } 
  catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};
