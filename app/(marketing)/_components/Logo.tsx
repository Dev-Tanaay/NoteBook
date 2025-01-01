import Image from "next/image"

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Image src="/notebook.svg" width={30} height={30} alt="Logo"/>
        <span className="text-green-500 font-semibold text-shadow-lg">NoteBook</span>
    </div>
  )
}

export default Logo