import { FC } from "react"
import { LocationModel, LocationType } from "@/features/classes-schedule/types/classes-types.ts"
import { Card, CardContent } from "@/ui/basic/card.tsx"
import { MapPin, Link, Monitor, Building2 } from "lucide-react"

interface LocationCardProps {
  location: LocationModel
}

const getLocationTypeIcon = (type: LocationType) => {
  switch (type) {
    case "online":
      return <Monitor className="text-muted-foreground h-4 w-4" />
    case "irl":
      return <Building2 className="text-muted-foreground h-4 w-4" />
  }
}

const getLocationTypeText = (type: LocationType) => {
  switch (type) {
    case "online":
      return "Дистанционно"
    case "irl":
      return "В аудитории"
  }
}

export const LocationCard: FC<LocationCardProps> = ({ location }) => {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex h-[70px] items-center justify-between">
          <div className="flex w-full flex-col gap-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              <p className="font-raleway text-lg font-medium">{location.name}</p>
            </div>
            <div className="flex items-center gap-2">
              {getLocationTypeIcon(location.type)}
              <div className="font-raleway">{getLocationTypeText(location.type)}</div>
            </div>
            {location.type === "online" && location.link && (
              <div className="flex items-center gap-2">
                <Link className="text text-muted-foreground h-4 w-4 shrink-0" />
                <a
                  href={location.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-raleway text-muted-foreground min-w-0 overflow-hidden text-ellipsis text-sm hover:underline">
                  {location.link}
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
