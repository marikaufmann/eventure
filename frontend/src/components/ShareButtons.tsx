import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  LinkedinShareButton,
} from "react-share";
import Tooltip from "./Tooltip";

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
      <Tooltip text="Share on Facebook">
        <FacebookShareButton url={url} title={title}>
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/facebook.svg`}
              className="w-8 h-8 "
            />
          </div>
        </FacebookShareButton>
      </Tooltip>
      <Tooltip text="Share on X">
        <TwitterShareButton url={url} title={title}>
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/x.svg`}
              alt="Twitter"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </TwitterShareButton>
      </Tooltip>
      <Tooltip text="Share on WhatsApp">
        <WhatsappShareButton url={url} title={title}>
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/whatsapp.svg`}
              alt="WhatsApp"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </WhatsappShareButton>
      </Tooltip>
      <Tooltip text="Share on Reddit">
        <RedditShareButton url={url} title={title}>
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/reddit.svg`}
              alt="Reddit"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </RedditShareButton>
      </Tooltip>
      <Tooltip text="Share on Linkedin">
        <LinkedinShareButton
          url={url}
          title={title}
          summary="Check out this event!"
          source="Eventure"
        >
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/linkedin.svg`}
              alt="LinkedIn"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </LinkedinShareButton>
      </Tooltip>
      <Tooltip text="Share on Pinterest">
        <PinterestShareButton url={url} media={image} description={title}>
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${
                import.meta.env.VITE_CLOUDINARY_ASSETS_URL
              }/pinterest.svg`}
              alt="Pinterest"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </PinterestShareButton>
      </Tooltip>
      <Tooltip text="Share via email">
        <EmailShareButton
          url={url}
          subject={title}
          body="Check out this event!"
        >
          <div className="p-2 border-2 border-black rounded-sm hover:bg-black/10 group transition-all ease-in-out inline-block align-middle">
            <img
              src={`${import.meta.env.VITE_CLOUDINARY_ASSETS_URL}/email.png`}
              alt="Email"
              className="w-8 h-8 group-hover:scale-105"
            />
          </div>
        </EmailShareButton>
      </Tooltip>
    </div>
  );
};

export default ShareButtons;
