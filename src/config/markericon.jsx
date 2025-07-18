// markericon.jsx
import L from "leaflet"
import React from "react"
import {renderToStaticMarkup} from "react-dom/server"

// ✅ Import ikon yang digunakan saja (sesuai isi jalur.js)
import {FaHome} from "@react-icons/all-files/fa/FaHome"
import {FaCampground} from "@react-icons/all-files/fa/FaCampground"
import {FaMountain} from "@react-icons/all-files/fa/FaMountain"
import {FaParking} from "@react-icons/all-files/fa/FaParking"
import {FaCoffee} from "@react-icons/all-files/fa/FaCoffee"
import {FaRunning} from "@react-icons/all-files/fa/FaRunning"

const iconMap = {
 FontAwesome5_home: FaHome,
 FontAwesome5_campground: FaCampground,
 FontAwesome5_mountain: FaMountain,
 FontAwesome5_parking: FaParking,
 FontAwesome5_coffee: FaCoffee,
 FontAwesome5_running: FaRunning,
}

const libMap = {
 FontAwesome5: {
  FaHome,
  FaCampground,
  FaMountain,
  FaParking,
  FaCoffee,
  FaRunning,
 }
}


export const getLeafletIconFromConfig = (iconConfig) => {
 if (!iconConfig || !iconConfig.name || !iconConfig.lib) return undefined

 const {name, lib, size = 20, color = "black"} = iconConfig
 const key = `${lib}_${name}`

 const Icon = iconMap[key]
 if (!Icon) {
  console.warn("❗ Icon not found:", key)
  return undefined
 }

 const html = renderToStaticMarkup(
  <div
   style={{
    backgroundColor: "white",
    padding: "2px",
    borderRadius: "10px",
    border: "1px solid #999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${size + 2}px`,
    height: `${size + 2}px`
   }}>
   <Icon size={size} color={color} />
  </div>
 )

 return L.divIcon({
  html,
  className: "leaflet-html-icon", // bebas
  iconSize: [size, size],
  iconAnchor: [(size + 10) / 2, size + 10],
  popupAnchor: [0, -size]
 })
}

export const getLeafletIconUser = (iconConfig) => {
 if (!iconConfig || !iconConfig.name || !iconConfig.lib) return undefined

 const {name, lib, size = 24, color = "black", rotationAngle = 0} = iconConfig
 const key = `${lib}_${name}`

 const Icon = iconMap[key]
 if (!Icon) {
  console.warn("❗ Icon not found:", key)
  return undefined
 }

 const html = renderToStaticMarkup(<Icon size={size} color={color} />)
 const svgHtml = `<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`
 const iconUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgHtml)}`

 return L.icon({
  iconUrl,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size / 2],
  className: "leaflet-custom-icon"
 })
}

export function MarkerIcon(config) {
 if (!config || !config.name || !config.lib) return null

 const IconLib = libMap[config.lib]
 const nameKey = "Fa" + capitalize(config.name)

 const Icon = IconLib?.[nameKey]
 return Icon ? <Icon color={config.color || "black"} size={config.size || 20} /> : null
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
