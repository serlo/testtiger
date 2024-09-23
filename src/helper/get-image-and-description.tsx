export function getImageAndDescription(imageUrl: string, description: string) {
  return (
    <>
      <img src={imageUrl} alt={description} />
      <p>{description}</p>
    </>
  )
}
