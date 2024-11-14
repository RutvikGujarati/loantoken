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

const state_token = '0x30ca59f68F00E42b04acf8a6e93033fE3De71807'
const DAVDEFI = "0xf74525d98d974a8e9263411B30Fa75497094307F"
const DAVTRADE = "0x989b541a355057D3c78dfF1e4a08D8b2592e9913"
const bnbDAV = "0xF6696F0756D66bDC9fb235277FF312f8ec8Dd737"
const DAVMATIC = "0x30ca59f68F00E42b04acf8a6e93033fE3De71807"

const PSD_ADDRESS = '0x83DEFEcaF6079504E2DD1DE2c66DCf3046F7bDD7'
const PDXN_Address = "0xe4ae6F10ee1C8e2465D9975cb3325267A2025549"
const PFENIX_Address = "0x459A438Fbe3Cb71f2F8e251F181576d5a035Faef"
const PLS_ADDRESS = "0x705eb308C1867Da0930b4eFC22e88426b896DEFd"
const MATIC_contract = "0xC4CD0c1BAC56FB0CB5c3b6474E1EbAb1D7492667";

const mDXN = "0x83DEFEcaF6079504E2DD1DE2c66DCf3046F7bDD7"
const mXEN = "0xC3C304636269975B528603B365b43D78AE26162A"
const mFENIX = "0xD5BA70D0cF16024210E4fB6B93F8793F98725448"

const BNB = "0xC3C304636269975B528603B365b43D78AE26162A"
const BXEN = "0xD5BA70D0cF16024210E4fB6B93F8793F98725448"
const BDXN = "0xe4ae6F10ee1C8e2465D9975cb3325267A2025549"
const BFENIX = "0x459A438Fbe3Cb71f2F8e251F181576d5a035Faef"

const hex = "0x50Bb32FCB594978967265135E4d41849d7F646e0"
const rex = "0xaE8E47b632dB88663f61039c497eD48bD8bb1a0a"
const texan = "0xEae3061ad7FE5d7d4Ee1d367c51ed5872B47f081"
const ptgc = "0xeCC510a6fb7eb24f88Fe6B84C37e008d9AC1C4bE"
const loan_mainnet = "0x7F2C98f4bF8106b799767bf09371aEC959Acfa25"
const watt = "0x054565E3509Fa23b44019517cfAf0Ba8819FC4f8"

//DAVTRADE main contracts
// const PLSX = "0x7cd1c9E1Fc5e31cA6d76bf004d2029F73Da5E989"
const Nine_MM = "0x2581484F2ccFc1D1fF5e94595dF8e5D11CC476Dd"
const NINE_INCH = "0xa75f8C12586f2D114cC2f821f5CB9280A95bDd7C"
const PTS = "0x22C092d26D26ebe462090318d6a85D28F23324b6"
const SPARK = "0x361E157262c4A34B24D69A72D63Df265442fed55"
const PRAT = "0x339A0Da8ffC7a6fc98Bf2FC53a17dEEf36F0D9c3"
const TONI = "0x09959B88528E6838c82BF04a92645B83BDb52F9f"

//}

// {=> Testnet
// const state_token = '0x0b78506C518567BBbC81f1aa389dCB31944eB377'
// const PSD_ADDRESS = '0x79B48BB77764DC6D247cd4cecE832f09630727b9'
// const DAVMATIC = "0x30ca59f68F00E42b04acf8a6e93033fE3De71807"

// const PDXN_Address = "0x7E26AF36217C838Dec0327514B5b71261A23e905"
// const PFENIX_Address = "0x9D3F0b98541EFf803B450730E15A6f9874c40026"
// const PLS_ADDRESS = "0x6E6A8c5343d17dd23C0c184D7C45c4f26E9BCE09"
// const MATIC_contract = "0xF6696F0756D66bDC9fb235277FF312f8ec8Dd737";


// const mDXN = "0x83DEFEcaF6079504E2DD1DE2c66DCf3046F7bDD7"
// const mXEN = "0xC3C304636269975B528603B365b43D78AE26162A"
// const mFENIX = "0xD5BA70D0cF16024210E4fB6B93F8793F98725448"

// const DAVDEFI = "0xa6CEE725e0Cc280b3E49e613e27077C9aaDD14d4"
// const bnbDAV = "0xF6696F0756D66bDC9fb235277FF312f8ec8Dd737"

