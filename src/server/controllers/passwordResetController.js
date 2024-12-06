const { getUserByEmail, updateUser } = require("../db/queries").default;
const {
  createPasswordResetToken,
  getPasswordResetToken,
  deleteResetTokensForUser,
} = require("../db/queries").default;

const bcrypt = require("bcrypt");

// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete old tokens and create a new one
    await deleteResetTokensForUser(user.id);
    const expiresAt = new Date(Date.now() + 3600000); // Token valid for 1 hour
    const { token } = await createPasswordResetToken(user.id, expiresAt);

    // Simulate email sending (replace with actual email service later)
    console.log(`Password reset token for ${email}: ${token}`);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const resetToken = await getPasswordResetToken(token);
    if (!resetToken) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Hash and update the user's password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await updateUser(resetToken.user_id, { password: hashedPassword });

    // Delete token after use
    await deleteResetTokensForUser(resetToken.user_id);

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requestPasswordReset, resetPassword };
