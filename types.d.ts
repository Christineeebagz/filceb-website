export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  barangayAddress: string | null;
  province: string | null;
  city: string | null;
  businessName: string | null;
  businesstype:
    | "CORPORATION"
    | "SOLE PROPRIETORSHIP"
    | "PARTNERSHIP"
    | "COOPERATIVE"
    | "OTHERS"
    | null;
  idUpload: string | null;
  businessDocuments: string | null;
  status: "UNSUBMITTED" | "PENDING" | "PRE-APPROVED" | "APPROVED" | "REJECTED";
  role: "USER" | "ADMIN";
  lastActivityDate: string;
  createdAt: Date;
  referenceNum: string | null;
}

export type UserStatus = User["status"];
export type UserRole = User["role"];
export type BusinessType = User["businesstype"];

interface AuthCredentials {
  email: string;
  password: string;
  confirmPassword?: string;
  //   firstName?: string;
  //   lastName?: string;
  //   businessName?: string;
  //   businesstype?: string;
  //   idUpload?: string;
  //   businessDocuments?: string;
  //   status?: string;
}

// interface AuthCredentials {
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   // firstName?: string;
//   // lastName?: string;
//   // businessName?: string;
//   // businesstype?: string;
//   // idUpload?: string;
//   // businessDocuments?: string;
//   // status?: string;
//   // role?: string;
// }

// // interface AuthCredentials {
// //   email: string;
// //   password: string;
// //   confirmPassword?: string;
// //   firstName?: string;
// //   lastName?: string;
// //   businessName?: string;
// //   businesstype?: string;
// //   idUpload?: string;
// //   businessDocuments?: string;
// //   status?: string;
// //   role?: string;
// // }

// // types/auth.ts or similar
// export interface RegisterData {
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   barangayAddress: string;
//   province: string;
//   city: string;
//   businessName: string;
//   businessType: string;
//   idUpload: string | null;
//   businessDocuments: string | null;
// }
