// interface AuthCredentials {
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   //   firstName?: string;
//   //   lastName?: string;
//   //   businessName?: string;
//   //   businesstype?: string;
//   //   idUpload?: string;
//   //   businessDocuments?: string;
//   //   status?: string;
// }

interface AuthCredentials {
  email: string;
  password: string;
  confirmPassword?: string;
  // firstName?: string;
  // lastName?: string;
  // businessName?: string;
  // businesstype?: string;
  // idUpload?: string;
  // businessDocuments?: string;
  // status?: string;
  // role?: string;
}

// interface AuthCredentials {
//   email: string;
//   password: string;
//   confirmPassword?: string;
//   firstName?: string;
//   lastName?: string;
//   businessName?: string;
//   businesstype?: string;
//   idUpload?: string;
//   businessDocuments?: string;
//   status?: string;
//   role?: string;
// }

// types/auth.ts or similar
export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  barangayAddress: string;
  province: string;
  city: string;
  businessName: string;
  businessType: string;
  idUpload: string | null;
  businessDocuments: string | null;
}
