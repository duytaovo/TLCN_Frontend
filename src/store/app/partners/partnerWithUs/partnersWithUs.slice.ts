import { createSlice } from '@reduxjs/toolkit'
import { IHeroPartnerWithUsSection, IHostBenefitsSection } from 'src/types/partnersWithUs/partnesWithUs.type'

type PartnersWithUsType = {
  partnersHero: IHeroPartnerWithUsSection
  partnerBenefits: IHostBenefitsSection
}

const initialState: PartnersWithUsType = {
  partnersHero: {
    id: 'partner_hero-s01',
    imgLogo:
      'https://assets-global.website-files.com/5c16e90c8f6920b098f834e5/610ef9dd8b2b17d8489ead9c_multiracial-colleagues-giving-high-five.jpg',
    title: 'partner_with_us_hero_title',
    content: 'partner_with_us_hero_content'
  },
  partnerBenefits: {
    id: 'benefits_s_02',
    itemsData: [
      {
        title: 'partner_with_us_benefits_card_title_1',
        description: 'partner_with_us_benefits_card_desc_1',
        btn_title: 'partner_with_us_benefits_card_btn_1'
      },
      {
        title: 'partner_with_us_benefits_card_title_2',
        description: 'partner_with_us_benefits_card_desc_2',
        btn_title: 'partner_with_us_benefits_card_btn_2'
      },
      {
        title: 'partner_with_us_benefits_card_title_3',
        description: 'partner_with_us_benefits_card_desc_3',
        btn_title: 'partner_with_us_benefits_card_btn_3'
      },
      {
        title: 'partner_with_us_benefits_card_title_4',
        description: 'partner_with_us_benefits_card_desc_4',
        btn_title: 'partner_with_us_benefits_card_btn_4'
      }
    ]
  }
}

const partnersWithUsSlice = createSlice({
  name: 'PartnersWithUs',
  initialState,
  reducers: {}
})

export default partnersWithUsSlice
