import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Sidebar";
import Links from "@components/Links";
import UpperBar from "@components/UpperBar";
import Button from "@components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import OptionCard from "@components/OptionCard";
import { useRouter } from "next/router";
import { useAppDispatch } from "@store/hooks";
import { setType } from "@store/slices/loopReceiptSlice";
import Typography from "@material-ui/core/Typography";
interface CreateProps {
  path: string;
}
const Create = ({ path }: CreateProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const closeDialog = () => {
      setShow(false);
    };
    window.addEventListener("click", closeDialog);
    return () => {
      window.removeEventListener("click", closeDialog);
    };
  }, []);

  const dialogItems = [
    {
      title: "Internal Loopreceipts",
      description: "Create loops within the members of your organization.",
      src: "/icons/create/internal.svg",
      click: () => {
        dispatch(setType({ type: "internal" }));
        router.push("/home");
      },
    },
    {
      title: "External Looprecipts",
      description: "Create loops with partners outside of your organization.",
      src: "/icons/create/external.svg",
      click: () => {
        dispatch(setType({ type: "external" }));
        router.push("/home");
      },
    },
  ];

  return (
    <div className={styles.create}>
      <Sidebar path={path} />
      <div className={styles.right}>
        <Links links={["outgoing", "received", "drafts"]} />
        <UpperBar>
          <div className={styles.bar}>
            <div className="profile">
              <p className="icon">G</p>
              <p>Gari Boetang</p>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // should be done since click is attached to window
                setShow(!show);
              }}
            >
              + New Loopreceipt
            </Button>
          </div>
        </UpperBar>
        <div className={styles.rest}>
          {show && (
            <div className={"dialog"}>
              {dialogItems.map((item, i) => (
                <div
                  key={i}
                  className="item"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.click();
                  }}
                >
                  <Image src={item.src} width="31" height="31" />
                  <div className="content">
                    <p className={"title"}>{item.title}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              marginTop: "1rem",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              style={{
                fontWeight: "bold",
              }}
            >
              You dont have any Loopreceipts yet.
            </Typography>
            <Typography variant="body2" gutterBottom>
              You’ll want to add recipients to create Loops with you.
            </Typography>
          </div>
          <div className="cards">
            <OptionCard
              iconSrc="/icons/create/delivery-notification.svg"
              text="Create a delivery notification"
              onClick={() => {
                setShow(!show);
              }}
            />
            <OptionCard
              iconSrc="/icons/create/add-user.svg"
              text="Invite your team"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
const useStyles = makeStyles((theme) => ({
  create: {},
  right: {
    marginLeft: 250,
    padding: "1rem 4rem",
    // border: "2px solid blue",
  },
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .profile": {
      display: "flex",
      alignItems: "center",
      gap: 16,
      "& .icon": {
        width: 47,
        height: 47,
        backgroundColor: "#C5C5C5",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "1.2rem",
      },
    },
  },
  rest: {
    position: "relative",
    "& .dialog": {
      zIndex: 10,
      backgroundColor: "white",
      maxWidth: 350,
      position: "absolute",
      right: 0,
      top: -15,
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px",
      "& .item": {
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        cursor: "pointer",
        "&:not(:last-child)": {
          borderBottom: "2px solid #F4F3F3",
        },
        "& .content": {
          "& .title": {
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "21px",
          },
          "& .description": {
            fontWeight: "400",
            fontSize: "11px",
            lineHeight: "16.5px",
          },
        },
      },
    },
    "& .cards": {
      display: "flex",
      justifyContent: "center",
      gap: 30,
      marginTop: "5rem",
    },
  },
}));
