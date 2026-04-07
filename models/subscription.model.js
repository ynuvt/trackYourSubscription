import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "Please enter a subscription name"],
      trim: true,
      minLength: [3, "Subscription name must be at least 3 characters long"],
      maxLength: [50, "Subscription name must be less than 50 characters long"],
    },
    category: {
      type: String,
      required: [true, "Please enter a subscription category"],
      trim: true,
      enum: ["Entertainment", "Education", "Health", "Productivity", "Other"],
    },
    frequency: {
      type: String,
      required: [true, "Please enter a subscription frequency"],
      trim: true,
      enum: ["Monthly", "Yearly", "Weekly", "Daily"],
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled"],
      default: "Active",
    },
    startDate: {
      type: Date,
      required: [true, "Please enter a start date for the subscription"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", autoRenewal);

function autoRenewal() {
  if (!this.renewalDate) {
    const period = { Weekly: 7, Monthly: 30, Yearly: 365, Daily: 1 };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate + period[this.frequency]);
  }

  if (this.renewalDate < Date.now) {
    return (this.status = "Expired");
  }
  this.next();
}

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
