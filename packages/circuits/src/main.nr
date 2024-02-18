use dep::rsabigint::{BigUint56};
use dep::rsa::{verify_sha256_pkcs1v15};
use dep::std::hash::sha256;
use dep::base64;
use dep::json_parser::JSON;

fn main(payload: str<377>, sig: BigUint56, modulus: BigUint56, pubkey_e: BigUint56) -> pub [u8] {
    // Obtain payload hash
    let encoded_payload = base64::encode_str(payload, [0; 76]); 
    let payload_hash = sha256(encoded_payload);

    // Verify the signature
    assert(verify_sha256_pkcs1v15(payload_hash, sig, pubkey_e, modulus));

    // Extract the hashed email from the payload
    let payload_json = JSON::parse(payload);
    let hashed_email = payload_json.get("hashed_email"); 

    hashed_email
}
