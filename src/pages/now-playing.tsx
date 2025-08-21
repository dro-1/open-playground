import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import spotifySvg from "@/assets/icons/spotify.svg";
import axios from "axios";

gsap.registerPlugin(useGSAP, SplitText);
export const NowPlaying = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  const fetchCurrentTrack = async () => {
    const spotifyId = import.meta.env.VITE_SPOTIFY_ID;
    const spotifySecret = import.meta.env.VITE_SPOTIFY_SECRET;

    const authString = `${spotifyId}:${spotifySecret}`;
    const base64AuthString = btoa(authString);
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        scope: "user-read-currently-playing",
        refresh_token:
          "AQD70EMwR3UFiAEpBVjAwJjyG1sPsHPq50w9IrqDydizPFujAW2Ig8UzueDxSJlTrWUUDOeIuRleIbCyFAVBdAOKHGLLV8qo5Abycr2hFFigImeSdgwugzyp1Ivotejg7Ic",
      },
      {
        headers: {
          Authorization: `Basic ${base64AuthString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );

    const token = res.data.access_token;
    const nowPlayingRes = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let songTitle, artistsName, songImageUrl;
    if (nowPlayingRes.status === 204) {
      songTitle = "No song is currently playing.";
      artistsName = "Nil";
      songImageUrl = spotifySvg;
    } else {
      songTitle = nowPlayingRes.data.item.name;

      const artists: string[] = nowPlayingRes.data.item.artists.map(
        (artist: { name: string }) => artist.name
      );
      artistsName = artists.join(", ");

      const songImages = nowPlayingRes.data.item.album.images;
      songImageUrl = songImages.length > 0 ? songImages[0].url : null;
    }
    let circleText = `• ${songTitle} • ${artistsName} `;
    if (circleText.length >= 70) {
      const shortenedTitle =
        songTitle.length <= 35 ? songTitle : songTitle.substring(0, 34) + "...";
      const shortenedArtist =
        artistsName.length <= 35
          ? artistsName
          : artistsName.substring(0, 34) + "...";
      circleText = `• ${shortenedTitle} • ${shortenedArtist} `;
    }

    setImageUrl(songImageUrl);

    const textElem = containerRef.current!.querySelector("p");
    const textSplit = circleText.split("");
    textElem!.innerHTML = textSplit
      .map(
        (char, i) =>
          `<span class="now-playing-chars" style="transform:rotate(${
            i * (360 / textSplit.length)
          }deg)">${char}</span>`
      )
      .join("");
  };

  useEffect(() => {
    setInterval(fetchCurrentTrack, 3000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex justify-center items-center"
    >
      <div className="relative h-[250px] w-[250px] rounded-full flex justify-center items-center ">
        {imageUrl ? (
          <img
            className="h-[200px] w-[200px] object-cover rounded-full absolute"
            src={imageUrl}
            alt=""
          />
        ) : (
          <span
            className="h-[150px] w-[150px] rounded-full absolute shimmer-circle"
            aria-label="Loading image"
          ></span>
        )}

        <p className="absolute font-cinzel text-base w-full h-full animate-rotate"></p>
      </div>
    </div>
  );
};
