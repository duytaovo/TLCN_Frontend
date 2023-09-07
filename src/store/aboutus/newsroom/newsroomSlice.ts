import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISelectItemsBlog } from 'src/types/aboutUs/newsRoom'
import { DataBlogNewsRoom } from 'src/components/Blog/Blog'
import { DataHelpCUstomerNewsroom } from 'src/pages/NewsRoom/HelpCustomer/HelpCustomer'
import { ISelectItemsHelpCustomer } from 'src/types/aboutUs/newsRoom'
import { ISelectItemsHeader } from 'src/types/aboutUs/newsRoom'
import { DataHeaderNewsRoom } from 'src/pages/NewsRoom/HeaderNewsRoom/HeaderNewsRoom'
import { DataReadNewItem } from 'src/items/NewsRoom/DataNewsRoom'
import { ISelectItemsReadNews, ISelectItemsTitleReadNews } from 'src/types/aboutUs/newsRoom'
import { ISelectItemsCarouselNewsRoom } from 'src/types/aboutUs/CarouselNewsRoom'
import { ItemCarouselNewsRoom_NewsRoom } from 'src/items/Carousel/Carouseltems'
import { ISelectItemsTitleCarouselNewsRoom } from 'src/types/aboutUs/CarouselNewsRoom'
import { DataTitleCarouselNR } from 'src/pages/NewsRoom/NewsRoom'
interface NewsRoomState {
  BlogNewsRoom: ISelectItemsBlog
  HelpCustomerNewsRoom: ISelectItemsHelpCustomer
  HeaderNewsRoom: ISelectItemsHeader
  ReadNewsRoom: ISelectItemsReadNews[]
  CarouselNewsRoom: ISelectItemsCarouselNewsRoom[]
  TitleCarouselNewsRoom: ISelectItemsTitleCarouselNewsRoom
  TitleReadNewsRoom: ISelectItemsTitleReadNews
}

const initialState: NewsRoomState = {
  TitleReadNewsRoom: {
    id: 'readNewsRoom_AboutUs_NewsRoom',
    headerTitle: 'headerTitle_ReadNewsRoom',
    title: 'title_ReadNewsRoom'
  },
  BlogNewsRoom: {
    id: 'Blog_AboutUS_NewsRoom',
    img: 'img_Blog_NewsRoom',
    headerTitle: 'headerTitle_Blog_NewsRoom',
    mainTitle: 'mainTitle_Blog_NewsRoom',
    content: 'content_Blog_NewsRoom',
    linkTo: 'linkTo_Blog_NewsRoom',
    link: 'link_Blog_NewsRoom'
  },
  HelpCustomerNewsRoom: {
    id: 'helpCustomer_AboutUs_NewsRoom',
    title: `title_HelpCustomer_NewsRoom`,
    linkTo: `linkTo_HelpCustomer_NewsRoom`,
    nameButton: 'nameButton_HelpCustomer_NewsRoom',
    img: 'img_HelpCustomer_NewsRoom',
    link: 'link_HelpCustomer_NewsRoom'
  },
  HeaderNewsRoom: {
    id: 'header_AboutUs_NewsRoom',
    img: 'img_Header_NewsRoom',
    title: 'title_Header_NewsRoom',
    content: 'content_Header_NewsRoom',
    titleButton: 'titleButton_Header_NewsRoom',
    email: 'email_Header_NewsRoom'
  },
  ReadNewsRoom: [
    {
      id: 'readNews_AboutUs_NewsRoom_1',
      day: 'date1_Read_NewsRoom',
      title: 'title1_Read_NewsRoom',
      link: 'link1_Read_NewsRoom'
    },
    {
      id: 'readNews_AboutUs_NewsRoom_2',
      day: 'date2_Read_NewsRoom',
      title: 'title2_Read_NewsRoom',
      link: 'link2_Read_NewsRoom'
    },
    {
      id: 'readNews_AboutUs_NewsRoom_3',
      day: 'date3_Read_NewsRoom',
      title: 'title3_Read_NewsRoom',
      link: 'link3_Read_NewsRoom'
    }
  ],
  CarouselNewsRoom: [
    {
      id: 1,
      title: 'title1_Carousel_NewsRoom',
      date: 'date1_Carousel_NewsRoom',
      description: `description1_Carousel_NewsRoom`,
      linkto: 'linkTo1_Carousel_NewsRoom',
      link: 'link1_Carousel_NewsRoom'
    },
    {
      id: 2,
      title: 'title2_Carousel_NewsRoom',
      date: 'date2_Carousel_NewsRoom',
      description: `description2_Carousel_NewsRoom`,
      linkto: 'linkTo2_Carousel_NewsRoom',
      link: 'link2_Carousel_NewsRoom'
    },
    {
      id: 3,
      title: 'title3_Carousel_NewsRoom',
      date: 'date3_Carousel_NewsRoom',
      description: `description3_Carousel_NewsRoom`,
      linkto: 'linkTo3_Carousel_NewsRoom',
      link: 'link3_Carousel_NewsRoom'
    },
    {
      id: 4,
      title: 'title4_Carousel_NewsRoom',
      date: 'date4_Carousel_NewsRoom',
      description: `description4_Carousel_NewsRoom`,
      linkto: 'linkTo4_Carousel_NewsRoom',
      link: 'link4_Carousel_NewsRoom'
    }
  ],
  TitleCarouselNewsRoom: {
    id: 's',
    headerTitle: 'headerTitle_TitleCarousel_NewsRoom',
    title: 'title_TitleCarousel_NewsRoom',
    linkTo: 'linkTo_TitleCarousel_NewsRoom'
  }
}

const NewsRoomSlice = createSlice({
  name: 'NewsRoom',
  initialState,
  reducers: {
    updateReadNewsRoom: (state, action: PayloadAction<ISelectItemsReadNews>) => {
      state.ReadNewsRoom.push(action.payload)
    },
    updateCaruouselNewsRoom: (state, action: PayloadAction<ISelectItemsCarouselNewsRoom>) => {
      state.CarouselNewsRoom.push(action.payload)
    },
    updateTitleCarouselNewsRoom: (state, action: PayloadAction<ISelectItemsTitleCarouselNewsRoom>) => {
      state.TitleCarouselNewsRoom = action.payload
    },
    updateBlogNewsRoom: (state, action: PayloadAction<ISelectItemsBlog>) => {
      state.BlogNewsRoom = action.payload
    },
    updateHeaderNewsRoom: (state, action: PayloadAction<ISelectItemsHeader>) => {
      state.HeaderNewsRoom = action.payload
    },
    updateHelpCustomerNewsroom: (state, action: PayloadAction<ISelectItemsHelpCustomer>) => {
      state.HelpCustomerNewsRoom = action.payload
    },
    updateTitleReadNewsRoomNewsroom: (state, action: PayloadAction<ISelectItemsTitleReadNews>) => {
      state.TitleReadNewsRoom = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const {
  updateBlogNewsRoom,
  updateHeaderNewsRoom,
  updateHelpCustomerNewsroom,
  updateCaruouselNewsRoom,
  updateTitleCarouselNewsRoom,
  updateReadNewsRoom
} = NewsRoomSlice.actions
const NewsRoomReducer = NewsRoomSlice.reducer
export default NewsRoomReducer
