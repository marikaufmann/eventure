import { Frown } from 'lucide-react'

const NoEventsFound = () => {
  return (
    <div className="pt-32">
    <h1 className="font-medium text-xl flex gap-1 items-center justify-center">
      Sorry, we couldn't find any events for your selection <Frown />
    </h1>
  </div>
  )
}

export default NoEventsFound