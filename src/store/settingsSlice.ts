import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  siteName: string
  siteUrl: string
  email: string
  address: string
  phone: string
}

export interface MediaSettings {
  logo: string | null
  favicon: string | null
  maxFileSize: number
  allowedTypes: string
}

export interface PaymentGateway {
  id: string
  name: string
  type: 'test' | 'live'
  status: boolean
  credentials: {
    apiKey: string
    secret: string
  }
}

interface SettingsSliceState {
  general: SettingsState
  media: MediaSettings
  paymentGateways: PaymentGateway[]
  commissions: number
}

const initialState: SettingsSliceState = {
  general: {
    siteName: "لوحة تحكم المسؤول",
    siteUrl: "https://www.yourdomain.com",
    email: "contact@yourdomain.com",
    address: "",
    phone: "",
  },
  media: {
    logo: null,
    favicon: null,
    maxFileSize: 5,
    allowedTypes: "image/*",
  },
  paymentGateways: [
    {
      id: "1",
      name: "PayPal",
      type: "test",
      status: true,
      credentials: {
        apiKey: "test_api_key",
        secret: "test_secret"
      }
    },
    {
      id: "2",
      name: "Stripe",
      type: "test",
      status: false,
      credentials: {
        apiKey: "test_api_key",
        secret: "test_secret"
      }
    }
  ],
  commissions: 2.5
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateGeneralSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      state.general = { ...state.general, ...action.payload }
    },
    updateMediaSettings: (state, action: PayloadAction<Partial<MediaSettings>>) => {
      state.media = { ...state.media, ...action.payload }
    },
    addPaymentGateway: (state, action: PayloadAction<PaymentGateway>) => {
      state.paymentGateways.push(action.payload)
    },
    updatePaymentGateway: (state, action: PayloadAction<PaymentGateway>) => {
      const index = state.paymentGateways.findIndex(gateway => gateway.id === action.payload.id)
      if (index !== -1) {
        state.paymentGateways[index] = action.payload
      }
    },
    deletePaymentGateway: (state, action: PayloadAction<string>) => {
      state.paymentGateways = state.paymentGateways.filter(gateway => gateway.id !== action.payload)
    },
    updateCommissions: (state, action: PayloadAction<number>) => {
      state.commissions = action.payload
    },
  },
})

export const { 
  updateGeneralSettings, 
  updateMediaSettings, 
  addPaymentGateway, 
  updatePaymentGateway, 
  deletePaymentGateway, 
  updateCommissions 
} = settingsSlice.actions

// Selectors
export const selectGeneralSettings = (state: { settings: SettingsSliceState }) => state.settings.general
export const selectMediaSettings = (state: { settings: SettingsSliceState }) => state.settings.media
export const selectPaymentGateways = (state: { settings: SettingsSliceState }) => state.settings.paymentGateways
export const selectCommissions = (state: { settings: SettingsSliceState }) => state.settings.commissions

export default settingsSlice.reducer