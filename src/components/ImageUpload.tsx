import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{ maxFiles: 1 }}
    >
      {/* 클라우디너리 업로드 위젯을 열기위한 함수 open  */}
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='
            relative flex flex-col justify-center items-center gap-4 
            p-20 transition border-2 border-dashed cursor-pointer 
            hover:opacity-70 border-neutral-300 text-neutral-300'
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className='absolut inset-0 w-full h-full'>
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt=''
                  priority
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
