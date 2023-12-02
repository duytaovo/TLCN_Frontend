import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
// import { changeIconPlay, setAutoPlay, setSongId } from "src/store/slices/audio";

interface PropsSong {}
const ItemSearch = ({ item }: any) => {
  // console.log(item);
  // const dispatch = useAppDispatch()
  // const itemId = useAppSelector((state) => state.audio.itemId)
  // const isFocus = itemId == item?.encodeId

  // const onClick = async () => {
  //   dispatch(setitemId(item?.encodeId || ''))
  //   dispatch(changeIconPlay(true))
  //   dispatch(setAutoPlay(true))
  // }
  return (
    <div
      // onClick={onClick}
      className={`${
        false ? "bg-[#302639] shadow-box-shadow text-white" : ""
      } group mr-2 flex cursor-pointer items-center justify-start z-50 rounded hover:bg-mainColor`}
    >
      <img
        src={item?.lstImageUrl[0]}
        alt=""
        className=" h-24  rounded object-contain group-hover:opacity-80"
      />
      <div className="p-3 group-hover:text-white">
        <Typography
          color=""
          sx={{
            fontSize: "16px",
          }}
        >
          {item.name}
        </Typography>
        <Typography
          color=""
          sx={{
            color: "#A78295",
            fontSize: "14px",
          }}
        >
          {/* {item.artistsNames} */}
        </Typography>
      </div>
    </div>
  );
};

export default ItemSearch;
