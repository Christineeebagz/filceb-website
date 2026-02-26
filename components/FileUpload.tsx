"use client";

import { ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "file";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.log("Upload error:", error);
    toast.error(`${type} upload failed. Please try again.`);
  };

  const onSuccess = (res: any) => {
    console.log("Upload success:", res);
    setFile(res);
    onFileChange(res.filePath); // This should now properly update the form
    toast.success(`${type} uploaded successfully`);
  };

  const onValidate = (file: File) => {
    const maxSize = type === "image" ? 20 * 1024 * 1024 : 30 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(
        `File size too large. Upload file that is less than ${maxSize / (1024 * 1024)}MB in size.`
      );
      return false;
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="space-y-2">
        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          validateFile={onValidate}
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
          }}
          folder={folder}
          accept={accept}
          className="hidden"
        />

        <button
          type="button"
          className={cn(
            "upload-btn w-full py-2 px-4 rounded-md flex items-center gap-2",
            styles.button
          )}
          onClick={(e) => {
            e.preventDefault();
            // @ts-ignore
            ikUploadRef.current?.click();
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        </button>

        {file.filePath && (
          <p className={cn("text-sm truncate", styles.text)}>
            Uploaded: {file.filePath.split("/").pop()}
          </p>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <span className="sr-only">{progress}%</span>
            </div>
            <p className="text-xs text-center mt-1">{progress}%</p>
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;

// "use client";

// import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
// import config from "@/lib/config";
// import ImageKit from "imagekit";
// import { useRef, useState } from "react";
// import Image from "next/image";
// import { toast } from "sonner";
// // import { toast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";

// const {
//   env: {
//     imagekit: { publicKey, urlEndpoint },
//   },
// } = config;

// const authenticator = async () => {
//   try {
//     const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

//     if (!response.ok) {
//       const errorText = await response.text();

//       throw new Error(
//         `Request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     const data = await response.json();

//     const { signature, expire, token } = data;

//     return { token, expire, signature };
//   } catch (error: any) {
//     throw new Error(`Authentication request failed: ${error.message}`);
//   }
// };

// interface Props {
//   type: "image" | "file";
//   accept: string;
//   placeholder: string;
//   folder: string;
//   variant: "dark" | "light";
//   onFileChange: (filePath: string) => void;
//   value?: string;
// }

// const FileUpload = ({
//   type,
//   accept,
//   placeholder,
//   folder,
//   variant,
//   onFileChange,
//   value,
// }: Props) => {
//   const ikUploadRef = useRef(null);
//   const [file, setFile] = useState<{ filePath: string | null }>({
//     filePath: value ?? null,
//   });
//   const [progress, setProgress] = useState(0);

//   const styles = {
//     button:
//       variant === "dark"
//         ? "bg-dark-300"
//         : "bg-light-600 border-gray-100 border",
//     placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
//     text: variant === "dark" ? "text-light-100" : "text-dark-400",
//   };

//   const onError = (error: any) => {
//     console.log(error);

//     toast({
//       title: `${type} upload failed`,
//       description: `Your ${type} could not be uploaded. Please try again.`,
//       variant: "destructive",
//     });
//   };

//   const onSuccess = (res: any) => {
//     setFile(res);
//     onFileChange(res.filePath);

//     toast(`${type} uploaded successfully`);
//     // toast({
//     //   title: `${type} uploaded successfully`,
//     //   description: `${res.filePath} uploaded successfully!`,
//     // });
//   };

//   const onValidate = (file: File) => {
//     if (type === "image") {
//       if (file.size > 20 * 1024 * 1024) {
//         toast(
//           "File size too large. Upload file that is less than 20MB in size."
//         );
//         // toast({
//         //   title: "File size too large",
//         //   description: "Please upload a file that is less than 20MB in size",
//         //   variant: "destructive",
//         // });

//         return false;
//       }
//     } else {
//       if (file.size > 30 * 1024 * 1024) {
//         toast(
//           "File size too large. Upload file that is less than 30mb in size."
//         );
//         // toast({
//         //   title: "File size too large",
//         //   description: "Please upload a file that is less than 50MB in size",
//         //   variant: "destructive",
//         // });
//         return false;
//       }
//     }

//     return true;
//   };

//   return (
//     <ImageKitProvider
//       publicKey={publicKey}
//       urlEndpoint={urlEndpoint}
//       authenticator={authenticator}
//     >
//       <IKUpload
//         ref={ikUploadRef}
//         onError={onError}
//         onSuccess={onSuccess}
//         useUniqueFileName={true}
//         validateFile={onValidate}
//         onUploadStart={() => setProgress(0)}
//         onUploadProgress={({ loaded, total }) => {
//           const percent = Math.round((loaded / total) * 100);

//           setProgress(percent);
//         }}
//         folder={folder}
//         accept={accept}
//         className="hidden"
//       />

//       <button
//         className={cn("upload-btn", styles.button)}
//         onClick={(e) => {
//           e.preventDefault();

//           if (ikUploadRef.current) {
//             // @ts-ignore
//             ikUploadRef.current?.click();
//           }
//         }}
//       >
//         <Image
//           src="/icons/upload.svg"
//           alt="upload-icon"
//           width={20}
//           height={20}
//           className="object-contain"
//         />

//         <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

//         {/* {file && (
//           <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
//         )} */}
//       </button>

//       {progress > 0 && progress !== 100 && (
//         <div className="w-full rounded-full bg-green-200">
//           <div className="progress" style={{ width: `${progress}%` }}>
//             {progress}%
//           </div>
//         </div>
//       )}

//       {file &&
//         (type === "image" ? (
//           <IKImage
//             alt={file.filePath}
//             path={file.filePath}
//             width={500}
//             height={300}
//           />
//         ) : (
//           <IKUpload
//             // isPrivateFile={false} // optional
//             // folder="/uploads/documents/" // optional
//             onError={onError}
//             onSuccess={onSuccess}
//             customCoordinates="10,10,10,10" // optional
//           />
//           // <IKVideo
//           //   path={file.filePath}
//           //   controls={true}
//           //   className="h-96 w-full rounded-xl"
//           // />
//         ))}
//     </ImageKitProvider>
//   );
// };

// export default FileUpload;
