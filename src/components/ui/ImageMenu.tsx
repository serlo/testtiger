import { IonIcon } from '@ionic/react'
import { camera, image } from 'ionicons/icons'

interface ImageMenuProps {
  onTakePhoto: () => void
  onChoosePhoto: () => void
  onClose: () => void
}

export function ImageMenu({
  onTakePhoto,
  onChoosePhoto,
  onClose,
}: ImageMenuProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2">
      <button
        onClick={() => {
          onTakePhoto()
          onClose()
        }}
        className="flex items-center p-2 hover:bg-gray-100 rounded w-full"
      >
        <IonIcon icon={camera} className="mr-2" />
        Camera
      </button>
      <button
        onClick={() => {
          onChoosePhoto()
          onClose()
        }}
        className="flex items-center p-2 hover:bg-gray-100 rounded w-full"
      >
        <IonIcon icon={image} className="mr-2" />
        Upload
      </button>
    </div>
  )
}
