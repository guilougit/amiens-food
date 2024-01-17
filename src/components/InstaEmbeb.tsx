"use client";
import { InstagramEmbed } from "react-social-media-embed";

export default function InstaEmbeb() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/p/CUbHfhpswxt/"
        width={328}
      />
    </div>
  );
}
