import { Card, CardContent } from "@/ui/basic/card.tsx"
import { TeacherModel } from "@/features/classes-schedule/types/classes-types.ts"

interface TeacherCardProps {
  teacher: TeacherModel
}

export const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card className="h-[100px]">
      <CardContent className="h-full">
        <div className="flex flex-col items-start justify-center gap-2 h-full">
          <h3 className="font-raleway truncate text-lg font-medium w-full" title={teacher.name}>
            {teacher.name}
          </h3>
          {teacher.full_name && (
            <p
              className="font-raleway text-muted-foreground truncate text-sm w-full"
              title={teacher.full_name}>
              {teacher.full_name}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
