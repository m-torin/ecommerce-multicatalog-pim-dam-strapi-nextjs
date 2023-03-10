import {Inter, Lexend, Lora, Work_Sans} from '@next/font/google';
import localFont from '@next/font/local';

export const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});
export const cal = localFont({
  src: './CalSans-SemiBold.woff2',
  variable: '--font-cal',
  weight: '600',
  display: 'swap',
});

export const calTitle = localFont({
  src: './CalSans-SemiBold.woff2',
  variable: '--font-title',
  weight: '600',
  display: 'swap',
});
export const lora = Lora({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});
export const work = Work_Sans({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});

export const fontMapper = {
  'font-cal': calTitle.variable,
  'font-lora': lora.variable,
  'font-work': work.variable,
};
