import * as z from "zod"
 
export const registerSchema = z.object({
name: z
    .string()
    .nonempty("Name is Required")
    .min(3, "Name must be at least 3 characters.")
    .max(12, "Description must be at most 12 characters."),
  
email: z
    .string()
    .nonempty("Email is Required")
    .email("Email is not Valid"),

password : z.string().nonempty("password is Required").min(8, "Password must be at least 8 characters"),

rePassword : z.string().nonempty("please confirm your password").min(8, "Password must be at least 8 characters"),

phone: z.string().nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/)
}).refine((data)=> data.password === data.rePassword , {
    path:["rePassword"],
    error: "Passwords do not match"
})

export type regisaterTypeSchema = z.infer<typeof registerSchema>


export const loginSchema = z.object({  
email: z
    .string()
    .nonempty("Email is Required")
    .email("Email is not Valid"),

password : z.string().nonempty("password is Required").min(8, "Password must be at least 8 characters"),
})

export type loginTypeSchema = z.infer<typeof loginSchema>


export const ShippingSchema = z.object({
  shippingAddress: z.object({
    city: z
      .string()
      .nonempty("City name is Required")
      .min(3, "City name must be at least 3 characters.")
      .max(12, "City name must be at most 12 characters."),

    details: z
      .string()
      .nonempty("details are Required")
      .min(3, "details must be at least 3 characters.")
      .max(50, "details must be at most 12 characters."),

    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/ , "Cannot be more than that!"),

    postalCode: z
      .string()
      .nonempty("Postal Code is Required")
      .regex(/^[0-9]{5}$/ , "Must only be 5 digits"),
  }),
});

export type ShippingTypeSchema = z.infer<typeof ShippingSchema>
