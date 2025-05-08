const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['etudiant', 'garant'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

   // Pour l'étudiant
   etudiantDetails: {
    age: { type: Number },
    profession: { type: String },
    description: { type: String },
  },

  // Pour le garant
  garantDetails: {
    profession: { type: String },
    age: { type: Number },
    location: { type: String },
    description: { type: String },
  },
}, { timestamps: true });

// Define the matchPassword method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define the pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("🔐 Password hashed:", this.password);
  next();
});

// Export the User model after defining the methods and hooks
module.exports = mongoose.model('User', userSchema);
