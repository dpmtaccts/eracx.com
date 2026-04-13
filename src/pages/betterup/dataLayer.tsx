import { createContext, useContext, useState, type ReactNode } from 'react'

export type DataLayer = 'era' | 'era-plus-bh'

interface DataLayerContextValue {
  layer: DataLayer
  setLayer: (l: DataLayer) => void
  showLayerToggle: boolean
  showBH: boolean
}

const DataLayerContext = createContext<DataLayerContextValue>({
  layer: 'era-plus-bh',
  setLayer: () => {},
  showLayerToggle: false,
  showBH: true,
})

export function DataLayerProvider({
  children,
  defaultLayer,
  showLayerToggle,
}: {
  children: ReactNode
  defaultLayer: DataLayer
  showLayerToggle: boolean
}) {
  const [layer, setLayer] = useState<DataLayer>(defaultLayer)
  return (
    <DataLayerContext.Provider value={{ layer, setLayer, showLayerToggle, showBH: layer === 'era-plus-bh' }}>
      {children}
    </DataLayerContext.Provider>
  )
}

export function useDataLayer() {
  return useContext(DataLayerContext)
}

/** Wraps content that is sourced from the Pinwheel Brand Health Assessment.
 *  Renders nothing when the active layer is "era" (ERA-only).
 *  Optionally shows a slim "this is where Brand Health data layers in" placeholder. */
export function BrandHealthOnly({
  children,
  placeholder,
}: {
  children: ReactNode
  placeholder?: ReactNode
}) {
  const { showBH } = useDataLayer()
  if (!showBH) return placeholder ? <>{placeholder}</> : null
  return <>{children}</>
}
