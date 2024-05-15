import React from "react";
import "./style.scss";
import ReactPaginate from "react-paginate";
import { OrderType } from "@/generated";
import ListaItem from "../lista/listaItem";
import Loading from "../loading/loading";
import ListaHeader from "../lista/listaHeader";
import { typeOrderBy } from "@/app/type/type";

function Items({
  currentItems,
  currentListItem,
  setCurrentListItem,
  setIsOpenDrawer,
  isOpenDrawer,
  setIsCommessaSelectedByList,
  orderBy,
  setOrderBy,
}: {
  currentItems: OrderType[] | null | undefined;
  currentListItem: OrderType | null | undefined;
  setCurrentListItem:
    | React.Dispatch<React.SetStateAction<OrderType | null | undefined>>
    | undefined;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  isOpenDrawer: boolean;
  setIsCommessaSelectedByList:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  orderBy: typeOrderBy | null;
  setOrderBy: React.Dispatch<React.SetStateAction<typeOrderBy | null>>;
}) {
  return (
    <>
      {currentItems ? (
        <ul>
          <ListaHeader orderBy={orderBy} setOrderBy={setOrderBy} />
          {currentItems?.map((item) => {
            return (
              <ListaItem
                key={item.codice}
                dataItem={item}
                currentListItem={currentListItem}
                setCurrentListItem={setCurrentListItem}
                setIsOpenDrawer={setIsOpenDrawer}
                isOpenDrawer={isOpenDrawer}
                setIsCommessaSelectedByList={setIsCommessaSelectedByList}
              />
            );
          })}
        </ul>
      ) : (
        <Loading />
      )}
    </>
  );
}

function PaginatedItems({
  itemsPerPage,
  dati,
  datiTotale,
  setCurrentPage,
  currentListItem,
  setCurrentListItem,
  setIsOpenDrawer,
  isOpenDrawer,
  setIsCommessaSelectedByList,
  orderBy,
  setOrderBy,
}: {
  itemsPerPage: number;
  dati: OrderType[] | undefined;
  datiTotale: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>> | undefined;
  currentListItem: OrderType | undefined | null;
  setCurrentListItem:
    | React.Dispatch<React.SetStateAction<OrderType | null | undefined>>
    | undefined;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenDrawer: boolean;
  setIsCommessaSelectedByList:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  orderBy: typeOrderBy | null;
  setOrderBy: React.Dispatch<React.SetStateAction<typeOrderBy | null>>;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const pageCount = datiTotale ? Math.ceil(datiTotale / itemsPerPage) : 1;

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setCurrentPage && setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <Items
        currentItems={dati}
        currentListItem={currentListItem}
        setCurrentListItem={setCurrentListItem}
        setIsOpenDrawer={setIsOpenDrawer}
        isOpenDrawer={isOpenDrawer}
        setIsCommessaSelectedByList={setIsCommessaSelectedByList}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className={"pagination"}
      />
    </>
  );
}
export default PaginatedItems;
