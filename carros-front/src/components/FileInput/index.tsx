import { Button, Stack } from "@mui/material";

function FileInput({
  fileDataUrl,
  handleFileChange
}: {
  fileDataUrl: string,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <Stack direction="column" alignItems='center' justifyContent="center" spacing={2} width={300}>
      <label htmlFor="upload-image">
        <Button variant="outlined" component="span">Escolher foto</Button>
        <input
          id="upload-image"
          hidden
          accept=".jpg,.png"
          type="file"
          onChange={handleFileChange}
        />
      </label>
      {fileDataUrl && <img src={fileDataUrl} alt="Uploaded Image" height="200" width="300" />}
    </Stack>
  );
}

export default FileInput;