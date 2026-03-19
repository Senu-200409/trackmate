const SESSION_STORAGE_KEYS = [
  'trackmate_login',
  'trackmate_role',
  'trackmate_tab',
  'token',
  'authToken',
  'userPhone',
  'userRole',
  'userType',
  'userId',
  'userName',
  'profileImage',
  'otpPhone',
  'sentOtp',
];

export const clearStoredSession = () => {
  SESSION_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export default SESSION_STORAGE_KEYS;