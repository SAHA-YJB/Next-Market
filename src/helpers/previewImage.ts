export const previewImage = (e: any, setImagePreview: any, setImage: any) => {
  const file = e.target.files[0];

  // 클라우디너리 업로드용
  setImage(file);

  // url로 바꾸기 프리뷰이미지 보여주기용
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    console.log(reader.result);
    setImagePreview(reader.result);
  };
};
