'use client'

import { useEffect, useRef } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { makeStore, AppStore } from "@/lib/redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import { useUser } from '@clerk/nextjs'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}