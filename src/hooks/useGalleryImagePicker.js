import { useState } from "react";
import { ImagePicker } from "expo-image-multiple-picker";

function useGalleryImagePicker(allowMultipleSelection, onSave, onCancel) {
  const [showGalleryImagePicker, setShowGalleryImagePicker] = useState(false);
  const onSaveHandler = (assets) => {
    onSave(assets);
    setShowGalleryImagePicker(false);
  };
  const onCancelHandler = () => {
    onCancel();
    setShowGalleryImagePicker(false);
  };
  return [
    showGalleryImagePicker,
    setShowGalleryImagePicker,
    <ImagePicker
      theme={{
        header: WhatsAppHeader,
        album: WhatsAppAlbum,
        check: WhatsAppCheck,
      }}
      onSave={onSaveHandler}
      onCancel={onCancelHandler}
      galleryColumns={4}
      multiple={allowMultipleSelection}
    />,
  ];
}

export default useGalleryImagePicker;
