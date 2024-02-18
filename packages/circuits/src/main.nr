use dep::rsabigint::{BigUint56, MAX_BYTES, NUM_LIMBS};
use dep::rsa::{verify_sha256_pkcs1v15};
use dep::std::hash::sha256;
use dep::std::println;

global BODY_HASH_BASE64_LENGTH: Field = 44;
// TODO: this is specific to the email. We want to update this to be a MAX length instead, so any emails below a certain size works
global MESSAGE_LENGTH: Field = 177;
// allocate 200 chars for header, payload, sig respectively
// for private input email, no email is allowed to reach 200 chars

fn main(message: [u8; MESSAGE_LENGTH], sig: BigUint56, modulus: BigUint56, pubkey_e: BigUint56) {
    // 65537
    // verifyIsJWT (return JWTStruct)

    // checkIsCorrectEmail(privateEmail, JWT.email)

    // authenticateJWTAuthor() // check expected hash vs RSASSA of JWT header + body

    // return hashed email for Liam

    let hashed_message = sha256(message);

    // let email = getEmail(message);
    // Verify DKIM signature
    assert(verify_sha256_pkcs1v15(hashed_message, sig, pubkey_e, modulus));
}

#[test]
fn test_main() {
    // Message is 177 bytes
    let message = [
        102, 114, 111, 109, 58, 97, 108, 105, 99, 101, 64, 122, 107, 101, 109, 97, 105, 108, 46, 99, 111, 109, 13, 10, 100, 107, 105, 109, 45, 115, 105, 103, 110, 97, 116, 117, 114, 101, 58, 118, 61, 49, 59, 32, 97, 61, 114, 115, 97, 45, 115, 104, 97, 50, 53, 54, 59, 32, 100, 61, 122, 107, 101, 109, 97, 105, 108, 46, 99, 111, 109, 59, 32, 115, 61, 100, 101, 102, 97, 117, 108, 116, 59, 32, 99, 61, 114, 101, 108, 97, 120, 101, 100, 47, 114, 101, 108, 97, 120, 101, 100, 59, 32, 104, 61, 102, 114, 111, 109, 59, 32, 116, 61, 49, 54, 57, 50, 53, 55, 55, 50, 51, 49, 59, 32, 98, 104, 61, 80, 72, 73, 114, 87, 101, 121, 90, 114, 71, 43, 68, 53, 116, 106, 56, 81, 97, 115, 83, 67, 111, 115, 116, 53, 65, 108, 104, 48, 104, 115, 48, 100, 90, 90, 103, 111, 80, 108, 99, 72, 74, 119, 61, 59, 32, 98, 61, 59
    ];
    // Body is 37 bytes
    let sig = BigUint56 {
        limbs: [
            1971263576699707, 70352567725838059, 40709558662682475, 11662000118852963, 48386231714581344, 72050608680104119, 47315617837820762, 36149871541685510, 68697699104177899, 22518111138906483, 25960732248206839, 68775372695140819, 108881714466252, 14317838930614204, 70237716281324022, 60742891256808427, 41106657840284820, 2786276574906080, 46527, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    };
    let modulus = BigUint56 {
        limbs: [
            64717530282171833, 69150871281776410, 60041593704713005, 62059607045060896, 41915361572098361, 60220677223092673, 19622150207448220, 55122224380365447, 10822631164052092, 30937858787163122, 26930722274195578, 7404292287341483, 16504591447295476, 10928064986638097, 38823521225840931, 16606398534435237, 28481438878270370, 39212269632441874, 50891, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    };

    // Email public exponent is 65537
    let pubkey_e = BigUint56 {
        limbs: [
            65537, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]
    };

    main(message, sig, modulus, pubkey_e);
}
