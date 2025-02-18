import React, { useState, useEffect } from "react";
import { LiveMarkdownStyle } from "../../components/LiveMarkdownStyle";
import { MarkdownStyle } from "../../components/MarkdownStyle";
import styles from "./styles/MsgBubble.module.css";

// Icons
import pinacLogo from "/icon/pinac-logo.png";

// ============================================================================ //
//                            AI Message Bubble                                 //
// ============================================================================ //

interface AiMsgBubbleProps {
  live: boolean;
  response: string;
  setButtonsDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AiMsgBubble: React.FC<AiMsgBubbleProps> = ({
  live,
  response,
  setButtonsDisabled,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(
    window.innerWidth > 576
  );

  // Button
  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(response)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  //
  // for UI responsiveness
  useEffect(() => {
    const updateAvatarVisibility = () => {
      setIsAvatarVisible(window.innerWidth > 576);
    };
    window.addEventListener("resize", updateAvatarVisibility);
    return () => window.removeEventListener("resize", updateAvatarVisibility);
  }, []);

  // ---------------------------------- //
  return (
    <>
      <div className={styles.msg_row}>
        {isAvatarVisible && (
          <div className={styles.msg_avatar}>
            <img src={pinacLogo} alt="AI Avatar" />
          </div>
        )}
        <div className={styles.msg_content}>
          <div className={styles.msg_btn}>
            <div className={styles.msg_name}>PINAC</div>
          </div>
          <div className={`${styles.msg_text} ${styles.ai_msg}`}>
            {live ? (
              <LiveMarkdownStyle
                text={response}
                setButtonsDisabled={
                  setButtonsDisabled ? setButtonsDisabled : null
                }
              />
            ) : (
              <MarkdownStyle text={response} />
            )}
          </div>
          <div className={styles.ai_msg_copy_btn}>
            <button className={styles.copy_btn} onClick={copyToClipboard}>
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================================ //
//                        AI Response Loading Animation                         //
// ============================================================================ //

//
// Component similar to AiMessage and replaced as soon as we have the data.
export const AiLoader: React.FC = () => {
  const [isAvatarVisible, setIsAvatarVisible] = useState(
    window.innerWidth > 576
  );

  // Handle window resize and update avatar visibility
  useEffect(() => {
    const updateAvatarVisibility = () => {
      setIsAvatarVisible(window.innerWidth > 576);
    };
    window.addEventListener("resize", updateAvatarVisibility);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", updateAvatarVisibility);
  }, []);

  // ---------------------------------- //
  return (
    <>
      <div className={styles.msg_row}>
        {isAvatarVisible && (
          <div className={styles.msg_avatar}>
            <img src={pinacLogo} alt="AI Avatar" />
          </div>
        )}
        <div className={styles.msg_content}>
          <div className={styles.msg_btn}>
            <div className={styles.msg_name}>PINAC</div>
          </div>
          <div className={`${styles.msg_text} ${styles.ai_msg}`}>
            <div className={styles.loader} />
          </div>
        </div>
      </div>
    </>
  );
};
