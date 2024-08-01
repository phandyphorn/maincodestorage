import { useEffect, useState } from "react";
import saveAs  from "file-saver";

const useProtectedImage = (filename?: string | null) => {
  const token = getCookie("ac");
  const [fileUrl, setFileUrl] = useState("");

  const fetchFile = async (name: string) => {
    try {
      const response = await fetch(`${'admin/files/'}${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return response;
      }
    } catch (err) {
      // no op
    }
  };

  const getFileUrl = async (name: string) => {
    const res = await fetchFile(name);
    const blob = await res?.blob();
    return blob ? URL.createObjectURL(blob) : "";
  };

  useEffect(() => {
    if (filename) {
      getFileUrl(filename).then((res) => {
        setFileUrl(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename]);

  const downloadFile = async (file: Document) => {
    const res = await fetchFile(file.URL);
    const blob = await res?.blob();

    if (blob) {
      const url = URL.createObjectURL(blob);
      saveAs(url, file.nodeName);
    }
  };

  return { fileUrl, getFileUrl, downloadFile };
};

export default useProtectedImage;
function getCookie(ACCESS_TOKEN_STORAGE_KEY: any) {
    throw new Error("Function not implemented.");
}

