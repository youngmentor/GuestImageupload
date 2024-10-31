import { loginSchema, signupSchema } from "../schema";
import { z } from 'zod';
export interface ImageData {
    id: string;
    url: string;
    uploadedAt: Date;
  };
  
export interface  UploadResponse  {
    success: boolean;
    message: string;
    imageData?: ImageData;
  };

 export  type SignupFormData = z.infer<typeof signupSchema>;

export  type LoginFormData = z.infer<typeof loginSchema>;


export interface Error {
    message: string
}