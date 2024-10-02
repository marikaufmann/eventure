import { ForwardRefExoticComponent, ReactNode } from "react";
import * as Icons from "lucide-react";
export type MusicCategories = {
  [key: string]: string[];
};
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type EditFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};

interface SlideGeneratorOption {
  id?: string;
  content?: string;
  hasImage?: boolean;
  useImageAsTag?: boolean;
}

export type GenerateSlides = (params: SlideGeneratorOption) => Slide[];

export interface Slide {
  id?: string;
  fill?: string;
  content: string;
  customContent?: ReactNode;
  imageUrl?: string;
  useImageAsTag?: boolean;
}

export interface Colors {
  [key: string]: string | string[];
}

export type IconComponent =
  | ForwardRefExoticComponent<Icons.LucideProps>
  | undefined;
