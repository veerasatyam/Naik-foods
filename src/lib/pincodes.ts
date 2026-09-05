export interface DeliveryEstimate {
  serviceable: boolean;
  city: string;
  state: string;
  days: number;
  deliveryDate: string;
  shippingCost: number;
}

export function checkPincode(pincode: string, cartTotal: number): DeliveryEstimate {
  const cleanPin = pincode.replace(/\D/g, "");
  
  if (cleanPin.length !== 6) {
    return {
      serviceable: false,
      city: "Unknown",
      state: "India",
      days: 0,
      deliveryDate: "",
      shippingCost: 0,
    };
  }

  // Delivery calculation logic
  let city = "India Wide";
  let state = "Maharashtra";
  let days = 3;

  if (cleanPin.startsWith("411")) {
    city = "Pune";
    state = "Maharashtra";
    days = 1; // Same-day or next-day in Pune
  } else if (cleanPin.startsWith("400") || cleanPin.startsWith("401") || cleanPin.startsWith("410")) {
    city = "Mumbai / MMR";
    state = "Maharashtra";
    days = 2;
  } else if (cleanPin.startsWith("440") || cleanPin.startsWith("441") || cleanPin.startsWith("445")) {
    city = "Nagpur / Vidarbha";
    state = "Maharashtra";
    days = 2;
  } else if (cleanPin.startsWith("416")) {
    city = "Kolhapur / Konkan";
    state = "Maharashtra";
    days = 2;
  } else if (cleanPin.startsWith("4")) {
    city = "Maharashtra";
    state = "Maharashtra";
    days = 3;
  } else {
    city = "Pan-India Express";
    state = "India";
    days = 4;
  }

  // Target delivery date calculation
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);
  const options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = targetDate.toLocaleDateString("en-IN", options);

  const shippingCost = cartTotal >= 499 ? 0 : 50;

  return {
    serviceable: true,
    city,
    state,
    days,
    deliveryDate: formattedDate,
    shippingCost,
  };
}
