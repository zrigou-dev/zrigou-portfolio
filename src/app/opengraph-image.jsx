import { ogSize, siteOgImage } from "@/lib/og";

export const alt = "Mohamed Zrigou, full-stack web and mobile developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return siteOgImage();
}
