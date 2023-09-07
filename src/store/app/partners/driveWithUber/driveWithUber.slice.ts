import { createSlice } from '@reduxjs/toolkit'
import { IExploreHostingSection } from 'src/types/IExploreHostingSection.type'
import { IQAndASection } from 'src/types/IQAndASection.type'
import {
  IDriveWithUberStepSection,
  IGetStatedSection,
  IHeroSectionType,
  IIntroduceSection,
  IPerksSection
} from 'src/types/driveWithUber/driveWithUberSection.type'

type DriveWithUberType = {
  heroSection: IHeroSectionType
  introduceSection: IIntroduceSection
  perksSection: IPerksSection
  driveStepsSection: IDriveWithUberStepSection
  getStatedSection: IGetStatedSection
  driveWithUberExploreHosting: IExploreHostingSection
  diriveQAndASection: IQAndASection
}

const initialState: DriveWithUberType = {
  heroSection: {
    id: 'drive_hero_s-01',
    img: 'drive_with_uber_hero_img',
    logos: ['drive_with_uber_hero_logo_unlock', 'drive_with_uber_hero_logo_another'],
    titles: ['drive_with_uber_hero_title_1', 'drive_with_uber_hero_title_2'],
    paragraphs: ['drive_with_uber_hero_para_1', 'drive_with_uber_hero_para_2'],
    buttonTitle: 'drive_with_uber_hero_btn',
    link: 'drive_with_uber_hero_link'
  },
  introduceSection: {
    id: 'drive_introduce_s_02',
    img: 'drive_with_uber_intro_img',
    title: 'drive_with_uber_intro_title_1',
    paragraphs: ['drive_with_uber_intro_para_1', 'drive_with_uber_intro_para_2']
  },
  perksSection: {
    id: 'drive_perks_s_03',
    headingTitle: 'drive_with_uber_perk_heading',
    itemsData: [
      {
        title: 'drive_with_uber_perk_title_1',
        descriptions: 'drive_with_uber_perk_desc_1'
      },
      {
        title: 'drive_with_uber_perk_title_2',
        descriptions: 'drive_with_uber_perk_desc_2'
      },
      {
        title: 'drive_with_uber_perk_title_3',
        descriptions: 'drive_with_uber_perk_desc_3'
      },
      {
        title: 'drive_with_uber_perk_title_4',
        descriptions: 'drive_with_uber_perk_desc_4'
      }
    ]
  },
  driveStepsSection: {
    id: 'drive_step_s_04',
    wrapperTitle: 'drive_with_uber_step_title',
    headingTitle: 'drive_with_uber_step_heading',
    img: 'drive_with_uber_step_img',
    itemsData: [
      {
        title: 'drive_with_uber_step_item_title_1',
        subTitle: 'drive_with_uber_step_item_sub_title_1'
      },
      {
        title: 'drive_with_uber_step_item_title_2',
        subTitle: 'drive_with_uber_step_item_sub_title_2'
      },
      {
        title: 'drive_with_uber_step_item_title_3',
        subTitle: 'drive_with_uber_step_item_sub_title_3'
      }
    ]
  },
  getStatedSection: {
    id: 'get_stated_s_05',
    wrapperContent: 'drive_with_uber_getStatedTitle_title_1',
    buttonTitle: [
      { title: 'drive_with_uber_getStatedTitle_btn_sub_lbl_1', subTitle: 'drive_with_uber_getStatedTitle_btn_lbl_1' },
      { title: 'drive_with_uber_getStatedTitle_btn_sub_lbl_2', subTitle: 'drive_with_uber_getStatedTitle_btn_lbl_2' }
    ],
    contents: [
      'drive_with_uber_getStatedTitle_sentence_1',
      'drive_with_uber_getStatedTitle_sentence_2',
      'drive_with_uber_getStatedTitle_sentence_3'
    ]
  },
  driveWithUberExploreHosting: {
    id: 'drive_explore_s_05',
    img: 'https://assets-global.website-files.com/5c16e90c8f6920b098f834e5/6324f5891e795a0a4cf1c346_AdobeStock_488832115-p-1080.jpg',
    wrapperTitle: 'drive_with_uber_explore_wrap_title',
    itemData: {
      mainTitle: 'EXPLORE HOSTING',
      headerTitle: '',
      Title: 'drive_with_uber_explore_title',
      Description: 'drive_with_uber_explore_desc',
      Link: ''
    }
  },
  diriveQAndASection: {
    id: 'drive_q_a_s_06',
    wrapperTitle: 'drive_with_uber_q7a_title_1',
    itemsData: [
      {
        key: '1',
        label: 'drive_with_uber_q7q_lbl_1',
        contents: ['drive_with_uber_q7q_content_1', 'drive_with_uber_q7q_content_2', 'drive_with_uber_q7q_content_3']
      },
      {
        key: '2',
        label: 'drive_with_uber_q7q_lbl_2',
        contents: ['drive_with_uber_q7q_content_4', 'drive_with_uber_q7q_content_5', 'drive_with_uber_q7q_content_6']
      },
      {
        key: '3',
        label: 'drive_with_uber_q7q_lbl_3',
        contents: ['drive_with_uber_q7q_content_7', 'drive_with_uber_q7q_content_8', 'drive_with_uber_q7q_content_9']
      },
      {
        key: '4',
        label: 'drive_with_uber_q7q_lbl_4',
        contents: ['drive_with_uber_q7q_content_10', 'drive_with_uber_q7q_content_11', 'drive_with_uber_q7q_content_12']
      }
    ]
  }
}

const driveWithUberSlice = createSlice({
  name: 'DriveWithUber',
  initialState,
  reducers: {}
})

export default driveWithUberSlice
