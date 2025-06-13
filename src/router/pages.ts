import { lazy } from "react"

export const HomePage = lazy(() => import("@/pages/home-page"))

export const ClassesSchedulePage = lazy(() => import("@/pages/classes-schedule-page"))

export const SettingsPage = lazy(() => import("@/pages/settings-page"))

export const GroupSettingsPage = lazy(() => import("@/pages/group-settings-page"))

export const ProfileSettingsPage = lazy(() => import("@/pages/profile-settings-page"))

export const AnnouncementsSettingsPage = lazy(() => import("@/pages/announcements-settings-page"))

export const TeachersSettingsPage = lazy(() => import("@/pages/teachers-settings-page"))

export const LocationsSettingsPage = lazy(() => import("@/pages/locations-settings-page"))
