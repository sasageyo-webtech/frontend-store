import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

declare global {
  const $swal: typeof Swal;
}

export { Swal, SweetAlertOptions, SweetAlertResult };
