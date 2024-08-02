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

const PRICE_FEED_ADDRESS = '0x8782EA16865A9AC29643cD8D22A205D8dB9f885F'
// const PLS_ADDRESS = '0x8f56Ac4313fEcA1196120619F0431C019778ce50'
// const PLS_ADDRESS = ''

// const STATE_TOKEN_ADDRES = '0x733336a32B75113935945288E3A4166373eEc312'
// const state_token = '0xa5b772845b3C7BDFBaC7c85Fa4d19c8952654635'
// const PSD_ADDRESS = '0x6f03272199Df9508362b03791001FDB664A03867'//my test
// const PSD_ADDRESS = ''//my test
// const PSD_ADDRESS = '0xDC2e09CC860f2339a6AFb6f324b4F8C513125783' //vlp address


//{ => mainnet

// const state_token = '0x30ca59f68F00E42b04acf8a6e93033fE3De71807'
// const PSD_ADDRESS = '0x83DEFEcaF6079504E2DD1DE2c66DCf3046F7bDD7'
// const PDXN_Address = "0xe4ae6F10ee1C8e2465D9975cb3325267A2025549"
// const PFENIX_Address = "0x459A438Fbe3Cb71f2F8e251F181576d5a035Faef"
// const PLS_ADDRESS = "0x705eb308C1867Da0930b4eFC22e88426b896DEFd"


//}

// {=> Testnet
const state_token = '0x0b78506C518567BBbC81f1aa389dCB31944eB377'
const PSD_ADDRESS = '0x79B48BB77764DC6D247cd4cecE832f09630727b9'

const PDXN_Address = "0x7E26AF36217C838Dec0327514B5b71261A23e905"
const PFENIX_Address = "0x9D3F0b98541EFf803B450730E15A6f9874c40026"
const PLS_ADDRESS = "0x6E6A8c5343d17dd23C0c184D7C45c4f26E9BCE09"


//}


// const state_token = '0xaf58E125a92b759C32b20c6FB154383Fe6ffc822'
// const PSD_ADDRESS = '0x26E26c8f1689Ff6EB5edd93fafd360fCE12F533C'//testing..........

const paymetn_address = "0x03717506C64979D521302F03cBf023f1F22cf86E"

const depositer = "0xc04c964d6BdC5fe2163E84bC06d9d0775Bdb369F"


const LOAN = "0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51"  //  loan token contract address (LOAN testnet address.).

const pDXN = "0x6fE0ae3D5c993a3073333134db70613B0cb88a31"

const XEN = "0x8a7FDcA264e87b6da72D000f22186B4403081A2a "

const pfenix = "0xC3e8abfA04B0EC442c2A4D65699a40F7FcEd8055"

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
export { PRICE_FEED_ADDRESS, PLS_ADDRESS, pDXN, pfenix, PFENIX_Address, LOAN, PDXN_Address, XEN, state_token, PSD_ADDRESS, allInOnePopup }