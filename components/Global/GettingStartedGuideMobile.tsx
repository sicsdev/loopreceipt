import Button from "@components/Controls/Button";
import PrimaryLink from "@components/Shared/PrimaryLink";
import RevealContent from "@components/Shared/RevealContent";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import { closeGettingStartedGuide } from "@store/slices/dashboardSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
interface GettingStartedGuideMobileProps {}
const GettingStartedGuideMobile = ({}: GettingStartedGuideMobileProps) => {
  const styles = useStyles();
  const router = useRouter();
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
                <Button
                  onClick={() => {
                    closeGettingStartedGuide();
                    router.push("/contactconnections");
                  }}
                >
                  Connect Contacts
                </Button>
              </>
            }
          />
          <Item
            i={2}
            text="Create single loops or create Loops by groups"
            activeContent={
              <>
                <p>Start creating a loopreceipt</p>
                <Button
                  onClick={() => {
                    closeGettingStartedGuide();
                    router.push("/create");
                  }}
                >
                  Create Loopreceipt
                </Button>
              </>
            }
          />
          <Item i={3} text="View all your loops via “Package page”" />
          <Item i={4} text="Invite others to Loopreceipt to join your team" />
          <Item
            i={5}
            text={
              <>
                Need something not listed here.&nbsp;
                <PrimaryLink
                  href="https://www.loopreceipt.com/contact"
                  target="_blank"
                >
                  Contact Support
                </PrimaryLink>
              </>
            }
          />
        </div>

        <div className="buttons">
          <div className="gotit" onClick={closeGettingStartedGuide}>
            Got it! Don’t show this again
          </div>
          <div className="back" onClick={closeGettingStartedGuide}>
            Back to home
          </div>
        </div>
      </div>
    </div>
  );
};
export default GettingStartedGuideMobile;
interface ItemProps {
  i: number;
  text: any;
  activeContent?: JSX.Element;
}
const Item = ({ i, text, activeContent }: ItemProps) => {
  const [active, setActive] = useState(true);
  const parentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="item"
      onClick={() => {
        setActive(!active);
      }}
    >
      <p className="number">{i}</p>
      <div
        ref={parentRef}
        style={{
          width: "100%",
        }}
      >
        <div className="text">{text}</div>
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
        "& .cross": {
          cursor: "pointer",
        },
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
          cursor: "pointer",
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
            width: "100%",
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
          cursor: "pointer",
        },
        "& .back": {
          paddingTop: "1.5rem",
          paddingBottom: "2.5rem",
          color: "#A5A2A2",
          cursor: "pointer",
        },
      },
    },
  },
}));
