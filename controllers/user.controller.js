const User = require('../models/user.momdel'); // Assuming you have a User model
const TokenGenerator = require('uuid-token-generator');
const { v4: uuidv4 } = require('uuid');
const b2a = require('b2a');

// Initialize Token Generator (256-bit)
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

// Sign-up
exports.signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Generate a unique username and UUID
    const username = `${first_name}_${last_name}`;
    const uuid = uuidv4();

    // Encode password for basic encryption
    const encodedPassword = b2a.btoa(password);

    // Create and save user
    const newUser = new User({
      uuid,
      first_name,
      last_name,
      email,
      username,
      password: encodedPassword,
      access_token: null,
      isLoggedIn: false,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!", userId: uuid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    if (b2a.atob(user.password) !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const token = tokgen.generate();
    user.access_token = token;
    user.isLoggedIn = true;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      userId: user.uuid,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { uuid } = req.body;

    // Find user by UUID
    const user = await User.findOne({ uuid });
    if (!user || !user.isLoggedIn) {
      return res.status(404).json({ message: "User not logged in" });
    }

    // Invalidate the access token and log out the user
    user.access_token = null;
    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Coupon Code
exports.getCouponCode = async (req, res) => {
    try {
      const { couponCode } = req.query;
  
      // Mocked coupon code validation and response
      const validCoupons = [
        { code: "DISCOUNT10", discount: 10 },
        { code: "DISCOUNT20", discount: 20 },
      ];
  
      const coupon = validCoupons.find((c) => c.code === couponCode);
      if (!coupon) {
        return res.status(404).json({ message: "Invalid coupon code" });
      }
  
      res.status(200).json({
        message: "Coupon code applied successfully",
        coupon: coupon,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Book Show
  exports.bookShow = async (req, res) => {
    try {
      const { userId, showId, numberOfTickets, couponCode } = req.body;
  
      // Mock database for shows (replace with actual DB call if available)
      const availableShows = [
        { id: "show1", title: "Movie A", availableSeats: 100 },
        { id: "show2", title: "Movie B", availableSeats: 50 },
      ];
  
      const show = availableShows.find((s) => s.id === showId);
      if (!show) {
        return res.status(404).json({ message: "Show not found" });
      }
  
      if (show.availableSeats < numberOfTickets) {
        return res.status(400).json({ message: "Insufficient seats available" });
      }
  
      // Mock updating seat availability
      show.availableSeats -= numberOfTickets;
  
      // Mock applying discount using the coupon
      let discount = 0;
      if (couponCode) {
        const validCoupons = [
          { code: "DISCOUNT10", discount: 10 },
          { code: "DISCOUNT20", discount: 20 },
        ];
        const coupon = validCoupons.find((c) => c.code === couponCode);
        if (coupon) {
          discount = coupon.discount;
        }
      }
  
      res.status(200).json({
        message: "Booking successful",
        bookingDetails: {
          userId,
          showId,
          numberOfTickets,
          discount,
          finalAmount: numberOfTickets * 100 - discount, // Assuming ticket price is 100
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
