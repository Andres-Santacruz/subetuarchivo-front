import { Image } from "@chakra-ui/react";

const BASE_URL = "https://view.officeapps.live.com/op/embed.aspx?src=";
const VisalizadorArabe = ({ file, name }: { file: string; name: string }) => {

  const ext = name.slice(name.length - 4).toLowerCase();
  if (name === "" || name === null || name === undefined) {
    return null;
  }

  if (
    ext === ".doc" ||
    ext == ".ptx" ||
    ext === "docx" ||
    ext === "xlsx" ||
    ext === "pptx"
  ) {
    const newExt = file.replaceAll("/", "%2F");
    const url = BASE_URL + newExt.replaceAll(":", "%3A");
    return <iframe src={url} width="100%" height="500px" />;
  }

  if (
    ext === ".png" ||
    ext == ".jpg" ||
    ext === ".bmp" ||
    ext === ".gif" ||
    ext === ".eps" ||
    ext === "jpeg" ||
    ext === ".tif" ||
    ext === "jfif" ||
    ext === ".svg"
  ) {
    return (
      <Image
        src={file}
        alt={name}
        width="full"
        height="500px"
        objectFit="contain"
      />
    );
  }
  if (
    ext === ".mov" ||
    ext == ".mkv" ||
    ext === ".mp4" ||
    ext === ".wmv" ||
    ext === ".flv" ||
    ext === ".avi" ||
    ext === ".asf" ||
    ext === "3gpp" ||
    ext === "webm" ||
    ext === ".mks"
  ) {
    return (
      <video
        src={file}
        controls
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      >
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    );
  }

  return <iframe src={file} width="100%" height="500px" />;
};

export default VisalizadorArabe;
