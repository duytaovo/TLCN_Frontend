import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISelectItemsBlog } from 'src/types/aboutUs/newsRoom'
import { DataBlogAboutUs } from 'src/components/Blog/Blog'
import { ISelectItemsExploreHosting, ISelectItemsImgExploreHosting } from 'src/types/HowItWork'
import { DataExploreHostingAboutUsText } from 'src/items/ExploreHosting/DataExploreHostingText'
import { ISelectItemsCarouselNewsRoom } from 'src/types/aboutUs/CarouselNewsRoom'
import { ItemCarouselAboutUs_NewsRoom } from 'src/items/Carousel/Carouseltems'
import { ISelectItemsTitleCarouselNewsRoom } from 'src/types/aboutUs/CarouselNewsRoom'
import { ISelectItemsJoinTeamAboutUs, ISelectBannerAboutUs } from 'src/types/aboutUs/aboutus'
import { DataJoinTeamAboutUs } from 'src/pages/AboutUs/JoinTeam/JoinTeam'
import { DataBannerAboutUs } from 'src/pages/AboutUs/Banner/Banner'
import { DataConnectedCarSharingHome } from 'src/items/ConnectedCarSharing/DataConnectedCarSharing'
import { IConnectedCarSharing } from 'src/types/connectedCarSharing.type'
import { ISelectHeaderAboutUs } from 'src/types/aboutUs/aboutus'
import { DataHeaderAboutUs } from 'src/pages/AboutUs/HeaderSlide/HeaderSlide'
interface AboutUSState {
  BlogNewsRoom: ISelectItemsBlog
  ExploreAboutUs: ISelectItemsExploreHosting
  CarouselNewsRoom: ISelectItemsCarouselNewsRoom[]
  TitleCarouselAboutUs: ISelectItemsTitleCarouselNewsRoom
  JoinTeamAboutUs: ISelectItemsJoinTeamAboutUs
  BannerAboutUS: ISelectBannerAboutUs
  ConnectedCarSharingR: IConnectedCarSharing[]
  HeaderAboutUs: ISelectHeaderAboutUs[]
  ImgExploreAboutUs: ISelectItemsImgExploreHosting
}

