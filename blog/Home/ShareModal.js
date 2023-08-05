import { Close } from '@material-ui/icons';
import { Button } from '@mui/material';
import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  HatenaIcon,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
} from "react-share";
const ShareModal = (props) => {
    const shareUrl = props.shareUrl;
   
  return (
    <div className="share-modal">
      <div className="container-x">
        <Close
          style={{ float: "right", margin: "-20px 10px 10px 10px" }}
          onClick={() => props.setOpen(false)}
        />
        <div>
          <FacebookShareButton
            url={shareUrl}
            quote={"Share To Your Facebook Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={shareUrl}
            quote={"Share To Your Whatsapp Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <TwitterShareButton
            url={shareUrl}
            quote={"Share To Your Twitter Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <TelegramShareButton
            url={shareUrl}
            quote={"Share To Your Telegram Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
          <InstapaperShareButton
            url={shareUrl}
            quote={"Share To Your Instagram Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <InstapaperIcon size={40} round={true} />
          </InstapaperShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            quote={"Share To Your Messenger Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <FacebookMessengerIcon size={40} round={true} />
          </FacebookMessengerShareButton>
          <LinkedinShareButton
            url={shareUrl}
            quote={"Share To Your Linkdin Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <LinkedinIcon size={40} round={true} />
          </LinkedinShareButton>
          <PinterestShareButton
            url={shareUrl}
            quote={"Share To Your Pinterest Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <PinterestIcon size={40} round={true} />
          </PinterestShareButton>
          <RedditShareButton
            url={shareUrl}
            quote={"Share To Your Reddit Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <RedditIcon size={40} round={true} />
          </RedditShareButton>
          <MailruShareButton
            url={shareUrl}
            quote={"Share To Your Mailru Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <MailruIcon size={40} round={true} />
          </MailruShareButton>
          <EmailShareButton
            url={shareUrl}
            quote={"Share To Your E-Mail Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
          <PocketShareButton
            url={shareUrl}
            quote={"Share To Your Pocket Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <PocketIcon size={40} round={true} />
          </PocketShareButton>
          <WeiboShareButton
            url={shareUrl}
            quote={"Share To Your Weibo Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <WeiboIcon size={40} round={true} />
          </WeiboShareButton>
          <VKShareButton
            url={shareUrl}
            quote={"Share To Your Vk Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <VKIcon size={40} round={true} />
          </VKShareButton>
          <OKShareButton
            url={shareUrl}
            quote={"Share To Your Ok Account"}
            hashtag={"#Asikur_Portfolio_Website,#asikur,#asikur_blog,#asikurblog,#asikur-portfolio-website..."}
          >
            <OKIcon size={40} round={true} />
          </OKShareButton>
        </div>
        <Button
          className="btn-x"
          onClick={() => props.setOpen(false)}
          variant="contained"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default ShareModal