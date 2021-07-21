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
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const styles = useStyles();
  const [selectingItemsPerPage, setSelectingItemsPerPage] = useState(false);
  const [itemsPerPageCopy, setItemsPerPageCopy] = useState(itemsPerPage);
  const itemsPerPageSelectorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    // console.log('nextrowsperpage', rowsPerPage);
    const topEntryNum = itemsPerPageCopy * (page - 1) + 1;
    let newPage = 1;
    while (newPage * itemsPerPage < topEntryNum) newPage++;
    setPage(newPage);
    setItemsPerPageCopy(itemsPerPage);
  }, [itemsPerPage]);
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
          <span>{itemsPerPage}</span>{" "}
          <Image src="/icons/dashboard/down.svg" width={10} height={6} />
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
        <div className="text">
          {itemsPerPage * (page - 1) + 1}-
          {Math.min(itemsPerPage * page, totalItems)} of {totalItems} items
        </div>
        <div className="arrows">
          <div
            className="image"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <Image
              src="/icons/dashboard/prev-gray.svg"
              width={11}
              height={11}
            />
          </div>
          <div
            className="image"
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <Image
              src="/icons/dashboard/next-gray.svg"
              width={11}
              height={11}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
const useStyles = makeStyles((theme) => ({
  Pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    color: "rgba(0, 0, 0, 0.5)",
    "& .first": {
      display: "flex",
      gap: 7,
      paddingBottom: 100,
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
      gap: 40,
      "& .text": {
        paddingTop: 4,
        fontSize: 14,
      },
      "& .arrows": {
        display: "flex",
        gap: 20,
        "& .image": {
          cursor: "pointer",
          borderRadius: "50%",
          padding: "4px 8px",

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
