import { useQuery } from "@tanstack/react-query"
import { getLocations } from "@/features/classes-schedule/locations/get-locations.ts"

export const locationsKey = "locations"

export const useGetLocations = () =>
  useQuery({ queryKey: [locationsKey], queryFn: () => getLocations() })
