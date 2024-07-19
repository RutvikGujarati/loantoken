import Swal from "sweetalert2"

/*
const PRICE_FEED_ADDRESS = '0x66374eCFBD5d882d132f5E217Ef6d2B62169dcDc'
const STATE_TOKEN_ADDRES = '0xE1F3dDBdCba6d62145E75e02C56C6F86a0E7195E'
const PSD_ADDRESS = '0xACA67fB2e3f3B14ee50F90dDEA85A3AdCb777ef1'

*/

// const PRICE_FEED_ADDRESS = '0xC513708544Ce538205951eC97Fd50c70c5BC1F96'
// const STATE_TOKEN_ADDRES = '0x15a8BE487464F8D076D396dC8Ca0411bb3eeb18B'
// const PSD_ADDRESS = '0xb5b4b82f874B02056EFDC7AC8a8b4Bf28F8F2CfA'

// const PRICE_FEED_ADDRESS = '0x71D531dff1Fe8f26C2e733e118f73Ad5eA6170Ba'
// const STATE_TOKEN_ADDRES = '0xb70e205Bb03f96Dbc807576B3fD5aabcDD295Cad'
// const PSD_ADDRESS = '0x3E4de1d2f63fCA8B170a2F9b77415b0868F72781'

const XEN_PRICE_FEED_ADDRESS = '0xf2d52c0407FE82EF63C242Da9A117414eb1000b7'

const PRICE_FEED_ADDRESS = '0xa591a0300d0abC8eda0F0c8690a46E541220D5CD'
const PLS_ADDRESS = '0xC80276F3271834494e05EF157A1E6008b1c7D170'

// const STATE_TOKEN_ADDRES = '0x733336a32B75113935945288E3A4166373eEc312'
const state_token = '0xc7Fa81a5ED11fa1dF503bc6C88d6cC56feAebA67'
const PSD_ADDRESS = '0x0D67eFE6657Bd444612d943d5dc0c534cbfC2a05'

const paymetn_address = "0x03717506C64979D521302F03cBf023f1F22cf86E"
const LOAN = "0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51"  //  loan token contract address (LOAN testnet address.).

const pDXN = "0x6fE0ae3D5c993a3073333134db70613B0cb88a31"

const allInOnePopup = (icon, title, text, button, confirmBtn, cancelBtn) => {
    return (
        Swal.fire({
            icon: icon == null ? null : icon,
        title: title,
            text: text,
            confirmButtonText: button,
            allowOutsideClick: true,
            allowEscapeKey: false,
            showConfirmButton: confirmBtn == null ? null : confirmBtn,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        })
    )
}

export const conciseAddress = (address, startSlice = 7, endSlice = 5) => {
    if (address) {
        return `${address.slice(0, startSlice)}...${address.slice(
            address.length - endSlice,
            address.length
        )}`;
    }
    return '';
};
export { PRICE_FEED_ADDRESS,PLS_ADDRESS, LOAN, pDXN, state_token, PSD_ADDRESS, allInOnePopup }