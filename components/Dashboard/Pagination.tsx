import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({
  totalItems,
  itemsPerPageOptions,
  itemsPerPage,
  setItemsPerPage,
  page,
  setPage,
}: PaginationProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const styles = useStyles();
  const [selectingItemsPerPage, setSelectingItemsPerPage] = useState(false);
  const [itemsPerPageCopy, setItemsPerPageCopy] = useState(itemsPerPage);
  const itemsPerPageSelectorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setPage(1);
  }, [totalItems]);
  useEffect(() => {
    // console.log('nextrowsperpage', rowsPerPage);
    const topEntryNum = itemsPerPageCopy * (page - 1) + 1;
    let newPage = 1;
    while (newPage * itemsPerPage < topEntryNum) newPage++;
    setPage(newPage);
    setItemsPerPageCopy(itemsPerPage);
  }, [itemsPerPage]);
  const prevArrow = (
    <div
      className="image"
      onClick={() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }}
    >
      <Image
        alt="icon"
        src="/icons/dashboard/prev-gray.svg"
        width={11}
        height={11}
      />
    </div>
  );
  const nextArrow = (
    <div
      className="image"
      onClick={() => {
        if (page < totalPages) {
          setPage(page + 1);
        }
      }}
    >
      <Image
        alt="icon"
        src="/icons/dashboard/next-gray.svg"
        width={11}
        height={11}
      />
    </div>
  );
  return (
    <div className={styles.Pagination}>
      <div className="first">
        <div className="text">Items per page: </div>
        <div
          aria-controls="select-items-per-page"
          aria-haspopup="true"
          onClick={() => setSelectingItemsPerPage(true)}
          ref={itemsPerPageSelectorRef}
          className="option"
        >
          <span>{itemsPerPage}</span>&nbsp;
          <Image
            alt="icon"
            src="/icons/dashboard/down.svg"
            width={10}
            height={6}
          />
        </div>
        <Menu
          className={styles.menu}
          open={selectingItemsPerPage}
          id="select-items-per-page"
          anchorEl={itemsPerPageSelectorRef.current}
          elevation={0}
          onClose={() => {
            setSelectingItemsPerPage(false);
          }}
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setItemsPerPage(option);
                setSelectingItemsPerPage(false);
              }}
              selected={itemsPerPage === option}
              className={styles.menuItem}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className="second">
        {win.down("xs") && prevArrow}
        <div className="text">
          {itemsPerPage * (page - 1) + 1}-
          {Math.min(itemsPerPage * page, totalItems)} of {totalItems} items
        </div>
        {win.down("xs") && nextArrow}
        {win.up("sm") && (
          <div className="arrows">
            {prevArrow}
            {nextArrow}
          </div>
        )}
      </div>
    </div>
  );
};
export default Pagination;
const useStyles = makeStyles((theme) => ({
  Pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.5)",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      gap: 10,
    },
    "& .first": {
      display: "flex",
      gap: 7,
      //   paddingBottom: 100,

      "& .text": {
        fontSize: 14,
      },
      "& .option": {
        display: "flex",
        // border: "1px solid red",
        width: "2.5rem",
        cursor: "pointer",
        justifyContent: "space-between",
        backgroundColor: "#eeeeee7d",
        padding: 4,
        "& span": {
          fontSize: 14,
        },
      },
    },
    "& .second": {
      display: "flex",
      alignItems: "center",
      gap: 40,

      [theme.breakpoints.down("xs")]: {
        gap: 10,
      },
      "& .text": {
        fontSize: 14,
      },
      "& .arrows": {
        display: "flex",
        gap: 20,
      },
      "& .image": {
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#eeeeee7d",
        [theme.breakpoints.up("sm")]: {
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#eeeeee7d",
          },
        },
      },
    },
  },
  menu: {
    "& .MuiList-root": {
      padding: "5px 0",
    },
    "& .MuiPaper-root": {
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
    },
  },
  menuItem: {
    padding: "5px 0",
    minHeight: 0,
    width: "2rem",
    // same as option width
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    "&:focus": {
      backgroundColor: "rgba(62, 103, 251, 0.1)",
    },
  },
}));
