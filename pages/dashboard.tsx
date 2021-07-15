import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";
import UpperBar from "@components/Create/UpperBar";
import Button from "@components/Controls/Button";
import Image from "next/image";
import { useRef, useState } from "react";
import OptionCard from "@components/Dashboard/OptionCard";
import { useRouter } from "next/router";
import { useAppDispatch } from "@store/hooks";
import { setType } from "@store/slices/loopReceiptSlice";
import Typography from "@material-ui/core/Typography";
import MovableModal from "@components/shared/MovableModal";
import ListenClickAtParentElement from "@components/shared/ListenClickAtParentElement";
interface DashboardProps {
  path: string;
}
const Dashboard = ({ path }: DashboardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const [show, setShow] = useState(false);
  const [mouseEvent, setMouseEvent] =
    useState<React.MouseEvent<any, MouseEvent>>();

  const dialogItems = [
    {
      title: "Internal Loopreceipts",
      description: "Create loops within the members of your organization.",
      src: "/icons/create/internal.svg",
      click: () => {
        dispatch(setType({ type: "internal" }));
        router.push("/create");
      },
    },
    {
      title: "External Looprecipts",
      description: "Create loops with partners outside of your organization.",
      src: "/icons/create/external.svg",
      click: () => {
        dispatch(setType({ type: "external" }));
        router.push("/create");
      },
    },
  ];
  const openModal: React.MouseEventHandler<any> = (e) => {
    // whenever we open the modal we need to stopPropagation
    // since modal adds modal close listener on window.click
    // console.log(e.target);
    e.stopPropagation();
    setMouseEvent(e);
    setShow(true);
  };
  return (
    <div className={styles.dashboard}>
      <Sidebar path={path} />
      <div className={styles.right}>
        <Links links={["outgoing", "received", "drafts"]} />
        <UpperBar>
          <div className={styles.bar}>
            <div className="profile">
              <p className="icon">G</p>
              <p>Gari Boetang</p>
            </div>
            {ListenClickAtParentElement(openModal, (childClick) => (
              <Button onClick={childClick}>+ New Loopreceipt</Button>
            ))}
          </div>
        </UpperBar>
        <div className={styles.rest}>
          <MovableModal
            mouseEvent={mouseEvent}
            showModal={show}
            setShowModal={setShow}
            translationsFrom="element"
            positionWRTPoint={{ bottom: true }}
          >
            <div className={"dialog"}>
              {dialogItems.map((item, i) => (
                <div key={i} className="item" onClick={item.click}>
                  <Image src={item.src} width="31" height="31" />
                  <div className="content">
                    <p className={"title"}>{item.title}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MovableModal>

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
            {ListenClickAtParentElement(openModal, (childClick) => (
              <OptionCard
                iconSrc="/icons/create/delivery-notification.svg"
                text="Create a delivery notification"
                onClick={childClick}
              />
            ))}

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
export default Dashboard;
const useStyles = makeStyles((theme) => ({
  dashboard: {},
  right: {
    marginLeft: 250,
    padding: "3rem 4rem",
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
    "& .dialog": {
      zIndex: 10,
      backgroundColor: "white",
      width: 350,
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
