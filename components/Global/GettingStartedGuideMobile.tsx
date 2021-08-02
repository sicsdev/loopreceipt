import Button from "@components/Controls/Button";
import RevealContent from "@components/Shared/RevealContent";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import { closeGettingStartedGuide } from "@store/slices/genericSlice";
import Image from "next/image";
import { useRef, useState } from "react";
interface GettingStartedGuideMobileProps {}
const GettingStartedGuideMobile = ({}: GettingStartedGuideMobileProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  return (
    <div
      className={styles.GettingStartedGuideMobile}
      style={{
        height: windowDimensions.innerHeight + "px",
      }}
    >
      <div className="top">
        <div className="first">
          <div className="text">Getting Started Guide</div>
          <div className="cross" onClick={closeGettingStartedGuide}>
            <Image alt="icon" src="/icons/x-mark.svg" width={23} height={23} />
          </div>
        </div>
        <div className="bars">
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="rest">
        <div className="items">
          <Item
            i={1}
            text="Connect your contact directory"
            activeContent={
              <>
                <p>
                  Loopreceipt can check google Contact, Office 365, Outlook or
                  iCloud and add your contacts for easier looping
                </p>
                <Button>Connect Contacts</Button>
              </>
            }
          />
          <Item
            i={2}
            text="Create single loops or create Loops by groups"
            activeContent={
              <>
                <p>
                  Loopreceipt can check google Contact, Office 365, Outlook or
                  iCloud and add your contacts for easier looping
                </p>
                <Button>Connect Contacts</Button>
              </>
            }
          />
          <Item i={3} text="View all your loops via “Package page”" />
          <Item i={4} text="Invite others to Loopreceipt to join your team" />
          <Item i={5} text="Need something not listed here. Contact Support" />
        </div>

        <div className="buttons">
          <div className="gotit">Got it! Don’t show this again</div>
          <div className="back">Back to home</div>
        </div>
      </div>
    </div>
  );
};
export default GettingStartedGuideMobile;
interface ItemProps {
  i: number;
  text: string;
  activeContent?: JSX.Element;
}
const Item = ({ i, text, activeContent }: ItemProps) => {
  const [active, setActive] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="item"
      onClick={() => {
        setActive(!active);
      }}
    >
      <p className="number">{i}</p>
      <div ref={parentRef}>
        <p className="text">{text}</p>
        {activeContent && (
          <RevealContent show={active} parentRef={parentRef}>
            <div
              className="activeContent"
              onClick={(e) => {
                e.stopPropagation();
                // because we want to listen click on the button
              }}
            >
              {activeContent}
            </div>
          </RevealContent>
        )}
      </div>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  GettingStartedGuideMobile: {
    zIndex: 1000,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    overflow: "auto",
    backgroundColor: "white",

    "& .top": {
      paddingRight: "10px",
      backgroundColor: "#495362",
      color: "white",
      "& .first": {
        display: "flex",
        justifyContent: "space-between",
        padding: 22,
        "& .text": {
          fontSize: 18,
        },
        "& .cross": {},
      },
      "& .bars": {
        paddingBottom: 22,
        display: "flex",
        justifyContent: "center",
        gap: 9,
        "& p": {
          width: "20%",
          height: 5,
          backgroundColor: "#333D49",
        },
      },
    },
    "& .rest": {
      backgroundColor: "#363F4D",
      "& .items": {
        paddingRight: 35,
        paddingLeft: 25,
        display: "flex",
        flexDirection: "column",
        gap: 37,
        "& .item": {
          userSelect: "none",
          borderBottom: "1px solid #444D5C",
          borderTop: "1px solid #444D5C",
          padding: "1.5rem 10px",
          display: "flex",
          gap: 14,

          "& .number": {
            backgroundColor: theme.palette.primary.main,
            minWidth: 26,
            height: 26,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 14,
            borderRadius: "50%",
          },
          "& .text": {
            paddingTop: 4,
            color: "white",
            fontSize: 15,
            fontWeight: 500,
          },
          "& .activeContent": {
            paddingTop: 20,
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            "& p": {
              fontSize: 15,
            },
          },
        },
      },

      "& .buttons": {
        marginTop: 70,
        textAlign: "center",
        "& .gotit": {
          padding: "1.5rem 0",
          backgroundColor: "#2F3947",
          color: "white",
        },
        "& .back": {
          paddingTop: "1.5rem",
          paddingBottom: "2.5rem",
          color: "#A5A2A2",
        },
      },
    },
  },
}));