const initialState: AboutUSState = {
  ImgExploreAboutUs: {
    img: 'ImgExploreAboutUs'
  },
  BlogNewsRoom: {
    id: 'Blog_AboutUS_AboutUs',
    img: 'img_Blog_About',
    headerTitle: 'headerTitle_Blog_About',
    mainTitle: 'mainTitle_Blog_About',
    content: 'content_Blog_About',
    linkTo: 'linkTo_Blog_About',
    link: 'link_Blog_About'
  },
  ExploreAboutUs: {
    id: 'ExploreHosting_AboutUs_AboutUs',
    mainTitle: 'mainTitle_Explore_AboutUs',
    headerTitle: 'header_Explore_AboutUs',
    Title: 'title_Explore_AboutUs',

    Description: 'description_Explore_AboutUs',
    Link: 'link_Explore_AboutUs'
  },
  CarouselNewsRoom: [
    {
      id: 1,
      title: 'title1_Carousel_AboutUS',
      date: 'date1_Carousel_AboutUS',
      description: `description1_Carousel_AboutUS`,
      linkto: 'linkTo1_Carousel_AboutUS',
      link: 'link1_Carousel_AboutUS'
    },
    {
      id: 2,
      title: `title2_Carousel_AboutUS`,
      date: 'date2_Carousel_AboutUS',
      description: `description2_Carousel_AboutUS`,
      linkto: 'linkTo2_Carousel_AboutUS',
      link: 'link2_Carousel_AboutUS'
    },
    {
      id: 3,
      title: `title3_Carousel_AboutUS`,
      date: 'date3_Carousel_AboutUS',
      description: `description3_Carousel_AboutUS`,
      linkto: 'linkTo3_Carousel_AboutUS',
      link: 'link3_Carousel_AboutUS'
    },
    {
      id: 4,
      title: `title4_Carousel_AboutUS`,
      date: 'date4_Carousel_AboutUS',
      description: `description4_Carousel_AboutUS`,
      linkto: 'linkTo4_Carousel_AboutUS',
      link: 'link4_Carousel_AboutUS'
    }
  ],
  TitleCarouselAboutUs: {
    id: 'Carousel_Title_AboutUs_AboutUs',
    headerTitle: 'headerTitle_TitleCarousel_AboutUs',
    title: 'title_TitleCarousel_AboutUs',
    linkTo: 'linkTo_TitleCarousel_AboutUs'
  },
  JoinTeamAboutUs: {
    id: 'JoinTeam_AboutUS_AboutUs',
    title: 'title_JoinTeam_AboutUs',
    img: 'img_JoinTeam_AboutUs',
    content: 'content_JoinTeam_AboutUs',
    linkTo: 'linkTo_JoinTeam_AboutUs',
    link: 'link_JoinTeam_AboutUs'
  },
  BannerAboutUS: {
    id: 'Banner_AboutUs_AboutUS',
    headertitle: 'sss',
    title: 'title_Banner_AboutUS',
    content: 'content_Banner_AboutUS',
    img: 'img_Banner_AboutUS'
  },
  ConnectedCarSharingR: [
    {
      id: 'Connected_AboutUs_AboutUs',
      total: 'total1_ConnectedCarSharing_AboutUs',
      title: 'title1_ConnectedCarSharing_AboutUs'
    },
    {
      id: 'Connected_AboutUs_AboutUs',
      total: 'total2_ConnectedCarSharing_AboutUs',
      title: 'title2_ConnectedCarSharing_AboutUs'
    },
    {
      id: 'Connected_AboutUs_AboutUs',
      total: 'total3_ConnectedCarSharing_AboutUs',
      title: 'title3_ConnectedCarSharing_AboutUs'
    },
    {
      id: 'Connected_AboutUs_AboutUs',
      total: 'total4_ConnectedCarSharing_AboutUs',
      title: 'title4_ConnectedCarSharing_AboutUs'
    }
  ],
  HeaderAboutUs: [
    {
      id: 'Header_AboutUs_AboutUs',
      title: 'title_Header_AboutUs',
      arrayImg: [
        'img1_Header_AboutUs',
        'img2_Header_AboutUs',
        'img3_Header_AboutUs',
        'img4_Header_AboutUs',
        'img5_Header_AboutUs',
        'img6_Header_AboutUs',
        'img7_Header_AboutUs'
      ]
    }
  ]
}

const AboutUSSlice = createSlice({
  name: 'AboutUs',
  initialState,
  reducers: {
    updateExploreAboutUs: (state, action: PayloadAction<ISelectItemsExploreHosting>) => {
      state.ExploreAboutUs = action.payload
    },
    updateCaruouselNewsRoom: (state, action: PayloadAction<ISelectItemsCarouselNewsRoom>) => {
      state.CarouselNewsRoom.push(action.payload)
    },
    updateTitleCarouselAboutUs: (state, action: PayloadAction<ISelectItemsTitleCarouselNewsRoom>) => {
      state.TitleCarouselAboutUs = action.payload
    },
    updateJoinTeamAboutUs: (state, action: PayloadAction<ISelectItemsJoinTeamAboutUs>) => {
      state.JoinTeamAboutUs = action.payload
    },
    updateBlogAboutUS: (state, action: PayloadAction<ISelectItemsBlog>) => {
      state.BlogNewsRoom = action.payload
    },
    updateBannerAboutUS: (state, action: PayloadAction<ISelectBannerAboutUs>) => {
      state.BannerAboutUS = action.payload
    },
    updateConnectAboutUs: (state, action: PayloadAction<IConnectedCarSharing>) => {
      state.ConnectedCarSharingR.push(action.payload)
    },
    updateHeaderAboutUs: (state, action: PayloadAction<ISelectHeaderAboutUs>) => {
      state.HeaderAboutUs.push(action.payload)
    }
  },
  extraReducers: (builder) => {}
})

export const {
  updateBlogAboutUS,
  updateExploreAboutUs,
  updateTitleCarouselAboutUs,
  updateJoinTeamAboutUs,
  updateBannerAboutUS,
  updateConnectAboutUs,
  updateHeaderAboutUs
} = AboutUSSlice.actions
const AboutUSReducer = AboutUSSlice.reducer
export default AboutUSReducer
