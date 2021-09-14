import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Global/Layout";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles } from "@material-ui/core";
import AuthGuard from "@components/Global/AuthGuard";
import loopsApi from "@apiClient/loopsApi";

const useStyles = makeStyles((theme) => ({
    title: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 22,
      lineHeight: "28px",
      marginBottom: 18,
    },
    right: {
      backgroundColor: "#fbfbfb",
      marginLeft: 250,
      padding: "3rem 3rem",
      // border: "2px solid blue",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        padding: "0",
      }
    },
    detailview: {
      padding: "0rem 20rem",
      [theme.breakpoints.down("sm")]: {
        padding: "2rem",
      },
    },
    detailViewFrom: {
      border: "1px solid #dfdfdf",
      filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))",
      padding: "1rem",
      borderRadius: "2px",
      marginBottom: "1rem",
      "& .from": {
        display: "block",
        "& .from-title": {
          display: "inline-block",
          fontSize: "24px",
          color: "gray",
          verticalAlign:"top",
          [theme.breakpoints.down("sm")]: {
            fontSize: "16px",
          },
        },
        "& .from-detail": {
          display: "inline-block",
          marginLeft: "20px",
          "& .text": {
            fontSize: "24px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "16px",
            },
          }
        }
      }
    },
    detailViewTo: {
      border: "1px solid #dfdfdf",
      filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))",
      padding: "1rem",
      borderRadius: "2px",
      "& .to": {
        display: "block",
        borderBottom: "1px solid #dfdfdf",
        paddingBottom: "0.5rem",
        marginBottom: "1rem",
        "& .to-title": {
          display: "inline-block",
          fontSize: "24px",
          color: "gray",
          [theme.breakpoints.down("sm")]: {
            fontSize: "16px",
          },
        },
        "& .to-detail": {
          display: "inline-block",
          marginLeft: "20px",
          "& .text": {
            fontSize: "24px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "16px",
            },
          }
        }
      },
      "& .to-contact": {
        display: "block",
        paddingBottom: "0.5rem",
        marginBottom: "1rem",
        "& .to-contact-title": {
          display: "inline-block",
          fontSize: "18px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
          },
          color: "gray"
        },
        "& .to-contact-detail": {
          display: "inline-block",
          marginLeft: "20px",
          "& .text": {
            fontSize: "18px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }
        }
      },
      "& .to-loopers": {
        display: "block",
        paddingBottom: "0.5rem",
        marginBottom: "1rem",
        "& .to-loopers-title": {
          display: "inline-block",
          fontSize: "18px",
          color: "gray",
          verticalAlign: "top",
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
          },
        },
        "& .to-loopers-detail": {
          display: "inline-block",
          marginLeft: "20px",
          "& .text": {
            fontSize: "18px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }
        }
      },
      "& .to-location": {
        display: "block",
        paddingBottom: "0.5rem",
        marginBottom: "1rem",
        "& .to-location-title": {
          display: "inline-block",
          fontSize: "18px",
          color: "gray",
          verticalAlign: "top",
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
          },
        },
        "& .to-location-detail": {
          display: "inline-block",
          marginLeft: "20px",
          "& .text": {
            fontSize: "18px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }
        }
      }
    }
  }));

const Detail = ({}) => {
  const classes = useStyles();
  const router = useRouter();
  let { loopId } = router.query;
  const { windowDimensions } = useWindowDimensions();
  const [loopData, setLoopData] = useState({
    loop: {
      owner: {
        name: "",
        email: ""
      },
      recipient: {
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
      },
      loopers: [{
        email: ""
      }]
    }
  });

  const win = new Win(windowDimensions);
  const getLoopData = async (loopId: any) => {
    const data = await loopsApi.getLoop(loopId)
    console.log(data)
    return data
  }

  useEffect(() => {
    if(loopId) {
        getLoopData(loopId).then(data => setLoopData(data))
    }
  }, [loopId])

  return (
    <AuthGuard>
        <Layout>
          <div className="detail-lr-view">
          {win.up("md") && <Sidebar path={"/dashboard"} />}
            <div className={classes.right}>
                {
                  loopData && (
                    <div className={classes.detailview}>
                      <div className={classes.detailViewFrom}>
                        <div className="from">
                          <div className="from-title">
                            From
                          </div>
                          <div className="from-detail">
                            <span className="text">{loopData?.loop?.owner?.name}</span>
                          </div>
                        </div>
                        <span className="text">{loopData?.loop?.owner?.email}</span>
                      </div>
                      <div className={classes.detailViewTo}>
                        <div className="to">
                          <div className="to-title">
                            To
                          </div>
                          <div className="to-detail">
                            <span className="text">{loopData?.loop?.recipient?.name}</span>
                          </div>
                        </div>
                        <div className="to-contact">
                          <div className="to-contact-title">Contact </div>
                          <div className="to-contact-detail">
                            <span className="text">{loopData?.loop?.recipient?.email}</span>
                          </div>
                        </div>
                        <div className="to-loopers">
                          <div className="to-loopers-title">Loopers </div>
                          <div className="to-loopers-detail">
                            {
                              loopData?.loop?.loopers.map((data, key) => {
                                return (
                                  <>
                                  <span key={key} className="text">{data?.email}</span><br /> 
                                  </>
                                )
                              })
                            }
                          </div>
                        </div>
                        <div className="to-location">
                          <div className="to-location-title">Location </div>
                          <div className="to-location-detail">
                            <span className="text">{loopData?.loop?.recipient?.address}, {loopData?.loop?.recipient?.city}, {loopData?.loop?.recipient?.state}, {loopData?.loop?.recipient?.country}, {loopData?.loop?.recipient?.postalCode}</span><br /> 
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
            </div>
          </div>
        </Layout>
    </AuthGuard>
  );
};
export default Detail;
