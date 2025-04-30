import { FC } from "react"
import Search from "@assets/search.svg?react"
import Cross from "@assets/cross.svg?react"

export interface GroupSearchProps {
  input: string
  onInputChange: (value: string) => void
}

export const GroupSearch: FC<GroupSearchProps> = ({ input, onInputChange }) => {
  const clearInput = () => {
    onInputChange("")
  }

  return (
    <div className="bg-zinc-120 flex h-[41px] w-[490px] items-center justify-start rounded-3xl border-2 border-zinc-600">
      <Search width="18px" height="18px" className="ml-3 mr-4 scale-x-[-1] transform" />
      <input
        id="group-search"
        type="search"
        placeholder="Введите название группы"
        className="search-input all-[unset] font-raleway mr-3 w-[400px] border-0 leading-[14px] focus:outline-none"
        value={input}
        onChange={e => onInputChange(e.target.value)}
      />
      {input.length > 0 && (
        <Cross
          width="14px"
          height="14px"
          className="cursor-pointer [animation:smooth-expanding-14px_0.1s]"
          onClick={clearInput}
        />
      )}
    </div>
  )
}
