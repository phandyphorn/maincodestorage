import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import saveAs  from "file-saver";

const fileName = "business-transactions-report.xlsx";

const API = {
  CARD_CENTER: "/admin/reports/export/excel/c7/merchant/top10",
  BRANCH: "/admin/reports/export/excel/b06/merchant/top10",
};

const exportItems = async (variables: any) => {
  const { isCardCenter, ...params } = variables;
  const api = isCardCenter ? API.CARD_CENTER : API.BRANCH;
  return await axios
    .get(api, { params, responseType: "blob" })
    .then((res) => {
      saveAs(res.data, fileName);
    });
};

export default function useMutationExportBusinessTransaction() {
  const { data, ...query } = useMutation<
    any,
    AxiosError,
    any
  >((variables) => exportItems(variables));
  return { data, ...query };
}
