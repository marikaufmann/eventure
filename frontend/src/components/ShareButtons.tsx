import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  LinkedinShareButton,
} from "react-share";

const ShareButtons = ({
  url,
  title,
  styles,
  image,
}: {
  url: string;
  title: string;
  styles: string;
  image: string;
}) => {
  return (
    <div className={styles}>
      <FacebookShareButton url={url} title={title}>
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/facebook.svg`}
            className="w-8 h-8 "
          />
        </div>
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/x.svg`}
            alt="Twitter"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/whatsapp.svg`}
            alt="WhatsApp"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </WhatsappShareButton>
      <RedditShareButton url={url} title={title}>
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/reddit.svg`}
            alt="Reddit"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </RedditShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        summary="Check out this event!"
        source="YourWebsite"
      >
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/linkedin.svg`}
            alt="LinkedIn"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </LinkedinShareButton>

      <PinterestShareButton url={url} media={image} description={title}>
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/pinterest.svg`}
            alt="Pinterest"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </PinterestShareButton>
      <EmailShareButton url={url} subject={title} body="Check out this event!">
        <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out">
          <img
            src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/email.png`}
            alt="Email"
            className="w-8 h-8 group-hover:scale-105"
          />
        </div>
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
