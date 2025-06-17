import { useSetPreferences } from "@/features/classes-schedule/preferences/hooks/use-set-preferences.ts"
import { useDeletePreference } from "@/features/classes-schedule/preferences/hooks/use-delete-preference.ts"
import { useGetPreferences } from "@/features/classes-schedule/preferences/hooks/use-get-preferences.ts"
import { useState, useEffect } from "react"
import { PreferenceParameter } from "@/features/classes-schedule/preferences/set-preferences.ts"
import { Button } from "@/ui/basic/button"
import { Input } from "@/ui/basic/input"
import { Combobox } from "@/ui/basic/combobox"
import { Subgroup } from "@/features/classes-schedule/types/classes-types"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/context/auth-context"

const options = [
  { value: "first" as Subgroup, label: "Первая подгруппа" },
  { value: "second" as Subgroup, label: "Вторая подгруппа" },
]

interface PreferenceWithId extends PreferenceParameter {
  id?: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const PreferencesForm = () => {
  const { authState } = useAuth()
  const currentUserId = authState.userData?.id

  const { data: savedPreferences, isLoading } = useGetPreferences(currentUserId || "")
  const [preferences, setPreferences] = useState<PreferenceWithId[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const { mutate: setPreferencesMutation } = useSetPreferences()
  const { mutate: deletePreferenceMutation } = useDeletePreference()

  useEffect(() => {
    if (savedPreferences) {
      setPreferences(savedPreferences)
      setDeletedIds([])
    }
  }, [savedPreferences])

  if (!currentUserId) {
    return <div>Загрузка данных пользователя...</div>
  }

  const addPreference = () => {
    setPreferences([...preferences, { class_name: "", subgroup: "first" }])
  }

  const updatePreference = (index: number, field: keyof PreferenceParameter, value: string) => {
    const newPreferences = [...preferences]
    newPreferences[index] = { ...newPreferences[index], [field]: value }
    setPreferences(newPreferences)
  }

  const removePreference = (index: number) => {
    const preference = preferences[index]
    if (preference.id) {
      setDeletedIds([...deletedIds, preference.id])
    }
    setPreferences(preferences.filter((_, i) => i !== index))
  }

  const hasChanges = () => {
    // Проверяем, есть ли новые предпочтения (без id)
    const hasNewPreferences = preferences.some(pref => !pref.id)

    // Проверяем, есть ли изменения в существующих предпочтениях
    const hasModifiedPreferences = preferences.some(pref => {
      if (!pref.id) return false
      const savedPref = savedPreferences?.find(sp => sp.id === pref.id)
      if (!savedPref) return false
      return pref.class_name !== savedPref.class_name || pref.subgroup !== savedPref.subgroup
    })

    return hasNewPreferences || hasModifiedPreferences
  }

  const hasInvalidSubgroups = () => {
    return preferences.some(pref => pref.subgroup === "none")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Сначала удаляем все помеченные предпочтения
    const deletePromises = deletedIds.map(id => deletePreferenceMutation(id))

    try {
      // Ждем завершения всех удалений
      await Promise.all(deletePromises)

      // Если есть изменения в существующих предпочтениях или новые предпочтения,
      // отправляем POST запрос
      if (hasChanges()) {
        // Добавляем задержку только если были удаления
        if (deletedIds.length > 0) {
          await delay(1000) // Задержка в 1 секунду
        }
        await new Promise<void>((resolve, reject) => {
          setPreferencesMutation(
            { filtering_parameters: preferences },
            {
              onSuccess: () => {
                setIsEditing(false)
                setDeletedIds([])
                resolve()
              },
              onError: reject,
            }
          )
        })
      } else {
        setIsEditing(false)
        setDeletedIds([])
      }
    } catch (error) {
      console.error("Error during preferences update:", error)
      // Здесь можно добавить обработку ошибок, например показать toast
    }
  }

  const handleCancel = () => {
    if (savedPreferences) {
      setPreferences(savedPreferences)
      setDeletedIds([])
    }
    setIsEditing(false)
  }

  if (isLoading) {
    return <div>Загрузка предпочтений...</div>
  }

  return (
    <div className="flex w-[50vw] max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-raleway text-base font-medium">
          Фильтрация расписания по конкретным парам
        </h3>
        {!isEditing ? (
          <Button variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Редактировать
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Отмена
            </Button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {preferences?.map((pref, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                type="text"
                value={pref.class_name}
                onChange={e => updatePreference(index, "class_name", e.target.value)}
                placeholder="Название пары"
                className="flex-1"
                disabled={!isEditing}
              />
              <Combobox<Subgroup>
                value={pref.subgroup}
                onChange={(value: Subgroup) => updatePreference(index, "subgroup", value)}
                options={options}
                className={cn("w-[200px]", !isEditing && "pointer-events-none opacity-50")}
              />
              {isEditing && (
                <Button type="button" variant="destructive" onClick={() => removePreference(index)}>
                  <Trash2 />
                </Button>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <div className="flex gap-4">
            <Button type="button" onClick={addPreference} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Добавить предпочтение
            </Button>
            <Button type="submit" disabled={hasInvalidSubgroups()}>
              <Save className="mr-2 h-4 w-4" />
              Сохранить предпочтения
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
