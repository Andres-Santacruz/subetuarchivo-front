import { Box, Button, useToast } from "@chakra-ui/react";
import React, {SetStateAction, useEffect, useMemo} from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#2b6cb0",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export function DropzoneForm({
  setFilesUploaded,
}: {
  setFilesUploaded: React.Dispatch<SetStateAction<File[]>>;
}) {
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const toast = useToast();

  useEffect(() => {
    setFilesUploaded((pre) => {

      const someFile =  pre.some(
          (el) =>
            el.name === acceptedFiles?.[0]?.name &&
            el.lastModified === acceptedFiles?.[0]?.lastModified
        );
    
      return !someFile ? pre.concat(acceptedFiles) : pre.concat([]);
    });
    if(acceptedFiles.length>0){
      toast({
        title: "Luce bien!",
        description: 'Archivo listo para subir',
        status: "success",
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }, [acceptedFiles, setFilesUploaded, toast]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box>
      <Box {...getRootProps({ style })}>
        <input {...getInputProps()} type='file'/>
        <p>Suelta tu archivo aquí</p>
        <Button
          type="button"
          onClick={open}
          mt={6}
          colorScheme="blue"
          variant="outline"
        >
          Subir archivo
        </Button>
      </Box>
    </Box>
  );
}
