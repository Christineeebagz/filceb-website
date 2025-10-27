export const FIELD_NAMES = {
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",

  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone Number",
  barangayAddress: "Barangay Address",
  province: "Province",
  city: "City",
  businessName: "Business Name",
  businesstype: "Business Type",
  idUpload: "Upload ID",
  businessDocuments: "Upload Business Documents",
} as const;

export const FIELD_TYPES = {
  email: "email",
  password: "password",
  confirmPassword: "password",
  firstName: "text",
  lastName: "text",
  phone: "number",
  barangayAddress: "text",
  province: "text",
  city: "text",
  businessName: "text",
  businesstype: "text",
} as const;

export const adminSideBarLinks = [
  {
    route: "/admin",
    text: "Home",
  },
  {
    route: "/admin/users",
    text: "Users",
  },
];
