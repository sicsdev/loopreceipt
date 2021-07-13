import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Sidebar";
import Links from "@components/Links";
import UpperBar from "@components/UpperBar";
import Button from "@components/Button";
import Image from "next/image";
import { useState } from "react";
import OptionCard from "@components/OptionCard";
const dialogItems = [
  {
    title: "Internal Loopreceipts",
    description: "Create loops within the members of your organization.",
    src: "/icons/create/internal.svg",
  },
  {
    title: "External Looprecipts",
    description: "Create loops with partners outside of your organization.",
    src: "/icons/create/external.svg",
  },
];
interface CreateProps {}

const Create = ({}: CreateProps) => {
  const styles = useStyles();
  const [show, setShow] = useState(false);
  return (
    <div className={styles.create}>
      <Sidebar />
      <div className={styles.right}>
        <Links links={["outgoing", "received", "drafts"]} />
        <UpperBar>
          <div className={styles.bar}>
            <div className="profile">
              <p className="icon">G</p>
              <p>Gari Boetang</p>
            </div>
            <Button onClick={() => setShow(!show)}>+ New Loopreceipt</Button>
          </div>
        </UpperBar>
        <div className={styles.rest}>
          {show && (
            <div className={"dialog"}>
              {dialogItems.map((item, i) => (
                <div key={i} className="item">
                  <Image src={item.src} width="40" height="40" />
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
              marginBottom: "2rem",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              You dont have any loop recipts yet.
            </p>
            <p>You’ll want to add receiptants to create loops with you.</p>
            <Button color="secondary" labelColor="white">
              Generate Loopreceipt
            </Button>
          </div>
          <div className="cards">
            <OptionCard
              iconSrc="/icons/create/delivery-notification.svg"
              text="Create a delivery notification"
              onClick={() => setShow(!show)}
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
      maxWidth: 420,
      position: "absolute",
      right: 0,
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px",
      "& .item": {
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        "&:not(:last-child)": {
          borderBottom: "2px solid #F4F3F3",
        },
        "& .content": {
          "& .title": {
            fontSize: "1.1rem",
          },
          "& .description": {},
        },
      },
    },
    "& .cards": {
      display: "flex",
      justifyContent: "center",
      gap: 30,
    },
  },
}));