// const hex = "0x2fc2088cbCcBE967bFF9c55F1f0CaAed8DF53406"
// const rex = "0xab33f51a5d7bbD516A09C8A1f7Cf6510f05f3952"
// const ptgc = "0xab33f51a5d7bbD516A09C8A1f7Cf6510f05f3952"
// const loan_mainnet = "0x2fc2088cbCcBE967bFF9c55F1f0CaAed8DF53406"
// const watt = "0x2fc2088cbCcBE967bFF9c55F1f0CaAed8DF53406"
// const texan = "0xab33f51a5d7bbD516A09C8A1f7Cf6510f05f3952"
//}

// PLSX
const PLSX_TOKEN = "0x95B303987A60C71504D99Aa1b13B4DA07b0790ab"

// 9MM
const NINE_MM_TOKEN = "0x7b39712Ef45F7dcED2bBDF11F3D5046bA61dA719"

// 9INCH
const NIne_inch_token = "0x3ca80d83277e721171284667829c686527B8b3c5"

// PTS (PITEAS)
const PTS_token = "0x2A06a971fE6ffa002fd242d437E3db2b5cC5B433"

// SPARK
const SPARK_token = "0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e"

// PRATE
const PRATE_token = "0x62959f4A9D771dE322c4a52CaA9BaBd1874DEb53"

// TONI
const Toni_token = "0x9F8182aD65c53Fd78bd07648a1b3DDcB675c6772"


// const state_token = '0xaf58E125a92b759C32b20c6FB154383Fe6ffc822'
// const PSD_ADDRESS = '0x26E26c8f1689Ff6EB5edd93fafd360fCE12F533C'//testing..........

const paymetn_address = "0x03717506C64979D521302F03cBf023f1F22cf86E"

const depositer = "0xc04c964d6BdC5fe2163E84bC06d9d0775Bdb369F"

//{ Tokens addresses =>

const LOAN = "0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51"

const pDXN = "0x6fE0ae3D5c993a3073333134db70613B0cb88a31"


const bDXN_Token = "0xCcd09b80453335aa914f5d9174984b6586c315EC"
const bFENIX_Token = "0xC3e8abfA04B0EC442c2A4D65699a40F7FcEd8055"
const bXEN_Token = "0x2AB0e9e4eE70FFf1fB9D67031E44F6410170d00e"

const mDXN_token = "0x47DD60FA40A050c0677dE19921Eb4cc512947729"
const mFENIX_token = "0xC3e8abfA04B0EC442c2A4D65699a40F7FcEd8055"
const mXEN_token = "0x2AB0e9e4eE70FFf1fB9D67031E44F6410170d00e"


const HEX_TOKEN = "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39"
const Texan_TOKEN = "0xcfcffe432a48db53f59c301422d2edd77b2a88d7"
const REX_TOKEN = "0x538B1BA51458565e553264c7F00d6De3806Aa9D9"
const Loan_mainnet_TOKEN = "0x9159f1D2a9f51998Fc9Ab03fbd8f265ab14A1b3B"
const PTGC_TOKEN = "0x94534EeEe131840b1c0F61847c572228bdfDDE93"
const WATT_TOKEN = "0xDfdc2836FD2E63Bba9f0eE07901aD465Bff4DE71"

const XEN = "0x8a7FDcA264e87b6da72D000f22186B4403081A2a"

const pfenix = "0xC3e8abfA04B0EC442c2A4D65699a40F7FcEd8055"

//}

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
export { PRICE_FEED_ADDRESS, PLS_ADDRESS, MATIC_contract, pDXN, pfenix, hex, rex, ptgc, texan, watt, loan_mainnet, PFENIX_Address, LOAN, PDXN_Address, XEN, state_token, DAVDEFI, PSD_ADDRESS, HEX_TOKEN, REX_TOKEN, PTGC_TOKEN, Texan_TOKEN, Loan_mainnet_TOKEN, WATT_TOKEN, DAVMATIC, mDXN_token, mFENIX_token, bDXN_Token, bFENIX_Token,bXEN_Token,BNB,BXEN,BDXN,BFENIX, bnbDAV, mDXN, DAVTRADE, PLSX_TOKEN, NIne_inch_token, NINE_MM_TOKEN, PTS_token, SPARK_token, PRATE_token, Toni_token,Nine_MM,NINE_INCH,PTS,PRAT,TONI,SPARK, mFENIX, mXEN, mXEN_token, allInOnePopup }