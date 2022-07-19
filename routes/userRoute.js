const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getAllUser,
  updateUserPassword,
  updateProfile,
  userProfile,
  getSingleUserByAdmin,
  updateUserRoleByAdmin,
  deleteUserByAdmin
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// For Users
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/password/reset/:token").put(resetPassword);

// For User Profile
router.route("/profile/").get(isAuthenticatedUser, userProfile);
router.route("/profile/password/update-password").put(isAuthenticatedUser, updateUserPassword);
router.route("/profile/update-info").put(isAuthenticatedUser, updateProfile);

// For Admin
router
  .route("/admin/all-users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUserByAdmin);
router
  .route("/admin/delete-user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByAdmin);

  router
  .route("/admin/update-user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRoleByAdmin);
module.exports = router;
